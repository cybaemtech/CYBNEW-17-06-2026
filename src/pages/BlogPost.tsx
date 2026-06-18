import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useBlogData } from "@/hooks/useBlogData";

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author: string;
  category: string | null;
  tags: string[] | null;
  published_at: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts, loading: postsLoading, error } = useBlogData();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Still loading data from Google Sheets - show loading skeleton
    if (postsLoading) {
      setLoading(true);
      return;
    }

    // If slug is missing, show not found
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    try {
      const index = parseInt(slug.replace("linkedin-post-", ""));

      // If index is invalid, show not found
      if (isNaN(index)) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const row = posts[index];

      if (!row) {
        console.warn(`[BlogPost] Post not found at index ${index}. Available posts: ${posts.length}`);
        setNotFound(true);
      } else {
        console.log(`[BlogPost] Loaded post: ${row.title}`);
        setPost({
          id: row.id,
          title: row.title,
          slug,
          excerpt: row.excerpt,
          content: row.excerpt
            ? row.excerpt
                .replace(/\{hashtag\|\\\#\|([^}]+)\}/g, "#$1")
                .replace(/\n/g, "<br/><br/>")
                .trim()
            : "",
          cover_image: row.cover_image,
          author: row.author,
          category: row.category,
          tags: [],
          published_at: row.published_at,
        });
        setNotFound(false);
      }
    } catch (error) {
      console.error("[BlogPost] Error parsing slug:", error);
      setNotFound(true);
    }

    setLoading(false);
  }, [slug, posts, postsLoading]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-32 pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-64 mb-8" />
            <Skeleton className="h-80 w-full rounded-xl mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !post) {
    return (
      <>
        <SEOHead
          title="Post Not Found | Cybaem Tech Blog"
          description="The blog post you're looking for could not be found."
          canonical={`/blog/${slug}`}
        />
        <Navbar />
        <main className="min-h-screen bg-background pt-32 pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              Post Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | Cybaem Tech Blog`}
        description={post.excerpt || `Read ${post.title} on the Cybaem Tech blog.`}
        canonical={`/blog/${post.slug}`}
        ogImage={post.cover_image || undefined}
        ogType="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.cover_image,
            author: {
              "@type": "Person",
              name: post.author,
            },
            datePublished: post.published_at,
            dateModified: post.published_at,
            publisher: {
              "@type": "Organization",
              name: "Cybaem Tech Pvt. Ltd.",
              logo: {
                "@type": "ImageObject",
                url: "https://cybaemtech.com/assets/cybaem-logo-C5lgmAgK.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://cybaemtech.com/blog/${post.slug}`,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://cybaemtech.com/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://cybaemtech.com/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: `https://cybaemtech.com/blog/${post.slug}` },
            ],
          },
        ]}
      />
      <Navbar />

      <main className="min-h-screen bg-background">
        <article className="pt-32 pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
            </motion.div>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              {post.category && (
                <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                  {post.category}
                </Badge>
              )}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User size={16} />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  {formatDate(post.published_at)}
                </span>
              </div>
            </motion.header>

            {/* Cover Image */}
            {post.cover_image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-10"
              >
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-auto rounded-xl object-cover aspect-[16/9]"
                />
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 pt-8 border-t border-border"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={16} className="text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default BlogPost;
