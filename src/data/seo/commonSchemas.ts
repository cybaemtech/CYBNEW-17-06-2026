// Shared JSON-LD schemas used across multiple pages

export const organizationSchema = (description?: string): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://cybaemtech.com/#organization",
  name: "Cybaem Tech Pvt. Ltd.",
  url: "https://cybaemtech.com/",
  logo: "https://cybaemtech.com/assets/cybaem-logo-C5lgmAgK.png",
  email: "sales@cybaemtech.com",
  telephone: "+91-9028541383",
  foundingDate: "2020",
  founder: { "@type": "Person", name: "Rohan Bhosale" },
  description: description || "Cybaem Tech Pvt. Ltd. is a premier global technology solutions company specializing in IT infrastructure management, software development services, cloud computing solutions, managed IT services, cyber security and digital marketing solutions.",
  sameAs: [
    "https://in.linkedin.com/company/cybaemtech",
    "https://x.com/Cybaem_Tech",
    "https://www.facebook.com/cybaemtech/",
    "https://www.instagram.com/cybaemtech/",
    "https://www.youtube.com/@cybaemtech",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+91-9028541383",
      email: "sales@cybaemtech.com",
      areaServed: "IN",
      availableLanguage: ["en"],
    },
  ],
});

export const professionalServiceSchema = (id?: string): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": id || "https://cybaemtech.com/#localbusiness",
  name: "Cybaem Tech Pvt. Ltd.",
  image: "https://cybaemtech.com/assets/cybaem-logo-C5lgmAgK.png",
  url: "https://cybaemtech.com/",
  telephone: "+91-9028541383",
  email: "sales@cybaemtech.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Suratwala Mark Plazzo, Hinjawadi",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411057",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 18.5912,
    longitude: 73.7389,
  },
  areaServed: [
    { "@type": "City", name: "Pune" },
    { "@type": "City", name: "Mumbai" },
    { "@type": "City", name: "Bangalore" },
    { "@type": "City", name: "Hyderabad" },
    { "@type": "City", name: "Delhi" },
    { "@type": "Country", name: "India" },
  ],
});

export const websiteSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://cybaemtech.com/#website",
  url: "https://cybaemtech.com/",
  name: "Cybaem Tech",
  publisher: { "@id": "https://cybaemtech.com/#organization" },
};
