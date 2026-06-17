import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageAlt?: string;
  ogType?: string;
  keywords?: string;
  robots?: string;
  author?: string;
  themeColor?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImageAlt?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = "https://cybaemtech.com";

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = "https://cybaemtech.com/assets/cybaem-logo-C5lgmAgK.png",
  ogTitle,
  ogDescription,
  ogImageAlt,
  ogType = "website",
  keywords,
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  author = "Cybaem Tech Pvt Ltd",
  themeColor = "#1f5b8f",
  twitterTitle,
  twitterDescription,
  twitterImageAlt,
  jsonLd,
}: SEOHeadProps) => {
  useEffect(() => {
    const fullCanonical = canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`;

    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);
    setMeta("name", "robots", robots);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("name", "author", author);
    setMeta("name", "theme-color", themeColor);

    // Geo meta
    setMeta("name", "geo.region", "IN-MH");
    setMeta("name", "geo.placename", "Pune");
    setMeta("name", "geo.position", "18.5912;73.7389");
    setMeta("name", "ICBM", "18.5912,73.7389");

    // Open Graph
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:site_name", "Cybaem Tech");
    setMeta("property", "og:title", ogTitle || title);
    setMeta("property", "og:description", ogDescription || description);
    setMeta("property", "og:url", fullCanonical);
    setMeta("property", "og:image", ogImage);
    if (ogImageAlt) setMeta("property", "og:image:alt", ogImageAlt);

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", twitterTitle || ogTitle || title);
    setMeta("name", "twitter:description", twitterDescription || ogDescription || description);
    setMeta("name", "twitter:image", ogImage);
    if (twitterImageAlt || ogImageAlt) setMeta("name", "twitter:image:alt", twitterImageAlt || ogImageAlt || "");

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", fullCanonical);

    // JSON-LD (supports single object or array)
    const scripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

      const normalize = (value: unknown): unknown => {
        if (Array.isArray(value)) {
          return value.map(normalize);
        }
        if (value && typeof value === "object") {
          return Object.keys(value)
            .filter((key) => key !== "@id")
            .sort()
            .reduce<Record<string, unknown>>((result, key) => {
              result[key] = normalize((value as Record<string, unknown>)[key]);
              return result;
            }, {});
        }
        return value;
      };

      const isEqual = (a: unknown, b: unknown): boolean => {
        if (a === b) return true;
        if (typeof a !== typeof b) return false;
        if (Array.isArray(a) && Array.isArray(b)) {
          if (a.length !== b.length) return false;
          return a.every((item, index) => isEqual(item, b[index]));
        }
        if (a && typeof a === "object" && b && typeof b === "object") {
          const aKeys = Object.keys(a as Record<string, unknown>).filter((key) => key !== "@id").sort();
          const bKeys = Object.keys(b as Record<string, unknown>).filter((key) => key !== "@id").sort();
          if (aKeys.length !== bKeys.length) return false;
          return aKeys.every(
            (key, index) => key === bKeys[index] && isEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
          );
        }
        return false;
      };

      const existingScripts = Array.from(document.head.querySelectorAll("script[type='application/ld+json']"));

      schemas.forEach((schema) => {
        const normalizedSchema = normalize(schema);
        const existing = existingScripts.find((node) => {
          if (!node.textContent) return false;
          try {
            const parsed = JSON.parse(node.textContent);
            return isEqual(normalize(parsed), normalizedSchema);
          } catch {
            return false;
          }
        });
        if (existing) {
          return;
        }

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema);
        script.setAttribute("data-seo-head", "true");
        document.head.appendChild(script);
        scripts.push(script);
      });
    }

    return () => {
      scripts.forEach((s) => {
        if (s.parentNode) s.parentNode.removeChild(s);
      });
    };
  }, [title, description, canonical, ogImage, ogTitle, ogDescription, ogImageAlt, ogType, keywords, robots, author, themeColor, twitterTitle, twitterDescription, twitterImageAlt, jsonLd]);

  return null;
};

export default SEOHead;
