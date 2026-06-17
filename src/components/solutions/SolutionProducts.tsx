import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    title: "Cybaem CRM Ace | Pro",
    category: "Sales & CRM",
    readTime: "AI-Powered",
    description: "Intelligent CRM with predictive lead scoring, automated pipeline management, and AI-driven customer insights.",
    image: "/images/product-card-1.avif",
  },
  {
    title: "Project Management Tool",
    category: "Operations",
    readTime: "Enterprise",
    description: "Smart task automation, resource allocation, and milestone tracking with real-time collaboration for distributed teams.",
    image: "/images/product-card-2.avif",
  },
  {
    title: "Document Management System",
    category: "DMS",
    readTime: "Secure",
    description: "AI-powered document search, classification, version control, and compliance-ready audit trails for enterprise content.",
    image: "/images/product-card-3.avif",
  },
  {
    title: "ITSM Tool",
    category: "IT Service",
    readTime: "24/7",
    description: "Complete IT service management with automated ticketing, SLA tracking, change management, and self-service portal.",
    image: "/images/product-card-4.avif",
  },
  {
    title: "Site Engineer Ecosystem",
    category: "Field Ops",
    readTime: "Mobile-First",
    description: "Field operations platform for site engineers with real-time reporting, asset tracking, and offline-capable mobile access.",
    image: "/images/product-card-5.avif",
  },
  {
    title: "HR Management System",
    category: "People",
    readTime: "Scalable",
    description: "End-to-end HR platform covering recruitment, onboarding, payroll, performance reviews, and compliance management.",
    image: "/images/product-card-6.avif",
  },
];

const stats = [
  { value: "99.9%", label: "uptime SLA", description: "Uninterrupted enterprise-grade reliability." },
  { value: "48-hour", label: "resource deployment", description: "Certified experts, deployed in 48 hours." },
];

const SolutionProducts = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 400;
    el.scrollBy({ left: direction === "left" ? -cardWidth - 24 : cardWidth + 24, behavior: "smooth" });
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] max-w-3xl text-foreground">
              ISO-certified. Zero scope creep.{" "}
              <span className="text-primary">Always secure.</span>
            </h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8">
              {["Explore", "Deploy", "Secure"].map((tab, i) => (
                <button
                  key={tab}
                  className={`text-[10px] sm:text-xs font-semibold tracking-[0.12em] uppercase px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-300 whitespace-nowrap ${
                    i === 0
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Navigation arrows – hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontally scrolling cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-12 overflow-x-auto"
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {products.map((product, i) => (
          <motion.div
            key={product.title}
            data-card
            className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] group"
            style={{ scrollSnapAlign: "start" }}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.08 }}
          >
            <Link to="#" className="block h-full">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-3 sm:mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.15em] uppercase text-primary line-clamp-1">
                  {product.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40 flex-shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.1em] uppercase text-muted-foreground line-clamp-1">
                  {product.readTime}
                </span>
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {product.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                {product.description}
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                Details
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        ))}

        {/* Stats cards */}
        {stats.map((stat) => (
          <div
            key={stat.label}
            data-card
            className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] flex flex-col justify-center"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="glass-panel rounded-2xl p-8 h-full flex flex-col justify-center">
              <span className="font-display text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </span>
              <span className="font-display text-lg font-semibold text-foreground mb-3">
                {stat.label}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SolutionProducts;
