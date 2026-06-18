import { organizationSchema, professionalServiceSchema, websiteSchema } from "./commonSchemas";

export const homeSeoData = {
  title: "Cybaem Tech | IT Services, Cybersecurity & Cloud Solutions Pune",
  description: "Cybaem Tech provides IT services, cybersecurity, cloud solutions, managed IT support, Microsoft 365, networking, digital marketing, and infrastructure management in Pune.",
  canonical: "https://www.cybaemtech.com/",
  keywords: "IT Services Pune, Cybersecurity Services Pune, Cloud Solutions Pune, Managed IT Services, Microsoft 365 Support, Network Security, IT Infrastructure Management, Digital Marketing Pune, Cybaem Tech, IT Company in Pune, Managed IT Services Pune, Cybersecurity Services Pune, Cloud computing Services, IT AMC Services, Digital Marketing, Cloud Migration Services, IT Support Company Pune",
  ogTitle: "Cybaem Tech | IT Services & Cybersecurity Solutions",
  ogDescription: "Secure, scalable IT infrastructure, cybersecurity, cloud solutions and managed IT services for growing businesses.",
  ogType: "website",
  ogImageAlt: "Cybaem Tech logo",
  twitterTitle: "Cybaem Tech | IT Services & Cybersecurity Solutions",
  twitterDescription: "Secure, scalable IT infrastructure, cybersecurity, cloud solutions and managed IT services for growing businesses.",
  twitterImageAlt: "Cybaem Tech logo",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Cybaem Tech",
      "url": "https://www.cybaemtech.com",
      "logo": "https://www.cybaemtech.com/logo.png",
      "description": "IT Services, Cybersecurity, Cloud Solutions, Managed IT Support and Digital Marketing Company in Pune.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "telephone": "+91-9028541383"
    }
  ] as Record<string, unknown>[],
};
