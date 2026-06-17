import { organizationSchema, professionalServiceSchema, websiteSchema } from "./commonSchemas";

const contactOrgSchema = {
  ...organizationSchema("Cybaem Tech Pvt. Ltd. is a global technology solutions company specializing in managed IT services, software development, cloud computing, cyber security, website development and digital marketing solutions."),
  contactPoint: [
    { "@type": "ContactPoint", contactType: "sales", telephone: "+91-9028541383", email: "sales@cybaemtech.com", areaServed: "IN", availableLanguage: ["en"] },
    { "@type": "ContactPoint", contactType: "business", telephone: "+91-2069010200", areaServed: "IN", availableLanguage: ["en"] },
    { "@type": "ContactPoint", contactType: "customer support", telephone: "+91-8484815905", areaServed: "IN", availableLanguage: ["en"] },
  ],
};

export const contactSeoData = {
  title: "Contact Cybaem Tech | IT Services Company in Pune & India",
  description: "Contact Cybaem Tech Pvt Ltd in Pune for managed IT services, software development, cyber security, website development and digital marketing solutions across India.",
  canonical: "/contact",
  keywords: "contact Cybaem Tech, IT company contact Pune, software development company Pune contact, managed IT services Pune Mumbai, cyber security company Pune contact, website development company Pune Bangalore, digital marketing agency Pune, IT support company India, IT consulting Hyderabad Delhi",
  ogDescription: "Connect with Cybaem Tech for software development, managed IT, cyber security, website development and digital marketing solutions.",
  ogImageAlt: "Cybaem Tech contact page",
  twitterDescription: "Talk to Cybaem Tech for managed IT, software, cyber security and digital growth solutions.",
  twitterImageAlt: "Cybaem Tech contact page",
  jsonLd: [
    contactOrgSchema,
    { ...professionalServiceSchema("https://cybaemtech.com/contact#localbusiness"), priceRange: "$$" },
    websiteSchema,
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": "https://cybaemtech.com/contact#contactpage",
      url: "https://cybaemtech.com/contact",
      name: "Contact Cybaem Tech",
      description: "Contact Cybaem Tech Pvt Ltd for software development, managed IT services, cyber security, website development and digital marketing solutions.",
      mainEntity: { "@id": "https://cybaemtech.com/#organization" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://cybaemtech.com/contact#webpage",
      url: "https://cybaemtech.com/contact",
      name: "Contact Cybaem Tech | IT Services Company in Pune",
      description: "Reach Cybaem Tech in Pune for IT services, software development, cloud, cyber security, website development and digital marketing solutions.",
      isPartOf: { "@id": "https://cybaemtech.com/#website" },
      about: { "@id": "https://cybaemtech.com/#organization" },
      primaryImageOfPage: { "@type": "ImageObject", url: "https://cybaemtech.com/assets/cybaem-logo-C5lgmAgK.png" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://cybaemtech.com/contact#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://cybaemtech.com/" },
        { "@type": "ListItem", position: 2, name: "Contact", item: "https://cybaemtech.com/contact" },
      ],
    },
  ] as Record<string, unknown>[],
};
