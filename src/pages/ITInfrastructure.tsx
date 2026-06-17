import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight, ArrowRight, CheckCircle2, Server, Shield, Cloud,
  Network, Monitor, Lightbulb, Phone, MessageSquare, ChevronLeft,
  ChevronRight, Building2, Heart, GraduationCap, ShoppingCart, Home,
  Factory, Landmark, Truck, Star, Cpu, HardDrive, Users, BarChart3,
  ClipboardList, Wrench, RefreshCw, Briefcase, TrendingUp, Award,
  Zap, Clock, Activity,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { MagneticButton } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import partnerAws from "@/assets/partners/aws.svg";
import partnerMicrosoft from "@/assets/partners/microsoft.svg";
import partnerDell from "@/assets/partners/dell.svg";
import partnerHp from "@/assets/partners/hp.svg";
import partnerLenovo from "@/assets/partners/lenovo.svg";
import partnerAzure from "@/assets/partners/azure.svg";
import partnerFortinet from "@/assets/partners/fortinet.svg";
import partnerSophos from "@/assets/partners/sophos.jpg";
import partnerTataTele from "@/assets/partners/tata-tele.png";
import partnerEset from "@/assets/partners/eset.svg";
import partnerRedington from "@/assets/partners/redington.png";
import itInfrastructureBg from "@/assets/it-infrastructure-bg.png";

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const staggerFast = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

/* ── Reveal wrapper ── */
const Reveal = ({ children, className = "", dark = false }: {
  children: React.ReactNode; className?: string; dark?: boolean;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <section ref={ref} className={`${dark ? "bg-foreground text-background" : ""} ${className}`}>
      <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
        {children}
      </motion.div>
    </section>
  );
};

const partners = [
  { src: partnerMicrosoft, alt: "Microsoft" }, { src: partnerAws, alt: "AWS" },
  { src: partnerAzure, alt: "Azure" }, { src: partnerDell, alt: "Dell" },
  { src: partnerHp, alt: "HP" }, { src: partnerLenovo, alt: "Lenovo" },
  { src: partnerFortinet, alt: "Fortinet" }, { src: partnerSophos, alt: "Sophos" },
  { src: partnerTataTele, alt: "Tata Tele" }, { src: partnerEset, alt: "ESET" },
  { src: partnerRedington, alt: "Redington" },
];

const serviceCards = [
  {
    icon: Server, title: "Managed IT & Support", slug: "managed-it",
    color: "from-blue-500 to-blue-700",
    bullets: ["24×7 Monitoring", "Helpdesk & End-User Support", "ITIL Processes"],
  },
  {
    icon: Shield, title: "Cybersecurity & Data Protection", slug: "cybersecurity",
    color: "from-red-500 to-rose-700",
    bullets: ["Threat Detection", "Endpoint Security", "Data Backup & DR"],
  },
  {
    icon: Cloud, title: "Cloud, Server & Productivity", slug: "cloud",
    color: "from-violet-500 to-purple-700",
    bullets: ["Microsoft 365", "Cloud Infrastructure", "Virtualization"],
  },
  {
    icon: Network, title: "Network & Connectivity", slug: "network",
    color: "from-emerald-500 to-teal-700",
    bullets: ["Wi-Fi & LAN", "SD-WAN Solutions", "24×7 Monitoring"],
  },
  {
    icon: HardDrive, title: "Device, Asset & Procurement", slug: "devices",
    color: "from-amber-500 to-orange-700",
    bullets: ["IT Asset Management", "Lifecycle Management", "Vendor Management"],
  },
  {
    icon: Lightbulb, title: "IT Consulting & Strategy", slug: "consulting",
    color: "from-sky-500 to-blue-700",
    bullets: ["Digital Transformation", "IT Roadmap", "Governance & Risk"],
  },
];

const engagementModels = [
  {
    title: "Fully Managed IT", badge: "ALL-INCLUSIVE", badgeColor: "bg-blue-100 text-blue-700",
    desc: "We manage your entire IT environment end-to-end.",
    best: "SMEs & Startups", icon: Server,
  },
  {
    title: "Co-Managed IT", badge: "MOST POPULAR", badgeColor: "bg-primary/10 text-primary",
    desc: "Extend your internal IT team with our expertise and 24×7 support.",
    best: "50–500 Users", icon: Users, highlight: true,
  },
  {
    title: "AMC (Annual Contract)", badge: null, badgeColor: "",
    desc: "Reliable maintenance and support for your existing infrastructure.",
    best: "Existing IT Setups", icon: ClipboardList,
  },
  {
    title: "Project-Based", badge: null, badgeColor: "",
    desc: "One-time projects delivered with precision and speed.",
    best: "Specific Initiatives", icon: Wrench,
  },
  {
    title: "On-Demand Support", badge: null, badgeColor: "",
    desc: "Get expert help when you need it — no long-term commitment.",
    best: "Ad-hoc Requirements", icon: Phone,
  },
];

const outcomes = [
  { value: "99.9%", label: "Uptime Achieved", icon: Activity },
  { value: "40%", label: "Avg. Cost Savings", icon: TrendingUp },
  { value: "15 min", label: "Avg. Response Time", icon: Clock },
  { value: "65%", label: "Faster Issue Resolution", icon: Zap },
  { value: "200+", label: "Happy Clients", icon: Users },
];

const processSteps = [
  { step: "01", title: "Assess", desc: "We evaluate your current infrastructure, risks, and gaps.", icon: BarChart3 },
  { step: "02", title: "Design", desc: "We design a tailored solution aligned with your business goals.", icon: Lightbulb },
  { step: "03", title: "Onboard", desc: "Smooth onboarding with documentation, tools, and alignment.", icon: RefreshCw },
  { step: "04", title: "Manage", desc: "Proactive management, monitoring & support 24×7.", icon: Monitor },
  { step: "05", title: "Optimize", desc: "Continuous improvement through insights and innovation.", icon: TrendingUp },
];

const industries = [
  { icon: Factory, label: "Manufacturing" }, { icon: Heart, label: "Healthcare" },
  { icon: GraduationCap, label: "Education" }, { icon: ShoppingCart, label: "Retail" },
  { icon: Home, label: "Real Estate" }, { icon: Building2, label: "Construction" },
  { icon: Landmark, label: "Financial Services" }, { icon: Truck, label: "Logistics" },
  { icon: Star, label: "Hospitality" }, { icon: Briefcase, label: "Professional Services" },
  { icon: Building2, label: "Government" }, { icon: Cpu, label: "IT Companies" },
];

const faqs = [
  { q: "What are Managed IT Services?", a: "Managed IT Services means outsourcing the day-to-day management of your IT infrastructure — monitoring, maintenance, support, and security — to Cybaem Tech for a fixed monthly fee." },
  { q: "What is included in an IT AMC?", a: "Our AMCs cover preventive maintenance, scheduled health checks, hardware & software maintenance, security updates, performance tuning, and priority support for desktops, laptops, servers, networks, firewalls, and storage." },
  { q: "Do you provide both remote and onsite support?", a: "Yes. Most issues are resolved instantly through secure remote support, and our engineers provide onsite assistance whenever physical intervention is needed." },
  { q: "Can you work alongside our existing IT team?", a: "Absolutely. Our Co-Managed IT model supplements your internal team with 24×7 monitoring, specialist skills, and extra capacity during peak demand." },
  { q: "How quickly do you respond to issues?", a: "Response times are defined in your SLA. Critical incidents receive immediate attention — typical response within 15–30 minutes." },
  { q: "Which locations do you serve?", a: "Headquartered in Pune (Hinjawadi), we serve clients across India with remote-first support that extends to international clients." },
  { q: "How much do Managed IT Services cost?", a: "Pricing depends on users, devices, servers, and service level. We offer per-user and per-device monthly models. Most clients save 30–40% vs. in-house IT." },
];

/* ════════ SVG Progress Ring ════════ */
const ProgressRing = ({ pct }: { pct: number }) => {
  const r = 44, circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" className="-rotate-90">
      <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
      <circle cx="55" cy="55" r={r} fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1.5s ease" }}
      />
    </svg>
  );
};

/* ════════════════ HERO ════════════════ */
const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const inView = useInView(heroRef, { once: true });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOp = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.92]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden flex items-center">
      {/* Parallax BG */}
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <img src={itInfrastructureBg} alt="IT Infrastructure" className="w-full h-full object-cover object-center" loading="eager" />
      </motion.div>
      <motion.div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" style={{ opacity: overlayOp }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <motion.div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10 pt-28 sm:pt-36 pb-12" style={{ y: contentY }}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — copy */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium tracking-[0.2em] uppercase text-white/80 border border-white/20 rounded-full mb-7 backdrop-blur-sm bg-white/5">
                <Server size={13} className="text-primary" /> Managed IT & Infrastructure Services
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-display font-bold leading-[1.05] text-white mb-5">
              <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">IT Infrastructure Services</span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mt-1">Built for Performance.</span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-primary italic bg-slate-100 w-fit mt-1">Backed by Experts.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-sm sm:text-base text-white/65 leading-relaxed max-w-lg mb-8">
              Reliable, secure, and scalable IT infrastructure management that keeps your business running — always.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              <MagneticButton>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
                  Get Free Assessment <ArrowRight size={15} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a href="#managed-it" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">
                  Explore Solutions <ChevronRight size={15} />
                </a>
              </MagneticButton>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Award, value: "ISO 27001", label: "Certified" },
                { icon: Monitor, value: "24×7", label: "NOC & Support" },
                { icon: Clock, value: "15 Min", label: "Response Time" },
                { icon: Users, value: "200+", label: "Clients Across India" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2.5 px-3 py-3 rounded-xl bg-white/8 backdrop-blur-sm border border-white/10">
                  <s.icon size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="font-display text-sm font-bold text-white leading-none">{s.value}</p>
                    <p className="text-[10px] text-white/45 mt-0.5 leading-tight">{s.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — "Your IT, Optimized" card */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            className="hidden lg:flex justify-end"
          >
            <div className="relative w-[300px] xl:w-[330px] rounded-3xl border border-white/15 bg-white/8 backdrop-blur-xl p-7 shadow-2xl">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/50 mb-5">Your IT, Optimized</p>

              {/* Ring */}
              <div className="flex items-center gap-5 mb-6">
                <div className="relative shrink-0">
                  <ProgressRing pct={98.7} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-2xl font-bold text-white leading-none">98.7%</span>
                  </div>
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-white leading-snug">Infrastructure Uptime</p>
                  <p className="text-[11px] text-white/45 mt-0.5">Last 90 Days</p>
                </div>
              </div>

              {/* Feature list */}
              <div className="space-y-3 border-t border-white/10 pt-5">
                {["24×7 Monitoring", "Proactive Threat Detection", "SLA-Backed Support", "Predictable Costs"].map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-white/75">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

/* ════════════════ LOGOS STRIP ════════════════ */
const LogosStrip = () => (
  <div className="bg-card border-y border-border/30 py-6 overflow-hidden">
    <p className="text-center text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-4">
      Trusted by 200+ Businesses Across India
    </p>
    <div className="relative">
      <div className="flex animate-marquee gap-12 items-center w-max">
        {[...partners, ...partners].map((p, i) => (
          <img key={i} src={p.src} alt={p.alt} className="h-8 sm:h-9 w-auto object-contain opacity-55 hover:opacity-85 transition-opacity grayscale" />
        ))}
      </div>
    </div>
  </div>
);

/* ════════════════ WHAT WE MANAGE ════════════════ */
const WhatWeManage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="py-16 sm:py-24 section-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>

          {/* Header row */}
          <motion.div variants={fadeUp} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2 block">Our Infrastructure Services</span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                What We Manage. <span className="text-primary italic">So You Can Focus.</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-sm leading-relaxed">
              Comprehensive IT management across your infrastructure stack with measurable outcomes and enterprise-grade reliability.
            </p>
          </motion.div>

          {/* Cards carousel */}
          <motion.div variants={fadeUp} className="relative">
            <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-none pb-2 sm:mx-6" style={{ scrollSnapType: "x mandatory" }}>
              {serviceCards.map((card) => (
                <a
                  key={card.slug}
                  href={`#${card.slug}`}
                  className="group shrink-0 w-[240px] sm:w-[260px] lg:w-[calc(16.666%-14px)] rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shrink-0 group-hover:scale-105 transition-transform`}>
                    <card.icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-foreground mb-3 leading-snug">{card.title}</h3>
                  <ul className="space-y-1.5 flex-1 mb-4">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={12} />
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

/* ════════════════ ENGAGEMENT MODELS ════════════════ */
/* ── Cube illustration image ── */
const CubeIllustration = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="w-full h-full flex items-center justify-center"
  >
    <motion.img
      src="/it-infrastructure-cubes.png"
      alt="IT Infrastructure Solutions"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="w-full h-full object-contain drop-shadow-2xl"
      style={{ filter: "drop-shadow(0 20px 48px rgba(59,130,246,0.35))" }}
    />
  </motion.div>
);

/* ── Small engagement card (mockup style) ── */
const EngCard = ({ model }: { model: typeof engagementModels[0] }) => (
  <div className={`rounded-2xl bg-background border p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${model.highlight ? "border-primary/40 ring-1 ring-primary/15" : "border-border/60"}`}>
    <div className="flex items-start justify-between gap-2 mb-2">
      <h3 className="font-display text-sm font-bold text-foreground leading-snug">{model.title}</h3>
      {model.badge && (
        <span className={`shrink-0 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap ${model.badgeColor}`}>
          {model.badge}
        </span>
      )}
    </div>
    <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">{model.desc}</p>
    <p className="text-[10px] text-muted-foreground/70">
      <span className="font-semibold text-foreground/50">Best for:</span>{" "}
      <span className="text-primary font-medium">{model.best}</span>
    </p>
  </div>
);

const EngagementSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  /* split cards for layout */
  const [fullyManaged, coManaged, amc, projectBased, onDemand] = engagementModels;

  return (
    <section id="engagement-models" ref={ref} className="py-14 sm:py-20 bg-background section-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>

          {/* ─── DESKTOP layout ─── */}
          <div className="hidden lg:flex items-start gap-0">

            {/* Title column */}
            <motion.div variants={fadeUp} className="shrink-0 w-[230px] xl:w-[260px] pr-6 pt-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">
                Flexible Engagement Models
              </span>
              <h2 className="font-display text-3xl xl:text-4xl font-bold leading-tight">
                Engagements That Fit{" "}
                <span className="text-primary italic">Your Business</span>
              </h2>
            </motion.div>

            {/* Cards + illustration area */}
            <div className="flex-1 min-w-0">
              {/* Grid: left-cards | illustration | right-cards */}
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">

                {/* Left cards column */}
                <motion.div variants={stagger} className="flex flex-col gap-4 justify-center py-6">
                  <motion.div variants={fadeUp}><EngCard model={fullyManaged} /></motion.div>
                  <motion.div variants={fadeUp}><EngCard model={coManaged} /></motion.div>
                </motion.div>

                {/* Center: animated illustration */}
                <motion.div variants={fadeUp} className="w-[300px] xl:w-[360px] shrink-0 h-[360px] xl:h-[420px]">
                  <CubeIllustration />
                </motion.div>

                {/* Right cards column */}
                <motion.div variants={stagger} className="flex flex-col gap-4 justify-center py-6">
                  <motion.div variants={fadeUp}><EngCard model={amc} /></motion.div>
                  <motion.div variants={fadeUp}><EngCard model={projectBased} /></motion.div>
                </motion.div>

              </div>

              {/* On-Demand support — bottom center */}
              <motion.div variants={fadeUp} className="flex justify-center -mt-2">
                <div className="w-[260px] xl:w-[300px]">
                  <EngCard model={onDemand} />
                </div>
              </motion.div>
            </div>

          </div>

          {/* ─── MOBILE / TABLET layout ─── */}
          <div className="lg:hidden">
            <motion.div variants={fadeUp} className="mb-8">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2 block">
                Flexible Engagement Models
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                Engagements That Fit{" "}
                <span className="text-primary italic">Your Business</span>
              </h2>
            </motion.div>

            {/* Illustration on mobile */}
            <motion.div variants={fadeUp} className="h-[220px] mb-6">
              <CubeIllustration />
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {engagementModels.map((m) => (
                <motion.div key={m.title} variants={fadeUp}>
                  <EngCard model={m} />
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

/* ════════════════ OUTCOMES ════════════════ */
const OutcomesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="py-16 sm:py-24 section-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2 block">Business Impact</span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                Outcomes That <span className="text-primary italic">Matter</span>
              </h2>
            </div>
            <MagneticButton>
              <Link to="/portfolio" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-border rounded-full text-foreground hover:bg-muted/50 transition-colors">
                See Our Case Studies <ArrowRight size={14} />
              </Link>
            </MagneticButton>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {outcomes.map((o) => (
              <motion.div key={o.label} variants={fadeUp}
                className="glass-panel rounded-2xl p-5 sm:p-6 border hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <o.icon size={20} className="text-primary" />
                </div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">{o.value}</p>
                <p className="text-xs text-muted-foreground leading-snug">{o.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ════════════════ 5-STEP PROCESS ════════════════ */
const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="py-16 sm:py-24 bg-[hsl(var(--card))] section-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2 block">Our Proven Process</span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight max-w-lg">
              A 5-Step Journey to Infrastructure{" "}
              <span className="text-primary italic">Excellence</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connector line — desktop only */}
            <div className="hidden lg:block absolute top-11 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {processSteps.map((s, i) => (
                <motion.div key={s.step} variants={fadeUp} className="relative">
                  <div className="glass-panel rounded-2xl p-5 border hover:border-primary/30 transition-colors h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 relative z-10">
                      <span className="font-display text-xs font-bold text-primary-foreground">{s.step}</span>
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground mb-1.5">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-1">
                      <ChevronRight size={16} className="text-primary/40 rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ════════════════ INDUSTRIES + FAQ ════════════════ */
const IndustriesFAQ = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="py-16 sm:py-24 section-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left: Industries */}
            <div>
              <motion.span variants={fadeUp} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2 block">
                Industries We Serve
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3">
                Industry-Aware{" "}
                <span className="text-primary italic">IT Solutions</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm text-muted-foreground leading-relaxed mb-8">
                We understand the compliance, uptime, and security demands unique to each sector.
              </motion.p>
              <motion.div variants={staggerFast} className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {industries.map((ind) => (
                  <motion.div key={ind.label} variants={fadeUp}
                    className="glass-panel rounded-xl p-3 flex flex-col items-center text-center gap-2 border hover:border-primary/30 hover:-translate-y-0.5 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <ind.icon size={16} className="text-primary" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-muted-foreground leading-tight">{ind.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: FAQ + sidebar */}
            <div>
              <motion.span variants={fadeUp} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2 block">
                Frequently Asked Questions
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-6">
                IT Infrastructure —{" "}
                <span className="text-primary italic">Answered</span>
              </motion.h2>

              <motion.div variants={fadeUp}>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="glass-panel rounded-xl px-4 border">
                      <AccordionTrigger className="text-left font-display font-semibold text-sm hover:no-underline py-4">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ════════════════ SERVICE SECTIONS (anchor targets) ════════════════ */
const serviceGroups = [
  {
    id: "managed-it", icon: Server, number: "01",
    title: "Managed IT & Support", subtitle: "Your complete outsourced IT department",
    color: "from-blue-600 to-blue-800",
    services: [
      { name: "Managed IT Services", desc: "Dedicated IT team proactively monitoring, maintaining, and supporting your complete IT environment.", bullets: ["End-to-end infrastructure management", "24×7 monitoring & vendor coordination", "IT documentation & performance optimization"], outcome: "Up to 30–40% reduction in IT operating costs." },
      { name: "IT Support (L1 / L2 / L3)", desc: "Multi-tier support model ensuring the right expert handles every issue.", bullets: ["Level 1 — Basic user support", "Level 2 — Advanced troubleshooting", "Level 3 — Infrastructure & server escalations"] },
      { name: "Annual Maintenance Contract (AMC)", desc: "Flexible AMC plans covering preventive maintenance and priority support.", bullets: ["Desktop, laptop, server & network AMC", "Hardware health checks & software upkeep", "Priority response & scheduled visits"] },
      { name: "Helpdesk & ITSM", desc: "Process-driven helpdesk built on ITSM best practices.", bullets: ["Ticket & incident management", "SLA management with escalation matrix", "Monthly performance reporting"] },
    ],
  },
  {
    id: "cybersecurity", icon: Shield, number: "02",
    title: "Cybersecurity & Data Protection", subtitle: "Layered defense for perimeter, endpoints, email, and data",
    color: "from-red-600 to-rose-800",
    services: [
      { name: "Cybersecurity Services", desc: "Layered protection against ransomware, phishing, and advanced attacks.", bullets: ["EDR/MDR deployment", "Security audits & vulnerability assessments", "Zero Trust implementation"] },
      { name: "Firewall & Network Security", desc: "Enterprise-grade firewall management — install, configure, and monitor.", bullets: ["Firewall installation & configuration", "VPN & IDS/IPS management", "Sophos, Fortinet, SonicWall, Cisco, Palo Alto"] },
      { name: "Data Backup & Disaster Recovery", desc: "Automated backup and DR solutions ensuring critical data is always protected.", bullets: ["Server, cloud, M365 & endpoint backup", "DR planning & BCP", "Recovery testing & high-availability architectures"] },
      { name: "Patch Management", desc: "Keep every system updated, secure, and compliant automatically.", bullets: ["Windows, server & firmware patches", "Vulnerability remediation & compliance updates"] },
    ],
  },
  {
    id: "cloud", icon: Cloud, number: "03",
    title: "Cloud, Server & Productivity", subtitle: "Modern, scalable computing from M365 to Azure",
    color: "from-violet-600 to-purple-800",
    services: [
      { name: "Microsoft 365 & Email", desc: "Deploy, secure, and manage the complete M365 ecosystem.", bullets: ["M365 deployment, migration & license management", "Exchange Online, Teams, SharePoint & OneDrive admin", "DKIM, SPF & DMARC configuration"] },
      { name: "Cloud Infrastructure", desc: "Plan, migrate, secure, and optimize cloud environments.", bullets: ["Microsoft Azure & Google Workspace", "Cloud migration, security & monitoring", "Hybrid cloud & cost optimization"] },
      { name: "Server Management", desc: "Keep servers secure, optimized, and always available.", bullets: ["Windows & Linux administration", "Active Directory & domain controller management", "Security hardening & 24×7 monitoring"] },
    ],
  },
  {
    id: "network", icon: Network, number: "04",
    title: "Network & Connectivity", subtitle: "Fast, secure, always-on connectivity",
    color: "from-emerald-600 to-teal-800",
    services: [
      { name: "Network Infrastructure", desc: "Design, implement, and manage fast, secure, highly available networks.", bullets: ["LAN/WAN implementation & structured cabling", "Enterprise wireless, router & switch configuration", "VPN & SD-WAN connectivity"] },
      { name: "24×7 Infrastructure Monitoring", desc: "Monitoring platform identifying and resolving issues before they impact operations.", bullets: ["Servers, networks, storage & applications", "Security events & cloud workloads", "Performance monitoring with proactive alerting"] },
    ],
  },
  {
    id: "devices", icon: HardDrive, number: "05",
    title: "Device, Asset & Procurement", subtitle: "Complete control of your hardware fleet",
    color: "from-amber-600 to-orange-700",
    services: [
      { name: "Device Lifecycle Management", desc: "Complete lifecycle for every user device — procurement to retirement.", bullets: ["Procurement, deployment & OS installation", "Hardware upgrades & device security", "Warranty management & end-of-life disposal"] },
      { name: "IT Asset Management", desc: "Full visibility and control over all IT assets.", bullets: ["Asset inventory & hardware/software tracking", "License & warranty management", "Audits, compliance reporting & lifecycle"] },
      { name: "Vendor & ISP Management", desc: "One call handles all your technology vendors and ISPs.", bullets: ["ISP coordination & vendor management", "Warranty claims & escalation handling", "Procurement coordination & license renewals"] },
    ],
  },
  {
    id: "consulting", icon: Lightbulb, number: "06",
    title: "IT Consulting & Strategy", subtitle: "Senior-level technology guidance",
    color: "from-sky-600 to-blue-700",
    services: [
      { name: "IT Consulting & Digital Transformation", desc: "Strategic consulting aligning IT with business goals.", bullets: ["IT infrastructure assessment & audits", "IT roadmap planning & digital transformation", "Cloud strategy, cybersecurity strategy & compliance readiness"] },
    ],
  },
];

const ServiceSections = () => (
  <>
    {serviceGroups.map((group, i) => {
      const isEven = i % 2 === 0;
      return (
        <ServiceGroup key={group.id} group={group} dark={!isEven} />
      );
    })}
  </>
);

const ServiceGroup = ({ group, dark }: { group: typeof serviceGroups[0]; dark: boolean }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section id={group.id} ref={ref} className={`scroll-mt-32 py-16 sm:py-20 section-border ${dark ? "bg-[hsl(var(--card))]" : ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8 sm:mb-10">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center shrink-0`}>
              <group.icon size={24} className="text-white" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-0.5 block">Service Group {group.number}</span>
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">{group.title}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{group.subtitle}</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Accordion type="multiple" className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {group.services.map((svc, si) => (
                <AccordionItem key={si} value={`${group.id}-${si}`} className="glass-panel rounded-2xl px-4 sm:px-5 border">
                  <AccordionTrigger className="text-left font-display font-semibold text-sm sm:text-base hover:no-underline py-4">
                    <span className="flex items-center gap-3">
                      <span className="text-xs font-bold text-primary/50 shrink-0">{String(si + 1).padStart(2, "0")}</span>
                      {svc.name}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{svc.desc}</p>
                    <ul className="space-y-1.5">
                      {svc.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary" /> {b}
                        </li>
                      ))}
                    </ul>
                    {svc.outcome && (
                      <div className="mt-4 p-3 rounded-xl bg-primary/8 border border-primary/15">
                        <p className="text-xs font-semibold text-primary">{svc.outcome}</p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ════════════════ CTA ════════════════ */
const CTASection = () => (
  <section className="py-20 sm:py-28 bg-primary text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center max-w-3xl mx-auto">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <motion.h2 variants={fadeUp} className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight mb-5">
          Transform Your IT Infrastructure Today
        </motion.h2>
        <motion.p variants={fadeUp} className="text-sm sm:text-base text-primary-foreground/70 leading-relaxed mb-10 max-w-xl mx-auto">
          Managed IT, AMC, Microsoft 365, cybersecurity, cloud, or network support — our certified team is ready to deliver.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          <MagneticButton>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold bg-primary-foreground text-primary rounded-full hover:opacity-90 transition-opacity">
              Request Free Assessment <ArrowUpRight size={16} />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a href="tel:+918530171515" className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold border border-primary-foreground/30 text-primary-foreground rounded-full hover:bg-primary-foreground/10 transition-colors">
              <Phone size={15} /> Call Us Now
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="https://wa.me/918530171515" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold border border-primary-foreground/30 text-primary-foreground rounded-full hover:bg-primary-foreground/10 transition-colors">
              <MessageSquare size={15} /> WhatsApp Us
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ════════════════ STICKY ANCHOR NAV ════════════════ */
const AnchorNav = () => {
  const labels = [
    { id: "managed-it", label: "Managed IT" }, { id: "cybersecurity", label: "Cybersecurity" },
    { id: "cloud", label: "Cloud & Server" }, { id: "network", label: "Network" },
    { id: "devices", label: "Devices & Assets" }, { id: "consulting", label: "Consulting" },
  ];
  return (
    <div className="sticky top-[64px] z-40 bg-background/95 backdrop-blur border-b border-border/20 py-3 overflow-x-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:flex-wrap">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mr-1 shrink-0">Jump to:</span>
          {labels.map((l) => (
            <a key={l.id} href={`#${l.id}`}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200 whitespace-nowrap">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ════════════════ PAGE ════════════════ */
const ITInfrastructure = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [hash]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content">
        <Hero />
        <LogosStrip />
        <WhatWeManage />
        <EngagementSection />
        <AnchorNav />
        <ServiceSections />
        <OutcomesSection />
        <ProcessSection />
        <IndustriesFAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default ITInfrastructure;
