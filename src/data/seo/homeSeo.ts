import { organizationSchema, professionalServiceSchema, websiteSchema } from "./commonSchemas";

export const homeSeoData = {
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
    organizationSchema(),
    {
      ...professionalServiceSchema(),
      priceRange: "$$",
    },
    websiteSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://cybaemtech.com/#webpage",
      url: "https://cybaemtech.com/",
      name: "IT Services Company in Pune | Cybaem Tech Pvt Ltd",
      description: "Cybaem Tech provides managed IT services, software development, cyber security, IT support, website development, eCommerce development and digital marketing services.",
      isPartOf: { "@id": "https://cybaemtech.com/#website" },
      about: { "@id": "https://cybaemtech.com/#organization" },
      primaryImageOfPage: { "@type": "ImageObject", url: "https://cybaemtech.com/assets/cybaem-logo-C5lgmAgK.png" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://cybaemtech.com/#services",
      name: "IT and Digital Services",
      provider: { "@id": "https://cybaemtech.com/#organization" },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Pune" },
        { "@type": "City", name: "Mumbai" },
        { "@type": "City", name: "Bangalore" },
        { "@type": "City", name: "Hyderabad" },
        { "@type": "City", name: "Delhi" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Cybaem Tech Services",
        itemListElement: [
          "Managed IT Services", "Software Development Services", "IT Staff Augmentation",
          "Cyber Security Services", "Remote IT Support", "IT Support Services",
          "Website Development", "Custom Website Development", "eCommerce Development",
          "Digital Marketing Services",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
  ] as Record<string, unknown>[],
};
