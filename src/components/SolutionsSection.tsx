import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Globe, Users, Shield, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const solutions = [
  {
    icon: Code,
    title: "Enterprise Custom Software",
    outcome: "Break operational bottlenecks and scale faster.",
    capability:
      "We engineer robust custom ERPs, CRMs, and complex API integrations. Built with scalable architecture and automated workflows that perfectly map to your internal processes.",
    cta: "Explore Software Solutions",
    slug: "enterprise-software",
    image: "/images/product-card-1.avif",
    number: "01",
  },
  {
    icon: Globe,
    title: "High-Performance Web Systems",
    outcome: "Digital platforms that convert, delivered on deadline.",
    capability:
      "From immersive corporate portals to high-traffic E-commerce and PWA architectures, we design secure, lightning-fast web systems with strict milestone-driven delivery.",
    cta: "Explore Web Systems",
    slug: "web-systems",
    image: "/images/product-card-2.avif",
    number: "02",
  },
  {
    icon: Users,
    title: "Elite IT Staff Augmentation",
    outcome: "Bypass local talent shortages and scale your team instantly.",
    capability:
      "Seamlessly integrate pre-vetted Cloud Architects, DevOps Engineers, and Full-Stack Developers into your existing workflows in as little as 48 hours.",
    cta: "Deploy an Engineer",
    slug: "it-staff-augmentation",
    image: "/images/product-card-3.avif",
    number: "03",
  },
  {
    icon: Shield,
    title: "Managed IT & Cloud Security",
    outcome: "24/7 infrastructure resilience and Zero-Trust protection.",
    capability:
      "We provide comprehensive NOC support, seamless AWS/Azure cloud migrations, and proactive threat monitoring to ensure your operations never go down.",
    cta: "Secure Your Infrastructure",
    slug: "managed-it-cloud-security",
    image: "/images/product-card-4.avif",
    number: "04",
  },
  {
    icon: TrendingUp,
    title: "Digital Revenue & Growth",
    outcome: "Turn your digital presence into a predictable B2B lead engine.",
    capability:
      "Dominate international search results through advanced AEO/GEO optimization, CRO, and targeted executive LinkedIn thought leadership strategies.",
    cta: "Scale Your Revenue",
    slug: "digital-revenue-growth",
    image: "/images/product-card-5.avif",
    number: "05",
  },
];

const SolutionsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = solutions[activeIndex];

  return (
    <section id="solutions" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 24 }}
          className="mb-16 lg:mb-20"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-4">
            Solutions Matrix
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-foreground max-w-3xl">
            Our IT Service Solutions.{" "}
            <span className="text-primary">One Bulletproof Partner.</span>
          </h2>
        </motion.div>

        {/* Desktop: Split layout — left tabs, right showcase */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-0 min-h-[520px]">
          {/* Left: Vertical tab list */}
          <div className="col-span-5 flex flex-col justify-center pr-2">
            {solutions.map((sol, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.button
                  key={sol.slug}
                  onClick={() => setActiveIndex(i)}
                  className={`relative text-left w-full py-5 px-6 rounded-xl transition-colors duration-300 group ${
                    isActive
                      ? "bg-card"
                      : "bg-transparent hover:bg-card/50"
                  }`}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.65,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeLine"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-10 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-muted-foreground/60 w-6">
                      {sol.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-display text-lg font-bold leading-snug transition-colors duration-300 ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {sol.title}
                      </h3>
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="text-sm text-primary font-medium mt-1 overflow-hidden"
                          >
                            {sol.outcome}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <sol.icon
                      size={20}
                      className={`shrink-0 transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-muted-foreground/40"
                      }`}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Showcase panel */}
          <div className="col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, x: 40, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
                className="rounded-2xl overflow-hidden border border-border/60 bg-card h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={active.image}
                    alt={active.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={700}
                    height={224}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute top-5 right-5">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
                      {active.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <active.icon size={20} className="text-primary" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground">
                        {active.title}
                      </h3>
                    </div>
                    <p className="text-primary text-sm font-semibold mb-3">
                      {active.outcome}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {active.capability}
                    </p>
                  </div>

                  <Link
                    to={`/solutions/${active.slug}`}
                    className="mt-8 inline-flex items-center gap-2.5 text-sm font-semibold text-foreground hover:text-primary transition-colors group/link"
                  >
                    {active.cta}
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: Stacked cards */}
        <div className="lg:hidden space-y-4">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.06 }}
              className="rounded-xl border border-border/60 bg-card overflow-hidden"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={sol.image}
                  alt={sol.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={400}
                  height={144}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/90 flex items-center justify-center">
                    <sol.icon size={18} className="text-primary-foreground" />
                  </div>
                </div>
                <span className="absolute top-3 right-4 text-xs font-mono text-muted-foreground/60">
                  {sol.number}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  {sol.title}
                </h3>
                <p className="text-primary text-sm font-medium mb-2">{sol.outcome}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {sol.capability}
                </p>
                <Link
                  to={`/solutions/${sol.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {sol.cta}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
