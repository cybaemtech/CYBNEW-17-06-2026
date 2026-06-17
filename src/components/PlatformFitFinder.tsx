import { useState, useRef, ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, RotateCcw, Check,
  Building2, ShoppingCart, Rocket, Palette, Megaphone,
  Inbox, Banknote, Layers, Users, Award,
  Sprout, Blocks, RefreshCcw, Zap,
  Lightbulb, TrendingUp, Server, Landmark, HelpCircle,
  Globe, BarChart3, Code2, PenTool, Target, GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";
import { MagneticButton } from "@/components/Navbar";
import { containerVariants, itemVariants } from "@/lib/animations";

/* ─── Quiz Data ─── */

interface QuizQuestion {
  number: string;
  text: string;
  sub: string;
  options: { value: string; icon: ReactNode; title: string; desc: string }[];
  cols1?: boolean;
}

const ICON_SIZE = 24;
const ICON_STROKE = 1.75;

const questions: QuizQuestion[] = [
  {
    number: "Question 01 / 04",
    text: "What are you building?",
    sub: "Pick the option closest to your project — this shapes everything we recommend.",
    options: [
      { value: "corporate", icon: <Building2 size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Business Website", desc: "Company site to showcase services and generate leads" },
      { value: "ecommerce", icon: <ShoppingCart size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Online Store", desc: "Sell products with payments and catalog" },
      { value: "startup", icon: <Rocket size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "SaaS / App", desc: "Build a platform users log into" },
      { value: "creative", icon: <Palette size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Portfolio / Personal", desc: "Showcase work or create content" },
      { value: "landing", icon: <Megaphone size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Landing Page", desc: "High-conversion campaign or single-page site" },
      { value: "ngo", icon: <GraduationCap size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "NGO / Educational / Trust", desc: "Informational site for nonprofits, schools, or trusts" },
    ],
  },
  {
    number: "Question 02 / 04",
    text: "What is the primary outcome you want from this platform?",
    sub: "Focus on the #1 outcome you want the website to drive.",
    options: [
      { value: "leads", icon: <Inbox size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Generate Leads", desc: "Capture inquiries and build your sales pipeline" },
      { value: "sales", icon: <Banknote size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Drive Sales", desc: "Sell products/services with online payments" },
      { value: "product", icon: <Layers size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Deliver a Product", desc: "Users log in and use your platform" },
      { value: "audience", icon: <Users size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Grow Audience", desc: "Attract traffic via content and SEO" },
      { value: "credibility", icon: <Award size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Build Authority", desc: "Showcase expertise and build trust" },
    ],
  },
  {
    number: "Question 03 / 04",
    text: "Where are you starting from?",
    sub: "This shapes how we'd approach your build.",
    options: [
      { value: "none", icon: <Sprout size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Starting Fresh", desc: "No existing website or product" },
      { value: "basic", icon: <Blocks size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Basic Site / MVP Exists", desc: "Simple site or prototype that needs a proper build" },
      { value: "old", icon: <RefreshCcw size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Needs Complete Rebuild", desc: "Current system is outdated or not scalable" },
      { value: "upgrade", icon: <Zap size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Improve & Scale Existing", desc: "Add features, improve performance, or scale" },
    ],
  },
  {
    number: "Question 04 / 04",
    text: "What level of investment are you comfortable with?",
    sub: "This helps us recommend the right scope and approach for your budget.",
    options: [
      { value: "starter", icon: <Lightbulb size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Starter (₹50K – ₹1.5L)", desc: "Simple sites, landing pages, MVPs" },
      { value: "growth", icon: <TrendingUp size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Growth (₹1.5L – ₹5L)", desc: "Business websites, small apps" },
      { value: "advanced", icon: <Server size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Advanced (₹5L – ₹15L)", desc: "Custom platforms, dashboards, integrations" },
      { value: "enterprise", icon: <Landmark size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Enterprise (₹15L+)", desc: "Complex systems, high-scale architecture" },
      { value: "unsure", icon: <HelpCircle size={ICON_SIZE} strokeWidth={ICON_STROKE} />, title: "Not sure yet", desc: "Need help deciding based on requirements" },
    ],
  },
];

interface ResultData {
  icon: ReactNode;
  tag: string;
  title: string;
  headline: string;
  highlightedText: string;
  desc: string;
  features: string[];
  timeline: string[];
}

const RESULT_ICON = 28;

const results: Record<string, ResultData> = {
  corporate_credibility: {
    icon: <Building2 size={RESULT_ICON} strokeWidth={1.5} />, tag: "Your Recommendation", title: "High-Authority Corporate Platform",
    headline: "You need a platform that ", highlightedText: "commands trust",
    desc: "Enterprise buyers decide in seconds. Your platform needs impeccable design, lightning load times, and a content architecture that positions your firm as the definitive choice in your category. We'd build this on a headless CMS stack with performance-first engineering.",
    features: ["Executive-grade UI/UX", "Case study & credibility engine", "Enterprise SEO architecture", "Multi-team CMS workflow", "Performance SLA commitment", "LinkedIn/CRM integration"],
    timeline: ["Discovery & Strategy Workshop", "UI/UX Design & Review", "Development & CMS Setup", "QA, SEO & Launch"],
  },
  ecommerce_sales: {
    icon: <ShoppingCart size={RESULT_ICON} strokeWidth={1.5} />, tag: "Your Recommendation", title: "Conversion-Optimised E-commerce Platform",
    headline: "You need a platform where every page ", highlightedText: "earns its keep",
    desc: "Revenue-first architecture: optimised product pages, frictionless checkout, abandoned cart flows, and analytics baked in from day one. We engineer for conversion rate, not just aesthetics — every element has a job to do.",
    features: ["Advanced product catalogue", "One-click checkout flow", "Cart abandonment recovery", "Inventory & order management", "Mobile-first responsive UI", "Payment gateway integration"],
    timeline: ["Catalogue & UX Planning", "Design & Conversion Architecture", "Build & Integration Phase", "Testing, GTM & Launch"],
  },
  startup_product: {
    icon: <Rocket size={RESULT_ICON} strokeWidth={1.5} />, tag: "Your Recommendation", title: "SaaS / Web Application Platform",
    headline: "You need an app platform ", highlightedText: "built to scale",
    desc: "Scalable frontend + backend architecture, user authentication, role-based access, and a clean API layer your product will grow on. We approach SaaS builds as infrastructure investments — every technical decision is made with 10x growth in mind.",
    features: ["Auth & role-based access", "API-first architecture", "Dashboard & analytics UI", "Subscription & billing logic", "CI/CD pipeline setup", "Scalable cloud infrastructure"],
    timeline: ["Product Architecture Review", "Design System & Prototyping", "Core Feature Development", "Beta, Feedback & Launch"],
  },
  creative_leads: {
    icon: <PenTool size={RESULT_ICON} strokeWidth={1.5} />, tag: "Your Recommendation", title: "Portfolio & Lead-Generation Platform",
    headline: "Your work deserves a platform that ", highlightedText: "does the selling for you",
    desc: "A beautifully crafted platform that showcases your best work, communicates your process, and converts visitors into clients without you lifting a finger. We design for the feeling a prospect gets — and the action they take.",
    features: ["Portfolio with case studies", "Lead capture & nurture flow", "Personal brand storytelling", "SEO-optimised structure", "Fast-load gallery system", "Enquiry & booking flow"],
    timeline: ["Brand & Direction Session", "Design Concepts & Review", "Build & Content Integration", "Review, Polish & Launch"],
  },
  landing_leads: {
    icon: <Target size={RESULT_ICON} strokeWidth={1.5} />, tag: "Your Recommendation", title: "High-Conversion Landing Page",
    headline: "You need a page that ", highlightedText: "turns traffic into action",
    desc: "A single-page powerhouse engineered for one job: conversion. Every section, headline, and CTA is tested and optimised to move visitors from curiosity to commitment. We pair persuasive copy architecture with performance engineering.",
    features: ["A/B test-ready structure", "Conversion-optimised layout", "Speed-first engineering", "Analytics & heatmap ready", "Mobile-perfect design", "CRM & email integration"],
    timeline: ["Goal & Audience Mapping", "Copy & Design Sprint", "Build & Optimise", "Launch & Iterate"],
  },
};

const defaultResult: ResultData = {
  icon: <Globe size={RESULT_ICON} strokeWidth={1.5} />, tag: "Your Recommendation", title: "Custom Web Platform",
  headline: "You need a ", highlightedText: "purpose-built platform",
  desc: "Based on your inputs, we'd recommend a consultation first — your combination of goals and context suggests a custom approach is the right move. Cybaem specialises in exactly these kinds of non-standard builds.",
  features: ["Custom architecture planning", "Goal-aligned UX design", "Performance-first development", "Analytics from day one", "Scalable infrastructure", "Dedicated project team"],
  timeline: ["Discovery & Requirements", "Architecture & Design", "Development & Testing", "Launch & Optimisation"],
};

/* ─── Component ─── */

const PlatformFitFinder = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const selectOption = (questionIdx: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionIdx]: value }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else setShowResult(true);
  };

  const prevStep = () => {
    if (showResult) {
      setShowResult(false);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const getResult = (): ResultData => {
    const key = `${answers[0]}_${answers[1]}`;
    return results[key] || defaultResult;
  };

  const currentDisabled = answers[step] === undefined;
  const result = getResult();

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-[760px] mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium tracking-[0.08em] uppercase text-primary bg-primary/10 border border-primary/25 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Platform Fit Finder
            </span>
            <h2 className="font-display text-3xl lg:text-[44px] font-bold leading-[1.15] tracking-tight">
              Discover your <span className="text-primary italic">perfect</span>
              <br /> web platform in 60 seconds
            </h2>
            <p className="text-muted-foreground mt-3.5 max-w-[480px] mx-auto">
              Answer 4 quick questions. Get a tailored platform recommendation built around your actual business goals.
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-9">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-[3px] flex-1 rounded transition-colors duration-400 relative overflow-hidden ${
                  showResult || i < step
                    ? "bg-primary/40"
                    : i === step && !showResult
                    ? "bg-primary"
                    : "bg-border"
                }`}
              >
                {i === step && !showResult && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/40 to-transparent animate-[shimmer_1.5s_infinite]" />
                )}
              </div>
            ))}
            <span className="text-xs text-muted-foreground whitespace-nowrap font-medium tracking-wide min-w-[60px] text-right">
              {showResult ? "Complete ✓" : `Step ${step + 1} of 4`}
            </span>
          </motion.div>

          {/* Card */}
          <motion.div
            variants={itemVariants}
            className="glass-panel rounded-[20px] p-8 sm:p-10 relative overflow-hidden"
          >
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={`q-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-primary mb-2.5">
                    {questions[step].number}
                  </p>
                  <h3 className="font-display text-lg sm:text-2xl font-bold mb-2">
                    {questions[step].text}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-7">
                    {questions[step].sub}
                  </p>

                  <div className={`grid gap-3 ${questions[step].cols1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
                    {questions[step].options.map((opt) => {
                      const isSelected = answers[step] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => selectOption(step, opt.value)}
                          className={`flex items-start gap-3.5 text-left rounded-[14px] p-[18px_20px] border-[1.5px] transition-all duration-250 hover:-translate-y-0.5 ${
                            isSelected
                              ? "border-primary bg-primary/10 shadow-[0_0_0_1px_hsl(var(--primary)/0.2),0_8px_24px_hsl(var(--primary)/0.1)]"
                              : "border-border/50 bg-foreground/[0.03] hover:border-primary/35 hover:bg-primary/[0.06]"
                          }`}
                        >
                          {/* Checkbox */}
                          <div
                            className={`w-5 h-5 rounded-[6px] border-[1.5px] mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                              isSelected ? "bg-primary border-primary" : "border-foreground/20"
                            }`}
                          >
                            {isSelected && <Check size={11} className="text-primary-foreground" strokeWidth={3} />}
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">{opt.icon}</div>
                          <div className="flex-1">
                            <p className="font-display text-sm font-bold mb-1">{opt.title}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{opt.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Nav */}
                  <div className="flex items-center justify-between mt-8 gap-3">
                    {step > 0 ? (
                      <button
                        onClick={prevStep}
                        className="flex items-center gap-2 px-5 py-3 text-sm text-muted-foreground border border-border rounded-[10px] hover:border-foreground/20 hover:text-foreground transition-all"
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                    ) : (
                      <div />
                    )}
                    <button
                      onClick={nextStep}
                      disabled={currentDisabled}
                      className="flex items-center gap-2 px-7 py-3 text-sm font-display font-bold bg-primary text-primary-foreground rounded-[10px] ml-auto transition-all hover:-translate-y-px hover:shadow-[0_8px_20px_hsl(var(--primary)/0.3)] disabled:opacity-35 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                      {step === 3 ? "See My Fit" : "Continue"} <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/12 border-[1.5px] border-primary/30 flex items-center justify-center shrink-0 text-primary">
                      {result.icon}
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.08em] uppercase font-semibold text-primary mb-1">{result.tag}</p>
                      <p className="font-display text-xl font-extrabold">{result.title}</p>
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-[30px] font-extrabold leading-[1.25] mb-3.5">
                    {result.headline}<span className="text-primary italic">{result.highlightedText}</span>
                  </h3>
                  <p className="text-[15px] text-muted-foreground leading-[1.7] mb-7">
                    {result.desc}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                    {result.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 bg-foreground/[0.03] border border-border rounded-[10px] px-3.5 py-3 text-[13px]">
                        <div className="w-[7px] h-[7px] rounded-full bg-primary shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Timeline */}
                  <div className="bg-primary/5 border border-primary/15 rounded-[14px] p-5 mb-7">
                    <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-primary mb-3">
                      Typical Build Roadmap
                    </p>
                    <div className="space-y-2">
                      {result.timeline.map((t, i) => (
                        <div key={i} className="flex items-center gap-3 text-[13px]">
                          <div className="w-[22px] h-[22px] rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                            {i + 1}
                          </div>
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <MagneticButton>
                      <Link
                        to="/contact"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 text-[15px] font-display font-bold bg-primary text-primary-foreground rounded-xl hover:-translate-y-0.5 hover:shadow-[0_10px_28px_hsl(var(--primary)/0.35)] transition-all"
                      >
                        Book a Free Strategy Session <ArrowRight size={16} />
                      </Link>
                    </MagneticButton>
                    <button
                      onClick={reset}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-display font-semibold border border-border rounded-xl hover:border-foreground/25 hover:bg-foreground/[0.04] transition-all"
                    >
                      <RotateCcw size={14} /> Start Over
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trust strip */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 sm:gap-7 mt-7 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">⚡ 0.8s average load time</span>
            <span className="flex items-center gap-1.5">🔐 Enterprise-grade security</span>
            <span className="flex items-center gap-1.5">📊 3x average conversion lift</span>
            <span className="flex items-center gap-1.5">✅ 200+ platforms delivered</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformFitFinder;
