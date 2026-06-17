import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Globe,
  Layers,
  Rocket,
  Shield,
  Cpu,
  Code2,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { containerVariants, itemVariants } from "@/lib/animations";
import { Progress } from "@/components/ui/progress";
import { portfolioSeoData } from "@/data/seo/portfolioSeo";
import {
  heroStats,
  caseStudies,
  productEcosystem,
  productRoadmap,
  prototypes,
  internalTools,
  webClients,
  webCategories,
  processSteps,
  type CaseStudy,
  type WebClient,
} from "@/data/portfolioData";

/* ──────────── Tabs ──────────── */
const tabs = ["Enterprise Software", "Web & Digital", "Products & Innovation"] as const;
type TabKey = (typeof tabs)[number];

/* ──────────── Hero ──────────── */
const PortfolioHero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl"
        >
          <motion.p variants={itemVariants} className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">
            Portfolio
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6"
          >
            Our IT Service Work <span className="text-primary">Speaks</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-12">
            From custom ERPs to AI-powered platforms — real results for real enterprises across 5 countries.
          </motion.p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4"
        >
          {heroStats.map((s) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl p-5 text-center"
            >
              <span className="block font-display text-2xl sm:text-3xl font-bold text-primary">{s.value}</span>
              <span className="text-xs text-muted-foreground mt-1 block">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────── Case Study Card ──────────── */
const CaseStudyCard = ({ study, index }: { study: CaseStudy; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: index * 0.1, type: "spring", stiffness: 80, damping: 20 }}
    className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition-colors"
  >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">{study.sector}</span>
      </div>
      <h3 className="font-display text-xl font-bold text-foreground mb-1">{study.client}</h3>
      <p className="text-sm font-medium text-primary mb-3">{study.product}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{study.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {study.tags.map((t) => (
          <span key={t} className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-secondary text-secondary-foreground">
            {t}
          </span>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {study.metrics.map((m) => (
          <div key={m.metric} className="bg-background rounded-lg p-3 border border-border">
            <span className="block text-xs text-muted-foreground">{m.metric}</span>
            <span className="block text-sm font-bold text-foreground">{m.result}</span>
          </div>
        ))}
      </div>
    </motion.div>
);

/* ──────────── Enterprise Software Tab ──────────── */
const EnterpriseSoftwareTab = () => {
  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-12"
      >
        {productEcosystem.map((p) => (
          <motion.div
            key={p.id}
            variants={itemVariants}
            className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-colors"
          >
            <span className="block text-xs text-primary font-bold mb-1">{p.id}</span>
            <span className="block text-sm font-semibold text-foreground">{p.name}</span>
            <span className="block text-[11px] text-muted-foreground mt-0.5">{p.desc}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Case studies */}
      <div className="grid md:grid-cols-2 gap-6">
        {caseStudies.map((s, i) => (
          <CaseStudyCard key={`case-${i}`} study={s} index={i} />
        ))}
      </div>
    </div>
  );
};

/* ──────────── Web & Digital Tab ──────────── */
const WebDigitalTab = ({ initialCategory }: { initialCategory?: string }) => {
  const [filter, setFilter] = useState(initialCategory && webCategories.includes(initialCategory) ? initialCategory : "All");
  const filtered = filter === "All" ? webClients : webClients.filter((c) => c.category === filter);

  return (
    <div>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {webCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              filter === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        key={filter}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {filtered.map((c, i) => (
          <WebClientCard key={`${c.title}-${c.sector}`} client={c} index={i} />
        ))}
      </motion.div>
    </div>
  );
};

const WebClientCard = ({ client, index }: { client: WebClient; index: number }) => (
  <motion.div
    variants={itemVariants}
    className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all hover:shadow-lg"
  >
    <div className="flex items-start justify-between mb-2">
      <h4 className="font-display text-base font-bold text-foreground">
        {client.title}
      </h4>
      <ExternalLink size={14} className="text-muted-foreground/30 mt-1 flex-shrink-0" />
    </div>
    <span className="text-xs text-muted-foreground block mb-3">{client.region}</span>
    <div className="flex items-center gap-2 mb-3">
      <span className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-primary/10 text-primary">{client.sector}</span>
      <span className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-secondary text-secondary-foreground">
        {client.category}
      </span>
    </div>
    <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">{client.outcome}</p>
  </motion.div>
);

/* ──────────── Products & Innovation Tab ──────────── */
const ProductsTab = () => {
  return (
    <div>
      <h3 className="font-display text-xl font-bold text-foreground mb-6">2026 Product Roadmap</h3>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid md:grid-cols-3 gap-6 mb-12"
      >
        {productRoadmap.map((p) => (
          <motion.div
            key={p.name}
            variants={itemVariants}
            className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  p.progress === 100
                    ? "bg-green-500/10 text-green-600"
                    : p.progress >= 75
                      ? "bg-yellow-500/10 text-yellow-600"
                      : "bg-primary/10 text-primary"
                }`}
              >
                {p.status}
              </span>
              <span className="text-sm font-bold text-foreground">{p.progress}%</span>
            </div>
            <Progress value={p.progress} className="h-2 mb-4" />
            <h4 className="font-display text-base font-bold text-foreground mb-2">{p.name}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Prototypes */}
      <h3 className="font-display text-xl font-bold text-foreground mb-6">Heavy Working Prototypes</h3>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {prototypes.map((p) => (
          <div key={p.name} className="bg-card border border-border rounded-2xl p-6">
            <Cpu size={20} className="text-primary mb-3" />
            <h4 className="font-display text-base font-bold text-foreground mb-2">{p.name}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>

      {/* Internal Tools */}
      <h3 className="font-display text-xl font-bold text-foreground mb-6">Internal Tools</h3>
      <div className="space-y-4">
        {internalTools.map((t) => (
          <div key={t.name} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">{t.name}</span>
              <span className="text-xs font-bold text-primary">{t.progress}%</span>
            </div>
            <Progress value={t.progress} className="h-1.5" />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ──────────── Process Timeline ──────────── */
const ProcessTimeline = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={itemVariants} className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Our Development Process
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {processSteps.map((s) => (
              <motion.div
                key={s.step}
                variants={itemVariants}
                className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary/30 transition-colors relative"
              >
                <span className="inline-block w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm leading-10 mb-3">
                  {s.step}
                </span>
                <h4 className="text-sm font-semibold text-foreground mb-1">{s.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────── CTA ──────────── */
const PortfolioCTA = () => {
  return (
    <section className="py-20 md:py-28 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to see your project here?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            No sales reps. No scripts. Senior engineers who understand your challenges — from day one.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Schedule a Discovery Call <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────── Main Page ──────────── */
const Portfolio = () => {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabKey) || "Enterprise Software";
  const initialCategory = searchParams.get("category") || undefined;
  const [activeTab, setActiveTab] = useState<TabKey>(
    tabs.includes(initialTab) ? initialTab : "Enterprise Software"
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={portfolioSeoData.title}
        description={portfolioSeoData.description}
        canonical={portfolioSeoData.canonical}
        keywords={portfolioSeoData.keywords}
        ogDescription={portfolioSeoData.ogDescription}
        ogImageAlt={portfolioSeoData.ogImageAlt}
        twitterDescription={portfolioSeoData.twitterDescription}
        jsonLd={portfolioSeoData.jsonLd}
      />
      <Navbar />
      <PortfolioHero />
      <ProcessTimeline />

      {/* Tab section */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Tab buttons */}
          <div className="relative flex flex-wrap gap-2 mb-10 p-1.5 bg-muted/50 rounded-xl border border-border">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activePortfolioTab"
                    className="absolute inset-0 bg-primary rounded-lg shadow-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "Enterprise Software" && <EnterpriseSoftwareTab />}
          {activeTab === "Web & Digital" && <WebDigitalTab initialCategory={initialCategory} />}
          {activeTab === "Products & Innovation" && <ProductsTab />}
        </div>
      </section>

      <PortfolioCTA />
      <Footer />
    </div>
  );
};

export default Portfolio;
