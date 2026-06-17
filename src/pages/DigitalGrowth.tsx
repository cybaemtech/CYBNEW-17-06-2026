import { useEffect, useRef } from "react";
import SEOHead from "@/components/SEOHead";
import { solutionsSeoData } from "@/data/seo/solutionsSeo";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Search,
  Target,
  BarChart3,
  Briefcase,
  Mail,
  Rocket,
  Database,
  LineChart,
  Brain,
  ChevronDown,
  Monitor,
  Package,
  TrendingUp,
  Settings,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { MagneticButton } from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolutionFAQ from "@/components/solutions/SolutionFAQ";
import heroImg from "@/assets/digital-growth-hero.jpg";
import systemImg from "@/assets/digital-growth-system.jpg";
import techImg from "@/assets/digital-growth-tech.jpg";

/* ── animation helpers ── */
const charReveal = {
  hidden: { opacity: 0, y: 60, rotateX: 40 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring" as const, stiffness: 100, damping: 18 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const staggerFast = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

/* ── Section wrapper with scroll-reveal ── */
const RevealSection = ({
  children,
  className = "",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className={`${dark ? "bg-foreground text-background" : ""} ${className}`}>
      <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
        {children}
      </motion.div>
    </section>
  );
};

/* ── Animated counter ── */
const Counter = ({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <motion.span
        className="block text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
      >
        {end}
        {suffix}
      </motion.span>
      <span className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground mt-1 block">{label}</span>
    </div>
  );
};

/* ── Check item ── */
const Check = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <motion.div variants={fadeUp} className="flex items-start gap-3">
    <CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${dark ? "text-primary" : "text-primary"}`} />
    <span className={`text-sm sm:text-base leading-relaxed ${dark ? "text-background/80" : "text-muted-foreground"}`}>
      {children}
    </span>
  </motion.div>
);

/* ── Service card ── */
const ServiceCard = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <motion.div
    variants={fadeUp}
    className="glass-panel rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 group"
  >
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      <Icon size={20} className="text-primary" />
    </div>
    <h4 className="font-display font-semibold text-base mb-2 text-foreground">{title}</h4>
    <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
  </motion.div>
);

/* ── Flow step ── */
const FlowStep = ({ label, index, total }: { label: string; index: number; total: number }) => (
  <motion.div variants={fadeUp} className="flex items-center gap-2 sm:gap-3">
    <span className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm sm:text-base whitespace-nowrap">
      {label}
    </span>
    {index < total - 1 && <ArrowRight size={18} className="text-primary shrink-0" />}
  </motion.div>
);

/* ══════════════════════════════════════════════ */
/*                   PAGE                        */
/* ══════════════════════════════════════════════ */

const DigitalGrowth = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const overlayOp = useTransform(scrollYProgress, [0, 0.5], [0.45, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const faqs = [
    {
      question: "What makes CybaemTech different from other digital marketing agencies in India?",
      answer:
        "CybaemTech is not just a digital marketing agency in India — we operate as a Digital Revenue & Growth Engineering partner. Instead of offering isolated services like SEO or Google Ads, we integrate SEO, Performance Marketing, Conversion Rate Optimization (CRO), LinkedIn Marketing, and Marketing Automation into one measurable revenue system. Our focus is ROI, lead quality, and predictable pipeline growth.",
    },
    {
      question: "Do you provide B2B lead generation services?",
      answer:
        "Yes. We specialize in B2B lead generation services in India using advanced SEO (AEO, GEO, SXO), LinkedIn marketing for B2B, performance-driven Google Ads management, and marketing automation workflows. We focus on generating decision-maker leads, not just traffic.",
    },
    {
      question: "How do you reduce cost per lead (CPL)?",
      answer:
        "We reduce cost per lead by targeting high-intent keywords through SEO services, optimizing landing pages using CRO, improving ad targeting in Google Ads and LinkedIn Ads, implementing retargeting strategies, and automating lead nurturing. This ensures better lead quality and higher conversion rates.",
    },
    {
      question: "Do you offer performance marketing services for D2C brands?",
      answer:
        "Yes. As a performance marketing agency in India, we provide full-funnel strategies for D2C brands including Google Ads & Meta Ads management, E-commerce SEO, Conversion rate optimization, Customer retention automation, and Advanced analytics and attribution tracking. Our goal is sustainable scaling with improved ROAS and lower CAC.",
    },
    {
      question: "What industries do you work with?",
      answer:
        "We work with IT & SaaS Companies, Manufacturing & Industrial Businesses, Real Estate Developers, Education & EdTech, Healthcare & Clinics, E-commerce & D2C Brands, and Consultants & Professional Services.",
    },
    {
      question: "Do you provide marketing automation services?",
      answer:
        "Yes. We provide marketing automation services including CRM integration (Zoho, HubSpot, Salesforce), Lead scoring, Email workflows, Abandoned cart automation, Sales funnel automation, and Customer retention campaigns.",
    },
    {
      question: "How long does it take to see results?",
      answer:
        "SEO services typically show measurable improvements within 3–6 months. Performance marketing campaigns can generate leads within the first 30–60 days. However, our focus is long-term revenue stability, not short-term spikes.",
    },
    {
      question: "Do you offer a free digital growth audit?",
      answer:
        "Yes. We offer a Free Digital Growth Audit that includes SEO analysis, Paid ad performance review, Conversion gap analysis, LinkedIn authority assessment, and Automation opportunities. You can book it directly from our landing page.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={solutionsSeoData["digital-revenue-growth"].metaTitle}
        description={solutionsSeoData["digital-revenue-growth"].metaDescription}
        canonical="/solutions/digital-revenue-growth"
        keywords={solutionsSeoData["digital-revenue-growth"].keywords}
        ogTitle={solutionsSeoData["digital-revenue-growth"].ogTitle}
        ogDescription={solutionsSeoData["digital-revenue-growth"].ogDescription}
        ogImageAlt={solutionsSeoData["digital-revenue-growth"].ogImageAlt}
        twitterTitle={solutionsSeoData["digital-revenue-growth"].twitterTitle}
        twitterDescription={solutionsSeoData["digital-revenue-growth"].twitterDescription}
        jsonLd={solutionsSeoData["digital-revenue-growth"].jsonLdSchemas}
      />
      <Navbar />

      {/* ═══ 1. HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden flex items-center">
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <img
            src={heroImg}
            alt="Revenue growth analytics dashboard"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30"
          style={{ opacity: overlayOp }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <motion.div
          className="container mx-auto px-4 sm:px-5 lg:px-12 relative z-10 pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-16"
          style={{ y: contentY }}
        >
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-4xl">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-medium tracking-[0.2em] uppercase text-white/80 border border-white/20 rounded-full mb-6 sm:mb-8 backdrop-blur-sm bg-white/5">
                <Rocket size={14} className="text-primary" /> Digital Revenue & Growth Engineering
              </span>
            </motion.div>

            <h1 className="mb-4 sm:mb-6 perspective-[1000px]">
              {["Your Traffic Is Not", "the Problem."].map((line) => (
                <motion.div key={line} variants={charReveal} className="overflow-hidden">
                  <span className="block font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-[1.1] sm:leading-[0.95] text-white">
                    {line}
                  </span>
                </motion.div>
              ))}
              <motion.div variants={charReveal} className="overflow-hidden mt-2 sm:mt-3">
                <span className="block font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-[1.1] sm:leading-[0.95] text-primary bg-slate-300 px-2 sm:px-0">
                  Your Revenue System Is!
                </span>
              </motion.div>
            </h1>

            <motion.p variants={fadeUp} className="text-sm sm:text-base lg:text-lg text-white/60 max-w-2xl leading-relaxed mb-6 sm:mb-8">
              You're investing in SEO services, running Google Ads, posting on LinkedIn, maybe even working with a
              digital marketing agency. Yet…
            </motion.p>

            <motion.div variants={staggerFast} className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-8 sm:mb-10 max-w-2xl">
              {[
                "Leads are inconsistent.",
                "Sales cycles are long.",
                "Customer acquisition cost is rising.",
                "Revenue feels unpredictable.",
              ].map((p) => (
                <motion.div
                  key={p}
                  variants={fadeUp}
                  className="flex items-center gap-2 text-white/70 text-xs sm:text-sm lg:text-base"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {p}
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto justify-center sm:justify-start"
                >
                  Book a Free Strategy Call <ArrowRight size={16} />
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-white/40" size={24} />
        </motion.div>
      </section>

      {/* ═══ 2. SYSTEM PROBLEM STATEMENT ═══ */}
      <RevealSection className="section-border py-12 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-5 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                That's not a traffic issue. <span className="text-primary">That's a system issue.</span>
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-4 sm:space-y-6">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
                At CybaemTech – Digital Revenue & Growth Engineering, we design structured, AI-powered,
                performance-driven revenue systems for B2B, B2C, and D2C brands in India.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
                Not isolated marketing campaigns.{" "}
                <span className="text-foreground font-semibold">Integrated growth architecture.</span>
              </p>
              <img
                src={systemImg}
                alt="Growth system visualization"
                className="rounded-lg sm:rounded-xl w-full object-cover max-h-48 sm:max-h-64 mt-4 sm:mt-6"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ═══ 3. B2B SECTION — Pain Points ═══ */}
      <RevealSection className="py-12 sm:py-20 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-5 lg:px-12">
          <motion.div variants={fadeUp} className="mb-8 sm:mb-10">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-2 sm:mb-3 block">
              For B2B Companies
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              IT Services, SaaS, Manufacturing, Consulting, Real Estate, Education
            </h2>
          </motion.div>

          <motion.div variants={staggerFast} className="max-w-2xl">
            <motion.h3 variants={fadeUp} className="font-display text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              What You're Probably Facing
            </motion.h3>
            <div className="space-y-3 sm:space-y-4">
              {[
                "Website traffic but low B2B lead generation",
                "Poor quality enquiries from Google Ads",
                "Weak LinkedIn marketing presence",
                "Long sales cycle with no automated follow-up",
                "High cost per lead",
                "CRM data not being fully utilized",
              ].map((p) => (
                <motion.div key={p} variants={fadeUp} className="flex items-start gap-2 sm:gap-3 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-destructive mt-1.5 sm:mt-2 shrink-0" />
                  <span className="text-xs sm:text-sm lg:text-base">{p}</span>
                </motion.div>
              ))}
            </div>
            <motion.p variants={fadeUp} className="mt-4 sm:mt-6 font-display text-base sm:text-lg font-semibold text-foreground">
              You don't need more leads. You need{" "}
              <span className="text-primary">qualified pipeline and predictable revenue growth.</span>
            </motion.p>
          </motion.div>
        </div>
      </RevealSection>

      {/* ═══ 3b. B2B SECTION — Solutions Orbit ═══ */}
      <RevealSection className="py-12 sm:py-20 lg:py-32 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-5 lg:px-12">
          <motion.div variants={fadeUp} className="mb-8 sm:mb-10">
            <motion.h3 variants={fadeUp} className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
              How CybaemTech Solves It
            </motion.h3>
            <motion.p variants={fadeUp} className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-xl">
              We act as your Growth Marketing Partner, not just another digital marketing agency in India.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-8 items-center">
            {/* Orbital Animation */}
            <motion.div
              variants={fadeUp}
              className="relative flex items-center justify-center min-h-[280px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[520px]"
            >
              {/* Orbit rings - scaled for mobile */}
              {[
                { size: 80, delay: 0 },
                { size: 130, delay: 0.002 },
                { size: 180, delay: 0.004 },
              ].map((orbit) => (
                <motion.div
                  key={orbit.size}
                  className="absolute rounded-full border border-primary/15"
                  style={{ width: orbit.size * 2, height: orbit.size * 2 }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: orbit.delay, duration: 0.8 }}
                />
              ))}

              {/* Center hub */}
              <motion.div
                className="absolute z-10 w-16 sm:w-24 md:w-28 h-16 sm:h-24 md:h-28 rounded-full bg-primary flex items-center justify-center shadow-xl"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
              >
                <span className="text-primary-foreground font-display font-bold text-[10px] sm:text-xs md:text-sm text-center leading-tight px-2">
                  Growth
                  <br />
                  Engine
                </span>
              </motion.div>

              {/* Orbiting solution nodes */}
              {[
                { icon: Search, label: "SEO", radius: 80, duration: 22, start: 0 },
                { icon: Target, label: "Ads", radius: 80, duration: 22, start: 180 },
                { icon: BarChart3, label: "CRO", radius: 130, duration: 30, start: 60 },
                { icon: Briefcase, label: "LinkedIn", radius: 130, duration: 30, start: 200 },
                { icon: Mail, label: "Automation", radius: 180, duration: 38, start: 30 },
                { icon: Brain, label: "AI Analytics", radius: 180, duration: 38, start: 150 },
                { icon: Settings, label: "CRM", radius: 180, duration: 38, start: 270 },
              ].map((node) => {
                const startRad = (node.start * Math.PI) / 180;
                const keyframes = 60;
                const xFrames = Array.from({ length: keyframes + 1 }, (_, i) => {
                  const angle = startRad + (i / keyframes) * Math.PI * 2;
                  return Math.cos(angle) * node.radius;
                });
                const yFrames = Array.from({ length: keyframes + 1 }, (_, i) => {
                  const angle = startRad + (i / keyframes) * Math.PI * 2;
                  return Math.sin(angle) * node.radius;
                });
                return (
                  <motion.div
                    key={node.label}
                    className="absolute flex flex-col items-center gap-0.5 sm:gap-1"
                    style={{ left: "50%", top: "50%", marginLeft: -16, marginTop: -16 }}
                    animate={{ x: xFrames, y: yFrames }}
                    transition={{
                      duration: node.duration,
                      repeat: Infinity,
                      ease: "linear",
                      times: Array.from({ length: keyframes + 1 }, (_, i) => i / keyframes),
                    }}
                  >
                    <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center shadow-md">
                      <node.icon size={14} className="sm:hidden text-primary" />
                      <node.icon size={18} className="hidden sm:block md:hidden text-primary" />
                      <node.icon size={20} className="hidden md:block text-primary" />
                    </div>
                    <span className="text-[8px] sm:text-[10px] md:text-xs font-semibold text-foreground whitespace-nowrap">
                      {node.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Solution cards */}
            <motion.div variants={staggerFast} className="space-y-3 sm:space-y-4">
              <ServiceCard icon={Search} title="Advanced SEO (AEO, GEO, SXO)">
                Strategic B2B SEO services targeting decision-stage keywords to improve search rankings and inbound
                enquiries.
              </ServiceCard>
              <ServiceCard icon={Target} title="Performance Marketing & Google Ads">
                Intent-based campaigns focused on conversion — not vanity clicks.
              </ServiceCard>
              <ServiceCard icon={BarChart3} title="Conversion Rate Optimization">
                Landing page optimization, UX improvement, heatmap analysis, CTA testing, funnel refinement.
              </ServiceCard>
              <ServiceCard icon={Briefcase} title="LinkedIn Marketing for B2B">
                Executive profile optimization + authority content strategy to influence buying decisions.
              </ServiceCard>
              <ServiceCard icon={Mail} title="Marketing Automation Services">
                Lead nurturing workflows, CRM integration (Zoho, HubSpot, Salesforce), email automation, lead scoring.
              </ServiceCard>
            </motion.div>
          </div>

          {/* Result box */}
          <motion.div variants={fadeUp} className="mt-10 sm:mt-14 glass-panel rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8">
            <h4 className="font-display font-bold text-base sm:text-lg mb-3 sm:mb-4">Result:</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {["Higher lead quality", "Lower cost per acquisition (CPA)", "Shorter sales cycle", "Measurable ROI"].map(
                (r) => (
                  <div key={r} className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                    <CheckCircle2 size={16} className="text-primary shrink-0" /> {r}
                  </div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </RevealSection>

      {/* ═══ 4. B2C SECTION ═══ */}
      <RevealSection className="section-border py-12 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-5 lg:px-12">
          <motion.div variants={fadeUp} className="mb-8 sm:mb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-2 sm:mb-3 block">
              For B2C Brands
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Education, Healthcare, Local Businesses, Service Providers
            </h2>
          </motion.div>

          <motion.div variants={staggerFast} className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {[
              '"We get clicks but no sales."',
              '"People add to cart but don\'t buy."',
              '"Ad costs are increasing."',
              '"Customers don\'t come back."',
            ].map((q) => (
              <motion.p
                key={q}
                variants={fadeUp}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display italic text-muted-foreground leading-snug"
              >
                {q}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mb-8 sm:mb-12">
            <p className="text-sm sm:text-base lg:text-lg text-foreground font-semibold mb-1 sm:mb-2">
              You're spending money. But not building long-term growth.
            </p>
            <p className="text-primary font-display font-bold text-base sm:text-lg">
              Your business might be a classic victim of Revenue Leakage!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <motion.div variants={staggerFast}>
              <h3 className="font-display text-lg sm:text-xl font-bold mb-4 sm:mb-6">Our Performance Marketing System</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                As a performance marketing agency in India, we build:
              </p>
              <div className="space-y-2 sm:space-y-3">
                {[
                  "Funnel-based Google & Meta ads",
                  "Landing page conversion optimization",
                  "Checkout & form optimization",
                  "Retargeting campaigns",
                  "Email lifecycle automation",
                  "Data-driven analytics & reporting",
                ].map((i) => (
                  <Check key={i}>{i}</Check>
                ))}
              </div>
            </motion.div>
            <motion.div variants={staggerFast}>
              <h3 className="font-display text-lg sm:text-xl font-bold mb-4 sm:mb-6">We Focus On</h3>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <Counter end={4} suffix="x" label="Improved ROAS" />
                <Counter end={35} suffix="%" label="Higher AOV" />
                <Counter end={60} suffix="%" label="Less Cart Abandonment" />
                <Counter end={3} suffix="x" label="Customer Retention" />
              </div>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ═══ 5. D2C SECTION ═══ */}
      <RevealSection className="py-20 lg:py-32" dark>
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div variants={fadeUp} className="mb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-white mb-3 block">For D2C Brands</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-background">
              E-commerce, Consumer Products, Fashion, Wellness, Tech
            </h2>
          </motion.div>

          <motion.div variants={staggerFast} className="mb-12">
            <motion.h3 variants={fadeUp} className="font-display text-xl font-bold text-background/90 mb-6">
              What's Happening in the Market
            </motion.h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Customer acquisition cost is rising.",
                "Paid ads are becoming competitive.",
                "Organic visibility is weak.",
                "Retention is low.",
              ].map((c) => (
                <motion.div key={c} variants={fadeUp} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-background/70 text-sm sm:text-base">{c}</span>
                </motion.div>
              ))}
            </div>
            <motion.p variants={fadeUp} className="mt-8 text-background/80 text-base lg:text-lg">
              If sales drop when ads stop —{" "}
              <span className="text-yellow font-semibold">
                you don't have a growth engine. You have paid dependency.
              </span>
            </motion.p>
          </motion.div>

          <motion.h3 variants={fadeUp} className="font-display text-xl font-bold text-background/90 mb-8">
            How We Help D2C Brands Scale Sustainably
          </motion.h3>
          <motion.div variants={staggerFast} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ServiceCard icon={Search} title="E-commerce SEO & Product Visibility">
              Optimized category pages + long-tail search targeting.
            </ServiceCard>
            <ServiceCard icon={Target} title="D2C Performance Marketing">
              Full-funnel ad strategy: Awareness → Consideration → Conversion.
            </ServiceCard>
            <ServiceCard icon={Package} title="Conversion Rate Optimization">
              Product page testing, speed optimization, checkout refinement.
            </ServiceCard>
            <ServiceCard icon={Mail} title="Retention & Automation">
              Post-purchase email flows, upsell automation, customer lifecycle marketing.
            </ServiceCard>
            <ServiceCard icon={LineChart} title="Advanced Analytics & Attribution">
              AI-powered data tracking to understand what truly drives revenue.
            </ServiceCard>
          </motion.div>
        </div>
      </RevealSection>

      {/* ═══ 6. GROWTH TECH STACK ═══ */}
      <RevealSection className="section-border py-20 lg:py-32">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              Our Growth Tech Stack
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              We Integrate Strategy With Technology
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="glass-panel rounded-xl p-6 sm:p-8">
              <h3 className="font-display font-bold text-lg mb-6">Tools We Use</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Google Analytics 4 (GA4)",
                  "Google Tag Manager",
                  "Google Ads",
                  "LinkedIn Ads",
                  "Meta Ads",
                  "Zoho CRM",
                  "HubSpot",
                  "Salesforce",
                  "Conversion APIs",
                  "Heatmap & UX Tools",
                  "AI Analytics Dashboards",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <img
                src={techImg}
                alt="Marketing tech dashboard"
                className="rounded-xl w-full object-cover max-h-48 mt-6"
                loading="lazy"
              />
            </motion.div>
            <motion.div variants={staggerFast} className="glass-panel rounded-xl p-6 sm:p-8">
              <h3 className="font-display font-bold text-lg mb-6">What This Delivers</h3>
              <div className="space-y-4">
                {[
                  { icon: Database, label: "Data-backed insights" },
                  { icon: Monitor, label: "Performance marketing clarity" },
                  { icon: TrendingUp, label: "Revenue-focused optimization" },
                  { icon: Settings, label: "Continuous improvement cycles" },
                ].map((d) => (
                  <motion.div key={d.label} variants={fadeUp} className="flex items-center gap-4 text-base">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <d.icon size={18} className="text-primary" />
                    </div>
                    <span className="font-medium">{d.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ═══ 7. WHY CHOOSE CYBAEMTECH ═══ */}
      <RevealSection className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              Why Businesses Choose CybaemTech
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
              Most agencies execute tasks. We engineer systems.
            </h2>
          </motion.div>

          {/* Flow diagram */}
          <motion.div
            variants={staggerFast}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16"
          >
            {["Traffic", "Conversion", "Authority", "Automation", "Revenue"].map((s, i) => (
              <FlowStep key={s} label={s} index={i} total={5} />
            ))}
          </motion.div>

          <motion.div variants={staggerFast} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            <ServiceCard icon={Search} title="SEO Services in India">
              AEO, GEO, SXO strategies for sustainable organic growth.
            </ServiceCard>
            <ServiceCard icon={Target} title="Google Ads Management">
              Intent-driven campaigns with precision targeting.
            </ServiceCard>
            <ServiceCard icon={Briefcase} title="LinkedIn Marketing">
              Executive thought leadership and B2B authority building.
            </ServiceCard>
            <ServiceCard icon={BarChart3} title="Conversion Rate Optimization">
              Data-driven UX and funnel optimization.
            </ServiceCard>
            <ServiceCard icon={Mail} title="Marketing Automation">
              End-to-end nurture flows and CRM integration.
            </ServiceCard>
            <ServiceCard icon={Brain} title="AI-Powered Tracking">
              Advanced analytics for revenue attribution.
            </ServiceCard>
          </motion.div>

          <motion.p variants={fadeUp} className="text-center text-lg font-display font-semibold text-muted-foreground">
            Clear strategy. Transparent reporting. <span className="text-primary">ROI-first execution.</span>
          </motion.p>
        </div>
      </RevealSection>

      {/* ═══ 8. IF THIS SOUNDS LIKE YOU ═══ */}
      <RevealSection className="section-border py-20 lg:py-32">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12 text-center max-w-3xl">
          <motion.div variants={staggerFast}>
            {[
              "You're serious about growth.",
              "You want measurable returns.",
              "You want fewer random activities and more predictable revenue.",
            ].map((line) => (
              <motion.p
                key={line}
                variants={fadeUp}
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-4"
              >
                {line}
              </motion.p>
            ))}
            <motion.p variants={fadeUp} className="mt-8 text-lg text-muted-foreground">
              Then it's time to move from <span className="line-through">marketing</span> to{" "}
              <span className="text-primary font-bold">Digital Revenue & Growth Engineering.</span>
            </motion.p>
          </motion.div>
        </div>
      </RevealSection>

      {/* ═══ 9. CTA BANNER ═══ */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Let's Build Your Revenue Engine
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition-opacity"
              >
                Book a Free Strategy Call <ArrowRight size={16} />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold border-2 border-primary-foreground text-primary-foreground rounded-lg hover:bg-primary-foreground/10 transition-colors"
              >
                Get a Free Digital Growth Audit <ArrowRight size={16} />
              </Link>
            </MagneticButton>
          </div>
          <p className="text-sm text-primary-foreground/70">
            CybaemTech – Your Performance-Driven Growth Marketing Partner in India.
          </p>
        </div>
      </section>

      {/* ═══ 10. FAQ ═══ */}
      <SolutionFAQ faqs={faqs} title="Digital Revenue & Growth" />

      {/* ═══ 11. FOOTER ═══ */}
      <Footer />
    </div>
  );
};

export default DigitalGrowth;
