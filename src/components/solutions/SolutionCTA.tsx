import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { MagneticButton } from "@/components/Navbar";
import { containerVariants, itemVariants } from "@/lib/animations";

interface Props {
  headline: string;
  relatedSlugs: string[];
  relatedTitles: string[];
}

const SolutionCTA = ({ headline, relatedSlugs, relatedTitles }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-center max-w-3xl mx-auto">
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-6">
            {headline}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed mb-10">
            Speak directly with our technical leadership. No sales reps, no scripts — just senior engineers who understand your challenges.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <MagneticButton>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Schedule a Discovery Call
                <ArrowRight size={16} />
              </Link>
            </MagneticButton>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground mb-16">
            <a href="mailto:sales@cybaemtech.com" className="flex items-center gap-2 hover:text-foreground transition-colors hover-underline">
              <Mail size={14} /> sales@cybaemtech.com
            </a>
            <span className="flex items-center gap-2">
              <Phone size={14} /> Global Support Lines
            </span>
          </motion.div>

          {/* Related Solutions */}
          {relatedSlugs.length > 0 && (
            <motion.div variants={itemVariants} className="pt-8 border-t border-border">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">Related Solutions</p>
              <div className="flex flex-wrap justify-center gap-3">
                {relatedSlugs.map((slug, i) => (
                  <Link
                    key={slug}
                    to={`/solutions/${slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium glass-panel rounded-lg hover:border-primary/30 transition-all"
                  >
                    {relatedTitles[i]} <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionCTA;
