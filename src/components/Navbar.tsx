import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Server,
  Shield,
  ShieldAlert,
  Code2,
  Globe,
  Users,
  TrendingUp,
  BarChart2,
  Linkedin,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import cybaemLogo from "@/assets/cybaem-logo.png";
import MobileMenu, { AnimatedHamburger } from "./MobileMenu";

export const solutionsColumns = [
  {
    label: "CLOUD & SECURITY",
    items: [
      {
        title: "IT Infrastructure Services",
        desc: "End-to-end managed IT, AMC, network & cloud.",
        slug: "it-infrastructure-services",
        icon: Server,
      },
      {
        title: "Managed IT & Security",
        desc: "Zero-Trust protection, 24/7 resilience.",
        slug: "managed-it",
        icon: Shield,
      },
      {
        title: "Threat Monitoring",
        desc: "Proactive defense, no downtime.",
        slug: "managed-it",
        icon: ShieldAlert,
      },
    ],
  },
  {
    label: "SOFTWARE & PLATFORMS",
    items: [
      {
        title: "Enterprise Software",
        desc: "Build Products: Break bottlenecks and scale faster.",
        slug: "enterprise-software",
        icon: Code2,
      },
      {
        title: "Website Designing",
        desc: "Web Systems: Revamp/Convert more with secure, fast platforms.",
        slug: "web-systems",
        icon: Globe,
      },
      {
        title: "IT Augmentation",
        desc: "IT Staffing: Deploy elite engineers in 48 hours.",
        slug: "it-staff-augmentation",
        icon: Users,
      },
    ],
  },
  {
    label: "GROWTH & REVENUE",
    items: [
      {
        title: "Digital Growth",
        desc: "Turn presence into B2B leads.",
        slug: "digital-revenue-growth",
        icon: TrendingUp,
      },
      {
        title: "SEO & CRO",
        desc: "Dominate search and conversions.",
        slug: "digital-revenue-growth",
        icon: BarChart2,
      },
      {
        title: "LinkedIn Strategy",
        desc: "Executive thought leadership at scale.",
        slug: "digital-revenue-growth",
        icon: Linkedin,
      },
    ],
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const isSolutionsActive = pathname.startsWith("/solutions");

  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setSolutionsOpen(false), 200);
  };

  const navItems = [
    { label: "Our Solutions", href: "#solutions", hasMega: true },
    { label: "Portfolio", href: "/portfolio", isRoute: true },
    { label: "About Us", href: "/about", isRoute: true },
    { label: "Life At CybaemTech", href: "/life-at-cybaemtech", isRoute: true },
    { label: "Blog", href: "/blog", isRoute: true },
    { label: "Contact Us", href: "/contact", isRoute: true },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-500 ${scrolled ? "border-b border-border/15" : ""}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "py-3 sm:py-4" : "py-4 sm:py-6"}`}
          >
            <Link to="/" className="flex items-center">
              <img
                src={cybaemLogo}
                alt="Cybaem Tech"
                className="h-9 sm:h-11 w-auto"
                width={180}
                height={44}
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) =>
                item.hasMega ? (
                  <div
                    key={item.label}
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                  >
                    <button
                      className={`text-sm transition-colors duration-300 hover-underline flex items-center gap-1${isSolutionsActive ? " active text-foreground" : " text-muted-foreground hover:text-foreground"}`}
                    >
                      {item.label}
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        className={`mt-0.5 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`}
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {solutionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 26,
                          }}
                          className="absolute top-full left-1/2 pt-4"
                          style={{ transform: "translateX(-50%)" }}
                        >
                          <div
                            className="bg-primary rounded-2xl shadow-2xl p-6 flex min-w-[860px]"
                            style={{ marginLeft: "-200px" }}
                          >
                            <div className="flex flex-1 gap-3">
                              {solutionsColumns.map((col, colIdx) => (
                                <div
                                  key={col.label}
                                  className="flex-1 min-w-[180px] transition-colors duration-200 rounded-xl"
                                  style={{
                                    border:
                                      "0.75px solid rgba(255,255,255,0.15)",
                                    borderRadius: "12px",
                                    padding: "16px",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "rgba(255,255,255,0.06)";
                                    e.currentTarget.style.borderColor =
                                      "rgba(255,255,255,0.35)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "transparent";
                                    e.currentTarget.style.borderColor =
                                      "rgba(255,255,255,0.15)";
                                  }}
                                >
                                  <span className="text-xs font-medium tracking-[0.15em] uppercase text-primary-foreground/50 mb-5 block">
                                    {col.label}
                                  </span>
                                  <div>
                                    {col.items.map((it, itemIdx) => (
                                      <div key={it.title}>
                                        <Link
                                          to={`/solutions/${it.slug}`}
                                          className="group flex items-start gap-3 transition-all duration-200 py-2 px-2 -mx-2 rounded-lg"
                                          onClick={() =>
                                            setSolutionsOpen(false)
                                          }
                                          style={{
                                            backgroundColor: "transparent",
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              "rgba(255,255,255,0.06)";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              "transparent";
                                          }}
                                        >
                                          <it.icon
                                            size={17}
                                            className="text-primary-foreground/40 mt-0.5 shrink-0"
                                          />
                                          <div>
                                            <span className="text-sm font-semibold text-primary-foreground block leading-tight">
                                              {it.title}
                                            </span>
                                            <span className="text-xs text-primary-foreground/60 leading-snug block mt-0.5">
                                              {it.desc}
                                            </span>
                                          </div>
                                        </Link>
                                        {itemIdx < col.items.length - 1 && (
                                          <div
                                            className="my-2"
                                            style={{
                                              height: "0.75px",
                                              background:
                                                "rgba(255,255,255,0.2)",
                                            }}
                                          />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div
                              className="ml-3"
                              style={{
                                width: "1px",
                                background: "rgba(255,255,255,0.12)",
                                flexShrink: 0,
                              }}
                            />

                            <div className="w-[220px] ml-3 bg-primary-foreground rounded-xl p-6 flex flex-col justify-between transition-transform duration-200 cursor-pointer hover:-translate-y-px shrink-0">
                              <div>
                                <h3 className="font-display text-xl font-bold text-foreground leading-tight mb-3">
                                  Zero scope-creep.
                                  <br />
                                  Guaranteed delivery.
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  Every project is led by a dedicated owner,
                                  strict requirement freezes, and ISO-certified
                                  security from day one.
                                </p>
                              </div>
                              <a
                                href="#approach"
                                className="inline-flex items-center gap-2 text-sm font-medium text-foreground mt-6 hover:text-primary transition-colors"
                                onClick={() => setSolutionsOpen(false)}
                              >
                                How we deliver <ArrowRight size={14} />
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (item as any).isRoute ? (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    className={({ isActive }) =>
                      `text-sm transition-colors duration-300 hover-underline${isActive ? " active text-foreground" : " text-muted-foreground hover:text-foreground"}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 hover-underline"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </div>

            <div className="flex items-center gap-3">
              <MagneticButton>
                <a
                  href="https://wa.me/918530171515?text=Hi%20Cybaem%20Tech%2C%20I%20am%20reaching%20out%20to%20you%20for%20the%20services%20-%20Software%20Product%20Development%2C%20Managed%20IT%20Services%2C%20Website%20Designing%2C%20Digital%20Marketing%2C%20IT%20Augmentation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Book a Review
                </a>
              </MagneticButton>
              <AnimatedHamburger
                isOpen={mobileOpen}
                toggle={() => setMobileOpen(!mobileOpen)}
              />
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

export default Navbar;
