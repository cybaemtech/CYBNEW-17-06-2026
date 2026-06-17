import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { MagneticButton } from "./Navbar";
import type { Variants } from "framer-motion";

const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

const charReveal: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: 40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Full-screen background image — static, no JS parallax for perf */}
      <div className="absolute inset-0">
        <img
          src="/hero-new.avif"
          alt="Enterprise data center infrastructure"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
          decoding="async"
        />
      </div>

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Content */}
      <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium tracking-[0.2em] uppercase text-white/80 border border-white/20 rounded-full mb-10 backdrop-blur-sm bg-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              ISO-Certified Global Technology Partner
            </span>
          </motion.div>

          {/* Split-line headline with character reveal */}
          <h1 className="mb-8 perspective-[1000px]">
            {["Scale", "Your", "IT Service"].map((word, i) => (
              <motion.div key={word} variants={charReveal} className="overflow-hidden">
                <span
                  className={`block font-display font-bold tracking-tight leading-[0.95] ${
                    i === 2
                      ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-slate-50"
                      : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white"
                  }`}
                >
                  {word}
                </span>
              </motion.div>
            ))}
            <motion.div variants={charReveal} className="overflow-hidden mt-2">
              <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white/60 font-display font-medium tracking-normal">
                Enterprise IT Services Without the Offshore Friction.
              </span>
            </motion.div>
          </h1>

          <motion.p
            variants={fadeUp}
            className="text-base lg:text-lg text-white/60 max-w-lg leading-relaxed mb-10"
          >
            Access elite engineering pods backed by military-grade security
            compliance and a zero-scope-creep delivery guarantee.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Book a Technical Architecture Review
                <ArrowRight size={16} />
              </Link>
            </MagneticButton>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              See How We Deliver
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={fadeUp}
            className="mt-12 sm:mt-16 flex flex-wrap gap-6 sm:gap-8 border-t border-white/10 pt-6 sm:pt-8"
          >
            {[
              { value: "99.9%", label: "Uptime SLA" },
              { value: "48h", label: "Deployment" },
              { value: "100%", label: "Certified" },
            ].map((stat) => (
              <div key={stat.label}>
                <motion.span
                  className="block text-2xl font-display font-bold text-primary"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-xs text-white/50 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-white/40" size={24} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
