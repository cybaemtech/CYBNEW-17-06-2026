import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield, Lightbulb, HeartHandshake, Users, Clock, BarChart3,
  Globe, Award, ArrowRight, ArrowUpRight, Mail,
  Heart, Briefcase, GraduationCap, Gamepad2, Plane,
  Laptop, Calendar, PartyPopper, Home,
  Sparkles, MessageSquare, BookOpen, UserCheck, Star, Scale
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { containerVariants, itemVariants } from "@/lib/animations";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { approachSeoData } from "@/data/seo/approachSeo";

/* ──────────────────── SEO ──────────────────── */
const useSEO = () => {
  return (
    <SEOHead
      title={approachSeoData.title}
      description={approachSeoData.description}
      canonical={approachSeoData.canonical}
      keywords={approachSeoData.keywords}
      ogDescription={approachSeoData.ogDescription}
      ogImageAlt={approachSeoData.ogImageAlt}
      twitterDescription={approachSeoData.twitterDescription}
      twitterImageAlt={approachSeoData.twitterImageAlt}
      jsonLd={approachSeoData.jsonLd}
    />
  );
};

/* ──────────────────── HERO ──────────────────── */
const ApproachHero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative pt-32 pb-24 lg:pb-32 overflow-hidden" style={{ backgroundColor: "hsl(var(--primary))" }}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary-foreground/60 mb-4">
            Leadership & Partnership
          </motion.span>
          <motion.h1 variants={itemVariants} className="font-display text-4xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
            Meet our visionary
            <br />
            <span className="italic font-light">IT Service leaders & partners</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg lg:text-xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Discover our strategic partnerships that drive excellence in technology innovation, digital marketing, and industry leadership.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── LEADERSHIP CARDS ──────────────────── */
const leaders = [
  {
    years: "18+Y",
    name: "Rohan Bhosale",
    title: "Founder & CEO",
    subtitle: "Global IT Strategy & Digital Marketing",
    desc: "Leading digital marketing initiatives across Fortune 500 companies",
    skills: ["Cloud Architecture", "Digital Strategy", "Enterprise Solutions"],
    quote: "Innovation is not just about technology; it's about transforming possibilities into reality.",
    experience: "18+ years of experience",
  },
  {
    years: "15+Y",
    name: "Akshay Navale",
    title: "Chief Technology Officer",
    subtitle: "AI Strategy & Product Leadership | Driving Innovation & Scalable Tech Solutions",
    desc: "Architecting next-generation technology solutions & leading innovation teams",
    skills: ["AI/ML", "Cybersecurity", "Cloud Infrastructure"],
    quote: "The future belongs to those who embrace AI-Tech as a force for positive change.",
    experience: "15+ years of experience",
  },
  {
    years: "12+Y",
    name: "Yash Bhalekar",
    title: "Director",
    subtitle: "Business Development",
    desc: "Driving financial excellence and strategic growth across global operations",
    skills: ["FinTech Solutions", "Investment Strategy", "Risk Management"],
    quote: "Financial innovation drives technological possibilities and sustainable growth.",
    experience: "12+ years of experience",
  },
];

const LeadershipSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name}
              variants={itemVariants}
              className="glass-panel rounded-2xl p-8 lg:p-12 grid lg:grid-cols-[auto_1fr] gap-8 items-start"
            >
              {/* Years badge */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-primary">{leader.years}</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="mb-4">
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground">{leader.name}</h3>
                  <p className="text-primary font-semibold mt-1">{leader.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{leader.subtitle}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{leader.desc}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {leader.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {skill}
                    </span>
                  ))}
                </div>

                <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary/30 pl-4 mb-3">
                  "{leader.quote}"
                </blockquote>
                <span className="text-xs text-muted-foreground">{leader.experience}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── LEADERSHIP PHILOSOPHY ──────────────────── */
const philosophySteps = [
  { num: "1", title: "Lead by Example", desc: "Our leaders demonstrate the values and behaviors we expect from our entire organization." },
  { num: "2", title: "Empower Others", desc: "We believe in empowering our teams with the tools, resources, and autonomy they need to succeed." },
  { num: "3", title: "Drive Innovation", desc: "We foster a culture of innovation where new ideas are welcomed and failure is seen as learning." },
];

const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="max-w-3xl mb-16">
            <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4">
              Our Leadership Philosophy
            </motion.span>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
              At CybaemTech, our leadership philosophy is built on transparency, innovation, and servant leadership. We believe that great leaders create more leaders, and our approach focuses on empowering our teams to achieve extraordinary results while maintaining the highest ethical standards.
            </motion.p>
          </div>

          <motion.div className="grid md:grid-cols-3 gap-6">
            {philosophySteps.map((s) => (
              <motion.div key={s.num} variants={itemVariants} className="glass-panel rounded-xl p-8">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-sm mb-5">
                  {s.num}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── PARTNER ECOSYSTEM ──────────────────── */
const PartnerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-border" style={{ backgroundColor: "hsl(var(--primary))" }}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary-foreground/60 mb-4">
            Strategic Partnerships
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-6">
            Our Strategic Partner Ecosystem
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-primary-foreground/70 leading-relaxed">
            To deliver comprehensive, world-class technology solutions, Cybaemtech builds alliances at every level of the technology stack. We partner with strategic distributors for streamlined access to global technology, and with specialist firms for deep, domain-specific expertise.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── TEAM CULTURE & CELEBRATIONS ──────────────────── */
const celebrations = [
  { icon: PartyPopper, title: "Team Outing", image: "/images/about-team-1.avif", alt: "Team outing and bonding activity" },
  { icon: PartyPopper, title: "Independence Day Celebration", image: "/images/about-team-2.avif", alt: "Independence Day celebration" },
  { icon: PartyPopper, title: "Annual Function", image: "/images/about-team-3.avif", alt: "Annual company function" },
  { icon: PartyPopper, title: "Diwali Celebration", image: "/images/about-team-4.avif", alt: "Diwali festival celebration" },
];

const CultureCelebrationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4">
              Team Culture & Celebrations
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-4">
              We celebrate every milestone together
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
              From festivals to achievements, our vibrant culture brings us closer as one team.
            </motion.p>
          </div>

          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {celebrations.map((c, i) => (
              <motion.div
                key={`${c.title}-${i}`}
                variants={itemVariants}
                className="glass-panel rounded-xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
              >
                <div className="relative w-full h-40 overflow-hidden bg-muted">
                  <img
                    src={c.image}
                    alt={c.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width={200}
                    height={160}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4 text-center">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                    <c.icon size={18} className="text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{c.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── WHY CHOOSE CYBAEM TECH ──────────────────── */
const whyChoose = [
  { icon: Lightbulb, title: "Innovation-Driven Approach", desc: "We embrace creativity and cutting-edge technology to keep your business ahead of the competition. Our team stays updated with latest technological trends and industry best practices." },
  { icon: Award, title: "Quality & Excellence", desc: "Our commitment to quality ensures high-performance, result-driven IT solutions that meet and exceed client expectations. We follow rigorous testing and quality assurance processes." },
  { icon: HeartHandshake, title: "Customer-Centric Solutions", desc: "We tailor our services to meet unique business needs, fostering long-term partnerships and sustainable success. Every solution is designed with your specific requirements in mind." },
  { icon: BarChart3, title: "Proven Track Record", desc: "With 75+ satisfied clients across diverse industries, we have demonstrated our ability to deliver successful technology implementations and digital marketing projects." },
];

const WhyChooseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="max-w-3xl mb-16">
            <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4">
              WHY CHOOSE
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-2">
              CYBAEM TECH
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
              Your Trusted Technology Partner Since 2020
            </motion.p>
          </div>

          <motion.div className="grid sm:grid-cols-2 gap-6">
            {whyChoose.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="glass-panel rounded-xl p-8 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── DIVERSITY & INCLUSION ──────────────────── */
const DiversitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-border" style={{ backgroundColor: "hsl(var(--primary))" }}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary-foreground/60 mb-4">
              DIVERSITY & INCLUSION
            </motion.span>
            <motion.p variants={itemVariants} className="text-lg text-primary-foreground/80 leading-relaxed mb-10">
              At CybaemTech, we believe that diversity drives innovation. We're committed to creating an inclusive environment where everyone can thrive, regardless of their background, identity, or experience.
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
            <div className="bg-primary-foreground/10 rounded-2xl p-8 text-center">
              <span className="font-display text-5xl font-bold text-primary-foreground">40%</span>
              <p className="text-sm text-primary-foreground/70 mt-2">Women in Leadership</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl p-8 text-center">
              <span className="font-display text-5xl font-bold text-primary-foreground">60%</span>
              <p className="text-sm text-primary-foreground/70 mt-2">Diverse Hiring</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── BENEFITS ──────────────────── */
const benefitCategories = [
  {
    icon: Heart,
    title: "Health & Wellness",
    desc: "Comprehensive health insurance, dental, vision, and wellness programs",
    items: ["Medical Insurance", "Mental health support"],
  },
  {
    icon: Scale,
    title: "Work-Life Balance",
    desc: "Flexible work arrangements and generous time off policies",
    items: ["Flexible work hours", "Remote work options", "Unlimited PTO"],
  },
  {
    icon: GraduationCap,
    title: "Professional Development",
    desc: "Continuous learning opportunities and career advancement programs",
    items: ["Training and certification budget", "Conference attendance", "Internal mentorship", "Leadership development"],
  },
  {
    icon: Users,
    title: "Team & Culture",
    desc: "Collaborative environment with regular team events and activities",
    items: ["Team building events", "Monthly social gatherings", "Office game rooms", "Volunteer opportunities"],
  },
  {
    icon: Globe,
    title: "Global Opportunities",
    desc: "Work with international teams and travel opportunities",
    items: ["Global project assignments", "International collaboration", "Cultural exchange programs"],
  },
];

const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="max-w-3xl mb-16">
            <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4">
              BENEFITS FOR THE WHOLE YOU
            </motion.span>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
              Our comprehensive benefits support your well-being at work and at home, so you can achieve your aspirations personally and professionally as part of our software development company in Pune.
            </motion.p>
          </div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitCategories.map((b) => (
              <motion.div
                key={b.title}
                variants={itemVariants}
                className="glass-panel rounded-xl p-8 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <b.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{b.desc}</p>
                <ul className="space-y-1.5">
                  {b.items.map((item) => (
                    <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── WORK ENVIRONMENT ──────────────────── */
const workEnvItems = [
  { icon: BookOpen, title: "Learning & Growth", desc: "Access to mentorship, skill development programs, and cross-team learning opportunities" },
  { icon: Clock, title: "Flexible Hours", desc: "Work schedules that adapt to your productivity and personal needs." },
  { icon: Calendar, title: "Team Events", desc: "Regular social events and team building activities" },
  { icon: Home, title: "Remote Work", desc: "Flexible remote work options and home office setup" },
];

const WorkEnvironmentSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="max-w-3xl mb-16">
            <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4">
              YOUR WORK ENVIRONMENT
            </motion.span>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
              We've created a modern workspace that supports collaboration, creativity, and well-being for our IT consulting company team.
            </motion.p>
          </div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workEnvItems.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="glass-panel rounded-xl p-6 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── CULTURE & VALUES ──────────────────── */
const cultureValues = [
  { icon: Sparkles, title: "Innovation First", desc: "We encourage creative thinking and innovative solutions to complex problems." },
  { icon: MessageSquare, title: "Collaboration & Brainstorming", desc: "We believe in the power of teamwork and cross-functional collaboration." },
  { icon: BookOpen, title: "Continuous Learning", desc: "We invest in our people's growth and encourage lifelong learning." },
  { icon: Users, title: "Diversity & Inclusion", desc: "We celebrate diversity and create an inclusive environment for all." },
  { icon: Star, title: "Excellence", desc: "We strive for excellence in everything we do, from code to client service." },
  { icon: Scale, title: "Work-Life Balance", desc: "We support our team's personal well-being and work-life integration." },
];

const CultureValuesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-border" style={{ backgroundColor: "hsl(var(--primary))" }}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary-foreground/60 mb-4">
              OUR CULTURE & VALUES
            </motion.span>
            <motion.p variants={itemVariants} className="text-lg text-primary-foreground/70 leading-relaxed">
              As a leading technology partner, we foster an environment where innovation thrives and every team member can reach their full potential.
            </motion.p>
          </div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultureValues.map((v) => (
              <motion.div
                key={v.title}
                variants={itemVariants}
                className="bg-primary-foreground/10 rounded-xl p-8 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center mb-5 group-hover:bg-primary-foreground/20 transition-colors">
                  <v.icon size={22} className="text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-primary-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── CTA ──────────────────── */
const ApproachCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4">
            READY TO JOIN OUR TEAM?
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-6">
            Discover opportunities to grow your career
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed mb-10">
            Grow your career while making a meaningful impact in the world of technology implementation and digital marketing services.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
            >
              View Open Positions <ArrowUpRight size={16} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-4 text-sm font-medium border border-border text-foreground rounded-full hover:bg-muted transition-colors"
            >
              Learn More About Us <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────── PAGE ──────────────────── */
const Approach = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {useSEO()}
      <Navbar />
      <main>
        <ApproachHero />
        <LeadershipSection />
        <PhilosophySection />
        <PartnerSection />
        <CultureCelebrationsSection />
        <WhyChooseSection />
        <DiversitySection />
        <BenefitsSection />
        <WorkEnvironmentSection />
        <CultureValuesSection />
        <ApproachCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Approach;
