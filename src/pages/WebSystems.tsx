import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { solutionsSeoData } from "@/data/seo/solutionsSeo";
import { ArrowUpRight, Globe, ShoppingCart, Palette, MousePointerClick, PenTool, Layers, BookOpen, ArrowRight, Star, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MagneticButton } from "@/components/Navbar";
import { containerVariants, itemVariants } from "@/lib/animations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { solutionsData } from "@/data/solutionsData";
import PlatformFitFinder from "@/components/PlatformFitFinder";
import CareFromAnywhere from "@/components/CareFromAnywhere";
import WebDesignMoodBoard from "@/components/WebDesignMoodBoard";

/* ─── Data ─── */
const data = solutionsData["web-systems"];

const categories = [
  {
    icon: Globe,
    title: "Business & Corporate",
    purpose: "To establish credibility and generate leads.",
    description: "These act as a digital brochure for a company. They provide information about services, the company's mission, and contact details.",
    example: "A site for a managed IT provider that details support models and service level agreements.",
    features: '"About Us" sections, service lists, and "Contact" forms.',
    image: "/images/web-corporate.avif",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Websites",
    purpose: "To facilitate online sales and transactions.",
    description: "These are online storefronts where users can browse, shop, and pay for products or services directly.",
    features: "Product catalogs, shopping carts, and secure payment gateway integrations.",
    image: "/images/web-ecommerce.avif",
  },
  {
    icon: Palette,
    title: "Portfolio Websites",
    purpose: "To act as a visual resume to attract clients or employers.",
    description: "Used by creative professionals (photographers, designers, developers) to showcase their past work and skills.",
    features: "High-quality image galleries, case studies, and testimonial sections.",
    image: "/images/web-portfolio.avif",
  },
  {
    icon: MousePointerClick,
    title: "Landing Pages",
    purpose: 'To convert visitors into leads or customers for a specific offer.',
    description: 'A single-page website focused on a specific marketing campaign or a single "Call to Action" (CTA).',
    features: "Minimal navigation, catchy headlines, and a prominent sign-up button or form.",
    image: "/images/web-landing.avif",
  },
  {
    icon: PenTool,
    title: "Blogs & Personal",
    purpose: "To share information, build an audience, or establish thought leadership.",
    description: "Focuses on written content, news, or personal journals. They are often updated regularly with new posts.",
    features: "Categories, tags, search bars, and comment sections.",
    image: "/images/web-blog.avif",
  },
  {
    icon: Layers,
    title: "SaaS & Web Applications",
    purpose: "To provide a specific service or utility via the browser.",
    description: "These are functional tools that users interact with, rather than just read.",
    example: "Project management tools (like Jira-like replicas) or automated dashboards.",
    features: "User authentication (login/signup), data persistence, and interactive interfaces.",
    image: "/images/web-saas.avif",
  },
  {
    icon: BookOpen,
    title: "Educational & Informational",
    purpose: "To educate the public or provide a knowledge base.",
    description: 'Includes "Wikis" or resource portals that provide deep-dive information on specific topics.',
    features: "Extensive search functionality, internal linking, and often a community-driven editing system.",
    image: "/images/web-educational.avif",
  },
];


const galleryImages = [
  "/images/web-corporate.avif",
  "/images/web-ecommerce.avif",
  "/images/web-portfolio.avif",
  "/images/web-landing.avif",
  "/images/web-blog.avif",
  "/images/web-saas.avif",
];

/* ─── Sections ─── */

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-[hsl(var(--card))] pt-24 sm:pt-28 md:pt-32 lg:pt-20">
    {/* Organic shapes */}
    <div className="absolute top-10 sm:top-20 right-[20%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-primary/5 blur-3xl" />
    <div className="absolute bottom-5 sm:bottom-10 left-[10%] w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] rounded-full bg-primary/8 blur-2xl" />

    <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-8 sm:py-12">
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* Left */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 sm:mb-4 block">
            Web Development Research Centre
          </motion.span>
          <motion.h1 variants={itemVariants} className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-foreground max-w-2xl">
            Web platforms built to{" "}
            <span className="text-primary italic">convert,</span>{" "}
            not just exist
          </motion.h1>
          <motion.p variants={itemVariants} className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 sm:mb-8">
            {data.heroSubheadline}
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <MagneticButton>
              <button
                onClick={() => document.getElementById('platform-fit-finder')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity w-full sm:w-auto justify-center sm:justify-start"
              >
                Start a Project
                <ArrowUpRight size={16} />
              </button>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/portfolio?tab=Web+%26+Digital&category=Lifestyle+%26+Luxury"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold border border-primary text-primary rounded-full hover:bg-primary/10 transition-colors w-full sm:w-auto justify-center sm:justify-start"
              >
                Check Our Work
                <ArrowRight size={16} />
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Trust bar */}
          <motion.div variants={itemVariants} className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 glass-panel rounded-xl px-4 sm:px-5 py-3 sm:py-4 w-full sm:max-w-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-primary/20 border-2 border-card" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Over 200 platforms launched with enterprise-grade reliability.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.3 }}
          className="relative hidden sm:block"
        >
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
            <img src="/images/web-hero.avif" alt="Web development team collaborating" className="w-full h-auto object-contain" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
          </div>
          {/* Floating badge */}
          <motion.div
            className="absolute -bottom-4 -left-4 glass-panel rounded-xl px-4 sm:px-5 py-2 sm:py-3 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span className="font-display text-xl sm:text-2xl font-bold text-primary">0.8s</span>
            <p className="text-xs text-muted-foreground">Avg. load time</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 section-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">
          <motion.h2 variants={itemVariants} className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
            Your Digital <span className="text-primary italic">Presence</span>
          </motion.h2>
          <div className="space-y-4 sm:space-y-5">
            <motion.p variants={itemVariants} className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
              We are a research centre that creates websites across different categories — from high-converting landing pages to complex SaaS platforms. Every project is built with performance, security, and scalability at its core.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link to="/about" className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-colors">
                Who We Are <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const GalleryMarquee = () => (
  <section className="py-6 sm:py-8 overflow-hidden section-border">
    <div className="flex marquee gap-2 sm:gap-4">
      {[...galleryImages, ...galleryImages].map((img, i) => (
        <div key={i} className="flex-shrink-0 w-[200px] sm:w-[280px] h-[120px] sm:h-[180px] rounded-lg sm:rounded-2xl overflow-hidden">
          <img src={img} alt="Gallery" className="w-full h-full object-cover" loading="lazy" />
        </div>
      ))}
    </div>
  </section>
);

const CategoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 section-border bg-[hsl(var(--card))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.span variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 sm:mb-4 block">
            What We Build
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-3 sm:mb-4 max-w-2xl">
            Care from <span className="text-primary italic">Anywhere</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl mb-10 sm:mb-12 lg:mb-16">
            With secure, high-performance platforms, reaching your audience becomes effortless — whether B2B, B2C, or internal.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                variants={itemVariants}
                className="group glass-panel rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:-translate-y-2 h-full flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <cat.icon size={32} className="text-primary" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
                  {cat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};




const TestimonialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const testimonials = [
    data.testimonial,
    {
      quote: "The platform they built handles 50K concurrent users without breaking a sweat. True enterprise-grade engineering.",
      author: "James Rivera",
      role: "Head of Engineering",
      company: "CloudPeak Inc.",
    },
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 section-border bg-[hsl(var(--card))]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-16">
            Every Project <span className="text-primary italic">Matters</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-panel rounded-2xl overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={data.trustImages[i] || data.trustImages[0]}
                    alt={`${t.company} project`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <p className="text-base text-foreground leading-relaxed mb-6">"{t.quote}"</p>
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: FAQ */}
            <div>
              <motion.span variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
                Frequently Asked Questions
              </motion.span>
              <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-4xl font-bold leading-tight mb-8">
                {data.title} — Answered
              </motion.h2>
              <motion.div variants={itemVariants}>
                <Accordion type="single" collapsible className="space-y-3">
                  {data.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="glass-panel rounded-xl px-6 border">
                      <AccordionTrigger className="text-left font-display font-semibold text-sm hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>

            {/* Right: Image */}
            <motion.div variants={itemVariants} className="hidden lg:block sticky top-32">
              <div className="rounded-3xl overflow-hidden aspect-[3/4]">
                <img
                  src="/images/web-corporate.avif"
                  alt="Web development process"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const relatedTitles = data.relatedSlugs.map((s) => solutionsData[s]?.title || s);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Organic shapes */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary-foreground/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-primary-foreground/5 blur-2xl" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-center max-w-2xl mx-auto">
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-6">
            Start Your Journey
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base text-primary-foreground/70 leading-relaxed mb-10">
            Book a session with our engineering team and begin building a web platform that converts, scales, and lasts.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold bg-primary-foreground text-primary rounded-full hover:opacity-90 transition-opacity"
              >
                Start a Project
                <ArrowUpRight size={16} />
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Avatars */}
          <motion.div variants={itemVariants} className="flex justify-center -space-x-3 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-primary-foreground/20 border-2 border-primary" />
            ))}
          </motion.div>

          {/* Related */}
          {data.relatedSlugs.length > 0 && (
            <motion.div variants={itemVariants} className="pt-8 border-t border-primary-foreground/15">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-primary-foreground/50 mb-4">Related Solutions</p>
              <div className="flex flex-wrap justify-center gap-3">
                {data.relatedSlugs.map((slug, i) => (
                  <Link
                    key={slug}
                    to={`/solutions/${slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-primary-foreground/20 rounded-full text-primary-foreground/80 hover:bg-primary-foreground/10 transition-all"
                  >
                    {relatedTitles[i]} <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Page ─── */

const WebSystems = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={solutionsSeoData["web-systems"].metaTitle}
        description={solutionsSeoData["web-systems"].metaDescription}
        canonical="/solutions/web-systems"
        keywords={solutionsSeoData["web-systems"].keywords}
        ogDescription={solutionsSeoData["web-systems"].ogDescription}
        ogImageAlt={solutionsSeoData["web-systems"].ogImageAlt}
        twitterDescription={solutionsSeoData["web-systems"].twitterDescription}
        twitterImageAlt={solutionsSeoData["web-systems"].twitterImageAlt}
        jsonLd={solutionsSeoData["web-systems"].jsonLdSchemas}
      />
      <Navbar />
      <Hero />
      <AboutSection />
      <GalleryMarquee />
      <CareFromAnywhere />
      <div id="platform-fit-finder">
        <PlatformFitFinder />
      </div>
      <WebDesignMoodBoard />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default WebSystems;
