import { organizationSchema, professionalServiceSchema } from "./commonSchemas";

export const aboutSeoData = {
  title: "About Cybaem Tech Pvt Ltd | IT Services Company in Pune & India",
  description: "Learn about Cybaem Tech Pvt Ltd, a Pune-based IT services company founded in 2020, delivering software development, IT infrastructure, cloud, security and digital growth solutions across India.",
  canonical: "/about",
  keywords: "about Cybaem Tech, Cybaem Tech Pvt Ltd, IT services company Pune, software development company Pune Mumbai, cloud computing solutions India, IT infrastructure management company, cyber security services Pune Bangalore, managed IT services company India, digital marketing company Pune, IT consulting company Hyderabad Delhi",
  ogDescription: "Know Cybaem Tech Pvt Ltd, a global technology solutions company offering IT infrastructure, software development, cloud, security and digital growth services.",
  ogImageAlt: "Cybaem Tech Pvt Ltd - IT services company in Pune",
  twitterDescription: "Cybaem Tech Pvt Ltd delivers software, cloud, IT infrastructure, security and digital growth solutions for modern businesses.",
  jsonLd: [
    organizationSchema("Cybaem Tech Pvt. Ltd. is a premier global technology solutions company specializing in IT infrastructure management, software development, cloud computing, cyber security, managed IT services and digital marketing solutions."),
    professionalServiceSchema("https://cybaemtech.com/about#localbusiness"),
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://cybaemtech.com/about#aboutpage",
      url: "https://cybaemtech.com/about",
      name: "About Cybaem Tech Pvt Ltd",
      description: "Cybaem Tech Pvt Ltd is a global IT services company founded in 2020 providing software, cloud, infrastructure and digital solutions.",
      mainEntity: { "@id": "https://cybaemtech.com/#organization" },
    },
  ] as Record<string, unknown>[],
};
