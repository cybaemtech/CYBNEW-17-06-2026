import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
const CookieConsentBanner = lazy(() => import("./components/CookieConsentBanner"));

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const WebSystems = lazy(() => import("./pages/WebSystems"));
const ITStaffAugmentation = lazy(() => import("./pages/ITStaffAugmentation"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Approach = lazy(() => import("./pages/Approach"));
const SolutionPage = lazy(() => import("./components/solutions/SolutionPage"));
const DigitalGrowth = lazy(() => import("./pages/DigitalGrowth"));
const ManagedIT = lazy(() => import("./pages/ManagedIT"));
const ITInfrastructure = lazy(() => import("./pages/ITInfrastructure"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const Portfolio = lazy(() => import("./pages/Portfolio"));

const Accessibility = lazy(() => import("./pages/Accessibility"));

const queryClient = new QueryClient();

const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:text-sm focus:font-medium"
  >
    Skip to main content
  </a>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SkipToContent />
        <ScrollToTop />
        <Suspense fallback={null}><CookieConsentBanner /></Suspense>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/life-at-cybaemtech" element={<Approach />} />
            <Route path="/approach" element={<Navigate to="/life-at-cybaemtech" replace />} />
            <Route path="/solutions/web-systems" element={<WebSystems />} />
            <Route path="/solutions/it-staff-augmentation" element={<ITStaffAugmentation />} />
            <Route path="/solutions/digital-revenue-growth" element={<DigitalGrowth />} />
            <Route path="/solutions/managed-it" element={<ManagedIT />} />
            <Route path="/solutions/it-infrastructure-services" element={<ITInfrastructure />} />
            <Route path="/solutions/:slug" element={<SolutionPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/refund-cancellation-policy" element={<RefundPolicy />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
