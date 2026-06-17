// Portfolio data extracted from Cybaem's three portfolio PDFs

export const heroStats = [
  { value: "100+", label: "Platforms Launched" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "48 hrs", label: "Resource Deploy" },
  { value: "3×", label: "Avg Conversion Lift" },
  { value: "0.8s", label: "Avg Load Time" },
];

export interface CaseStudy {
  client: string;
  sector: string;
  product: string;
  description: string;
  tags: string[];
  metrics: { metric: string; result: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    client: "\n",
    sector: "Manufacturing / Process Engineering",
    product: "ITSM Tool + Site Engineer Ecosystem",
    description:
      "End-to-end IT service management with automated ticketing, SLA tracking & change management. Paired with a field-ops mobile app — offline-capable, real-time reporting and asset tracking for site engineers.",
    tags: ["ITSM", "Mobile-First", "Offline Mode", "AI Search", "Version Control", "Audit Trail"],
    metrics: [
      { metric: "Ticket Resolution", result: "40% Faster" },
      { metric: "Field Ops", result: "100% Mobile" },
      { metric: "SLA Breaches", result: "Near Zero" },
      { metric: "Doc Retrieval", result: "80% Faster" },
      { metric: "Audit Pass Rate", result: "100%" },
      { metric: "Version Conflicts", result: "Eliminated" },
    ],
  },
  {
    client: "\n",
    sector: "Chemicals / FMCG",
    product: "Document Management System",
    description:
      "AI-powered DMS with intelligent search, auto-classification, version control and compliance-ready audit trails — built for regulatory requirements in chemical manufacturing.",
    tags: ["AI Search", "Auto-Classification", "Compliance", "Audit Trail"],
    metrics: [
      { metric: "Doc Retrieval", result: "80% Faster" },
      { metric: "Audit Pass Rate", result: "100%" },
      { metric: "Version Conflicts", result: "Eliminated" },
    ],
  },
  {
    client: "\n",
    sector: "Pharma / Healthcare FMCG",
    product: "Custom / Tailored ERP",
    description:
      "Fully custom ERP — zero templates — covering production planning, inventory, procurement, sales, distribution, finance, compliance & HR. Designed around the client's exact operational DNA.",
    tags: ["Custom ERP", "10 Modules", "Pharma GMP", "Finance"],
    metrics: [
      { metric: "Modules Delivered", result: "Full 10-Module" },
      { metric: "Manual Work", result: "~65% Reduced" },
      { metric: "Compliance", result: "FDA / GMP" },
      { metric: "Pipeline Visibility", result: "+300% Lift" },
      { metric: "CRM Funnel", result: "AI-Scored" },
    ],
  },
  {
    client: "\n",
    sector: "Enterprise / SaaS",
    product: "Project Management Tool + CRM Ace",
    description:
      "Internal-use platforms being commercialised. Smart task automation & resource allocation for PM. AI-driven lead scoring, predictive pipeline management & customer insights for CRM — now packaged as market-ready SaaS.",
    tags: ["AI CRM", "Lead Scoring", "SaaS-Ready", "Task Automation"],
    metrics: [
      { metric: "Task Automation", result: "AI-Driven" },
      { metric: "Lead Scoring", result: "Predictive" },
      { metric: "Status", result: "Commercialising 2026" },
    ],
  },
];

export const productEcosystem = [
  { id: "01", name: "CRM Ace | Pro", desc: "Sales & Pipeline AI" },
  { id: "02", name: "Project Management", desc: "Task & Resource Mgmt" },
  { id: "03", name: "DMS", desc: "Doc Search & Compliance" },
  { id: "04", name: "ITSM Tool", desc: "Ticketing & SLA Mgmt" },
  { id: "05", name: "Site Engineer", desc: "Field Ops & Mobile" },
  { id: "06", name: "HR Management", desc: "Recruit to Payroll" },
];

export interface ProductRoadmap {
  name: string;
  progress: number;
  status: string;
  description: string;
}

export const productRoadmap: ProductRoadmap[] = [
  {
    name: "Psychometric Analysis System",
    progress: 25,
    status: "In Progress",
    description:
      "Live interview psychometric analysis integrating Generative AI for automated synthesis, enterprise ATS integrations, and continuous learning for bias mitigation.",
  },
  {
    name: "Business Card OCR & Extraction",
    progress: 80,
    status: "Achieved",
    description:
      "AI-driven extraction evolving to generative follow-up communications, automated CRM workflows, and edge-computing for offline capture.",
  },
  {
    name: "Cybaem Nexus CMS",
    progress: 100,
    status: "Live",
    description:
      "Custom-built Generative AI CMS powering cybaemtech.com — unifying marketing, HR, and operations with omnichannel lead capture and integrated ERP.",
  },
];

export const prototypes = [
  {
    name: "SEC Edgar & Stock Market Research App",
    description:
      "Web application for searching U.S. company financial reports and live Indian stock prices. Built with Python backend, React frontend.",
  },
  {
    name: "Financial Data API Platform",
    description:
      "REST API platform aggregating U.S. financial reports and live Indian stock data. Built with Python/FastAPI and React.",
  },
];

export const internalTools = [
  { name: "Billing Application", progress: 90 },
  { name: "ReqGen – Audio Based Requirement Generator", progress: 100 },
  { name: "License Management System (Zoho Books)", progress: 100 },
];

export interface WebClient {
  title: string;
  region: string;
  sector: string;
  category: string;
  outcome: string;
}

export const webClients: WebClient[] = [
  // Engineering & Manufacturing
  { title: "Indo-USA Industrial Tech Firm", region: "India · USA", sector: "Engineering", category: "Engineering & Manufacturing", outcome: "Full-stack engineering portal with project tracking, compliance workflows, and cross-border team coordination." },
  { title: "EV Manufacturer", region: "India", sector: "EV Manufacturing", category: "Engineering & Manufacturing", outcome: "Dealer & supply chain management platform with inventory visibility and real-time order status for an EV OEM." },
  { title: "Sustainable Materials Company", region: "India · UK", sector: "Manufacturing", category: "Engineering & Manufacturing", outcome: "Corporate website with ESG reporting module and investor-facing product documentation for an Indo-UK manufacturer." },
  { title: "Cold Engineering Firm", region: "UAE", sector: "Cold Engineering", category: "Engineering & Manufacturing", outcome: "Project quoting & field service management tool for a UAE-based cold-chain engineering company." },
  // Specialized Industrial
  { title: "Glass Manufacturing Company", region: "India", sector: "Glass Industry", category: "Specialized Industrial", outcome: "B2B catalogue & enquiry management web app for a specialty glass manufacturer serving commercial clients." },
  { title: "Green Materials Enterprise", region: "India · UK", sector: "Sustainability", category: "Specialized Industrial", outcome: "Digital presence and content strategy for a sustainability-focused industrial firm with Indo-UK operations." },
  // Lifestyle, Sports & Luxury
  { title: "Sports & Athletics Brand", region: "Northern Ireland", sector: "Sports & Athletics", category: "Lifestyle & Luxury", outcome: "E-commerce and membership platform for a regional sports brand, with event registrations and loyalty features." },
  { title: "Heritage Luxury Jewelry House", region: "UAE · Saudi Arabia", sector: "Luxury Jewelry", category: "Lifestyle & Luxury", outcome: "Luxury e-commerce experience with multi-currency support and GCC-optimized performance for a heritage silver jewelry brand." },
  { title: "Premium Beauty & Skincare Brand", region: "India · UAE", sector: "Beauty & Skincare", category: "Lifestyle & Luxury", outcome: "D2C e-commerce platform with personalized skincare routines, subscription management, and influencer-driven content integration." },
  { title: "Specialty Medicine & Wellness Co.", region: "India", sector: "Medicine & Wellness", category: "Lifestyle & Luxury", outcome: "HIPAA-aware digital storefront with appointment scheduling, product catalogue, and patient education portal for a wellness brand." },
  // Corporate & Trade
  { title: "Corporate Technology Firm", region: "UAE", sector: "Corporate", category: "Corporate & Trade", outcome: "Enterprise SaaS platform with custom CRM integration and executive-facing analytics dashboard for a UAE tech company." },
  { title: "Cybaem Tech", region: "India", sector: "Corporate", category: "Corporate & Trade", outcome: "Internal product suite including ERP, CRM, and project management tools powering operations across India, USA, UK, UAE & KSA." },
  { title: "Import-Export Trading Firm", region: "India", sector: "Import-Export", category: "Corporate & Trade", outcome: "Trade operations portal with shipment tracking, document management, and client-facing order visibility for an import-export firm." },
];

export const webCategories = [
  "All",
  "Engineering & Manufacturing",
  "Specialized Industrial",
  "Lifestyle & Luxury",
  "Corporate & Trade",
];

export const processSteps = [
  { step: "01", title: "Discovery & Scoping", desc: "Stakeholder workshops, requirement freeze, NDA & SOW lock" },
  { step: "02", title: "Architecture & Design", desc: "System design, tech stack, UI/UX wireframes, security plan" },
  { step: "03", title: "Agile Development", desc: "2-week sprints, daily standups, CI & continuous testing" },
  { step: "04", title: "QA & Security Audit", desc: "Automated + manual QA, penetration testing, ISO compliance" },
  { step: "05", title: "Deployment & Go-Live", desc: "Zero-downtime deploy, CI/CD pipeline, UAT sign-off" },
  { step: "06", title: "Support & Evolution", desc: "SLA monitoring, bug resolution, quarterly roadmap reviews" },
];
