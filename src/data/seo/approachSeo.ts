import { organizationSchema, professionalServiceSchema, websiteSchema } from "./commonSchemas";

export const approachSeoData = {
  title: "Life At CybaemTech | Leadership, Partnerships & Technology Excellence",
  description: "Explore Cybaem Tech's approach to leadership, strategic partnerships, innovation, company culture and technology excellence that drives scalable business growth.",
  canonical: "/life-at-cybaemtech",
  keywords: "Cybaem Tech approach, IT company leadership, technology partnerships, strategic partnerships, IT consulting company Pune, innovation driven technology company, digital marketing leadership, enterprise IT approach, company culture technology, software company values Pune, life at cybaemtech",
  ogDescription: "Discover Cybaem Tech's leadership philosophy, strategic partnerships, innovation culture and business-first technology approach.",
  ogImageAlt: "Cybaem Tech leadership and partnership approach",
  twitterDescription: "See how Cybaem Tech combines leadership, innovation, partnerships and culture to deliver world-class technology solutions.",
  twitterImageAlt: "Cybaem Tech leadership and partnership approach",
  jsonLd: [
    organizationSchema("Cybaem Tech Pvt. Ltd. is a global technology solutions company specializing in IT infrastructure management, software development, cloud computing, cyber security, managed IT services and digital marketing solutions."),
    professionalServiceSchema(),
    websiteSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://cybaemtech.com/life-at-cybaemtech#webpage",
      url: "https://cybaemtech.com/life-at-cybaemtech",
      name: "Life At CybaemTech | Leadership, Partnerships & Technology Excellence",
      description: "Explore Cybaem Tech's leadership philosophy, strategic partnerships, innovation mindset, team culture and technology-driven approach to business growth.",
      isPartOf: { "@id": "https://cybaemtech.com/#website" },
      about: { "@id": "https://cybaemtech.com/#organization" },
      primaryImageOfPage: { "@type": "ImageObject", url: "https://cybaemtech.com/assets/cybaem-logo-C5lgmAgK.png" },
    },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://cybaemtech.com/life-at-cybaemtech#aboutpage",
      url: "https://cybaemtech.com/life-at-cybaemtech",
      name: "Life At CybaemTech",
      description: "Cybaem Tech's approach combines visionary leadership, strategic partnerships, innovation, customer-centric execution, team culture and technology excellence.",
      mainEntity: { "@id": "https://cybaemtech.com/#organization" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://cybaemtech.com/life-at-cybaemtech#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://cybaemtech.com/" },
        { "@type": "ListItem", position: 2, name: "Life At CybaemTech", item: "https://cybaemtech.com/life-at-cybaemtech" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person", "@id": "https://cybaemtech.com/life-at-cybaemtech#rohan-bhosale",
          name: "Rohan Bhosale", jobTitle: "Founder & CEO",
          worksFor: { "@id": "https://cybaemtech.com/#organization" },
          description: "Founder and CEO of Cybaem Tech with 18+ years of experience in global IT strategy and digital marketing.",
        },
        {
          "@type": "Person", "@id": "https://cybaemtech.com/life-at-cybaemtech#akshay-navale",
          name: "Akshay Navale", jobTitle: "Chief Technology Officer",
          worksFor: { "@id": "https://cybaemtech.com/#organization" },
          description: "Chief Technology Officer at Cybaem Tech with 15+ years of experience in AI strategy, product leadership, cybersecurity and cloud infrastructure.",
        },
        {
          "@type": "Person", "@id": "https://cybaemtech.com/life-at-cybaemtech#yash-bhalekar",
          name: "Yash Bhalekar", jobTitle: "Director",
          worksFor: { "@id": "https://cybaemtech.com/#organization" },
          description: "Director at Cybaem Tech with 12+ years of experience in business development, fintech solutions, investment strategy and risk management.",
        },
      ],
    },
  ] as Record<string, unknown>[],
};
