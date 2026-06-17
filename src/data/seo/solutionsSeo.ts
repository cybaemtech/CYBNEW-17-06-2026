import { organizationSchema, professionalServiceSchema, websiteSchema } from "./commonSchemas";

interface SolutionSeo {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageAlt: string;
  twitterTitle?: string;
  twitterDescription: string;
  twitterImageAlt?: string;
  jsonLdSchemas: Record<string, unknown>[];
}

const breadcrumb = (name: string, slug: string): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `https://cybaemtech.com/solutions/${slug}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://cybaemtech.com/" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://cybaemtech.com/" },
    { "@type": "ListItem", position: 3, name, item: `https://cybaemtech.com/solutions/${slug}` },
  ],
});

const faqSchema = (id: string, faqs: { q: string; a: string }[]): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": id,
  mainEntity: faqs.map(({ q, a }, index) => ({
    "@type": "Question",
    "@id": `${id}#question-${index + 1}`,
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      "@id": `${id}#answer-${index + 1}`,
      text: a,
    },
  })),
});

const webpageSchema = (slug: string, name: string, desc: string): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `https://cybaemtech.com/solutions/${slug}#webpage`,
  url: `https://cybaemtech.com/solutions/${slug}`,
  name,
  description: desc,
  isPartOf: { "@id": "https://cybaemtech.com/#website" },
  about: { "@id": "https://cybaemtech.com/#organization" },
  primaryImageOfPage: { "@type": "ImageObject", url: "https://cybaemtech.com/assets/cybaem-logo-C5lgmAgK.png" },
});

export const solutionsSeoData: Record<string, SolutionSeo> = {
  "enterprise-software": {
    metaTitle: "Enterprise Software Development Company in Pune | Cybaem Tech",
    metaDescription: "Cybaem Tech builds AI-powered enterprise software, CRM, project management, DMS and ITSM solutions with secure, ISO-certified delivery for scalable business growth.",
    keywords: "enterprise software development company Pune, custom enterprise software, AI powered enterprise software, CRM development company, project management software development, document management system, ITSM software, enterprise application development India, business software solutions Pune, custom software development company",
    ogDescription: "Build enterprise software that scales with AI-powered CRM, DMS, ITSM and project management systems from Cybaem Tech.",
    ogImageAlt: "Cybaem Tech enterprise software solutions",
    twitterDescription: "AI-powered enterprise software, CRM, DMS, ITSM and workflow systems built for scale, security and performance.",
    twitterImageAlt: "Cybaem Tech enterprise software solutions",
    jsonLdSchemas: [
      organizationSchema("Cybaem Tech Pvt. Ltd. is a technology solutions company delivering enterprise software development, managed IT services, cloud computing, cyber security and digital growth solutions."),
      professionalServiceSchema(),
      websiteSchema,
      webpageSchema("enterprise-software", "Enterprise Software Development Company in Pune | Cybaem Tech", "Cybaem Tech delivers AI-powered enterprise software including CRM, project management, DMS and ITSM solutions with secure, scalable deployment."),
      breadcrumb("Enterprise Software", "enterprise-software"),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://cybaemtech.com/solutions/enterprise-software#service",
        name: "Enterprise Software Development",
        url: "https://cybaemtech.com/solutions/enterprise-software",
        serviceType: "Enterprise Software Development",
        provider: { "@id": "https://cybaemtech.com/#organization" },
        areaServed: "India",
        description: "Custom enterprise software development services including AI-powered CRM, project management systems, document management systems and ITSM tools.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Enterprise Software Solutions",
          itemListElement: ["CRM Development", "Project Management Software Development", "Document Management System Development", "ITSM Software Development", "Custom Enterprise Application Development"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      },
      {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "SoftwareApplication", "@id": "https://cybaemtech.com/solutions/enterprise-software#cybaem-nova", name: "Cybaem Nova", applicationCategory: "BusinessApplication", operatingSystem: "Web", creator: { "@id": "https://cybaemtech.com/#organization" }, description: "AI-powered CRM with predictive lead scoring, automated pipeline management and customer insights." },
          { "@type": "SoftwareApplication", "@id": "https://cybaemtech.com/solutions/enterprise-software#project-management-tool", name: "Project Management Tool", applicationCategory: "BusinessApplication", operatingSystem: "Web", creator: { "@id": "https://cybaemtech.com/#organization" }, description: "Project management software with task automation, resource allocation, milestone tracking and team collaboration." },
          { "@type": "SoftwareApplication", "@id": "https://cybaemtech.com/solutions/enterprise-software#document-management-system", name: "Document Management System", applicationCategory: "BusinessApplication", operatingSystem: "Web", creator: { "@id": "https://cybaemtech.com/#organization" }, description: "AI-powered document search, classification, version control and compliance-ready audit trails." },
          { "@type": "SoftwareApplication", "@id": "https://cybaemtech.com/solutions/enterprise-software#itsm-tool", name: "ITSM Tool", applicationCategory: "BusinessApplication", operatingSystem: "Web", creator: { "@id": "https://cybaemtech.com/#organization" }, description: "IT service management software with automated ticketing, SLA tracking, change management and self-service portal." },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Review",
        "@id": "https://cybaemtech.com/solutions/enterprise-software#review",
        itemReviewed: { "@id": "https://cybaemtech.com/solutions/enterprise-software#service" },
        reviewBody: "Cybaem Tech's CRM Ace Pro transformed our entire sales pipeline — deployment was flawless, secure, and fully aligned with our enterprise standards.",
        author: { "@type": "Person", name: "Jordan Ellis" },
        publisher: { "@id": "https://cybaemtech.com/#organization" },
      },
      faqSchema("https://cybaemtech.com/solutions/enterprise-software#faq", [
        { q: "What AI-powered products has Cybaem built?", a: "Cybaem Tech builds AI-powered enterprise products such as CRM systems, project management platforms, document management systems and ITSM tools." },
        { q: "How does Cybaem CRM differ from off-the-shelf CRMs?", a: "Cybaem CRM is custom-built for enterprise rollout, secure adoption, workflow alignment and business-specific needs instead of generic one-size-fits-all functionality." },
        { q: "How long does a typical enterprise software project take?", a: "Enterprise software timelines depend on scope, integrations and deployment needs, but Cybaem Tech follows structured delivery to accelerate rollout without compromising quality." },
        { q: "Can you integrate with our existing legacy systems?", a: "Yes, Cybaem Tech can integrate enterprise software with legacy systems, internal workflows and third-party platforms while maintaining security and business continuity." },
        { q: "Do you provide secure and compliant software delivery?", a: "Yes, Cybaem Tech follows ISO-certified delivery standards, enterprise-grade security practices and structured deployment processes for secure software implementation." },
      ]),
    ],
  },

  "web-systems": {
    metaTitle: "Website Development Company in Pune | Web Systems & Platforms",
    metaDescription: "Cybaem Tech builds secure, conversion-focused websites, eCommerce stores, landing pages, SaaS platforms and custom web systems for scalable business growth.",
    keywords: "website development company Pune, web development company Pune, custom website development, ecommerce website development, landing page design company, SaaS development company, web application development, business website development, conversion focused websites, enterprise web systems India",
    ogDescription: "Build high-converting websites, eCommerce stores, landing pages, SaaS platforms and custom web systems with Cybaem Tech.",
    ogImageAlt: "Cybaem Tech web systems and website development solutions",
    twitterDescription: "Secure, fast and conversion-optimized web systems including websites, eCommerce stores, landing pages and SaaS applications.",
    twitterImageAlt: "Cybaem Tech web systems and website development solutions",
    jsonLdSchemas: [
      organizationSchema("Cybaem Tech Pvt. Ltd. is a technology solutions company delivering website development, custom web systems, eCommerce development, SaaS platforms, managed IT services and digital growth solutions."),
      professionalServiceSchema(),
      websiteSchema,
      webpageSchema("web-systems", "Website Development Company in Pune | Web Systems & Platforms", "Cybaem Tech builds secure, high-performance and conversion-optimized websites, eCommerce stores, SaaS applications and custom web systems."),
      breadcrumb("Web Systems", "web-systems"),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://cybaemtech.com/solutions/web-systems#service",
        name: "Web Systems & Website Development",
        url: "https://cybaemtech.com/solutions/web-systems",
        serviceType: "Website Development and Web Systems",
        provider: { "@id": "https://cybaemtech.com/#organization" },
        areaServed: "India",
        description: "Custom website development and web platform services including business websites, eCommerce websites, landing pages, blogs, SaaS platforms, web applications and educational portals.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Systems Services",
          itemListElement: ["Business Website Development", "Corporate Website Development", "eCommerce Website Development", "Portfolio Website Development", "Landing Page Design and Development", "Blog Website Development", "SaaS Platform Development", "Web Application Development", "Educational and Information Portal Development"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      },
      faqSchema("https://cybaemtech.com/solutions/web-systems#faq", [
        { q: "What types of web systems does Cybaem Tech build?", a: "Cybaem Tech builds business websites, corporate websites, eCommerce stores, portfolio websites, landing pages, blogs, SaaS platforms, web applications and educational portals." },
        { q: "Do you build custom websites for businesses?", a: "Yes, Cybaem Tech develops custom websites tailored to business goals, brand identity, performance needs and conversion requirements." },
        { q: "Can Cybaem Tech develop eCommerce websites?", a: "Yes, Cybaem Tech builds secure eCommerce websites with product catalogs, shopping carts, payment gateway integration and conversion-focused design." },
        { q: "Do you create landing pages for campaigns?", a: "Yes, Cybaem Tech creates high-converting landing pages designed for specific campaigns, lead generation and call-to-action performance." },
        { q: "Do you build SaaS platforms and web applications?", a: "Yes, Cybaem Tech develops SaaS platforms and custom web applications with authentication, dashboards, workflow tools and scalable architecture." },
        { q: "How fast and secure are your web systems?", a: "Cybaem Tech builds web systems with enterprise-grade security, performance-first architecture and optimized load times to support reliability and conversions." },
      ]),
    ],
  },

  "it-staff-augmentation": {
    metaTitle: "IT Staff Augmentation Company in Pune | Hire IT Engineers Fast",
    metaDescription: "Hire pre-vetted IT engineers in 48 hours with Cybaem Tech. IT staff augmentation for developers, DevOps, cybersecurity, QA, support, cloud and infrastructure teams.",
    keywords: "IT staff augmentation company Pune, staff augmentation services India, hire dedicated developers, remote IT specialists, IT staffing company Pune, DevOps engineers for hire, cybersecurity engineers for hire, QA testing engineers, helpdesk outsourcing, contract IT hiring, offshore IT staffing, dedicated IT team",
    ogDescription: "Scale faster with pre-vetted developers, DevOps, cloud, QA, support and cybersecurity engineers deployed in as little as 48 hours.",
    ogImageAlt: "Cybaem Tech IT staff augmentation services",
    twitterDescription: "Embed elite IT professionals into your team with flexible hiring models, 48-hour deployment and ongoing support from Cybaem Tech.",
    twitterImageAlt: "Cybaem Tech IT staff augmentation services",
    jsonLdSchemas: [
      organizationSchema("Cybaem Tech Pvt. Ltd. provides IT staff augmentation, software development, cloud, cybersecurity, managed IT services and digital growth solutions."),
      professionalServiceSchema(),
      websiteSchema,
      webpageSchema("it-staff-augmentation", "IT Staff Augmentation Company in Pune | Hire IT Engineers Fast", "Cybaem Tech provides IT staff augmentation services with pre-vetted developers, cloud engineers, QA experts, cybersecurity talent and support professionals."),
      breadcrumb("IT Staff Augmentation", "it-staff-augmentation"),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://cybaemtech.com/solutions/it-staff-augmentation#service",
        name: "IT Staff Augmentation",
        url: "https://cybaemtech.com/solutions/it-staff-augmentation",
        serviceType: "IT Staff Augmentation Services",
        provider: { "@id": "https://cybaemtech.com/#organization" },
        areaServed: "India",
        description: "IT staff augmentation services with dedicated onsite engineers, remote IT specialists, project-based staffing, helpdesk outsourcing, system admins and long-term contract hiring.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "IT Staff Augmentation Services",
          itemListElement: ["Dedicated Onsite IT Engineers", "Remote IT Specialists", "Project-Based Staffing", "Helpdesk Outsourcing", "Network and System Administration Staffing", "Contract and Long-Term IT Hiring"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": "https://cybaemtech.com/solutions/it-staff-augmentation#talent-categories",
        name: "IT Talent Categories",
        itemListElement: ["Software and Web Developers", "Cloud and DevOps Engineers", "IT Support and Infrastructure Professionals", "Cybersecurity and Compliance Engineers", "QA and Testing Engineers", "IT Recruiters and Coordinators"].map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
      },
      {
        "@context": "https://schema.org",
        "@type": "Review",
        "@id": "https://cybaemtech.com/solutions/it-staff-augmentation#review-1",
        itemReviewed: { "@id": "https://cybaemtech.com/solutions/it-staff-augmentation#service" },
        reviewBody: "Cybaem Tech helped us scale quickly with a dedicated DevOps team. Reliable, fast onboarding, and quality delivery!",
        author: { "@type": "Person", name: "Michael Torres" },
        publisher: { "@id": "https://cybaemtech.com/#organization" },
      },
      {
        "@context": "https://schema.org",
        "@type": "Review",
        "@id": "https://cybaemtech.com/solutions/it-staff-augmentation#review-2",
        itemReviewed: { "@id": "https://cybaemtech.com/solutions/it-staff-augmentation#service" },
        reviewBody: "Their IT support engineers work as an extension of our team. Exceptional response time and professionalism.",
        author: { "@type": "Person", name: "Amanda Chen" },
        publisher: { "@id": "https://cybaemtech.com/#organization" },
      },
      faqSchema("https://cybaemtech.com/solutions/it-staff-augmentation#faq", [
        { q: "How quickly can you place an engineer on our project?", a: "Cybaem Tech can typically provide matched and verified candidate profiles within 24 to 48 hours, depending on the role and project requirements." },
        { q: "How do you ensure quality and cultural fit?", a: "Cybaem Tech screens candidates based on technical expertise, project alignment, communication skills and team fit to ensure smooth integration into your workflows." },
        { q: "What if an engineer is not the right fit?", a: "If a resource is not the right fit, Cybaem Tech supports a structured replacement process to minimize disruption and maintain delivery continuity." },
        { q: "Can we convert augmented staff to full-time hires?", a: "Yes, Cybaem Tech supports flexible engagement models, including contract-to-hire and long-term hiring arrangements, based on your needs." },
        { q: "What roles can you provide through IT staff augmentation?", a: "Cybaem Tech provides software developers, web developers, cloud and DevOps engineers, IT support specialists, cybersecurity professionals, QA engineers, recruiters and infrastructure experts." },
        { q: "What hiring models do you support?", a: "Cybaem Tech supports hourly, monthly dedicated, project-based and onsite plus offshore hybrid engagement models." },
      ]),
    ],
  },

  "managed-it-cloud-security": {
    metaTitle: "Managed IT & Cloud Security Services in Pune | 24/7 NOC & Zero Trust",
    metaDescription: "Secure your infrastructure with Cybaem Tech's managed IT and cloud security services. 24/7 NOC monitoring, Zero Trust security, cloud migration, and enterprise-grade protection.",
    keywords: "managed IT services Pune, cloud security services India, 24/7 NOC monitoring, Zero Trust security solutions, cloud migration services, IT infrastructure management, cybersecurity services Pune, managed cloud services, IT support services, enterprise security solutions",
    ogTitle: "Managed IT & Cloud Security Services | 24/7 NOC & Zero Trust",
    ogDescription: "Enterprise-grade IT infrastructure protection with 24/7 monitoring, cloud security, Zero Trust architecture, and seamless cloud migrations.",
    ogImageAlt: "Managed IT and cloud security services by Cybaem Tech",
    twitterTitle: "Managed IT & Cloud Security Services | 24/7 Monitoring",
    twitterDescription: "Protect your infrastructure with 24/7 NOC monitoring, Zero Trust security, and cloud-native protection solutions.",
    jsonLdSchemas: [
      { "@context": "https://schema.org", "@type": "Organization", "@id": "https://cybaemtech.com/#organization", name: "Cybaem Tech Pvt. Ltd.", url: "https://cybaemtech.com/", logo: "https://cybaemtech.com/assets/cybaem-logo-C5lgmAgK.png", email: "sales@cybaemtech.com", telephone: "+91-9028541383", description: "Cybaem Tech delivers managed IT services, cloud security, NOC monitoring, Zero Trust architecture and enterprise infrastructure solutions." },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://cybaemtech.com/solutions/managed-it-cloud-security#webpage",
        url: "https://cybaemtech.com/solutions/managed-it-cloud-security",
        name: "Managed IT & Cloud Security Services in Pune",
        description: "Enterprise-grade infrastructure protection with 24/7 monitoring, cloud migration, and Zero Trust security.",
        isPartOf: { "@id": "https://cybaemtech.com/#website" },
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://cybaemtech.com/solutions/managed-it-cloud-security#service",
        name: "Managed IT & Cloud Security Services",
        serviceType: "Managed IT Services and Cloud Security",
        provider: { "@id": "https://cybaemtech.com/#organization" },
        areaServed: "India",
        description: "Managed IT and cloud security services including 24/7 NOC monitoring, cloud migration, Zero Trust architecture, infrastructure protection and cybersecurity management.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Managed IT Services",
          itemListElement: ["24/7 NOC Monitoring", "Cloud Migration Services", "Zero Trust Security Implementation", "Infrastructure Security Management", "Cloud Security & Compliance"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      },
      breadcrumb("Managed IT & Cloud Security", "managed-it-cloud-security"),
      {
        "@context": "https://schema.org",
        "@type": "Review",
        reviewBody: "Zero security incidents since Cybaem took over our infrastructure. Their 24/7 NOC gives us peace of mind we never had before.",
        author: { "@type": "Person", name: "Amanda Chen" },
        itemReviewed: { "@id": "https://cybaemtech.com/solutions/managed-it-cloud-security#service" },
      },
      faqSchema("https://cybaemtech.com/solutions/managed-it-cloud-security#faq", [
        { q: "What does 24/7 NOC monitoring include?", a: "24/7 NOC monitoring includes continuous infrastructure monitoring, incident detection, performance tracking, and real-time response to ensure uptime and security." },
        { q: "How do you handle cloud migration without downtime?", a: "We use phased migration strategies, redundancy planning, and real-time testing to ensure minimal or zero downtime during cloud transitions." },
        { q: "What is Zero Trust security?", a: "Zero Trust security ensures that no user or system is trusted by default. Every access request is verified, authenticated, and continuously monitored." },
        { q: "Can you manage hybrid cloud environments?", a: "Yes, we manage hybrid cloud environments by integrating on-premise and cloud systems with centralized monitoring, security controls, and performance optimization." },
      ]),
    ],
  },

  "digital-revenue-growth": {
    metaTitle: "Digital Revenue Growth Services | B2B & D2C Performance Marketing Agency",
    metaDescription: "Scale predictable revenue with Cybaem Tech's digital growth engineering. SEO, Google Ads, CRO, LinkedIn marketing, and automation systems built for B2B & D2C brands.",
    keywords: "digital marketing agency Pune, performance marketing agency India, B2B lead generation services, SEO services India, Google Ads agency, conversion rate optimization services, LinkedIn marketing B2B, marketing automation services, revenue growth strategy, growth marketing agency",
    ogTitle: "Digital Revenue Growth Services | Performance Marketing Experts",
    ogDescription: "We don't just run ads — we build revenue systems. SEO, paid ads, CRO, and automation to generate predictable growth for B2B & D2C brands.",
    ogImageAlt: "Digital revenue growth services by Cybaem Tech",
    twitterTitle: "Digital Revenue Growth Engineering | Cybaem Tech",
    twitterDescription: "SEO, Ads, CRO & automation systems designed for predictable revenue growth.",
    jsonLdSchemas: [
      { "@context": "https://schema.org", "@type": "Organization", "@id": "https://cybaemtech.com/#organization", name: "Cybaem Tech Pvt. Ltd.", url: "https://cybaemtech.com/", logo: "https://cybaemtech.com/assets/cybaem-logo-C5lgmAgK.png", email: "sales@cybaemtech.com", telephone: "+91-9028541383", description: "Cybaem Tech is a performance-driven digital growth partner offering SEO, paid ads, CRO, LinkedIn marketing, and marketing automation solutions." },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://cybaemtech.com/solutions/digital-revenue-growth#webpage",
        url: "https://cybaemtech.com/solutions/digital-revenue-growth",
        name: "Digital Revenue Growth Services",
        description: "Performance-driven digital marketing systems including SEO, paid ads, CRO and automation for scalable growth.",
        isPartOf: { "@id": "https://cybaemtech.com/#website" },
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://cybaemtech.com/solutions/digital-revenue-growth#service",
        name: "Digital Revenue Growth Services",
        serviceType: "Performance Marketing & Growth Engineering",
        provider: { "@id": "https://cybaemtech.com/#organization" },
        areaServed: "India",
        description: "End-to-end digital growth services including SEO, paid ads, conversion optimization, LinkedIn marketing, and marketing automation to drive predictable revenue.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Growth Services",
          itemListElement: ["SEO Services (AEO, GEO, SXO)", "Google Ads & Performance Marketing", "Conversion Rate Optimization (CRO)", "LinkedIn Marketing for B2B", "Marketing Automation & CRM Integration"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      },
      breadcrumb("Digital Revenue Growth", "digital-revenue-growth"),
      faqSchema("https://cybaemtech.com/solutions/digital-revenue-growth#faq", [
        { q: "What makes Cybaem Tech different from other digital marketing agencies?", a: "Cybaem Tech focuses on building complete revenue systems instead of isolated campaigns. We combine SEO, paid ads, CRO, and automation to create predictable and scalable growth." },
        { q: "Do you provide B2B lead generation services?", a: "Yes, we specialize in B2B lead generation using SEO, LinkedIn marketing, Google Ads, and funnel optimization strategies." },
        { q: "How do you reduce cost per lead (CPL)?", a: "We improve targeting, optimize landing pages, implement CRO strategies, and refine campaign structures to reduce cost per lead while increasing quality." },
        { q: "Do you offer performance marketing for D2C brands?", a: "Yes, we provide full-funnel performance marketing for D2C brands including product visibility, paid ads, retention marketing, and conversion optimization." },
        { q: "Do you provide marketing automation services?", a: "Yes, we implement marketing automation systems including CRM integration, email workflows, lead scoring, and nurturing funnels." },
      ]),
    ],
  },
};
