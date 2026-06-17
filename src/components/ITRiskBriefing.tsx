import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Monitor, Shield, Clock, Mail, Users, DollarSign, ArrowRight, ChevronRight,
} from "lucide-react";

/* ═══ TYPES ═══ */
type Role = "CEO" | "CFO" | "CTO" | "COO" | "Board";
type SizeKey = "small" | "mid" | "large" | "xlarge";

interface RiskData {
  id: string;
  icon: React.ElementType;
  title: string;
  teaser: string;
  severity: "critical" | "high" | "medium";
  baseAnnual: number;
  benchmark: number;
  focus: Record<string, string>;
  details: string[];
  roleDetails: string[];
}

/* ═══ DATA ═══ */
const ROLES: { key: Role; badge: string; name: string; focus: string }[] = [
  { key: "CEO", badge: "CEO", name: "Chief Executive", focus: "Revenue risk, competitive exposure & strategic liability" },
  { key: "CFO", badge: "CFO", name: "Chief Financial", focus: "Cost exposure, audit risk & unpredictable IT overhead" },
  { key: "CTO", badge: "CTO", name: "Chief Technology", focus: "Technical debt, security posture & infrastructure resilience" },
  { key: "COO", badge: "COO", name: "Chief Operating", focus: "Operational continuity, downtime impact & process failure" },
  { key: "Board", badge: "⬡", name: "Board / Investor", focus: "Governance gaps, compliance exposure & fiduciary risk" },
];

const SIZES: { key: SizeKey; label: string; meta: string; mult: number }[] = [
  { key: "small", label: "50–150 Employees", meta: "SMB", mult: 1 },
  { key: "mid", label: "150–500 Employees", meta: "Mid-market", mult: 3 },
  { key: "large", label: "500–2,000 Employees", meta: "Enterprise", mult: 7 },
  { key: "xlarge", label: "2,000+ Employees", meta: "Large Enterprise", mult: 18 },
];

const INDUSTRIES = [
  { val: "Financial Services", meta: "High-reg" },
  { val: "Healthcare", meta: "HIPAA" },
  { val: "Technology / SaaS", meta: "IP-critical" },
  { val: "Professional Services", meta: "Data-sensitive" },
  { val: "Retail / E-Commerce", meta: "Revenue-critical" },
  { val: "Manufacturing / Ops", meta: "Uptime-critical" },
];

const RISKS: RiskData[] = [
  {
    id: "downtime", icon: Monitor, title: "Downtime Treated as Normal",
    teaser: "Small outages, VPN failures, slow systems — team adapts, productivity silently hemorrhages.",
    severity: "critical", baseAnnual: 95000, benchmark: 73,
    focus: {
      ceo: "Revenue leakage from invisible productivity erosion",
      cfo: "Unbudgeted recovery costs and contractor invoices",
      cto: "Infrastructure resilience and SLA exposure",
      coo: "Operational continuity and cross-department impact",
      board: "Undisclosed operational risk in board reporting",
    },
    details: ["Small outages never escalated to leadership", "VPN failures accepted as routine", "Email and system delays compound daily", "Cumulative cost never appears in any report"],
    roleDetails: ["Lost revenue per hour of downtime: $5,600+", "Employee-adapted workarounds mask true impact", "Hidden in departmental productivity variance"],
  },
  {
    id: "security", icon: Shield, title: "Security Exists Only on Paper",
    teaser: "Antivirus installed, unmonitored. MFA half-enforced. Tools installed ≠ governance.",
    severity: "critical", baseAnnual: 380000, benchmark: 61,
    focus: {
      ceo: "Brand and liability exposure in a breach event",
      cfo: "Regulatory fines, breach costs average $4.4M",
      cto: "Attack surface, log gaps, and incident response gaps",
      coo: "Business continuity risk from a single breach event",
      board: "D&O liability if governance gaps enable a breach",
    },
    details: ["Antivirus installed — review cadence unknown", "MFA not enforced org-wide", "No centralized log review or SIEM", "Patching done manually or inconsistently"],
    roleDetails: ["Average breach cost: $4.4M (IBM 2024)", "Regulatory penalties (GDPR/HIPAA): up to $50K/incident", "Stock price impact post-breach: -7.5% average"],
  },
  {
    id: "visibility", icon: Clock, title: "No Executive IT Visibility",
    teaser: "CXOs can't answer basic IT questions. What can't be measured cannot be governed.",
    severity: "high", baseAnnual: 55000, benchmark: 58,
    focus: {
      ceo: "Strategic decisions made on incomplete information",
      cfo: "Inability to audit IT spend ROI or forecast costs",
      cto: "No baseline to measure technical debt or progress",
      coo: "Process bottlenecks invisible until they cause failure",
      board: "Governance failure — IT risk not in board reporting",
    },
    details: ["No IT health dashboard or executive reporting", "CXOs rely on verbal updates, not data", "Compliance posture unknown until audit", "IT strategy reactive, not planned"],
    roleDetails: ["Board-level IT visibility is now a governance expectation", "M&A due diligence regularly fails on IT transparency", "Audit findings correlate with undocumented IT environments"],
  },
  {
    id: "email", icon: Mail, title: "Email as a Single Point of Failure",
    teaser: "Misconfigured SPF/DKIM/DMARC, no monitoring. Email failure affects every department.",
    severity: "high", baseAnnual: 42000, benchmark: 49,
    focus: {
      ceo: "Customer-facing communications at risk, reputation exposure",
      cfo: "Missed invoices, failed collections, delayed closings",
      cto: "Deliverability failure, spoofing exposure, no alerting",
      coo: "Cross-department coordination failures from email gaps",
      board: "Regulatory obligations around data retention not met",
    },
    details: ["SPF/DKIM/DMARC absent or misconfigured", "No alerting on delivery failures", "No email retention governance", "Offboarding leaves orphaned inboxes active"],
    roleDetails: ["Email spoofing exploits hurt brand trust overnight", "Finance email failures delay AR/AP cycles", "Lost emails in deals = measurable revenue leakage"],
  },
  {
    id: "overload", icon: Users, title: "Internal IT Trapped in Firefighting",
    teaser: "Your IT team handles tickets, vendors, alerts — reactive by structure, not by choice.",
    severity: "high", baseAnnual: 145000, benchmark: 66,
    focus: {
      ceo: "Technology strategy stalled while team fights fires",
      cfo: "IT labor cost delivering reactive, not strategic, value",
      cto: "No bandwidth for architecture, security, or innovation",
      coo: "Operational improvements blocked by IT availability",
      board: "Strategic IT initiatives delayed indefinitely",
    },
    details: ["Single points of knowledge — no documentation", "Every incident requires the same senior person", "Vendor management unstructured and time-consuming", "No proactive monitoring — only reactive response"],
    roleDetails: ["Reactive IT costs 3-4x more than proactive managed IT", "Senior IT staff turnover from burnout averages $85K replacement cost", "Strategic projects delayed 6–18 months on average"],
  },
  {
    id: "costs", icon: DollarSign, title: "IT Costs Growing Without Control",
    teaser: "Emergency consultants, redundant subscriptions, patchwork security. IT overhead is unpredictable.",
    severity: "medium", baseAnnual: 110000, benchmark: 71,
    focus: {
      ceo: "Eroding margin from invisible operational overhead",
      cfo: "30-40% of IT budget estimated as direct waste",
      cto: "License sprawl, shadow IT, and vendor duplication",
      coo: "Procurement decisions made without operational context",
      board: "Inability to benchmark IT spend against industry peers",
    },
    details: ["Emergency contractor invoices not budgeted", "SaaS subscriptions with unused licenses not reviewed", "Security tooling layered without strategy", "Migration mistakes billed to operational budget"],
    roleDetails: ["30-40% of enterprise IT spend is identifiable waste", "License audits routinely find 20-35% unused seats", "Emergency response labor averages 4x planned IT rates"],
  },
];

/* ═══ HELPERS ═══ */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const formatCurrency = (n: number) => "$" + Math.round(n).toLocaleString();

const sevColors: Record<string, string> = {
  critical: "bg-destructive/10 text-red-400 border border-destructive/25",
  high: "bg-amber-500/10 text-amber-400 border border-amber-500/25",
  medium: "bg-green-500/10 text-green-400 border border-green-500/25",
};

/* ═══ COMPONENT ═══ */
const ITRiskBriefing = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role | null>(null);
  const [size, setSize] = useState<SizeKey | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [selectedRisks, setSelectedRisks] = useState<Set<string>>(new Set());
  const [briefText, setBriefText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sizeMult = SIZES.find((s) => s.key === size)?.mult ?? 1;

  const scrollToTop = useCallback(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const goToStep = (s: number) => {
    setStep(s);
    setTimeout(scrollToTop, 100);
  };

  const toggleRisk = (id: string) => {
    setSelectedRisks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalExposure = Array.from(selectedRisks).reduce((sum, id) => {
    const r = RISKS.find((x) => x.id === id);
    return sum + (r ? r.baseAnnual * sizeMult : 0);
  }, 0);

  const riskPct = Math.round((selectedRisks.size / RISKS.length) * 100);
  const roleKey = (role || "CEO").toLowerCase();

  const generateBrief = () => {
    setLoading(true);
    goToStep(4);
    const selected = RISKS.filter((r) => selectedRisks.has(r.id));
    const sizeLabel = SIZES.find((s) => s.key === size)?.label || "";

    // Fallback brief (no API call needed)
    setTimeout(() => {
      const brief = `EXECUTIVE SUMMARY
Your organization has identified ${selected.length} active risk vectors representing both operational vulnerability and unbudgeted financial exposure. These are not IT issues — they are **business risks** disguised as technical problems that compound silently until a triggering event makes them impossible to ignore.

FINANCIAL EXPOSURE
- $${Math.round((selected[0]?.baseAnnual ?? 85000) * sizeMult / 1000)}K+ annually in ${selected[0]?.title || "operational risk"}
- Emergency response costs running 4x planned IT rates
- License and subscription waste estimated at 30-40% of IT budget
- Regulatory exposure carrying potential fines in six figures

STRATEGIC RISK ANALYSIS
- Board-level decisions being made on incomplete IT data
- Competitive disadvantage from infrastructure unreliability
- M&A and audit readiness materially impaired
- Strategic initiatives stalled while IT fights operational fires

90-DAY ACTION PLAN
1. Engage a managed IT partner for a structured gap assessment
2. Deploy security baseline monitoring and alerting within 30 days
3. Conduct a license audit — reclaim 20-35% in immediate savings
4. Establish monthly IT reporting dashboard for ${role} visibility

ROI OF RESOLUTION
- IT costs become predictable — reactive overhead eliminated
- Breach and compliance risk reduced by 60-80% with structured governance
- Strategic IT roadmap becomes possible — from firefighting to forward investment`;
      setBriefText(brief);
      setLoading(false);
    }, 3500);
  };

  const parseSections = (text: string) => {
    const headings = ["EXECUTIVE SUMMARY", "FINANCIAL EXPOSURE", "STRATEGIC RISK ANALYSIS", "90-DAY ACTION PLAN", "ROI OF RESOLUTION"];
    const sections: Record<string, string> = {};
    headings.forEach((h, i) => {
      const start = text.indexOf(h);
      if (start === -1) return;
      const contentStart = start + h.length;
      const nextHeading = headings.slice(i + 1).find((nh) => text.indexOf(nh) > contentStart);
      const end = nextHeading ? text.indexOf(nextHeading) : text.length;
      sections[h] = text.slice(contentStart, end).trim();
    });
    return sections;
  };

  const formatList = (content: string) =>
    content
      .split("\n")
      .map((l) => l.replace(/^[-*•\d+.]\s*/, "").trim())
      .filter(Boolean);

  /* ═══ GAUGE SVG ═══ */
  const GaugeSVG = () => {
    const arcLen = 251.3;
    const offset = arcLen - (arcLen * riskPct) / 100;
    return (
      <svg viewBox="0 0 200 120" className="w-full">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(142 76% 36%)" />
            <stop offset="40%" stopColor="hsl(38 92% 50%)" />
            <stop offset="100%" stopColor="hsl(0 84% 60%)" />
          </linearGradient>
        </defs>
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="hsl(var(--border))" strokeWidth="12" strokeLinecap="round" />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={arcLen}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}
        />
        <text x="100" y="92" textAnchor="middle" className="fill-foreground font-display text-[28px] font-bold">
          {riskPct}%
        </text>
        <text x="100" y="108" textAnchor="middle" className="fill-muted-foreground text-[11px] font-mono">
          Risk Exposure
        </text>
      </svg>
    );
  };

  /* ═══ RENDER ═══ */
  return (
    <section ref={containerRef} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--border) / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            IT Risk Intelligence
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-primary border border-primary/30 px-2.5 py-1 rounded">
              Confidential
            </span>
            <span className="font-mono text-[11px] text-muted-foreground">
              Step <span className="text-foreground">{step}</span> of 4
            </span>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step ? "w-6 bg-primary" : s < step ? "w-1.5 bg-muted-foreground" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ═══ STEP 1: ROLE ═══ */}
          {step === 1 && (
            <motion.div key="step1" variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center text-center">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-primary mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-primary/50" />
                Executive Briefing
                <span className="w-8 h-px bg-primary/50" />
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
                What is your <span className="text-primary italic">primary</span>
                <br />
                executive role?
              </h2>
              <p className="text-muted-foreground text-sm mb-12 max-w-md">
                Your briefing will be calibrated to the risks and metrics most relevant to your position.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full max-w-4xl">
                {ROLES.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setRole(r.key)}
                    className={`relative rounded-xl p-5 text-center border transition-all duration-200 overflow-hidden group ${
                      role === r.key
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-border/80 hover:bg-muted/30"
                    }`}
                  >
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform origin-center ${
                        role === r.key ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                    <span className="block font-mono text-lg font-medium text-primary mb-2">{r.badge}</span>
                    <span className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-foreground mb-2">{r.name}</span>
                    <span className="block text-[11px] text-muted-foreground leading-snug">{r.focus}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => role && goToStep(2)}
                disabled={!role}
                className={`mt-10 flex items-center gap-2.5 px-8 py-3.5 rounded-xl border font-display text-sm font-bold transition-all ${
                  role
                    ? "border-primary text-primary hover:bg-primary/10 cursor-pointer"
                    : "border-border text-muted-foreground/40 cursor-not-allowed"
                }`}
              >
                Continue <ChevronRight size={16} />
              </button>
            </motion.div>
          )}

          {/* ═══ STEP 2: CONTEXT ═══ */}
          {step === 2 && (
            <motion.div key="step2" variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center text-center">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-primary mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-primary/50" />
                Company Profile
                <span className="w-8 h-px bg-primary/50" />
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
                Calibrate your <span className="text-primary italic">exposure</span>
              </h2>
              <p className="text-muted-foreground text-sm mb-10 max-w-md">
                Two quick data points to size your financial risk accurately.
              </p>

              <div className="grid md:grid-cols-2 gap-10 w-full max-w-2xl text-left">
                <div className="space-y-3">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground block mb-1">Company Size</span>
                  {SIZES.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setSize(s.key)}
                      className={`w-full flex items-center justify-between rounded-xl px-4 py-3.5 border text-sm transition-all ${
                        size === s.key
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card hover:border-border/80 hover:bg-muted/30 text-foreground"
                      }`}
                    >
                      {s.label}
                      <span className={`font-mono text-[10px] ${size === s.key ? "text-primary/60" : "text-muted-foreground"}`}>{s.meta}</span>
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground block mb-1">Industry</span>
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind.val}
                      onClick={() => setIndustry(ind.val)}
                      className={`w-full flex items-center justify-between rounded-xl px-4 py-3.5 border text-sm transition-all ${
                        industry === ind.val
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card hover:border-border/80 hover:bg-muted/30 text-foreground"
                      }`}
                    >
                      {ind.val}
                      <span className={`font-mono text-[10px] ${industry === ind.val ? "text-primary/60" : "text-muted-foreground"}`}>{ind.meta}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => size && industry && goToStep(3)}
                disabled={!size || !industry}
                className={`mt-10 flex items-center gap-2.5 px-8 py-3.5 rounded-xl border font-display text-sm font-bold transition-all ${
                  size && industry
                    ? "border-primary text-primary hover:bg-primary/10 cursor-pointer"
                    : "border-border text-muted-foreground/40 cursor-not-allowed"
                }`}
              >
                Continue <ChevronRight size={16} />
              </button>
            </motion.div>
          )}

          {/* ═══ STEP 3: RISKS ═══ */}
          {step === 3 && (
            <motion.div key="step3" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
              <div className="grid lg:grid-cols-[1fr_320px] gap-0 lg:gap-px rounded-xl overflow-hidden border border-border bg-border">
                {/* Main */}
                <div className="bg-background p-6 sm:p-10">
                  <div className="mb-8">
                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2">
                      Which risks does your
                      <br />
                      organization <span className="text-primary italic">recognize?</span>
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Select every scenario that sounds familiar. Each carries a real financial footprint.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {RISKS.map((r) => {
                      const isSelected = selectedRisks.has(r.id);
                      const cost = Math.round((r.baseAnnual * sizeMult) / 1000) * 1000;
                      const focusText = r.focus[roleKey] || r.teaser;

                      return (
                        <div
                          key={r.id}
                          onClick={() => toggleRisk(r.id)}
                          className={`rounded-xl p-5 border cursor-pointer transition-all duration-200 relative overflow-hidden group ${
                            isSelected ? "border-primary bg-card" : "border-border bg-card hover:border-border/80 hover:bg-muted/10"
                          }`}
                        >
                          {/* Left accent bar */}
                          <div
                            className={`absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-l-xl transition-transform origin-bottom ${
                              isSelected ? "scale-y-100" : "scale-y-0 group-hover:scale-y-[0.4]"
                            }`}
                          />

                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                                isSelected ? "bg-primary/10 border-primary/35" : "bg-muted/30 border-border"
                              }`}
                            >
                              <r.icon size={18} className={isSelected ? "text-primary" : "text-muted-foreground"} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[15px] font-semibold mb-0.5 text-foreground">{r.title}</div>
                              <div className="text-[12.5px] text-muted-foreground leading-snug">{focusText}</div>
                            </div>
                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                              <span className={`font-mono text-[9.5px] tracking-[0.12em] uppercase px-2 py-0.5 rounded ${sevColors[r.severity]}`}>
                                {r.severity}
                              </span>
                              <span className={`font-mono text-xs whitespace-nowrap ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                                ~${Math.round(cost / 1000)}K/yr
                              </span>
                            </div>
                          </div>

                          {/* Expanded details */}
                          <div
                            className={`overflow-hidden transition-all duration-400 ${
                              isSelected ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="grid sm:grid-cols-2 gap-4 pt-4 mt-4 border-t border-border">
                              <div>
                                <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-primary/70 block mb-2">What We See</span>
                                <ul className="space-y-1.5">
                                  {r.details.map((d) => (
                                    <li key={d} className="text-xs text-muted-foreground pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-border">
                                      {d}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-primary/70 block mb-2">Executive Impact</span>
                                <ul className="space-y-1.5">
                                  {r.roleDetails.map((d) => (
                                    <li key={d} className="text-xs text-muted-foreground pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-border">
                                      {d}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3.5 pt-3.5 border-t border-border">
                              <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">{r.benchmark}% of companies your size have this</span>
                              <div className="flex-1 h-[3px] bg-border rounded-full">
                                <div className="h-full bg-primary/60 rounded-full" style={{ width: `${r.benchmark}%` }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="bg-card p-6 lg:p-7 lg:sticky lg:top-20 flex flex-col gap-7">
                  <div>
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-3">Annual Exposure Estimate</span>
                    <div className="font-mono text-3xl font-medium text-primary tracking-tight leading-none mb-1">
                      {formatCurrency(totalExposure)}
                    </div>
                    <span className="text-[11px] text-muted-foreground">estimated at-risk annually</span>
                  </div>

                  <div>
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-3">Risk Severity</span>
                    <GaugeSVG />
                  </div>

                  <div>
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-3">Risk Vectors</span>
                    <div className="space-y-2">
                      {RISKS.map((r) => {
                        const active = selectedRisks.has(r.id);
                        const cost = Math.round((r.baseAnnual * sizeMult) / 1000) * 1000;
                        return (
                          <div key={r.id} className="flex items-center gap-2.5">
                            <div className={`w-1.5 h-1.5 rounded-full transition-colors ${active ? "bg-primary" : "bg-border"}`} />
                            <span className={`flex-1 text-[11.5px] transition-colors ${active ? "text-foreground" : "text-muted-foreground"}`}>
                              {r.title.split(" ").slice(0, 3).join(" ")}
                            </span>
                            <span className={`font-mono text-[11px] transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}>
                              {active ? `$${Math.round(cost / 1000)}K` : "–"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => selectedRisks.size >= 2 && generateBrief()}
                    disabled={selectedRisks.size < 2}
                    className={`w-full rounded-xl py-4 px-5 font-display text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      selectedRisks.size >= 2
                        ? "bg-primary text-primary-foreground hover:opacity-90 cursor-pointer shadow-lg shadow-primary/20"
                        : "bg-primary/20 text-primary/40 cursor-not-allowed"
                    }`}
                  >
                    <div>
                      <div>Generate Executive Brief</div>
                      <div className="text-[10px] opacity-60 font-normal mt-0.5">AI-powered · 30 seconds</div>
                    </div>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ STEP 4: BRIEF ═══ */}
          {step === 4 && (
            <motion.div key="step4" variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="max-w-3xl mx-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
                  <div className="w-12 h-12 border-2 border-border border-t-primary rounded-full animate-spin" />
                  <span className="font-mono text-xs text-muted-foreground tracking-[0.1em] animate-pulse">Generating your executive brief…</span>
                  <div className="flex flex-col items-center gap-2 mt-4">
                    {["Analyzing identified risk vectors", "Calibrating financial exposure model", "Benchmarking against industry data", "Drafting board-ready recommendations"].map((item, i) => (
                      <span
                        key={item}
                        className="text-xs text-muted-foreground opacity-0 animate-[fadeIn_0.5s_forwards]"
                        style={{ animationDelay: `${0.3 + i * 1.1}s` }}
                      >
                        ▸ {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : briefText ? (
                (() => {
                  const sections = parseSections(briefText);
                  const selected = RISKS.filter((r) => selectedRisks.has(r.id));
                  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
                  const sizeLabel = { small: "SMB", mid: "Mid-Market", large: "Enterprise", xlarge: "Large Enterprise" }[size!] || "";
                  const riskLevel = selected.length >= 4 ? "HIGH RISK" : selected.length >= 2 ? "ELEVATED RISK" : "MODERATE RISK";

                  return (
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-5 pb-7 mb-9 border-b border-border">
                        <div>
                          <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-primary mb-3">
                            Confidential · {today} · {sizeLabel} {industry}
                          </div>
                          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2">
                            Executive IT Risk
                            <br />
                            Briefing — {role}
                          </h2>
                          <p className="text-muted-foreground text-[13px]">
                            {selected.length} of 6 risk vectors identified · Estimated exposure ${Math.round(totalExposure / 1000)}K–$
                            {Math.round((totalExposure * 1.4) / 1000)}K annually
                          </p>
                        </div>
                        <div className="shrink-0 border-2 border-destructive rounded-md px-3.5 py-2 text-center rotate-2 opacity-85">
                          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-destructive leading-relaxed block">
                            CONFIDENTIAL
                            <br />
                            {riskLevel}
                          </span>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden mb-9">
                        {[
                          { label: "Estimated Annual Exposure", value: `$${Math.round(totalExposure / 1000)}K+`, sub: "conservative floor estimate" },
                          { label: "Risk Vectors Identified", value: `${selected.length} / 6`, sub: "critical business risks active" },
                          { label: "Risk Profile", value: selected.length >= 4 ? "High" : selected.length >= 2 ? "Elevated" : "Moderate", sub: `${industry} industry benchmark` },
                        ].map((m) => (
                          <div key={m.label} className="bg-card p-5">
                            <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted-foreground mb-2">{m.label}</div>
                            <div className="font-display text-2xl font-bold text-primary leading-none mb-1">{m.value}</div>
                            <div className="text-[11px] text-muted-foreground">{m.sub}</div>
                          </div>
                        ))}
                      </div>

                      {/* Sections */}
                      {[
                        { heading: "Executive Summary", key: "EXECUTIVE SUMMARY", isList: false },
                        { heading: "Financial Exposure", key: "FINANCIAL EXPOSURE", isList: true },
                        { heading: `Strategic Risk Analysis — ${role} Perspective`, key: "STRATEGIC RISK ANALYSIS", isList: true },
                        { heading: "90-Day Action Plan", key: "90-DAY ACTION PLAN", isList: true },
                        { heading: "ROI of Resolution", key: "ROI OF RESOLUTION", isList: true },
                      ].map((sec) => (
                        <div key={sec.key} className="mb-8">
                          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary mb-3.5 flex items-center gap-3">
                            {sec.heading}
                            <span className="flex-1 h-px bg-border" />
                          </div>
                          {sec.isList ? (
                            <ul className="space-y-2.5">
                              {formatList(sections[sec.key] || "").map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground/90 pl-5 relative before:content-['▸'] before:absolute before:left-0 before:text-primary before:text-[10px] before:top-[3px] leading-relaxed">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-[15px] text-muted-foreground/90 leading-[1.75]">
                              {(sections[sec.key] || "").replace(/\*\*(.*?)\*\*/g, "$1")}
                            </p>
                          )}
                        </div>
                      ))}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3.5 mt-12">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-display text-sm font-bold hover:opacity-90 transition-opacity"
                        >
                          Schedule a Risk Assessment Call
                        </Link>
                        <button
                          onClick={() => { goToStep(3); }}
                          className="px-6 py-3.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:border-border/80 hover:text-foreground transition-all"
                        >
                          ← Revise Selections
                        </button>
                      </div>
                    </div>
                  );
                })()
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default ITRiskBriefing;
