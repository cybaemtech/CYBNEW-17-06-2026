import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Home } from "lucide-react";
import { motion } from "framer-motion";

import { solutionsColumns } from "./Navbar";

const navLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About Us", href: "/about" },
  { label: "Life At CybaemTech", href: "/life-at-cybaemtech" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

interface HamburgerProps {
  isOpen: boolean;
  toggle: () => void;
}

export const AnimatedHamburger = ({ isOpen, toggle }: HamburgerProps) => (
  <button
    onClick={toggle}
    className="md:hidden relative w-10 h-10 flex items-center justify-center z-[60]"
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    <div className="w-6 h-5 relative flex flex-col justify-between">
      <span
        className="block h-[2px] w-full bg-foreground rounded-full origin-left transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={isOpen ? { transform: "rotate(45deg) translate(2px, -1px)" } : {}}
      />
      <span
        className="block h-[2px] w-full bg-foreground rounded-full transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={isOpen ? { opacity: 0, transform: "translateX(20px)" } : {}}
      />
      <span
        className="block h-[2px] w-full bg-foreground rounded-full origin-left transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={isOpen ? { transform: "rotate(-45deg) translate(2px, 1px)" } : {}}
      />
    </div>
  </button>
);

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [solutionsExpanded, setSolutionsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Two-phase: mount first, then animate in on next frame
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setMounted(false);
      setSolutionsExpanded(false);
    }
  };

  if (!mounted) return null;

  const visible = isOpen && mounted;

  return (
    <>
      {/* Overlay – pure CSS fade */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={onClose}
        onTransitionEnd={handleTransitionEnd}
      />

      {/* Panel – CSS transform slide */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-background border-l border-border shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform"
        style={{ transform: visible ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Close spacer for hamburger */}
        <div className="h-20" />

        <nav className="flex-1 px-6 overflow-y-auto">
          {/* Home link */}
          <div
            className="transition-opacity duration-300 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transitionDelay: visible ? "80ms" : "0ms",
            }}
          >
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-3 py-4 border-b border-border font-display text-lg font-semibold text-foreground hover:text-primary transition-colors"
            >
              <Home size={20} className="text-primary" />
              Home
            </Link>
          </div>

          {/* Solutions accordion */}
          <div
            className="transition-opacity duration-300 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transitionDelay: visible ? "120ms" : "0ms",
            }}
          >
            <button
              onClick={() => setSolutionsExpanded(!solutionsExpanded)}
              className="w-full flex items-center justify-between py-4 border-b border-border"
            >
              <span className="font-display text-lg font-semibold text-foreground">Our Solutions</span>
              <ChevronDown
                size={18}
                className="text-muted-foreground transition-transform duration-250 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{ transform: solutionsExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            <div
              className="overflow-hidden transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{
                maxHeight: solutionsExpanded ? "800px" : "0px",
                opacity: solutionsExpanded ? 1 : 0,
              }}
            >
              <div className="py-2 pl-4 space-y-5">
                {solutionsColumns.map((col) => (
                  <div key={col.label}>
                    <span className="text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground/60 mb-2 block">
                      {col.label}
                    </span>
                    <div className="space-y-1">
                      {col.items.map((it) => (
                        <Link
                          key={it.title}
                          to={`/solutions/${it.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-2 py-2.5 text-sm text-foreground/80 hover:text-primary transition-colors"
                        >
                          <it.icon size={15} className="text-muted-foreground shrink-0" />
                          <span>{it.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regular nav links */}
          {navLinks.map((link, i) => (
            <div
              key={link.label}
              className="transition-opacity duration-300 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transitionDelay: visible ? `${160 + i * 40}ms` : "0ms",
              }}
            >
              <Link
                to={link.href}
                onClick={onClose}
                className="block py-4 border-b border-border font-display text-lg font-semibold text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div
          className="p-6 border-t border-border transition-opacity duration-300 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: visible ? "280ms" : "0ms",
          }}
        >
          <a
            href="https://wa.me/918530171515?text=Hi%20Cybaem%20Tech%2C%20I%20am%20reaching%20out%20to%20you%20for%20the%20services%20-%20Software%20Product%20Development%2C%20Managed%20IT%20Services%2C%20Website%20Designing%2C%20Digital%20Marketing%2C%20IT%20Augmentation."
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Book a Review
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
