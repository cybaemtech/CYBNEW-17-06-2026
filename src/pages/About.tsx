import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Shield, Globe, Lightbulb, HeartHandshake, Award, Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { containerVariants, itemVariants } from "@/lib/animations";
import { useCounter } from "@/hooks/useCounter";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { aboutSeoData } from "@/data/seo/aboutSeo";

/* ──────────────────── SEO ──────────────────── */
const useSEO = () => {
  return (
    <SEOHead
      title={aboutSeoData.title}
      description={aboutSeoData.description}
      canonical={aboutSeoData.canonical}
      keywords={aboutSeoData.keywords}
      ogDescription={aboutSeoData.ogDescription}
      ogImageAlt={aboutSeoData.ogImageAlt}
      twitterDescription={aboutSeoData.twitterDescription}
      jsonLd={aboutSeoData.jsonLd}
    />
  );
};

/* ──────────────────── HERO ──────────────────── */
const AboutHero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative pt-32 pb-0 overflow-hidden" style={{ backgroundColor: "hsl(var(--primary))" }}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Centered text — now on top */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center pt-8 pb-20 lg:pb-28 relative z-10"
        >
          <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary-foreground/60 mb-4">
            Leading Technology Solutions Provider
          </motion.span>
          <motion.h1 variants={itemVariants} className="font-display text-4xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
            Premium IT Service
            <br />
            <span className="italic font-light">zero compromise</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg lg:text-xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed mb-8">
            CYBAEM TECH PVT. LTD. is a premier global technology solutions company specializing in innovative IT infrastructure management, software development services, and cloud computing solutions.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to="/#solutions"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-primary-foreground/30 text-primary-foreground rounded-full hover:bg-primary-foreground/10 transition-colors"
            >
              Learn More About Our Solutions <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* 4-image grid — now below */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-4 lg:gap-6"
        >
          <motion.div variants={itemVariants} style={{ y: y1 }} className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img src="/images/about-team-1.avif" alt="Team collaborating at Cybaem Tech" className="w-full h-full object-cover" loading="eager" width={640} height={480} />
          </motion.div>
          <motion.div variants={itemVariants} style={{ y: y2 }} className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img src="/images/about-code.avif" alt="Enterprise code development" className="w-full h-full object-cover" loading="eager" width={640} height={480} />
          </motion.div>
          <motion.div variants={itemVariants} style={{ y: y2 }} className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img src="/images/about-team-2.avif" alt="Technology solutions demonstration" className="w-full h-full object-cover" loading="lazy" width={640} height={480} />
          </motion.div>
          <motion.div variants={itemVariants} style={{ y: y1 }} className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img src="/images/about-datacenter.avif" alt="Secure data center infrastructure" className="w-full h-full object-cover" loading="lazy" width={640} height={480} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── MISSION / VALUES / PROCESS CARDS ──────────────────── */
const pillars = [
  {
    tag: "Mission",
    title: "Outcomes, not just code",
    desc: "Founded in 2020 by industry veteran Rohan Bhosale, our experienced team delivers tailored IT solutions that help enterprises optimize operations, enhance security, and achieve scalable business growth.",
    image: "/images/about-mission.avif",
  },
  {
    tag: "Values",
    title: "Security. Accountability. Always.",
    desc: "We operate with dual ISO compliance, zero scope creep, and relentless quality. Our commitment to excellence and cutting-edge technology has made us the preferred IT partner for 75+ clients across diverse industries.",
    image: "/images/about-datacenter.avif",
  },
  {
    tag: "How we work",
    title: "Process-led. Results delivered.",
    desc: "A dedicated owner leads each project, aligned to your time zone. We freeze requirements, sign off scopes, and deliver with precision — from startup ventures to established enterprises.",
    image: "/images/about-process.avif",
  },
];

const PillarsSection = () => {
  return (
    <section className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {pillars.map((p) => (
            <motion.div
              key={p.tag}
              variants={itemVariants}
              className="glass-panel rounded-2xl overflow-hidden group"
            >
              <div className="p-8 pb-6">
                <span className="text-xs font-medium tracking-[0.15em] uppercase text-primary mb-3 block">{p.tag}</span>
                <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={640}
                  height={192}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── STATS STRIP ──────────────────── */
const statsData = [
  { value: 75, suffix: "+", label: "Satisfied Clients" },
  { value: 5, suffix: "+", label: "Years of Excellence" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

const StatsStrip = () => {
  return (
    <section className="py-16" style={{ backgroundColor: "hsl(var(--primary))" }}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {statsData.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCounter(value, 2000);
  return (
    <motion.div ref={ref} variants={itemVariants} className="flex flex-col items-center">
      <span className="font-display text-4xl lg:text-5xl font-bold text-primary-foreground">
        {Math.round(count)}{suffix}
      </span>
      <span className="text-sm text-primary-foreground/60 mt-2">{label}</span>
    </motion.div>
  );
};

/* ──────────────────── CORE VALUES ──────────────────── */
const coreValues = [
  { icon: Shield, title: "Security First", desc: "We prioritize security in every solution we deliver." },
  { icon: Globe, title: "Global Perspective", desc: "Bringing global expertise to local challenges." },
  { icon: Lightbulb, title: "Innovation", desc: "Embracing cutting-edge technology for business." },
  { icon: Clock, title: "Reliability", desc: "Consistent, reliable solutions for business operations." },
  { icon: HeartHandshake, title: "Client Partnership", desc: "We build lasting partnerships with our clients." },
  { icon: Award, title: "Excellence", desc: "Delivering high-quality solutions that exceed expectations." },
];

const CoreValuesSection = () => {
  return (
    <section className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-2xl mb-16">
            <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4">
              What drives us
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight">
              Our Core Values
            </motion.h2>
          </div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((v) => (
              <motion.div
                key={v.title}
                variants={itemVariants}
                className="glass-panel rounded-xl p-8 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <v.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── TIMELINE ──────────────────── */
const milestones = [
  { year: "2020", title: "Foundation", desc: "CybaemTech was founded with a clear vision: to revolutionize enterprise IT solutions and empower businesses with cutting-edge technology. It was a year of laying the groundwork and assembling a passionate team dedicated to innovation." },
  { year: "2021", title: "Global Expansion", desc: "Building on our initial success, we rapidly expanded our operations, extending our reach to serve clients across multiple continents. This global footprint allowed us to bring our transformative solutions to a broader audience and tackle diverse IT challenges." },
  { year: "2022", title: "Innovation Hub", desc: "Understanding the pace of technological change, we launched our dedicated Innovation Hub. This specialized unit focuses on cutting-edge research and development, ensuring we remain at the forefront of emerging technologies." },
  { year: "2023", title: "Industry Recognition", desc: "Our commitment to excellence didn't go unnoticed. 2023 was a landmark year where we received multiple prestigious industry awards, acknowledging our leadership and outstanding contributions in IT services." },
  { year: "2024", title: "Strategic Partnerships", desc: "We formed strategic alliances with several leading technology providers. These partnerships allow us to integrate best-in-class tools and platforms, providing our clients with even more robust and integrated IT ecosystems." },
  { year: "2025", title: "Client-Centric Solutions & Future Growth", desc: "We're doubling down on our commitment to client-centricity. Rolling out enhanced service frameworks and customized solution offerings, while actively exploring new market verticals and investing in advanced AI and machine learning capabilities." },
  { year: "2026", title: "Product-Led Growth & Global Expansion", desc: "Shifting towards a product-led approach, focusing on building scalable digital products alongside services. Expanding into international markets to reach a broader global audience and drive the next phase of growth." },
];

const TimelineSection = () => {
  return (
    <section className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-3xl mb-16">
            <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4">
              Our Journey
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-4">
              Milestones in Transforming Enterprise IT
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
              We're proud of the path we've forged in the world of enterprise IT. Here's a look at some of the key milestones in our journey.
            </motion.p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  variants={itemVariants}
                  className={`relative flex flex-col lg:flex-row items-start gap-6 lg:gap-12 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`lg:w-1/2 pl-16 lg:pl-0 ${i % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:pl-12"}`}>
                    <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-primary mb-2">{m.year}</span>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background" />

                  {/* Spacer for the other side */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── TESTIMONIALS ──────────────────── */
const testimonials = [
  {
    quote: "Cybaem Tech's process is flawless. Every milestone was delivered on time, and our security standards were not just met—they were exceeded.",
    author: "Alex Rivera",
    role: "CTO at VertexCore",
    image: "/images/about-team-3.avif",
  },
  {
    quote: "Zero downtime, full compliance. Cybaem Tech's engineers delivered exactly as promised—on schedule, on budget, and with total transparency.",
    author: "Taylor Brooks",
    role: "COO at Medisync",
    image: "/images/about-team-4.avif",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={itemVariants}
              className="glass-panel rounded-2xl overflow-hidden"
            >
              <div className="p-8 lg:p-10">
                <blockquote className="text-lg text-foreground leading-relaxed mb-6 italic">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-xs">
                    {t.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
              <img src={t.image} alt={t.author} className="w-full h-56 object-cover" loading="lazy" width={640} height={224} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── CTA ──────────────────── */
const AboutCTA = () => {
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: "hsl(var(--primary))" }}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-6">
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-primary-foreground/70 leading-relaxed mb-10">
            Let's discuss how CYBAEM TECH can help you optimize operations, enhance security, and achieve scalable business growth.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold bg-primary-foreground text-primary rounded-full hover:opacity-90 transition-opacity"
            >
              Contact Us Today <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── PAGE ──────────────────── */
const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {useSEO()}
      <Navbar />
      <main>
        <AboutHero />
        <PillarsSection />
        <StatsStrip />
        <CoreValuesSection />
        <TimelineSection />
        <TestimonialsSection />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
