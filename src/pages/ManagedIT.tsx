import { useEffect, useRef } from "react";
import SEOHead from "@/components/SEOHead";
import { solutionsSeoData } from "@/data/seo/solutionsSeo";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ITRiskBriefing from "@/components/ITRiskBriefing";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Shield,
  Monitor,
  Eye,
  Mail,
  Users,
  DollarSign,
  AlertTriangle,
  Server,
  Lock,
  BarChart3,
  TrendingUp,
  Building2,
  Briefcase,
  Award,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { MagneticButton } from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolutionFAQ from "@/components/solutions/SolutionFAQ";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ── animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const staggerFast = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const charReveal = {
  hidden: { opacity: 0, y: 60, rotateX: 40 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring" as const, stiffness: 100, damping: 18 } },
};

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

/* ── Check item ── */
const Check = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <motion.div variants={fadeUp} className="flex items-start gap-3">
    <CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${dark ? "text-primary" : "text-primary"}`} />
    <span className={`text-sm sm:text-base leading-relaxed ${dark ? "text-background/80" : "text-muted-foreground"}`}>
      {children}
    </span>
  </motion.div>
);

/* ══════════════════ DATA ══════════════════ */

const coreProblems = [
  {
    icon: Monitor,
    title: "Downtime That's Treated as Normal",
    bullets: [
      "Small outages.",
      "Slow systems.",
      "VPN failures.",
      "Email delays.",
      "Employees adapt. Productivity silently declines.",
      "Leadership never sees the cumulative cost.",
    ],
  },
  {
    icon: Shield,
    title: "Security That Exists Only on Paper",
    bullets: [
      "Antivirus installed but not monitored",
      "MFA partially enforced",
      "No centralized log review",
      "Patching inconsistent",
      "No structured incident response",
      "Security tools ≠ Security governance. The difference matters during a breach.",
    ],
  },
  {
    icon: Eye,
    title: "No Executive IT Visibility",
    bullets: [
      "CXOs often cannot answer key IT questions.",
      "If IT cannot be measured, it cannot be governed.",
    ],
  },
  {
    icon: Mail,
    title: "Email as a Single Point of Failure",
    bullets: [
      "Misconfigured SPF/DKIM/DMARC",
      "No monitoring",
      "Over-licensed users",
      "Manual onboarding/offboarding",
      "No retention governance",
      "Email failures affect every department.",
    ],
  },
  {
    icon: Users,
    title: "Internal IT Overload",
    bullets: [
      "Handles tickets",
      "Manages vendors",
      "Responds to emergencies",
      "Manages licenses",
      "Handles security alerts",
      "They are reactive by structure — not by design.",
    ],
  },
  {
    icon: DollarSign,
    title: "Rising Costs Without Control",
    bullets: [
      "Emergency consultants",
      "Tool subscriptions",
      "Patchwork security additions",
      "Migration mistakes",
      "IT becomes unpredictable operational overhead.",
    ],
  },
];

const triggerEvents = [
  { title: "A ransomware scare", desc: "Exposes gaps in your detection and response capability overnight." },
  { title: "A major email outage", desc: "Reveals dependencies and misconfigurations across every department." },
  { title: "Failed cloud migration", desc: "Costs multiply when data integrity and user transitions break down." },
  { title: "Compliance audit warning", desc: "Uncovers governance gaps that put the entire business at risk." },
  { title: "Rapid team expansion", desc: "Onboarding at scale without governance creates security blind spots." },
  { title: "Leadership change", desc: "New leadership demands visibility, accountability, and structured IT." },
  { title: "Investor due diligence", desc: "Investors scrutinize IT risk posture — unstructured IT raises red flags." },
  { title: "Client security questionnaire", desc: "Failing a client's security review can cost the deal entirely." },
];

const beforeItems = [
  "Issues resolved only after escalation",
  "No 24×7 monitoring",
  "Security tool-driven, not governance-driven",
  "No executive reporting",
  "Unclear escalation matrix",
  "Cost unpredictability",
  "Leadership frustration",
];

const afterItems = [
  "SLA-driven support",
  "24×7 monitoring",
  "Patch & vulnerability governance",
  "Executive dashboards",
  "Escalation matrix clarity",
  "Predictable monthly investment",
  "Dedicated account management",
];

const comparisonTable = [
  { capability: "24×7 Monitoring", internal: "Rare", msp: "Limited", cybaem: "Structured" },
  { capability: "SLA Governance", internal: "Informal", msp: "Basic", cybaem: "Defined & Reported" },
  { capability: "Executive Reporting", internal: "Minimal", msp: "Rare", cybaem: "Monthly Governance Dashboard" },
  { capability: "Email Expertise", internal: "General", msp: "Ticket-Based", cybaem: "Managed & Migration Specialists" },
  { capability: "Security Oversight", internal: "Tool-Based", msp: "Add-On", cybaem: "Integrated Framework" },
  { capability: "Escalation Matrix", internal: "Ad-Hoc", msp: "Varies", cybaem: "Defined" },
  { capability: "Cost Predictability", internal: "Salary-Based", msp: "Variable", cybaem: "Structured Monthly" },
  { capability: "Strategic Advisory", internal: "Limited", msp: "Rare", cybaem: "Included" },
];

const servicePillars = [
  {
    icon: Server,
    title: "Managed IT Services",
    bullets: ["8×5 and 24×7 support", "Proactive monitoring", "Patch management", "SLA governance", "Executive performance reporting", "Escalation matrix management"],
  },
  {
    icon: Mail,
    title: "Managed Email Services",
    bullets: ["Microsoft 365 administration", "Google Workspace administration", "Monitoring & optimization", "Security configuration", "License optimization", "Governance frameworks"],
  },
  {
    icon: TrendingUp,
    title: "Email Migration & Cloud Transitions",
    bullets: ["Cutover & Hybrid migrations", "Data integrity protection", "User transition management", "Risk mitigation planning", "Post-migration stabilization"],
  },
  {
    icon: Lock,
    title: "Security & Risk Oversight",
    bullets: ["Patch compliance", "MFA enforcement", "Incident response structure", "Governance alignment", "Audit readiness support"],
  },
];

const executiveQuestions = [
  "What is one hour of downtime worth?",
  "What would one ransomware incident cost?",
  "What is executive time spent firefighting worth?",
  "What is compliance failure exposure?",
];

const roiItems = [
  "Risk avoided",
  "Downtime reduced",
  "Productivity protected",
  "Leadership focus regained",
  "Financial predictability introduced",
];

const serviceTiers = [
  {
    title: "Business Hours Support (8×5)",
    desc: "For structured operating schedules.",
    features: ["Weekday coverage", "SLA-driven", "Governance included", "Executive reporting"],
  },
  {
    title: "24×7 Managed IT",
    desc: "For growth-stage and uptime-critical businesses.",
    features: ["Round-the-clock monitoring", "Immediate escalation", "Proactive patching", "Full governance"],
    highlighted: true,
  },
  {
    title: "Premium Plus",
    desc: "For security-sensitive and compliance-driven organizations.",
    features: ["All 24×7 features", "Advanced security oversight", "Compliance support", "Dedicated account manager"],
  },
];

const investingIn = [
  "Business continuity",
  "Security resilience",
  "Operational clarity",
  "Leadership confidence",
  "Strategic IT governance",
];

const compoundingAdvantage = [
  "Growth becomes smoother",
  "Hiring scales faster",
  "Audits become manageable",
  "Client trust increases",
  "Investors gain confidence",
];

const idealClients = [
  { icon: Building2, label: "Growing SMEs scaling operations" },
  { icon: TrendingUp, label: "Multi-location businesses" },
  { icon: Shield, label: "Compliance-sensitive industries" },
  { icon: Briefcase, label: "Security-conscious leadership teams" },
  { icon: Award, label: "Organizations tired of reactive IT" },
];

const faqs = [
  {
    question: "What are Managed IT Services?",
    answer: "Managed IT Services provide proactive monitoring, support, security oversight, and infrastructure governance to reduce downtime and cybersecurity risks.",
  },
  {
    question: "Why does a company need 24/7 IT support?",
    answer: "Businesses that rely on digital infrastructure need continuous monitoring to prevent downtime, security incidents, and operational disruption.",
  },
  {
    question: "What is included in Microsoft 365 management?",
    answer: "License optimization, security configuration, monitoring, user lifecycle management, and compliance governance.",
  },
  {
    question: "How do Email Migration Services reduce risk?",
    answer: "Professional migration ensures data integrity, security compliance, minimal downtime, and post-transition stabilization.",
  },
  {
    question: "How much do Managed IT Services cost?",
    answer: "Pricing depends on company size, infrastructure complexity, support coverage hours, and security requirements. Cybaem provides customized proposals after assessment.",
  },
];

/* ══════════════════ PAGE ══════════════════ */

const ManagedIT = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOp = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={solutionsSeoData["managed-it-cloud-security"].metaTitle}
        description={solutionsSeoData["managed-it-cloud-security"].metaDescription}
        canonical="/solutions/managed-it-cloud-security"
        keywords={solutionsSeoData["managed-it-cloud-security"].keywords}
        ogTitle={solutionsSeoData["managed-it-cloud-security"].ogTitle}
        ogDescription={solutionsSeoData["managed-it-cloud-security"].ogDescription}
        ogImageAlt={solutionsSeoData["managed-it-cloud-security"].ogImageAlt}
        twitterTitle={solutionsSeoData["managed-it-cloud-security"].twitterTitle}
        twitterDescription={solutionsSeoData["managed-it-cloud-security"].twitterDescription}
        jsonLd={solutionsSeoData["managed-it-cloud-security"].jsonLdSchemas}
      />
      <Navbar />



      {/* ═══ 1. HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden flex items-center">
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <img
            src="/images/enterprise-hero-2.avif"
            alt="Enterprise IT governance"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"
          style={{ opacity: overlayOp }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <motion.div
          className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10 pt-28 sm:pt-36 pb-16"
          style={{ y: contentY }}
        >
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-4xl">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium tracking-[0.2em] uppercase text-white/80 border border-white/20 rounded-full mb-8 backdrop-blur-sm bg-white/5">
                <Shield size={14} className="text-primary" /> Enterprise IT Governance
              </span>
            </motion.div>

            <h1 className="mb-6 perspective-[1000px]">
              {["When IT Becomes a", "Business Risk —"].map((line) => (
                <motion.div key={line} variants={charReveal} className="overflow-hidden">
                  <span className="block font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] text-white">
                    {line}
                  </span>
                </motion.div>
              ))}
              <motion.div variants={charReveal} className="overflow-hidden mt-2">
                <span className="block font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] text-primary bg-slate-100">
                  We Turn It Into Structured Governance
                </span>
              </motion.div>
            </h1>

            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-white/70 font-semibold mb-4 mt-8">
              The Real Problem Isn't IT Support. It's Unstructured IT Risk.
            </motion.p>

            <motion.div variants={staggerFast} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-2xl">
              {[
                "Lack of visibility",
                "Lack of governance",
                "Lack of accountability",
                "Lack of proactive security",
                "Lack of predictable IT structure",
              ].map((p) => (
                <motion.div key={p} variants={fadeUp} className="flex items-center gap-2 text-white/60 text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {p}
                </motion.div>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} className="text-white/50 text-sm mb-8">
              And leadership usually discovers this only after disruption. Cybaem Tech exists to eliminate that uncertainty.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
              <MagneticButton>
                <button
                  onClick={() => document.getElementById('it-risk-briefing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Check IT Risk Assessment <ArrowRight size={16} />
                </button>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#what-we-deliver"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Learn More
                </a>
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

      {/* ═══ 2. INTERACTIVE IT RISK BRIEFING ═══ */}
      <div id="it-risk-briefing">
        <ITRiskBriefing />
      </div>

      {/* ═══ 3. TRIGGER EVENTS ═══ */}
      <div id="warning-signals">
      <RevealSection className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div variants={fadeUp} className="mb-10">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              Warning Signals
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Trigger Events That Push Companies to <span className="text-primary">Switch</span>
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg max-w-2xl">
              Companies rarely move to structured IT "proactively." They switch after one of these:
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {triggerEvents.map((event, i) => (
                <AccordionItem key={i} value={`trigger-${i}`} className="glass-panel rounded-xl px-6 border">
                  <AccordionTrigger className="text-left font-display font-semibold text-base hover:no-underline">
                    <span className="flex items-center gap-3">
                      <AlertTriangle size={16} className="text-destructive shrink-0" />
                      {event.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {event.desc}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <motion.p variants={fadeUp} className="mt-6 text-sm text-muted-foreground italic">
              These events expose underlying fragility. Cybaem steps in before fragility becomes crisis.
            </motion.p>
          </motion.div>
        </div>
      </RevealSection>

      {/* ═══ 3b. FEAR OF DOING NOTHING ═══ */}
      <RevealSection dark className="py-20 lg:py-28">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div variants={fadeUp} className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8">
              The Fear of Doing <span className="text-primary">Nothing</span>
            </h2>
            <p className="text-background/70 text-lg mb-8">
              Doing nothing does not maintain stability. It compounds risk.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto mb-8">
              {[
                "One phishing email → breach",
                "One unpatched system → ransomware",
                "One failed migration → operational halt",
                "One audit failure → penalties",
              ].map((item) => (
                <motion.div key={item} variants={fadeUp} className="flex items-start gap-2 text-background/60 text-sm">
                  <AlertTriangle size={14} className="text-destructive mt-0.5 shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
            <motion.p variants={fadeUp} className="text-background/50 text-sm">
              The cost of switching is controlled. The cost of ignoring risk is not.
            </motion.p>
          </motion.div>
        </div>
      </RevealSection>
      </div>

      {/* ═══ 4. BEFORE VS AFTER ═══ */}
      <RevealSection className="section-border py-20 lg:py-32">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Before vs After <span className="text-primary">Cybaem</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div variants={fadeUp} className="glass-panel rounded-xl p-8 border-destructive/20">
              <h3 className="font-display text-xl font-bold mb-6 text-destructive">
                Before: Reactive & Fragmented
              </h3>
              <p className="text-muted-foreground text-sm mb-4 italic">IT feels like background instability.</p>
              <div className="space-y-3">
                {beforeItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="glass-panel rounded-xl p-8 border-primary/20">
              <h3 className="font-display text-xl font-bold mb-6 text-primary">
                After: Structured & Measurable
              </h3>
              <p className="text-muted-foreground text-sm mb-4 italic">IT becomes controlled infrastructure.</p>
              <div className="space-y-3">
                {afterItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ═══ 5. WHY COMPANIES SWITCH ═══ */}
      <RevealSection className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
                The Shift
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Why Companies Switch to <span className="text-primary">Cybaem</span>
              </h2>
              <p className="text-muted-foreground mb-2">
                Not because they want cheaper support. Because they want:
              </p>
            </motion.div>
            <motion.div variants={staggerFast} className="space-y-4">
              {[
                "Governance over guesswork",
                "Visibility over assumption",
                "Prevention over reaction",
                "Structure over chaos",
                "Predictability over fluctuation",
              ].map((item) => (
                <Check key={item}>{item}</Check>
              ))}
              <motion.p variants={fadeUp} className="text-foreground font-display font-semibold text-lg pt-4 border-t border-border">
                We don't replace IT. <span className="text-primary">We professionalize it.</span>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ═══ 6. COMPARISON TABLE ═══ */}
      <RevealSection className="section-border py-20 lg:py-32">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Internal IT vs Generic MSP vs <span className="text-primary">Cybaem</span>
            </h2>
            <p className="text-muted-foreground">Cybaem is built for leadership-level expectations.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-display font-semibold text-foreground">Capability</th>
                  <th className="text-left py-4 px-4 text-sm font-display font-semibold text-muted-foreground">Internal IT</th>
                  <th className="text-left py-4 px-4 text-sm font-display font-semibold text-muted-foreground">Generic MSP</th>
                  <th className="text-left py-4 px-4 text-sm font-display font-semibold text-primary">Cybaem Tech</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{row.capability}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.internal}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.msp}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-primary">{row.cybaem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </RevealSection>

      {/* ═══ 7. CORE SERVICE PILLARS ═══ */}
      <div id="what-we-deliver">
      <RevealSection className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div variants={fadeUp} className="mb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              What We Deliver
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Core Service <span className="text-primary">Pillars</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {servicePillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="glass-panel rounded-xl p-8 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-sm">
                    {idx + 1}
                  </span>
                  <pillar.icon size={20} className="text-primary" />
                  <h3 className="font-display font-semibold text-lg text-foreground">{pillar.title}</h3>
                </div>
                <ul className="space-y-2">
                  {pillar.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>
      </div>

      {/* ═══ 8. ROI NARRATIVE ═══ */}
      <RevealSection dark className="py-20 lg:py-32">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div variants={fadeUp} className="mb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              Financial Logic
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              ROI Narrative
            </h2>
            <p className="text-background/60 mt-4">Ask your leadership team:</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {executiveQuestions.map((q) => (
              <motion.div
                key={q}
                variants={fadeUp}
                className="rounded-xl border border-background/10 p-6 bg-background/5 backdrop-blur-sm"
              >
                <BarChart3 size={20} className="text-primary mb-3" />
                <p className="font-display font-semibold text-background text-base leading-snug">{q}</p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="text-background/50 text-sm mb-4">
            Now compare that with structured managed IT investment.
          </motion.p>

          <motion.div variants={fadeUp} className="max-w-2xl">
            <h3 className="font-display text-2xl font-bold text-background mb-6">
              Managed IT ROI is not revenue generated.
            </h3>
            <p className="text-background/60 mb-4">It is:</p>
            <div className="space-y-3 mb-8">
              {roiItems.map((item) => (
                <Check key={item} dark>{item}</Check>
              ))}
            </div>
            <p className="font-display text-xl font-bold text-primary">It is operational insurance.</p>
          </motion.div>
        </div>
      </RevealSection>

      {/* ═══ 9. SERVICE TIERS ═══ */}
      <RevealSection className="section-border py-20 lg:py-32">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              Engagement Models
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Service <span className="text-primary">Tiers</span>
            </h2>
            <p className="text-muted-foreground">Each tier includes governance, not just ticket resolution.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {serviceTiers.map((tier) => (
              <motion.div
                key={tier.title}
                variants={fadeUp}
                className={`rounded-xl p-8 transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground ring-2 ring-primary shadow-lg"
                    : "glass-panel"
                } hover:-translate-y-1`}
              >
                <h3 className={`font-display font-bold text-lg mb-2 ${tier.highlighted ? "" : "text-foreground"}`}>
                  {tier.title}
                </h3>
                <p className={`text-sm mb-6 ${tier.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {tier.desc}
                </p>
                <ul className="space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${tier.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${tier.highlighted ? "text-primary-foreground" : "text-primary"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* What You're Really Investing In */}
          <motion.div variants={fadeUp} className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-xl font-bold mb-2">What You're Really Investing In</h3>
            <p className="text-muted-foreground text-sm mb-6">Not tickets closed. Not password resets. Not antivirus installs. You are investing in:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {investingIn.map((item) => (
                <span key={item} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </RevealSection>

      {/* ═══ 10. COMPOUNDING ADVANTAGE ═══ */}
      <RevealSection className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                The Compounding <span className="text-primary">Advantage</span>
              </h2>
              <p className="text-muted-foreground mt-4">When IT is structured:</p>
            </motion.div>
            <motion.div variants={staggerFast} className="space-y-4">
              {compoundingAdvantage.map((item) => (
                <Check key={item}>{item}</Check>
              ))}
              <motion.p variants={fadeUp} className="text-foreground font-display font-semibold text-lg pt-4 border-t border-border">
                IT shifts from operational liability to <span className="text-primary">competitive strength.</span>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ═══ 11. WHO WE WORK BEST WITH ═══ */}
      <RevealSection className="section-border py-20 lg:py-28">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Who We Work <span className="text-primary">Best With</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {idealClients.map((client) => (
              <motion.div
                key={client.label}
                variants={fadeUp}
                className="glass-panel rounded-xl p-6 text-center hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <client.icon size={22} className="text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{client.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ═══ 12. FAQ ═══ */}
      <SolutionFAQ faqs={faqs} title="Managed IT Services" />

      {/* ═══ 13. CTA ═══ */}
      <RevealSection dark className="py-20 lg:py-32">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12 text-center">
          <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              Final Executive Question
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-6 text-background">
              If a major IT disruption happens in the next 12 months — would your leadership team be confident in your monitoring, response, and recovery process?
            </h2>
            <p className="text-background/60 mb-4">If the answer is uncertain — your risk is visible.</p>
            <p className="text-primary font-display font-bold text-lg mb-10">
              Cybaem Tech transforms that uncertainty into structured control.
            </p>

            <div className="glass-panel rounded-xl p-8 bg-background/5 border-background/10 mb-10 text-left max-w-xl mx-auto">
              <h3 className="font-display font-bold text-lg text-background mb-4">
                Book a Strategic IT Risk Assessment
              </h3>
              <p className="text-background/60 text-sm mb-4">Understand:</p>
              <ul className="space-y-2 mb-6">
                {[
                  "Your real exposure",
                  "Your downtime cost",
                  "Your security posture",
                  "Your governance gaps",
                  "Your cost inefficiencies",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-background/70">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-background/50 text-xs italic">Before they become expensive.</p>
            </div>

            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Schedule Your Assessment <ArrowRight size={16} />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </RevealSection>

      <Footer />
    </div>
  );
};

export default ManagedIT;
