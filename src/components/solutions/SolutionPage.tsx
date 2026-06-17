import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { solutionsSeoData } from "@/data/seo/solutionsSeo";
import SolutionHero from "./SolutionHero";
import SolutionProducts from "./SolutionProducts";
import EnterpriseProductsShowcase from "./EnterpriseProductsShowcase";
import SolutionTestimonial from "./SolutionTestimonial";
import SolutionGuarantees from "./SolutionGuarantees";
import SolutionFAQ from "./SolutionFAQ";
import SolutionCTA from "./SolutionCTA";
import { getSolution, solutionsData } from "@/data/solutionsData";

const SolutionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? getSolution(slug) : null;
  const isEnterpriseSoftware = slug === "enterprise-software";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!data) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Solution not found.</p>
      </div>
    );
  }

  const relatedTitles = data.relatedSlugs.map((s) => solutionsData[s]?.title || s);
  const seo = slug ? solutionsSeoData[slug] : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={seo?.metaTitle || data.metaTitle}
        description={seo?.metaDescription || data.metaDescription}
        canonical={`/solutions/${data.slug}`}
        ogImage={data.ogImage}
        keywords={seo?.keywords}
        ogTitle={seo?.ogTitle}
        ogDescription={seo?.ogDescription}
        ogImageAlt={seo?.ogImageAlt}
        twitterTitle={seo?.twitterTitle}
        twitterDescription={seo?.twitterDescription}
        twitterImageAlt={seo?.twitterImageAlt}
        jsonLd={seo?.jsonLdSchemas}
      />
      <Navbar />
      <SolutionHero
        title={data.title}
        headline={data.heroHeadline}
        subheadline={data.heroSubheadline}
        keywords={data.heroKeywords}
        heroImage={data.heroImage}
      />
      {isEnterpriseSoftware ? <EnterpriseProductsShowcase /> : <SolutionProducts />}
      <SolutionTestimonial testimonial={data.testimonial} images={data.trustImages} />
      <SolutionGuarantees guarantees={data.guarantees} />
      <SolutionFAQ faqs={data.faqs} title={data.title} />
      <SolutionCTA headline={data.ctaHeadline} relatedSlugs={data.relatedSlugs} relatedTitles={relatedTitles} />
      <Footer />
    </div>
  );
};

export default SolutionPage;