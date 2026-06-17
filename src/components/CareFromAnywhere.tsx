import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const looks = [
  {
    tag: "Business & Corporate",
    name: "Your digital\nheadquarters",
    purpose: "The platform that earns trust before a word is read. Built to convert enterprise attention into lasting relationships.",
    features: ["About & Services", "Lead Gen Forms", "Case Studies", "Multi-team CMS", "Enterprise SEO"],
    gradient: "linear-gradient(135deg, #FF6B6B, #EE5A24)",
    emoji: "🏢",
  },
  {
    tag: "E-commerce",
    name: "Every page earns its keep",
    purpose: "Revenue-first architecture. From catalogue to checkout — optimised for conversion, not decoration.",
    features: ["Product Catalogues", "Secure Checkout", "Payment Gateways", "Cart Recovery"],
    gradient: "linear-gradient(135deg, #0984E3, #6C5CE7)",
    emoji: "🛒",
  },
  {
    tag: "Portfolio",
    name: "Let your work do the talking",
    purpose: "A visual resume that sells while you sleep. Crafted for photographers, designers, and creative studios.",
    features: ["Image Galleries", "Case Studies", "Testimonials", "Enquiry Flow"],
    gradient: "linear-gradient(135deg, #00B894, #00CEC9)",
    emoji: "🎨",
  },
  {
    tag: "Landing Pages",
    name: "One page.\nOne decision.",
    purpose: "Laser-focused on a single CTA. Minimal friction. Maximum conversion rate.",
    features: ["A/B Testing", "Lead Capture", "Analytics"],
    gradient: "linear-gradient(135deg, #FDCB6E, #E17055)",
    emoji: "🎯",
  },
  {
    tag: "Blog & Personal",
    name: "Build your audience.\nOwn your voice.",
    purpose: "Thought leadership at scale. SEO-architected from the foundation up to compound your reach.",
    features: ["Categories & Tags", "Search", "Newsletter"],
    gradient: "linear-gradient(135deg, #A29BFE, #FD79A8)",
    emoji: "✍️",
  },
  {
    tag: "SaaS & Web Apps",
    name: "Tools users\nreturn to daily",
    purpose: "Functional, scalable, and built for users who interact — not just read.",
    features: ["Auth & Roles", "Dashboards", "API-first", "Data Persistence"],
    gradient: "linear-gradient(135deg, #55EFC4, #81ECEC)",
    emoji: "⚙️",
  },
];

const containerAnim = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const CareFromAnywhere = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        fontFamily: "'DM Sans', 'Inter', sans-serif",
        background: "linear-gradient(180deg, #FFF8E7 0%, #FFF0F5 30%, #F0F8FF 60%, #F5FFFA 100%)",
        padding: "60px 0 80px",
        isolation: "isolate",
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FF6B6B, transparent 70%)" }} />
        <div className="absolute top-1/4 -right-16 w-56 h-56 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #6C5CE7, transparent 70%)" }} />
        <div className="absolute bottom-20 left-1/4 w-48 h-48 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #00B894, transparent 70%)" }} />
        <div className="absolute -bottom-10 right-1/3 w-60 h-60 rounded-full opacity-12" style={{ background: "radial-gradient(circle, #FDCB6E, transparent 70%)" }} />
        {["✦", "●", "◆", "★", "▲", "◯", "✿", "♦"].map((s, i) => (
          <span
            key={i}
            className="absolute text-2xl select-none animate-bounce"
            style={{
              top: `${10 + (i * 12) % 80}%`,
              left: `${5 + (i * 14) % 90}%`,
              opacity: 0.12 + (i % 3) * 0.05,
              color: ["#FF6B6B", "#6C5CE7", "#00B894", "#FDCB6E", "#FD79A8", "#0984E3", "#E17055", "#55EFC4"][i],
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + i * 0.3}s`,
              fontSize: `${16 + (i % 4) * 8}px`,
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div variants={containerAnim} initial="hidden" animate={isInView ? "visible" : "hidden"}>

          {/* ── Masthead ── */}
          <motion.div
            variants={itemAnim}
            className="grid grid-cols-1 md:grid-cols-2 items-end gap-6 md:gap-0 pb-8 mb-10 sm:mb-14"
            style={{ borderBottom: "2px solid rgba(0,0,0,0.08)" }}
          >
            <div>
              <span
                className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase mb-4 px-3 py-1 rounded-full"
                style={{ background: "linear-gradient(135deg, #FF6B6B, #FD79A8)", color: "#fff" }}
              >
                🌈 Web Systems
              </span>
              <h2
                className="text-4xl sm:text-5xl lg:text-[80px] xl:text-[88px] font-bold leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Space Grotesk', 'Syne', sans-serif", color: "#1A1A2E" }}
              >
                Care from
                <br />
                <span
                  className="italic"
                  style={{
                    background: "linear-gradient(135deg, #FF6B6B, #6C5CE7, #00B894, #FDCB6E)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Anywhere
                </span>
              </h2>
            </div>

            <div className="md:pl-12 md:border-l md:border-black/10">
              <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: "#6C5CE7" }}>
                Collection № 01 — Web Platforms
              </p>
              <p className="text-sm sm:text-[15px] font-light leading-[1.75] max-w-[380px]" style={{ color: "#4A5568" }}>
                With secure, high-performance platforms, reaching your audience becomes effortless —
                whether <strong style={{ color: "#1A1A2E", fontWeight: 600 }}>D2C, B2B, B2C,</strong> or internal.
                Every platform is engineered to perform at enterprise-grade from day one.
              </p>
            </div>
          </motion.div>

          {/* ── Collection Grid ── */}
          <div className="care-grid">
            {looks.map((look, i) => (
              <motion.div
                key={look.tag}
                variants={itemAnim}
                className="care-card group relative overflow-hidden cursor-pointer rounded-2xl"
                data-first={i === 0 ? "true" : undefined}
                style={{
                  background: look.gradient,
                  gridColumn: i === 0 ? "span 5" : i < 3 ? "span 7" : "span 4",
                  minHeight: i === 0 ? 560 : i < 3 ? 280 : 320,
                }}
              >
                {/* Large decorative number — hidden on mobile */}
                <span className="care-deco-num absolute top-6 right-6 font-bold leading-none pointer-events-none select-none transition-all duration-500 group-hover:scale-110"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(48px, 8vw, 96px)",
                    color: "rgba(255,255,255,0.15)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Card header row: emoji + tag */}
                <div className="care-card-header absolute top-6 left-6 right-6 flex items-center gap-3 z-10">
                  <span className="text-2xl opacity-80 shrink-0 group-hover:scale-125 transition-transform duration-500">
                    {look.emoji}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-[5px] h-[5px] rounded-full bg-white/70 shrink-0" />
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/80 leading-tight">
                      {look.tag}
                    </span>
                  </div>
                </div>

                {/* Card content: title + description */}
                <div className="care-card-body absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3
                    className="font-bold text-white mb-2 transition-transform duration-500 group-hover:-translate-y-2 whitespace-pre-line"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: i === 0 ? "clamp(22px, 3.5vw, 44px)" : "clamp(18px, 3vw, 34px)",
                      lineHeight: 1.2,
                      textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    {look.name}
                  </h3>
                  <p className="care-card-desc text-[13px] font-light text-white/75 leading-relaxed transition-transform duration-500 group-hover:-translate-y-2">
                    {look.purpose}
                  </p>

                  {/* Reveal features on hover */}
                  <div className="mt-3 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <div className="w-9 h-[2px] bg-white/50 mb-3 rounded-full" />
                    <div className="flex flex-wrap gap-2">
                      {look.features.map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-white/90"
                          style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(4px)" }}
                        >
                          <span className="w-1 h-1 rounded-full bg-white/70" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }}
                />
              </motion.div>
            ))}

            {/* CTA Card */}
            <motion.div
              variants={itemAnim}
              className="care-cta-card relative overflow-hidden rounded-2xl cursor-pointer group"
              style={{
                gridColumn: "span 12",
                background: "linear-gradient(135deg, #FF6B6B, #FD79A8, #A29BFE, #6C5CE7)",
              }}
            >
              <div className="care-cta-inner flex items-center justify-between gap-6 px-6 sm:px-10 py-7 sm:py-8 relative z-10">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-[6px] h-[6px] rounded-full bg-white/60" />
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/70">
                      Educational & Informational
                    </span>
                  </div>
                  <h3
                    className="font-bold text-white text-lg sm:text-xl md:text-2xl mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                  >
                    Knowledge platforms that position you as the authority ✨
                  </h3>
                  <p className="text-[13px] text-white/70 max-w-[500px]">
                    Deep-dive wikis, resource portals, and community knowledge bases — structured for discovery, retention, and thought leadership at scale.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="shrink-0 inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 font-bold text-xs sm:text-sm tracking-wide uppercase rounded-xl transition-all duration-300 group-hover:translate-x-1 group-hover:shadow-lg whitespace-nowrap"
                  style={{ background: "#1A1A2E", color: "#fff" }}
                >
                  Start a Project
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ── Footer Stats ── */}
          <motion.div
            variants={itemAnim}
            className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4 mt-8 sm:mt-10 pt-6 text-[11px] tracking-[0.15em] uppercase"
            style={{ borderTop: "2px solid rgba(0,0,0,0.06)", color: "#6B7280" }}
          >
            <span>Cybaem Web Systems — Seven Platform Categories</span>
            <div className="flex flex-wrap gap-6 sm:gap-9">
              {[
                { value: "200+", label: "Platforms Delivered" },
                { value: "0.8s", label: "Avg Load Time" },
                { value: "98%", label: "Client Satisfaction" },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <strong className="text-lg font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A1A2E" }}>
                    {s.value}
                  </strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>

      <style>{`
        /* ── Desktop: original 12-col editorial grid ── */
        .care-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 3px;
        }

        /* ── Tablet (≤ 900px): 2-column ── */
        @media (max-width: 900px) {
          .care-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
          .care-card {
            grid-column: span 1 !important;
            min-height: 300px !important;
          }
          .care-card[data-first="true"] {
            grid-column: span 2 !important;
            min-height: 360px !important;
          }
          .care-cta-card {
            grid-column: span 2 !important;
          }
          .care-deco-num {
            font-size: 56px !important;
          }
        }

        /* ── Mobile (≤ 560px): single column ── */
        @media (max-width: 560px) {
          .care-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          /* All cards: single column, tall enough so top header and bottom body never overlap */
          .care-card {
            grid-column: span 1 !important;
            min-height: 260px !important;
          }
          .care-card[data-first="true"] {
            min-height: 300px !important;
          }
          /* Hide the big decorative number — frees vertical space */
          .care-deco-num {
            display: none !important;
          }
          /* Hide description on mobile — title alone is enough */
          .care-card-desc {
            display: none !important;
          }
          /* Tighten bottom padding so title sits closer to bottom edge */
          .care-card-body {
            padding: 16px !important;
          }
          /* CTA card: stack button below text */
          .care-cta-card {
            grid-column: span 1 !important;
          }
          .care-cta-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CareFromAnywhere;
