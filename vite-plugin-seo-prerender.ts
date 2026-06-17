import type { Plugin } from "vite";
import fs from "fs";
import path from "path";

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageAlt?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImageAlt?: string;
  jsonLd?: object[];
}

const BASE_URL = "https://cybaemtech.com";
const OG_IMAGE = "https://cybaemtech.com/assets/cybaem-logo-C5lgmAgK.png";
const AUTHOR = "Cybaem Tech Pvt Ltd";
const THEME_COLOR = "#1f5b8f";
const ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

/* ── Shared JSON-LD building blocks ── */

const org = (desc?: string) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Cybaem Tech Pvt. Ltd.",
  url: `${BASE_URL}/`,
  logo: OG_IMAGE,
  email: "sales@cybaemtech.com",
  telephone: "+91-9028541383",
  foundingDate: "2020",
  founder: { "@type": "Person", name: "Rohan Bhosale" },
  description: desc || "Cybaem Tech Pvt. Ltd. is a premier global technology solutions company specializing in IT infrastructure management, software development services, cloud computing solutions, managed IT services, cyber security and digital marketing solutions.",
  sameAs: [
    "https://in.linkedin.com/company/cybaemtech",
    "https://x.com/Cybaem_Tech",
    "https://www.facebook.com/cybaemtech/",
    "https://www.instagram.com/cybaemtech/",
    "https://www.youtube.com/@cybaemtech",
  ],
  contactPoint: [
    { "@type": "ContactPoint", contactType: "sales", telephone: "+91-9028541383", email: "sales@cybaemtech.com", areaServed: "IN", availableLanguage: ["en"] },
  ],
});

const profService = (id?: string) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": id || `${BASE_URL}/#localbusiness`,
  name: "Cybaem Tech Pvt. Ltd.",
  image: OG_IMAGE,
  url: `${BASE_URL}/`,
  telephone: "+91-9028541383",
  email: "sales@cybaemtech.com",
  address: { "@type": "PostalAddress", streetAddress: "Suratwala Mark Plazzo, Hinjawadi", addressLocality: "Pune", addressRegion: "Maharashtra", postalCode: "411057", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 18.5912, longitude: 73.7389 },
  areaServed: [{ "@type": "City", name: "Pune" }, { "@type": "Country", name: "India" }],
});

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: `${BASE_URL}/`,
  name: "Cybaem Tech",
  publisher: { "@id": `${BASE_URL}/#organization` },
};

const breadcrumb2 = (name: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name, item: `${BASE_URL}${url}` },
  ],
});

const breadcrumb3 = (parentName: string, parentUrl: string, name: string, url: string, id?: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  ...(id ? { "@id": id } : {}),
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: parentName, item: `${BASE_URL}${parentUrl}` },
    { "@type": "ListItem", position: 3, name, item: `${BASE_URL}${url}` },
  ],
});

const faq = (items: { q: string; a: string }[], id?: string) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  ...(id ? { "@id": id } : {}),
  name: "FAQ",
  mainEntity: items.map(({ q, a }, index) => ({
    "@type": "Question",
    ...(id ? { "@id": `${id}/question-${index + 1}` } : {}),
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      ...(id ? { "@id": `${id}/answer-${index + 1}` } : {}),
      text: a,
    },
  })),
});

const webpage = (url: string, name: string, desc: string, id?: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  ...(id ? { "@id": id } : {}),
  url: `${BASE_URL}${url}`,
  name,
  description: desc,
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#organization` },
  primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
});

/* ── Route meta definitions ── */

const routes: Record<string, RouteMeta> = {
  "/": {
    title: "Cybaem Tech | IT, Security & Marketing Services",
    description: "Cybaem Tech Pvt Ltd delivers managed IT services, software development, cyber security, IT support, website development and digital marketing solutions across Pune, Mumbai, Bangalore and India.",
    canonical: "/",
    keywords: "IT services company Pune, managed IT services India, software development company Pune Mumbai Bangalore, IT staff augmentation, cyber security services India, remote IT support, website development company, custom website development, eCommerce development, digital marketing services, SEO company Pune, cloud computing solutions India, IT infrastructure management, manufacturing ERP, pharma compliance software",
    ogTitle: "Cybaem Tech Pvt Ltd | IT Services & Software Company in Pune",
    ogDescription: "Managed IT services, software development, cyber security, website development and digital marketing solutions for business growth.",
    ogImageAlt: "Cybaem Tech Pvt Ltd logo",
    twitterTitle: "Cybaem Tech Pvt Ltd | IT Services & Software Company in Pune",
    twitterDescription: "Scale with managed IT, development, cyber security and digital growth solutions from Cybaem Tech.",
    twitterImageAlt: "Cybaem Tech Pvt Ltd logo",
    jsonLd: [
      org(),
      { ...profService(), priceRange: "$$" },
      website,
      {
        "@context": "https://schema.org", "@type": "WebPage", "@id": `${BASE_URL}/#webpage`,
        url: `${BASE_URL}/`,
        name: "IT Services Company in Pune | Cybaem Tech Pvt Ltd",
        description: "Cybaem Tech provides managed IT services, software development, cyber security, IT support, website development, eCommerce development and digital marketing services.",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#organization` },
        primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
      },
      {
        "@context": "https://schema.org", "@type": "Service", "@id": `${BASE_URL}/#services`,
        name: "IT and Digital Services",
        provider: { "@id": `${BASE_URL}/#organization` },
        areaServed: "India",
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: "Cybaem Tech Services",
          itemListElement: [
            "Managed IT Services", "Software Development Services", "IT Staff Augmentation",
            "Cyber Security Services", "Remote IT Support", "IT Support Services",
            "Website Development", "Custom Website Development", "eCommerce Development",
            "Digital Marketing Services",
          ].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
        },
      },
      faq([
        { q: "What services does Cybaem Tech provide?", a: "Cybaem Tech provides managed IT services, software development, IT staff augmentation, cyber security, remote IT support, website development, eCommerce development and digital marketing services." },
        { q: "Where is Cybaem Tech located?", a: "Cybaem Tech Pvt Ltd is located at Suratwala Mark Plazzo, Hinjawadi, Pune, Maharashtra 411057, India." },
        { q: "Do you offer digital marketing and website development services?", a: "Yes, Cybaem Tech offers digital marketing, SEO, website development, custom website development and eCommerce development services." },
        { q: "Do you provide managed IT and cyber security services?", a: "Yes, Cybaem Tech provides managed IT services, remote IT support, cyber security and infrastructure support for businesses." },
      ], `${BASE_URL}/#faq`),
    ],
  },

  "/about": {
    title: "About Cybaem Tech Pvt Ltd | IT Services Company in Pune",
    description: "Learn about Cybaem Tech Pvt Ltd, a Pune-based IT services company founded in 2020, delivering software development, IT infrastructure, cloud, security and digital growth solutions.",
    canonical: "/about",
    keywords: "about Cybaem Tech, Cybaem Tech Pvt Ltd, IT services company Pune, software development company Pune, cloud computing solutions India, IT infrastructure management company, cyber security services Pune, managed IT services company India, digital marketing company Pune",
    ogDescription: "Know Cybaem Tech Pvt Ltd, a global technology solutions company offering IT infrastructure, software development, cloud, security and digital growth services.",
    ogImageAlt: "Cybaem Tech Pvt Ltd - IT services company in Pune",
    twitterDescription: "Cybaem Tech Pvt Ltd delivers software, cloud, IT infrastructure, security and digital growth solutions for modern businesses.",
    jsonLd: [
      org("Cybaem Tech Pvt. Ltd. is a premier global technology solutions company specializing in IT infrastructure management, software development, cloud computing, cyber security, managed IT services and digital marketing solutions."),
      profService(`${BASE_URL}/about#localbusiness`),
      {
        "@context": "https://schema.org", "@type": "AboutPage", "@id": `${BASE_URL}/about#aboutpage`,
        url: `${BASE_URL}/about`,
        name: "About Cybaem Tech Pvt Ltd",
        description: "Cybaem Tech Pvt Ltd is a global IT services company founded in 2020 providing software, cloud, infrastructure and digital solutions.",
        mainEntity: { "@id": `${BASE_URL}/#organization` },
      },
      faq([
        { q: "What does Cybaem Tech do?", a: "Cybaem Tech provides IT infrastructure management, software development, cloud computing, cyber security, managed IT services and digital marketing solutions." },
        { q: "Where is Cybaem Tech located?", a: "Cybaem Tech Pvt Ltd is located in Hinjawadi, Pune, Maharashtra, India." },
        { q: "Who founded Cybaem Tech?", a: "Cybaem Tech was founded in 2020 by Rohan Bhosale." },
      ], `${BASE_URL}/about#faq`),
    ],
  },

  "/approach": {
    title: "Our Approach | Leadership, Partnerships & Technology Excellence",
    description: "Explore Cybaem Tech's approach to leadership, strategic partnerships, innovation, company culture and technology excellence that drives scalable business growth.",
    canonical: "/approach",
    keywords: "Cybaem Tech approach, IT company leadership, technology partnerships, strategic partnerships, IT consulting company Pune, innovation driven technology company, digital marketing leadership, enterprise IT approach, company culture technology, software company values Pune",
    ogDescription: "Discover Cybaem Tech's leadership philosophy, strategic partnerships, innovation culture and business-first technology approach.",
    ogImageAlt: "Cybaem Tech leadership and partnership approach",
    twitterDescription: "See how Cybaem Tech combines leadership, innovation, partnerships and culture to deliver world-class technology solutions.",
    twitterImageAlt: "Cybaem Tech leadership and partnership approach",
    jsonLd: [
      org("Cybaem Tech Pvt. Ltd. is a global technology solutions company specializing in IT infrastructure management, software development, cloud computing, cyber security, managed IT services and digital marketing solutions."),
      profService(),
      website,
      webpage("/approach", "Our Approach | Leadership, Partnerships & Technology Excellence", "Explore Cybaem Tech's leadership philosophy, strategic partnerships, innovation mindset, team culture and technology-driven approach to business growth.", `${BASE_URL}/approach#webpage`),
      {
        "@context": "https://schema.org", "@type": "AboutPage", "@id": `${BASE_URL}/approach#aboutpage`,
        url: `${BASE_URL}/approach`,
        name: "Cybaem Tech Approach",
        description: "Cybaem Tech's approach combines visionary leadership, strategic partnerships, innovation, customer-centric execution, team culture and technology excellence.",
        mainEntity: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": `${BASE_URL}/approach#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Approach", item: `${BASE_URL}/approach` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "Person", "@id": `${BASE_URL}/approach#rohan-bhosale`, name: "Rohan Bhosale", jobTitle: "Founder & CEO", worksFor: { "@id": `${BASE_URL}/#organization` }, description: "Founder and CEO of Cybaem Tech with 18+ years of experience in global IT strategy and digital marketing." },
          { "@type": "Person", "@id": `${BASE_URL}/approach#akshay-navale`, name: "Akshay Navale", jobTitle: "Chief Technology Officer", worksFor: { "@id": `${BASE_URL}/#organization` }, description: "Chief Technology Officer at Cybaem Tech with 15+ years of experience in AI strategy, product leadership, cybersecurity and cloud infrastructure." },
          { "@type": "Person", "@id": `${BASE_URL}/approach#yash-bhalekar`, name: "Yash Bhalekar", jobTitle: "Director", worksFor: { "@id": `${BASE_URL}/#organization` }, description: "Director at Cybaem Tech with 12+ years of experience in business development, fintech solutions, investment strategy and risk management." },
        ],
      },
      faq([
        { q: "What is Cybaem Tech's approach to technology solutions?", a: "Cybaem Tech follows a customer-centric, innovation-driven approach built on strong leadership, strategic partnerships, quality execution and scalable technology solutions." },
        { q: "Who leads Cybaem Tech?", a: "Cybaem Tech is led by Rohan Bhosale, Founder and CEO, along with Akshay Navale, Chief Technology Officer, and Yash Bhalekar, Director." },
        { q: "What values define Cybaem Tech?", a: "Cybaem Tech is guided by innovation, collaboration, continuous learning, diversity and inclusion, excellence, work-life balance and customer-centric execution." },
        { q: "Why are partnerships important to Cybaem Tech?", a: "Strategic partnerships help Cybaem Tech deliver world-class technology solutions, expand capabilities and provide specialized expertise across the technology stack." },
      ], `${BASE_URL}/approach#faq`),
    ],
  },

  "/contact": {
    title: "Contact Cybaem Tech | IT Services Company in Pune",
    description: "Contact Cybaem Tech Pvt Ltd in Pune for managed IT services, software development, cyber security, website development and digital marketing solutions.",
    canonical: "/contact",
    keywords: "contact Cybaem Tech, IT company contact Pune, software development company Pune contact, managed IT services Pune, cyber security company Pune contact, website development company Pune, digital marketing agency Pune, IT support company Pune",
    ogDescription: "Connect with Cybaem Tech for software development, managed IT, cyber security, website development and digital marketing solutions.",
    ogImageAlt: "Cybaem Tech contact page",
    twitterDescription: "Talk to Cybaem Tech for managed IT, software, cyber security and digital growth solutions.",
    twitterImageAlt: "Cybaem Tech contact page",
    jsonLd: [
      {
        ...org("Cybaem Tech Pvt. Ltd. is a global technology solutions company specializing in managed IT services, software development, cloud computing, cyber security, website development and digital marketing solutions."),
        contactPoint: [
          { "@type": "ContactPoint", contactType: "sales", telephone: "+91-9028541383", email: "sales@cybaemtech.com", areaServed: "IN", availableLanguage: ["en"] },
          { "@type": "ContactPoint", contactType: "business", telephone: "+91-2069010200", areaServed: "IN", availableLanguage: ["en"] },
          { "@type": "ContactPoint", contactType: "customer support", telephone: "+91-8484815905", areaServed: "IN", availableLanguage: ["en"] },
        ],
      },
      { ...profService(`${BASE_URL}/contact#localbusiness`), priceRange: "$$" },
      website,
      {
        "@context": "https://schema.org", "@type": "ContactPage", "@id": `${BASE_URL}/contact#contactpage`,
        url: `${BASE_URL}/contact`, name: "Contact Cybaem Tech",
        description: "Contact Cybaem Tech Pvt Ltd for software development, managed IT services, cyber security, website development and digital marketing solutions.",
        mainEntity: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@context": "https://schema.org", "@type": "WebPage", "@id": `${BASE_URL}/contact#webpage`,
        url: `${BASE_URL}/contact`,
        name: "Contact Cybaem Tech | IT Services Company in Pune",
        description: "Reach Cybaem Tech in Pune for IT services, software development, cloud, cyber security, website development and digital marketing solutions.",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#organization` },
        primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
      },
      {
        "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": `${BASE_URL}/contact#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Contact", item: `${BASE_URL}/contact` },
        ],
      },
      faq([
        { q: "What services does Cybaem Tech provide?", a: "Cybaem Tech provides managed IT services, software development, cyber security, IT support, website development, eCommerce development and digital marketing solutions." },
        { q: "How quickly will Cybaem Tech respond?", a: "Cybaem Tech's senior team typically responds within 24 hours to business inquiries submitted through the contact page." },
        { q: "Do you offer a free initial consultation?", a: "Yes, Cybaem Tech offers an initial consultation to understand your requirements and recommend the right technology solution." },
        { q: "Can you sign an NDA before we share details?", a: "Yes, Cybaem Tech can sign an NDA before project discussions to ensure confidentiality and secure collaboration." },
        { q: "What engagement models do you support?", a: "Cybaem Tech supports flexible engagement models including project-based delivery, managed services, dedicated teams and staff augmentation." },
        { q: "Do you provide ongoing support after project completion?", a: "Yes, Cybaem Tech provides ongoing support, maintenance and managed service options after project delivery." },
        { q: "What industries do you specialize in?", a: "Cybaem Tech serves startups, SMEs and enterprises across multiple industries with software, cloud, IT infrastructure and digital growth solutions." },
      ], `${BASE_URL}/contact#faq`),
    ],
  },

  "/solutions/enterprise-software": {
    title: "Enterprise Software Development Company in Pune | Cybaem Tech",
    description: "Cybaem Tech builds AI-powered enterprise software, CRM, project management, DMS and ITSM solutions with secure, ISO-certified delivery for scalable business growth.",
    canonical: "/solutions/enterprise-software",
    keywords: "enterprise software development company Pune, custom enterprise software, AI powered enterprise software, CRM development company, project management software development, document management system, ITSM software, enterprise application development India, business software solutions Pune, custom software development company",
    ogDescription: "Build enterprise software that scales with AI-powered CRM, DMS, ITSM and project management systems from Cybaem Tech.",
    ogImageAlt: "Cybaem Tech enterprise software solutions",
    twitterDescription: "AI-powered enterprise software, CRM, DMS, ITSM and workflow systems built for scale, security and performance.",
    twitterImageAlt: "Cybaem Tech enterprise software solutions",
    jsonLd: [
      org("Cybaem Tech Pvt. Ltd. is a technology solutions company delivering enterprise software development, managed IT services, cloud computing, cyber security and digital growth solutions."),
      profService(),
      website,
      webpage("/solutions/enterprise-software", "Enterprise Software Development Company in Pune | Cybaem Tech", "Cybaem Tech delivers AI-powered enterprise software including CRM, project management, DMS and ITSM solutions with secure, scalable deployment.", `${BASE_URL}/solutions/enterprise-software#webpage`),
      breadcrumb3("Solutions", "/", "Enterprise Software", "/solutions/enterprise-software", `${BASE_URL}/solutions/enterprise-software#breadcrumb`),
      {
        "@context": "https://schema.org", "@type": "Service", "@id": `${BASE_URL}/solutions/enterprise-software#service`,
        name: "Enterprise Software Development", url: `${BASE_URL}/solutions/enterprise-software`,
        serviceType: "Enterprise Software Development",
        provider: { "@id": `${BASE_URL}/#organization` }, areaServed: "India",
        description: "Custom enterprise software development services including AI-powered CRM, project management systems, document management systems and ITSM tools.",
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: "Enterprise Software Solutions",
          itemListElement: ["CRM Development", "Project Management Software Development", "Document Management System Development", "ITSM Software Development", "Custom Enterprise Application Development"].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
        },
      },
      {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "SoftwareApplication", "@id": `${BASE_URL}/solutions/enterprise-software#cybaem-nova`, name: "Cybaem Nova", applicationCategory: "BusinessApplication", operatingSystem: "Web", creator: { "@id": `${BASE_URL}/#organization` }, description: "AI-powered CRM with predictive lead scoring, automated pipeline management and customer insights." },
          { "@type": "SoftwareApplication", "@id": `${BASE_URL}/solutions/enterprise-software#project-management-tool`, name: "Project Management Tool", applicationCategory: "BusinessApplication", operatingSystem: "Web", creator: { "@id": `${BASE_URL}/#organization` }, description: "Project management software with task automation, resource allocation, milestone tracking and team collaboration." },
          { "@type": "SoftwareApplication", "@id": `${BASE_URL}/solutions/enterprise-software#document-management-system`, name: "Document Management System", applicationCategory: "BusinessApplication", operatingSystem: "Web", creator: { "@id": `${BASE_URL}/#organization` }, description: "AI-powered document search, classification, version control and compliance-ready audit trails." },
          { "@type": "SoftwareApplication", "@id": `${BASE_URL}/solutions/enterprise-software#itsm-tool`, name: "ITSM Tool", applicationCategory: "BusinessApplication", operatingSystem: "Web", creator: { "@id": `${BASE_URL}/#organization` }, description: "IT service management software with automated ticketing, SLA tracking, change management and self-service portal." },
        ],
      },
      {
        "@context": "https://schema.org", "@type": "Review", "@id": `${BASE_URL}/solutions/enterprise-software#review`,
        itemReviewed: { "@id": `${BASE_URL}/solutions/enterprise-software#service` },
        reviewBody: "Cybaem Tech's CRM Ace Pro transformed our entire sales pipeline — deployment was flawless, secure, and fully aligned with our enterprise standards.",
        author: { "@type": "Person", name: "Jordan Ellis" },
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
      faq([
        { q: "What AI-powered products has Cybaem built?", a: "Cybaem Tech builds AI-powered enterprise products such as CRM systems, project management platforms, document management systems and ITSM tools." },
        { q: "How does Cybaem CRM differ from off-the-shelf CRMs?", a: "Cybaem CRM is custom-built for enterprise rollout, secure adoption, workflow alignment and business-specific needs instead of generic one-size-fits-all functionality." },
        { q: "How long does a typical enterprise software project take?", a: "Enterprise software timelines depend on scope, integrations and deployment needs, but Cybaem Tech follows structured delivery to accelerate rollout without compromising quality." },
        { q: "Can you integrate with our existing legacy systems?", a: "Yes, Cybaem Tech can integrate enterprise software with legacy systems, internal workflows and third-party platforms while maintaining security and business continuity." },
        { q: "Do you provide secure and compliant software delivery?", a: "Yes, Cybaem Tech follows ISO-certified delivery standards, enterprise-grade security practices and structured deployment processes for secure software implementation." },
      ], `${BASE_URL}/solutions/enterprise-software#faq`),
    ],
  },

  "/solutions/web-systems": {
    title: "Website Development Company in Pune | Web Systems & Platforms",
    description: "Cybaem Tech builds secure, conversion-focused websites, eCommerce stores, landing pages, SaaS platforms and custom web systems for scalable business growth.",
    canonical: "/solutions/web-systems",
    keywords: "website development company Pune, web development company Pune, custom website development, ecommerce website development, landing page design company, SaaS development company, web application development, business website development, conversion focused websites, enterprise web systems India",
    ogDescription: "Build high-converting websites, eCommerce stores, landing pages, SaaS platforms and custom web systems with Cybaem Tech.",
    ogImageAlt: "Cybaem Tech web systems and website development solutions",
    twitterDescription: "Secure, fast and conversion-optimized web systems including websites, eCommerce stores, landing pages and SaaS applications.",
    twitterImageAlt: "Cybaem Tech web systems and website development solutions",
    jsonLd: [
      org("Cybaem Tech Pvt. Ltd. is a technology solutions company delivering website development, custom web systems, eCommerce development, SaaS platforms, managed IT services and digital growth solutions."),
      profService(),
      website,
      webpage("/solutions/web-systems", "Website Development Company in Pune | Web Systems & Platforms", "Cybaem Tech builds secure, high-performance and conversion-optimized websites, eCommerce stores, SaaS applications and custom web systems.", `${BASE_URL}/solutions/web-systems#webpage`),
      breadcrumb3("Solutions", "/", "Web Systems", "/solutions/web-systems", `${BASE_URL}/solutions/web-systems#breadcrumb`),
      {
        "@context": "https://schema.org", "@type": "Service", "@id": `${BASE_URL}/solutions/web-systems#service`,
        name: "Web Systems & Website Development", url: `${BASE_URL}/solutions/web-systems`,
        serviceType: "Website Development and Web Systems",
        provider: { "@id": `${BASE_URL}/#organization` }, areaServed: "India",
        description: "Custom website development and web platform services including business websites, eCommerce websites, landing pages, blogs, SaaS platforms, web applications and educational portals.",
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: "Web Systems Services",
          itemListElement: ["Business Website Development", "Corporate Website Development", "eCommerce Website Development", "Portfolio Website Development", "Landing Page Design and Development", "Blog Website Development", "SaaS Platform Development", "Web Application Development", "Educational and Information Portal Development"].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
        },
      },
      faq([
        { q: "What types of web systems does Cybaem Tech build?", a: "Cybaem Tech builds business websites, corporate websites, eCommerce stores, portfolio websites, landing pages, blogs, SaaS platforms, web applications and educational portals." },
        { q: "Do you build custom websites for businesses?", a: "Yes, Cybaem Tech develops custom websites tailored to business goals, brand identity, performance needs and conversion requirements." },
        { q: "Can Cybaem Tech develop eCommerce websites?", a: "Yes, Cybaem Tech builds secure eCommerce websites with product catalogs, shopping carts, payment gateway integration and conversion-focused design." },
        { q: "Do you create landing pages for campaigns?", a: "Yes, Cybaem Tech creates high-converting landing pages designed for specific campaigns, lead generation and call-to-action performance." },
        { q: "Do you build SaaS platforms and web applications?", a: "Yes, Cybaem Tech develops SaaS platforms and custom web applications with authentication, dashboards, workflow tools and scalable architecture." },
        { q: "How fast and secure are your web systems?", a: "Cybaem Tech builds web systems with enterprise-grade security, performance-first architecture and optimized load times to support reliability and conversions." },
      ], `${BASE_URL}/solutions/web-systems#faq`),
    ],
  },

  "/solutions/it-staff-augmentation": {
    title: "IT Staff Augmentation Company in Pune | Hire IT Engineers Fast",
    description: "Hire pre-vetted IT engineers in 48 hours with Cybaem Tech. IT staff augmentation for developers, DevOps, cybersecurity, QA, support, cloud and infrastructure teams.",
    canonical: "/solutions/it-staff-augmentation",
    keywords: "IT staff augmentation company Pune, staff augmentation services India, hire dedicated developers, remote IT specialists, IT staffing company Pune, DevOps engineers for hire, cybersecurity engineers for hire, QA testing engineers, helpdesk outsourcing, contract IT hiring, offshore IT staffing, dedicated IT team",
    ogDescription: "Scale faster with pre-vetted developers, DevOps, cloud, QA, support and cybersecurity engineers deployed in as little as 48 hours.",
    ogImageAlt: "Cybaem Tech IT staff augmentation services",
    twitterDescription: "Embed elite IT professionals into your team with flexible hiring models, 48-hour deployment and ongoing support from Cybaem Tech.",
    twitterImageAlt: "Cybaem Tech IT staff augmentation services",
    jsonLd: [
      org("Cybaem Tech Pvt. Ltd. provides IT staff augmentation, software development, cloud, cybersecurity, managed IT services and digital growth solutions."),
      profService(),
      website,
      webpage("/solutions/it-staff-augmentation", "IT Staff Augmentation Company in Pune | Hire IT Engineers Fast", "Cybaem Tech provides IT staff augmentation services with pre-vetted developers, cloud engineers, QA experts, cybersecurity talent and support professionals.", `${BASE_URL}/solutions/it-staff-augmentation#webpage`),
      breadcrumb3("Solutions", "/", "IT Staff Augmentation", "/solutions/it-staff-augmentation", `${BASE_URL}/solutions/it-staff-augmentation#breadcrumb`),
      {
        "@context": "https://schema.org", "@type": "Service", "@id": `${BASE_URL}/solutions/it-staff-augmentation#service`,
        name: "IT Staff Augmentation", url: `${BASE_URL}/solutions/it-staff-augmentation`,
        serviceType: "IT Staff Augmentation Services",
        provider: { "@id": `${BASE_URL}/#organization` }, areaServed: "India",
        description: "IT staff augmentation services with dedicated onsite engineers, remote IT specialists, project-based staffing, helpdesk outsourcing, system admins and long-term contract hiring.",
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: "IT Staff Augmentation Services",
          itemListElement: ["Dedicated Onsite IT Engineers", "Remote IT Specialists", "Project-Based Staffing", "Helpdesk Outsourcing", "Network and System Administration Staffing", "Contract and Long-Term IT Hiring"].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
        },
      },
      {
        "@context": "https://schema.org", "@type": "ItemList", "@id": `${BASE_URL}/solutions/it-staff-augmentation#talent-categories`,
        name: "IT Talent Categories",
        itemListElement: ["Software and Web Developers", "Cloud and DevOps Engineers", "IT Support and Infrastructure Professionals", "Cybersecurity and Compliance Engineers", "QA and Testing Engineers", "IT Recruiters and Coordinators"].map((n, i) => ({ "@type": "ListItem", position: i + 1, name: n })),
      },
      {
        "@context": "https://schema.org", "@type": "Review", "@id": `${BASE_URL}/solutions/it-staff-augmentation#review-1`,
        itemReviewed: { "@id": `${BASE_URL}/solutions/it-staff-augmentation#service` },
        reviewBody: "Cybaem Tech helped us scale quickly with a dedicated DevOps team. Reliable, fast onboarding, and quality delivery!",
        author: { "@type": "Person", name: "Michael Torres" },
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@context": "https://schema.org", "@type": "Review", "@id": `${BASE_URL}/solutions/it-staff-augmentation#review-2`,
        itemReviewed: { "@id": `${BASE_URL}/solutions/it-staff-augmentation#service` },
        reviewBody: "Their IT support engineers work as an extension of our team. Exceptional response time and professionalism.",
        author: { "@type": "Person", name: "Amanda Chen" },
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
      faq([
        { q: "How quickly can you place an engineer on our project?", a: "Cybaem Tech can typically provide matched and verified candidate profiles within 24 to 48 hours, depending on the role and project requirements." },
        { q: "How do you ensure quality and cultural fit?", a: "Cybaem Tech screens candidates based on technical expertise, project alignment, communication skills and team fit to ensure smooth integration into your workflows." },
        { q: "What if an engineer is not the right fit?", a: "If a resource is not the right fit, Cybaem Tech supports a structured replacement process to minimize disruption and maintain delivery continuity." },
        { q: "Can we convert augmented staff to full-time hires?", a: "Yes, Cybaem Tech supports flexible engagement models, including contract-to-hire and long-term hiring arrangements, based on your needs." },
        { q: "What roles can you provide through IT staff augmentation?", a: "Cybaem Tech provides software developers, web developers, cloud and DevOps engineers, IT support specialists, cybersecurity professionals, QA engineers, recruiters and infrastructure experts." },
        { q: "What hiring models do you support?", a: "Cybaem Tech supports hourly, monthly dedicated, project-based and onsite plus offshore hybrid engagement models." },
      ], `${BASE_URL}/solutions/it-staff-augmentation#faq`),
    ],
  },

  "/solutions/managed-it-cloud-security": {
    title: "Managed IT & Cloud Security Services in Pune | 24/7 NOC & Zero Trust",
    description: "Secure your infrastructure with Cybaem Tech's managed IT and cloud security services. 24/7 NOC monitoring, Zero Trust security, cloud migration, and enterprise-grade protection.",
    canonical: "/solutions/managed-it-cloud-security",
    keywords: "managed IT services Pune, cloud security services India, 24/7 NOC monitoring, Zero Trust security solutions, cloud migration services, IT infrastructure management, cybersecurity services Pune, managed cloud services, IT support services, enterprise security solutions",
    ogTitle: "Managed IT & Cloud Security Services | 24/7 NOC & Zero Trust",
    ogDescription: "Enterprise-grade IT infrastructure protection with 24/7 monitoring, cloud security, Zero Trust architecture, and seamless cloud migrations.",
    ogImageAlt: "Managed IT and cloud security services by Cybaem Tech",
    twitterTitle: "Managed IT & Cloud Security Services | 24/7 Monitoring",
    twitterDescription: "Protect your infrastructure with 24/7 NOC monitoring, Zero Trust security, and cloud-native protection solutions.",
    jsonLd: [
      {
        "@context": "https://schema.org", "@type": "Organization", "@id": `${BASE_URL}/#organization`,
        name: "Cybaem Tech Pvt. Ltd.", url: `${BASE_URL}/`, logo: OG_IMAGE,
        email: "sales@cybaemtech.com", telephone: "+91-9028541383",
        description: "Cybaem Tech delivers managed IT services, cloud security, NOC monitoring, Zero Trust architecture and enterprise infrastructure solutions.",
      },
      webpage("/solutions/managed-it-cloud-security", "Managed IT & Cloud Security Services in Pune", "Enterprise-grade infrastructure protection with 24/7 monitoring, cloud migration, and Zero Trust security.", `${BASE_URL}/solutions/managed-it-cloud-security#webpage`),
      {
        "@context": "https://schema.org", "@type": "Service", "@id": `${BASE_URL}/solutions/managed-it-cloud-security#service`,
        name: "Managed IT & Cloud Security Services",
        serviceType: "Managed IT Services and Cloud Security",
        provider: { "@id": `${BASE_URL}/#organization` }, areaServed: "India",
        description: "Managed IT and cloud security services including 24/7 NOC monitoring, cloud migration, Zero Trust architecture, infrastructure protection and cybersecurity management.",
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: "Managed IT Services",
          itemListElement: ["24/7 NOC Monitoring", "Cloud Migration Services", "Zero Trust Security Implementation", "Infrastructure Security Management", "Cloud Security & Compliance"].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
        },
      },
      breadcrumb3("Solutions", "/", "Managed IT & Cloud Security", "/solutions/managed-it-cloud-security"),
      {
        "@context": "https://schema.org", "@type": "Review",
        reviewBody: "Zero security incidents since Cybaem took over our infrastructure. Their 24/7 NOC gives us peace of mind we never had before.",
        author: { "@type": "Person", name: "Amanda Chen" },
        itemReviewed: { "@id": `${BASE_URL}/solutions/managed-it-cloud-security#service` },
      },
      faq([
        { q: "What does 24/7 NOC monitoring include?", a: "24/7 NOC monitoring includes continuous infrastructure monitoring, incident detection, performance tracking, and real-time response to ensure uptime and security." },
        { q: "How do you handle cloud migration without downtime?", a: "We use phased migration strategies, redundancy planning, and real-time testing to ensure minimal or zero downtime during cloud transitions." },
        { q: "What is Zero Trust security?", a: "Zero Trust security ensures that no user or system is trusted by default. Every access request is verified, authenticated, and continuously monitored." },
        { q: "Can you manage hybrid cloud environments?", a: "Yes, we manage hybrid cloud environments by integrating on-premise and cloud systems with centralized monitoring, security controls, and performance optimization." },
      ], `${BASE_URL}/solutions/managed-it-cloud-security#faq`),
    ],
  },

  "/solutions/digital-revenue-growth": {
    title: "Digital Revenue Growth Services | B2B & D2C Performance Marketing Agency",
    description: "Scale predictable revenue with Cybaem Tech's digital growth engineering. SEO, Google Ads, CRO, LinkedIn marketing, and automation systems built for B2B & D2C brands.",
    canonical: "/solutions/digital-revenue-growth",
    keywords: "digital marketing agency Pune, performance marketing agency India, B2B lead generation services, SEO services India, Google Ads agency, conversion rate optimization services, LinkedIn marketing B2B, marketing automation services, revenue growth strategy, growth marketing agency",
    ogTitle: "Digital Revenue Growth Services | Performance Marketing Experts",
    ogDescription: "We don't just run ads — we build revenue systems. SEO, paid ads, CRO, and automation to generate predictable growth for B2B & D2C brands.",
    ogImageAlt: "Digital revenue growth services by Cybaem Tech",
    twitterTitle: "Digital Revenue Growth Engineering | Cybaem Tech",
    twitterDescription: "SEO, Ads, CRO & automation systems designed for predictable revenue growth.",
    jsonLd: [
      {
        "@context": "https://schema.org", "@type": "Organization", "@id": `${BASE_URL}/#organization`,
        name: "Cybaem Tech Pvt. Ltd.", url: `${BASE_URL}/`, logo: OG_IMAGE,
        email: "sales@cybaemtech.com", telephone: "+91-9028541383",
        description: "Cybaem Tech is a performance-driven digital growth partner offering SEO, paid ads, CRO, LinkedIn marketing, and marketing automation solutions.",
      },
      webpage("/solutions/digital-revenue-growth", "Digital Revenue Growth Services", "Performance-driven digital marketing systems including SEO, paid ads, CRO and automation for scalable growth.", `${BASE_URL}/solutions/digital-revenue-growth#webpage`),
      {
        "@context": "https://schema.org", "@type": "Service", "@id": `${BASE_URL}/solutions/digital-revenue-growth#service`,
        name: "Digital Revenue Growth Services",
        serviceType: "Performance Marketing & Growth Engineering",
        provider: { "@id": `${BASE_URL}/#organization` }, areaServed: "India",
        description: "End-to-end digital growth services including SEO, paid ads, conversion optimization, LinkedIn marketing, and marketing automation to drive predictable revenue.",
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: "Growth Services",
          itemListElement: ["SEO Services (AEO, GEO, SXO)", "Google Ads & Performance Marketing", "Conversion Rate Optimization (CRO)", "LinkedIn Marketing for B2B", "Marketing Automation & CRM Integration"].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
        },
      },
      breadcrumb3("Solutions", "/", "Digital Revenue Growth", "/solutions/digital-revenue-growth"),
      faq([
        { q: "What makes Cybaem Tech different from other digital marketing agencies?", a: "Cybaem Tech focuses on building complete revenue systems instead of isolated campaigns. We combine SEO, paid ads, CRO, and automation to create predictable and scalable growth." },
        { q: "Do you provide B2B lead generation services?", a: "Yes, we specialize in B2B lead generation using SEO, LinkedIn marketing, Google Ads, and funnel optimization strategies." },
        { q: "How do you reduce cost per lead (CPL)?", a: "We improve targeting, optimize landing pages, implement CRO strategies, and refine campaign structures to reduce cost per lead while increasing quality." },
        { q: "Do you offer performance marketing for D2C brands?", a: "Yes, we provide full-funnel performance marketing for D2C brands including product visibility, paid ads, retention marketing, and conversion optimization." },
        { q: "Do you provide marketing automation services?", a: "Yes, we implement marketing automation systems including CRM integration, email workflows, lead scoring, and nurturing funnels." },
      ], `${BASE_URL}/solutions/digital-revenue-growth#faq`),
    ],
  },

  "/blog": {
    title: "Blog | Cybaem Tech - IT Services & Technology Insights",
    description: "Read the latest insights on IT services, software development, cloud computing, cyber security and digital marketing from Cybaem Tech.",
    canonical: "/blog",
    ogImageAlt: "Cybaem Tech blog",
    twitterDescription: "Technology insights and updates from Cybaem Tech.",
  },

  "/privacy-policy": {
    title: "Privacy Policy | Cybaem Tech Pvt Ltd",
    description: "Read the privacy policy of Cybaem Tech Pvt Ltd covering data collection, usage, and protection practices.",
    canonical: "/privacy-policy",
  },

  "/terms-of-service": {
    title: "Terms of Service | Cybaem Tech Pvt Ltd",
    description: "Read the terms of service for Cybaem Tech Pvt Ltd's IT services, software development and digital marketing solutions.",
    canonical: "/terms-of-service",
  },

  "/cookie-policy": {
    title: "Cookie Policy | Cybaem Tech Pvt Ltd",
    description: "Learn about how Cybaem Tech Pvt Ltd uses cookies and similar technologies on our website.",
    canonical: "/cookie-policy",
  },

  "/refund-cancellation-policy": {
    title: "Refund & Cancellation Policy | Cybaem Tech Pvt Ltd",
    description: "Read the refund and cancellation policy for Cybaem Tech Pvt Ltd services.",
    canonical: "/refund-cancellation-policy",
  },
};

/* ── HTML generation helpers ── */

function buildMetaTags(meta: RouteMeta): string {
  const fullCanonical = `${BASE_URL}${meta.canonical}`;
  const lines: string[] = [];

  lines.push(`    <title>${meta.title}</title>`);
  lines.push(`    <meta name="description" content="${escHtml(meta.description)}">`);
  lines.push(`    <meta name="author" content="${AUTHOR}">`);
  lines.push(`    <meta name="robots" content="${ROBOTS}">`);
  if (meta.keywords) lines.push(`    <meta name="keywords" content="${escHtml(meta.keywords)}">`);
  lines.push(`    <meta name="theme-color" content="${THEME_COLOR}">`);
  lines.push(`    <meta name="geo.region" content="IN-MH">`);
  lines.push(`    <meta name="geo.placename" content="Pune">`);
  lines.push(`    <meta name="geo.position" content="18.5912;73.7389">`);
  lines.push(`    <meta name="ICBM" content="18.5912,73.7389">`);
  lines.push(`    <link rel="canonical" href="${fullCanonical}">`);
  lines.push(``);
  lines.push(`    <meta property="og:type" content="website">`);
  lines.push(`    <meta property="og:site_name" content="Cybaem Tech">`);
  lines.push(`    <meta property="og:title" content="${escHtml(meta.ogTitle || meta.title)}">`);
  lines.push(`    <meta property="og:description" content="${escHtml(meta.ogDescription || meta.description)}">`);
  lines.push(`    <meta property="og:url" content="${fullCanonical}">`);
  lines.push(`    <meta property="og:image" content="${OG_IMAGE}">`);
  if (meta.ogImageAlt) lines.push(`    <meta property="og:image:alt" content="${escHtml(meta.ogImageAlt)}">`);
  lines.push(``);
  lines.push(`    <meta name="twitter:card" content="summary_large_image">`);
  lines.push(`    <meta name="twitter:site" content="@CybaemTech">`);
  lines.push(`    <meta name="twitter:title" content="${escHtml(meta.twitterTitle || meta.ogTitle || meta.title)}">`);
  lines.push(`    <meta name="twitter:description" content="${escHtml(meta.twitterDescription || meta.ogDescription || meta.description)}">`);
  lines.push(`    <meta name="twitter:image" content="${OG_IMAGE}">`);
  if (meta.twitterImageAlt || meta.ogImageAlt) lines.push(`    <meta name="twitter:image:alt" content="${escHtml(meta.twitterImageAlt || meta.ogImageAlt || "")}">`);

  if (meta.jsonLd && meta.jsonLd.length > 0) {
    for (const schema of meta.jsonLd) {
      lines.push(`    <script type="application/ld+json">${JSON.stringify(schema)}</script>`);
    }
  }

  return lines.join("\n");
}

function escHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function replaceMetaInHtml(html: string, meta: RouteMeta): string {
  let result = html;

  // Remove existing title
  result = result.replace(/<title>[\s\S]*?<\/title>/, "");

  // Remove meta tags we'll replace
  const metaPatterns = [
    /\s*<meta\s+name="description"[^>]*>/gi,
    /\s*<meta\s+name="author"[^>]*>/gi,
    /\s*<meta\s+name="keywords"[^>]*>/gi,
    /\s*<meta\s+name="robots"[^>]*>/gi,
    /\s*<meta\s+name="theme-color"[^>]*>/gi,
    /\s*<meta\s+name="geo\.[^"]*"[^>]*>/gi,
    /\s*<meta\s+name="ICBM"[^>]*>/gi,
    /\s*<meta\s+property="og:[^"]*"[^>]*>/gi,
    /\s*<meta\s+name="twitter:[^"]*"[^>]*>/gi,
    /\s*<link\s+rel="canonical"[^>]*>/gi,
    /\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi,
  ];

  for (const pattern of metaPatterns) {
    result = result.replace(pattern, "");
  }

  // Insert new meta tags after <meta name="viewport"...>
  const viewportMatch = result.match(/<meta\s+name="viewport"[^>]*>/);
  if (viewportMatch) {
    const insertPos = result.indexOf(viewportMatch[0]) + viewportMatch[0].length;
    const newMeta = "\n" + buildMetaTags(meta);
    result = result.slice(0, insertPos) + newMeta + result.slice(insertPos);
  }

  return result;
}

/* ── Plugin ── */

export function seoPrerender(): Plugin {
  return {
    name: "seo-prerender",
    apply: "build",
    closeBundle() {
      const distDir = path.resolve("dist");
      const indexPath = path.join(distDir, "index.html");

      if (!fs.existsSync(indexPath)) {
        console.warn("[seo-prerender] dist/index.html not found, skipping.");
        return;
      }

      const baseHtml = fs.readFileSync(indexPath, "utf-8");
      let generated = 0;

      for (const [route, meta] of Object.entries(routes)) {
        const html = replaceMetaInHtml(baseHtml, meta);

        if (route === "/") {
          fs.writeFileSync(indexPath, html, "utf-8");
        } else {
          const routeDir = path.join(distDir, route.slice(1));
          fs.mkdirSync(routeDir, { recursive: true });
          fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf-8");
        }
        generated++;
      }

      console.log(`[seo-prerender] Generated ${generated} pre-rendered HTML files.`);
    },
  };
}
