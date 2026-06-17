import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { solutionsSeoData } from "@/data/seo/solutionsSeo";
import {
  ArrowUpRight, ArrowRight, Users, Monitor, Briefcase, Headphones, Server, FileText,
  Code, Cloud, Shield, TestTube, UserSearch, Building2, Heart, ShoppingBag, Truck,
  Cpu, Factory, Clock, Calendar, Target, Shuffle, CheckCircle, Lock, Zap,
  UserCheck, Phone as PhoneIcon, BarChart3, Globe, Star, Mail, Quote
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MagneticButton } from "@/components/Navbar";
import { containerVariants, itemVariants } from "@/lib/animations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { solutionsData } from "@/data/solutionsData";

const data = solutionsData["it-staff-augmentation"];

/* ─── Data ─── */

const services = [
  {
    icon: Users,
    title: "Dedicated Onsite IT Engineers",
    description: "Get experienced IT professionals working directly at your office, fully integrated with your team culture and workflows.",
    features: ["Full-time onsite presence", "Seamless team integration", "Direct communication & collaboration", "Immediate issue resolution"],
  },
  {
    icon: Monitor,
    title: "Remote IT Specialists",
    description: "Access top-tier IT talent from anywhere in the world, working remotely but fully committed to your projects.",
    features: ["Global talent pool access", "Cost-effective solutions", "Flexible working hours", "Scalable team size"],
  },
  {
    icon: Briefcase,
    title: "Project-Based Staffing",
    description: "Hire skilled professionals for specific projects with defined scope, timeline, and deliverables.",
    features: ["Clear project milestones", "Fixed budget control", "Specialized expertise", "End-to-end delivery"],
  },
  {
    icon: Headphones,
    title: "Helpdesk Outsourcing",
    description: "24/7 IT support desk services to handle user queries, technical issues, and maintain service levels.",
    features: ["L1/L2/L3 support tiers", "Ticketing & SLA management", "Multi-channel support", "Knowledge base maintenance"],
  },
  {
    icon: Server,
    title: "Network & System Admins",
    description: "Expert administrators to manage, monitor, and optimize your network infrastructure and systems.",
    features: ["Server & network management", "Security & patch updates", "Performance monitoring", "Disaster recovery planning"],
  },
  {
    icon: FileText,
    title: "Contract / Long-Term Hiring",
    description: "Flexible contract arrangements for extended engagements, from 6 months to multi-year commitments.",
    features: ["Long-term stability", "Contract-to-hire options", "Competitive rates", "Easy contract renewals"],
  },
];

const resourceCategories = [
  {
    icon: Code,
    title: "Software & Web Developers",
    skills: ["Full Stack (MEAN, MERN, LAMP)", "React, Angular, Vue.js", "Java, .NET, Node.js", "Flutter, iOS/Android"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Engineers",
    skills: ["AWS, Azure, GCP", "Jenkins, GitHub Actions", "Terraform, Ansible", "Docker, Kubernetes"],
  },
  {
    icon: Server,
    title: "IT Support & Infrastructure",
    skills: ["L1–L3 Support", "SysAdmins (Win/Linux)", "Cisco, Fortinet", "Helpdesk, SLA"],
  },
  {
    icon: Shield,
    title: "Cybersecurity & Compliance",
    skills: ["SOC, Incident Response", "SIEM, IAM, MFA", "Splunk, QRadar", "Firewall: Fortinet, Palo Alto"],
  },
  {
    icon: TestTube,
    title: "QA & Testing Engineers",
    skills: ["Manual & Automation", "Selenium, Cypress", "JMeter, LoadRunner", "Test Strategies"],
  },
  {
    icon: UserSearch,
    title: "IT Recruiters & Coordinators",
    skills: ["Tech Hiring", "Screening & Validation", "Onboarding", "HR Compliance"],
  },
];

const industries = [
  { icon: Building2, name: "Banking & Financial Services (BFSI)" },
  { icon: Heart, name: "Healthcare & Pharma" },
  { icon: ShoppingBag, name: "Retail & E-Commerce" },
  { icon: Truck, name: "Logistics & Transportation" },
  { icon: Cpu, name: "Enterprise IT & Tech Startups" },
  { icon: Factory, name: "Manufacturing & Engineering" },
];

const engagementModels = [
  { icon: Clock, title: "Hourly", description: "Ideal for agile teams and short-term assignments. Gain full flexibility and pay-as-you-go advantages." },
  { icon: Calendar, title: "Monthly (Dedicated)", description: "Get fully dedicated engineers every month, embedded into your team and focused on consistent delivery." },
  { icon: Target, title: "Project-Based", description: "End-to-end project delivery with clear timelines and scope. Best for defined deliverables and milestones." },
  { icon: Shuffle, title: "Onsite + Offshore Hybrid", description: "Leverage the perfect mix of in-person collaboration and offshore scalability to maximize ROI." },
];

const hiringSteps = [
  { step: 1, title: "Requirement Understanding", description: "We engage with you to understand project goals, tech stack, and talent expectations." },
  { step: 2, title: "Candidate Screening", description: "Receive matched, verified profiles of top-tier candidates within 24-48 hours." },
  { step: 3, title: "Interview & Selection", description: "Conduct direct interviews and technical assessments to ensure the best fit." },
  { step: 4, title: "Onboarding & Support", description: "We handle all HR, compliance, NDAs, infrastructure, and ongoing support." },
];

const whyCybaem = [
  { icon: Lock, title: "NDA & Compliance Ready", description: "We strictly adhere to non-disclosure agreements and legal compliance at every stage." },
  { icon: Zap, title: "Agile & Remote Collaboration", description: "Agile teams that integrate smoothly with your workflow — remote-ready and responsive." },
  { icon: UserCheck, title: "Dedicated Account Manager", description: "A single point of contact ensures aligned goals and personalized support." },
  { icon: PhoneIcon, title: "24/7 Resource Availability", description: "Choose round-the-clock engagement models to never miss a milestone." },
  { icon: BarChart3, title: "Work Tracking Tools", description: "Integrated tools like Jira, Trello, and Asana keep progress transparent and measurable." },
  { icon: Star, title: "Monthly Performance Reviews", description: "Transparent metrics and reviews to assess team performance and ensure accountability." },
];

const globalDelivery = [
  { region: "USA", focus: "SaaS, Healthcare IT, Managed Services" },
  { region: "UK", focus: "Fintech, eCommerce, Cloud Startups" },
  { region: "UAE", focus: "Government, Oil & Gas, Construction Tech" },
  { region: "Australia", focus: "EdTech, Agencies, Remote Infrastructure" },
  { region: "Canada & Europe", focus: "AI, Cybersecurity, Logistics" },
];

const testimonials = [
  { quote: "Cybaem Tech helped us scale quickly with a dedicated DevOps team. Reliable, fast onboarding, and quality delivery!", author: data.testimonial.author, role: data.testimonial.role, company: data.testimonial.company },
  { quote: "Their IT support engineers work as an extension of our team. Exceptional response time and professionalism.", author: "Amanda Chen", role: "VP of Engineering", company: "TechScale Inc." },
];

/* ─── Sections ─── */

const Hero = () => (
  <section className="relative min-h-screen flex items-end overflow-hidden">
    <div className="absolute inset-0">
      <img src={data.heroImage} alt="IT Staff Augmentation" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/30" />
    </div>
    <div className="container mx-auto px-6 lg:px-12 relative z-10 pb-20 pt-40">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl">
        <motion.h1 variants={itemVariants} className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.05] mb-6 text-primary-foreground">
          {data.heroHeadline}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-base lg:text-lg text-primary-foreground/70 leading-relaxed max-w-xl mb-8">
          {data.heroSubheadline}
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
          {data.heroKeywords.map((kw) => (
            <span key={kw} className="px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase border border-primary-foreground/20 rounded-full text-primary-foreground/80">
              {kw}
            </span>
          ))}
        </motion.div>
        <motion.div variants={itemVariants}>
          <MagneticButton>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
              Hire Top Talent <ArrowUpRight size={16} />
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.span variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            Our IT Staff Augmentation Services
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-4 max-w-2xl">
            Staffing Solutions for Every <span className="text-primary italic">Need</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base lg:text-lg text-muted-foreground max-w-xl mb-16">
            Choose from our comprehensive range of staffing solutions designed to meet your unique business needs.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <motion.div key={svc.title} variants={itemVariants} className="group glass-panel rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <svc.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{svc.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{svc.description}</p>
                <ul className="space-y-2">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle size={14} className="text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ResourcesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 lg:py-32 section-border bg-[hsl(var(--card))]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.span variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            Our Resource Categories
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-4 max-w-2xl">
            Handpicked IT <span className="text-primary italic">Professionals</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base lg:text-lg text-muted-foreground max-w-xl mb-16">
            Aligned with your goals, tech stack & project timelines.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceCategories.map((cat) => (
              <motion.div key={cat.title} variants={itemVariants} className="glass-panel rounded-2xl p-8 hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <cat.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-4">{cat.title}</h3>
                <ul className="space-y-2">
                  {cat.skills.map((s) => (
                    <li key={s} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const IndustriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.span variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            Industries We Serve
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-4 max-w-2xl">
            Specialized <span className="text-primary italic">Expertise</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base lg:text-lg text-muted-foreground max-w-xl mb-16">
            We empower diverse industries by delivering specialized solutions and unmatched expertise.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind) => (
              <motion.div key={ind.name} variants={itemVariants} className="glass-panel rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <ind.icon size={22} className="text-primary" />
                </div>
                <p className="text-xs font-semibold text-foreground leading-snug">{ind.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const EngagementSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 lg:py-32 section-border bg-[hsl(var(--card))]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.span variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            Engagement Models
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-4 max-w-2xl">
            Flexible <span className="text-primary italic">Hiring</span> Structures
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base lg:text-lg text-muted-foreground max-w-xl mb-16">
            Choose from flexible hiring structures tailored to your unique project and budget requirements.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {engagementModels.map((model) => (
              <motion.div key={model.title} variants={itemVariants} className="glass-panel rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 text-center hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <model.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{model.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{model.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="glass-panel rounded-2xl p-6 border-primary/20 text-center">
            <p className="text-sm text-muted-foreground italic">
              Need stealth-mode developers? We also offer <span className="text-foreground font-semibold">white-labeled staffing</span> — our team works under your brand and communicates directly with your clients.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const HiringJourneySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.span variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            Our Hiring Journey
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-4 max-w-2xl">
            A Seamless <span className="text-primary italic">4-Step</span> Process
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base lg:text-lg text-muted-foreground max-w-xl mb-16">
            A meticulously crafted process to ensure smooth and seamless talent acquisition.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hiringSteps.map((step) => (
              <motion.div key={step.step} variants={itemVariants} className="relative">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-6">
                  <span className="font-display text-xl font-bold text-primary-foreground">{step.step}</span>
                </div>
                {step.step < 4 && (
                  <div className="hidden lg:block absolute top-7 left-16 w-[calc(100%-4rem)] h-px bg-border" />
                )}
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const WhyCybaemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 lg:py-32 section-border bg-[hsl(var(--card))]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.span variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            Why CybaemTech?
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-4 max-w-2xl">
            Structured, Strategic & <span className="text-primary italic">Focused</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base lg:text-lg text-muted-foreground max-w-xl mb-16">
            Partnering with us means working with a team that's structured, strategic, and focused on delivery excellence.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyCybaem.map((item) => (
              <motion.div key={item.title} variants={itemVariants} className="glass-panel rounded-2xl p-8 hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const GlobalDeliverySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.span variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            Proven Global Delivery
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-16 max-w-lg">
            Trusted Across <span className="text-primary italic">Continents</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {globalDelivery.map((g) => (
              <motion.div key={g.region} variants={itemVariants} className="glass-panel rounded-2xl p-6 text-center hover:border-primary/30 transition-all">
                <Globe size={20} className="text-primary mx-auto mb-3" />
                <h3 className="font-display text-base font-bold text-foreground mb-1">{g.region}</h3>
                <p className="text-xs text-muted-foreground">{g.focus}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 lg:py-32 section-border bg-[hsl(var(--card))]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-16">
            What Our Clients <span className="text-primary italic">Say</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-panel rounded-2xl p-8 relative">
                <Quote size={32} className="text-primary/20 absolute top-6 right-6" />
                <p className="text-base text-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const GuaranteesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.span variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            Trusted by global technology leaders
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-16 max-w-2xl">
            Our Delivery <span className="text-primary italic">Guarantees</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.guarantees.map((g) => (
              <motion.div key={g.label} variants={itemVariants} className="glass-panel rounded-2xl p-8 text-center">
                <span className="font-display text-3xl lg:text-4xl font-bold text-primary">{g.stat}</span>
                <p className="font-display font-semibold text-foreground mt-2 mb-1">{g.label}</p>
                <p className="text-sm text-muted-foreground">{g.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 lg:py-32 section-border bg-[hsl(var(--card))]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <motion.span variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
                Frequently Asked Questions
              </motion.span>
              <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-4xl font-bold leading-tight mb-8">
                {data.title} — Answered
              </motion.h2>
              <motion.div variants={itemVariants}>
                <Accordion type="single" collapsible className="space-y-3">
                  {data.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="glass-panel rounded-xl px-6 border">
                      <AccordionTrigger className="text-left font-display font-semibold text-sm hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="hidden lg:block sticky top-32">
              <div className="rounded-3xl overflow-hidden aspect-[3/4]">
                <img src={data.trustImages[0]} alt="IT Staff Augmentation" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const relatedTitles = data.relatedSlugs.map((s) => solutionsData[s]?.title || s);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary-foreground/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-primary-foreground/5 blur-2xl" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-center max-w-2xl mx-auto">
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-6">
            Ready to Hire Top IT Talent?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base text-primary-foreground/70 leading-relaxed mb-10">
            Cybaem Tech is your trusted global partner for flexible, scalable IT staff augmentation. Let's build your dream team — faster, smarter, and within budget.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <MagneticButton>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold bg-primary-foreground text-primary rounded-full hover:opacity-90 transition-opacity">
                Email Us <Mail size={16} />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold border border-primary-foreground/20 text-primary-foreground rounded-full hover:bg-primary-foreground/10 transition-all">
                Book a Call <ArrowUpRight size={16} />
              </Link>
            </MagneticButton>
          </motion.div>

          {data.relatedSlugs.length > 0 && (
            <motion.div variants={itemVariants} className="pt-8 border-t border-primary-foreground/15">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-primary-foreground/50 mb-4">Related Solutions</p>
              <div className="flex flex-wrap justify-center gap-3">
                {data.relatedSlugs.map((slug, i) => (
                  <Link key={slug} to={`/solutions/${slug}`} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-primary-foreground/20 rounded-full text-primary-foreground/80 hover:bg-primary-foreground/10 transition-all">
                    {relatedTitles[i]} <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Page ─── */

const ITStaffAugmentation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={solutionsSeoData["it-staff-augmentation"].metaTitle}
        description={solutionsSeoData["it-staff-augmentation"].metaDescription}
        canonical="/solutions/it-staff-augmentation"
        keywords={solutionsSeoData["it-staff-augmentation"].keywords}
        ogDescription={solutionsSeoData["it-staff-augmentation"].ogDescription}
        ogImageAlt={solutionsSeoData["it-staff-augmentation"].ogImageAlt}
        twitterDescription={solutionsSeoData["it-staff-augmentation"].twitterDescription}
        twitterImageAlt={solutionsSeoData["it-staff-augmentation"].twitterImageAlt}
        jsonLd={solutionsSeoData["it-staff-augmentation"].jsonLdSchemas}
      />
      <Navbar />
      <Hero />
      <ServicesSection />
      <ResourcesSection />
      <IndustriesSection />
      <EngagementSection />
      <HiringJourneySection />
      <WhyCybaemSection />
      <GlobalDeliverySection />
      <GuaranteesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default ITStaffAugmentation;
