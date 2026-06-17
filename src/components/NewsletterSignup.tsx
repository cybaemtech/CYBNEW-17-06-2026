import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().trim().email("Invalid email address").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email format").max(255),
});

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setLoading(true);
    // Simulate submission — in production, this would call an API
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="bg-card border border-border rounded-2xl p-8 sm:p-10">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Mail size={22} className="text-primary" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Stay Ahead in Tech
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
              Get expert insights on IT strategy, software architecture, cloud security, and digital growth — delivered to your inbox monthly.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 text-primary font-medium"
              >
                <CheckCircle size={20} />
                <span>Thank you! You're subscribed.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full h-12 px-4 rounded-lg border bg-muted/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none transition-colors ${
                        error ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                      }`}
                    />
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 text-red-500 text-xs mt-2"
                      >
                        <AlertCircle size={14} />
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
