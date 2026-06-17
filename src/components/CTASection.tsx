import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import sectionNetwork from "@/assets/section-network.avif";
import { MagneticButton } from "./Navbar";
import { containerVariants, itemVariants } from "@/lib/animations";

const CTASection = () => {
  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={sectionNetwork} alt="" className="w-full h-full object-cover opacity-20" loading="lazy" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center max-w-3xl mx-auto">
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-6">
            Ready to Build a System<br />That <span className="text-primary glow-accent">Scales</span>?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed mb-10">
            Stop settling for vendors. Partner with a technology team that guarantees delivery, security, and performance. Speak directly with our technical leadership today.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <MagneticButton>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Schedule a Discovery Call
                <ArrowRight size={16} />
              </Link>
            </MagneticButton>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <a href="mailto:sales@cybaemtech.com" className="flex items-center gap-2 hover:text-foreground transition-colors hover-underline">
              <Mail size={14} />
              sales@cybaemtech.com
            </a>
            <span className="flex items-center gap-2">
              <Phone size={14} />
              Global Support Lines
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
