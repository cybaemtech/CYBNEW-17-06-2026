import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, User, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useBlogData } from "@/hooks/useBlogData";
import { z } from "zod";

const Blog = () => {
  const { posts, loading, error } = useBlogData();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <SEOHead
        title="IT Services Blog | Cybaem Tech - Enterprise Insights & Strategies"
        description="Read expert insights on enterprise IT services, software development, managed IT security, web systems, and digital growth strategies from Cybaem Tech."
        canonical="/blog"
        keywords="IT services blog, enterprise software insights, managed IT services, web development, digital growth strategies, cybersecurity tips"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Cybaem Tech IT Services Blog",
          description: "Expert insights on IT services, enterprise software, managed IT, and digital growth.",
          url: "https://cybaemtech.com/blog",
          publisher: {
            "@type": "Organization",
            name: "Cybaem Tech Pvt Ltd",
            url: "https://cybaemtech.com"
          }
        }}
      />
      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                Insights & Updates
              </Badge>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                IT Service Insights & Blog
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stay ahead with expert insights on enterprise IT services, software development, IT security, 
                web systems, and digital growth strategies from our team of specialists.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            ) : error && posts.length === 0 ? (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <p className="text-muted-foreground text-lg mb-4 font-medium">
                    Unable to Load Blog Posts
                  </p>
                  <p className="text-muted-foreground mb-6 text-sm">
                    {error}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                  >
                    Refresh Page
                  </button>
                </div>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-4">
                  Check back soon for our latest insights on IT services, enterprise software, and digital growth strategies.
                </p>
                <p className="text-muted-foreground">
                  Subscribe to our newsletter to be notified when new content is published.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="relative overflow-hidden rounded-xl mb-4 aspect-[16/10] bg-muted">
                        {post.cover_image ? (
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <span className="text-4xl font-display font-bold text-primary/30">
                              {post.title.charAt(0)}
                            </span>
                          </div>
                        )}
                        {post.category && (
                          <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary">
                            {post.category}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5">
                          <User size={14} />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {formatDate(post.published_at)}
                        </span>
                      </div>

                      <h2 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      )}

                      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                        Read More <ArrowRight size={16} />
                      </span>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>

      <Footer />
    </>
  );
};

export default Blog;
