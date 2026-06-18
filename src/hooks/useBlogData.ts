import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  author: string;
  category: string | null;
  published_at: string | null;
}

interface CacheData {
  posts: BlogPost[];
  timestamp: number;
  version: number; // Cache version for automatic bust on deployment
}

// IMPORTANT: Increment this version number every time you deploy to production
// This will automatically clear old cache and force fresh data fetch from Google Sheets
const CACHE_VERSION = 1;
const CACHE_KEY = "cybaem_blog_posts_v4";
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const GOOGLE_SHEETS_API = "https://docs.google.com/spreadsheets/d/1fI_YaQF9y53wjRBKwi_T7SGCTqkz_1gLDvWbA1zp8P4/gviz/tq?tqx=out:json&sheet=Sheet1";

// Retry configuration for production resilience
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

/**
 * Custom hook for fetching and caching blog posts from Google Sheets API only
 * NO Supabase integration - uses only Google Sheets as data source
 * Data persists in localStorage so it survives page refreshes
 */
export const useBlogData = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to clear corrupted cache only (NOT for version mismatches)
  // We keep valid cache to avoid losing data on deployments
  const clearCorruptedCache = () => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const parsed: CacheData = JSON.parse(cachedData);
        // Only validate structure, don't clear based on version
        if (!parsed.posts || !Array.isArray(parsed.posts) || !parsed.timestamp) {
          localStorage.removeItem(CACHE_KEY);
          console.log("[Blog Cache] Cleared corrupted cache (invalid structure)");
          return true;
        }
      }
    } catch (err) {
      // Truly corrupted cache, clear it
      localStorage.removeItem(CACHE_KEY);
      console.log("[Blog Cache] Cleared corrupted cache (parse error)");
      return true;
    }
    return false;
  };

  // Helper function to retry fetch with exponential backoff
  const fetchWithRetry = async (url: string, retries = MAX_RETRIES): Promise<Response> => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        console.log(`[Blog API] Fetch attempt ${attempt + 1}/${retries + 1}`);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });

        if (response.ok) {
          return response;
        }

        // If not OK, retry
        if (attempt < retries) {
          const delay = RETRY_DELAY * Math.pow(2, attempt); // Exponential backoff
          console.warn(`[Blog API] Attempt ${attempt + 1} failed (${response.status}), retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (err) {
        if (attempt < retries) {
          const delay = RETRY_DELAY * Math.pow(2, attempt);
          console.warn(`[Blog API] Network error on attempt ${attempt + 1}, retrying in ${delay}ms...`, err);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          throw err;
        }
      }
    }
    
    throw new Error(`Failed after ${retries + 1} attempts`);
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Step 1: Clear only corrupted cache (keep valid cache from previous sessions)
        clearCorruptedCache();

        // Step 2: Try to load from localStorage cache first (for instant display on refresh)
        const cachedData = localStorage.getItem(CACHE_KEY);
        let cachedPosts: BlogPost[] | null = null;
        
        if (cachedData) {
          try {
            const parsed: CacheData = JSON.parse(cachedData);
            const isExpired = Date.now() - parsed.timestamp > CACHE_DURATION;
            
            if (!isExpired && parsed.posts && parsed.posts.length > 0) {
              cachedPosts = parsed.posts;
              // Display cached data immediately
              setPosts(cachedPosts);
              setLoading(false);
              console.log(`[Blog Cache] Loaded ${cachedPosts.length} posts from cache on refresh`);
            }
          } catch (cacheErr) {
            console.warn("[Blog Cache] Failed to parse cached data", cacheErr);
          }
        }

        // Step 3: Fetch fresh data from Google Sheets API (ONLY API source - no Supabase)
        console.log("[Blog API] Fetching fresh data from Google Sheets API...");
        
        let response: Response;
        try {
          response = await fetchWithRetry(GOOGLE_SHEETS_API, MAX_RETRIES);
        } catch (fetchErr) {
          console.error("[Blog API] All fetch attempts failed:", fetchErr);
          throw fetchErr;
        }

        const text = await response.text();
        
        // Validate response format
        if (!text.includes('table')) {
          throw new Error("Invalid response format from Google Sheets API - no table data found");
        }
        
        // Extract JSON from JSONP response
        let jsonString: string;
        try {
          jsonString = text.substring(47, text.length - 2);
        } catch (err) {
          throw new Error("Failed to parse JSONP response format");
        }

        let json: any;
        try {
          json = JSON.parse(jsonString);
        } catch (parseErr) {
          console.error("[Blog API] JSON parse error. Response preview:", text.substring(0, 200));
          throw new Error("Failed to parse JSON from Google Sheets response");
        }

        if (!json.table || !json.table.rows || json.table.rows.length === 0) {
          throw new Error("No data found in Google Sheets table");
        }

        // Map the columns to headers based on row 0
        const headers = json.table.rows[0].c.map((col: any) => col?.v);
        const data = json.table.rows.slice(1).map((row: any) => {
          const obj: any = {};
          row.c.forEach((cell: any, i: number) => {
            obj[headers[i]] = cell?.v || null;
          });
          return obj;
        });

        // Filter and format blog posts
        const filteredPosts: BlogPost[] = data
          .filter((row: any) => row.Blog === "YES" && row["Post Text"])
          .map((row: any, index: number) => ({
            id: row["Post ID"] || String(index),
            title: row["Post Text"]?.substring(0, 70) + "..." || "Untitled",
            slug: `linkedin-post-${index}`,
            excerpt: row["Post Text"]?.substring(0, 180) || null,
            cover_image: row["Image URL"] || null,
            author: "Cybaem Tech",
            category: row["Category"] || "LinkedIn",
            published_at: row["Published Date"] || null,
          }));

        if (filteredPosts.length === 0) {
          throw new Error("No blog posts found after filtering (Blog = YES)");
        }

        // Step 4: Update cache with fresh data (includes version for future use)
        const cacheData: CacheData = {
          posts: filteredPosts,
          timestamp: Date.now(),
          version: CACHE_VERSION,
        };
        
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
          console.log(`[Blog API] ✅ Cached ${filteredPosts.length} posts from Google Sheets`);
        } catch (storageErr) {
          console.warn("[Blog Cache] Failed to save to localStorage", storageErr);
          // Continue anyway - data is displayed even if not cached
        }

        // Update state with fresh data
        setPosts(filteredPosts);
        setError(null);
        setLoading(false);
        console.log(`[Blog API] ✅ Successfully loaded ${filteredPosts.length} blog posts`);

      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Unknown error occurred";
        console.error("[Blog Error]", errorMsg);

        // Fallback: Use cached data even if expired
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          try {
            const parsed: CacheData = JSON.parse(cachedData);
            if (parsed.posts && parsed.posts.length > 0) {
              setPosts(parsed.posts);
              setError(null); // Don't show error if we have fallback data
              console.warn(`[Blog Fallback] ✅ Using ${parsed.posts.length} posts from fallback cache`);
              setLoading(false);
              return;
            }
          } catch (cacheErr) {
            console.error("[Blog Cache Fallback] Failed to parse fallback cache", cacheErr);
          }
        }

        // If everything fails, show error but don't go blank
        const fallbackError = `Unable to load blog posts. Please refresh the page or check your internet connection. (${errorMsg})`;
        setError(fallbackError);
        setPosts([]);
        setLoading(false);
        console.error("[Blog Fatal]", fallbackError);
      }
    };

    fetchBlogData();
  }, []);

  return { posts, loading, error };
};
