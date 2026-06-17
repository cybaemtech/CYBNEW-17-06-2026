import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import { homeSeoData } from "@/data/seo/homeSeo";
import { TrustSkeleton, ContentSkeleton, CTASkeleton } from "@/components/SectionSkeleton";

// Lazy-load below-fold sections to reduce initial bundle & TBT
const TrustAnchorSection = lazy(() => import("@/components/TrustAnchorSection"));
const DifferenceSection = lazy(() => import("@/components/DifferenceSection"));
const SolutionsSection = lazy(() => import("@/components/SolutionsSection"));
const GlobalReachSection = lazy(() => import("@/components/GlobalReachSection"));
const OrbitSection = lazy(() => import("@/components/OrbitSection"));
const CTASection = lazy(() => import("@/components/CTASection"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={homeSeoData.title}
        description={homeSeoData.description}
        canonical={homeSeoData.canonical}
        keywords={homeSeoData.keywords}
        ogTitle={homeSeoData.ogTitle}
        ogDescription={homeSeoData.ogDescription}
        ogImageAlt={homeSeoData.ogImageAlt}
        twitterTitle={homeSeoData.twitterTitle}
        twitterDescription={homeSeoData.twitterDescription}
        twitterImageAlt={homeSeoData.twitterImageAlt}
        jsonLd={homeSeoData.jsonLd}
      />
      <Navbar />
      <HeroSection />
      <Suspense fallback={<TrustSkeleton />}>
        <TrustAnchorSection />
      </Suspense>
      <Suspense fallback={<ContentSkeleton />}>
        <DifferenceSection />
      </Suspense>
      <Suspense fallback={<ContentSkeleton />}>
        <SolutionsSection />
      </Suspense>
      <Suspense fallback={<ContentSkeleton />}>
        <GlobalReachSection />
      </Suspense>
      <Suspense fallback={<ContentSkeleton />}>
        <OrbitSection />
      </Suspense>
      <Suspense fallback={<CTASkeleton />}>
        <CTASection />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Index;
