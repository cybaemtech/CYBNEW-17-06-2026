import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";
import { Globe, ShoppingCart, Palette, MousePointerClick, PenTool, Layers, BookOpen } from "lucide-react";

const moodBoardData = [
  {
    icon: Globe,
    category: "Corporate & Business",
    goal: "Trust & Authority",
    vibe: "Professional, secure, competent",
    primaryColors: [
      { hex: "#FFFFFF", label: "White" },
      { hex: "#E2E8F0", label: "Light Grey" },
      { hex: "#64748B", label: "Slate" },
    ],
    accentColors: [
      { hex: "#1E3A5F", label: "Navy Blue" },
      { hex: "#14532D", label: "Deep Green" },
      { hex: "#334155", label: "Charcoal" },
    ],
    borderAccent: "#1E3A5F",
  },
  {
    icon: ShoppingCart,
    category: "E-Commerce",
    goal: "Urgency & Action",
    vibe: "High-energy, transactional, exciting",
    primaryColors: [
      { hex: "#FFFFFF", label: "Clean Canvas" },
      { hex: "#FAFAFA", label: "Soft White" },
      { hex: "#F5F5F5", label: "Warm Grey" },
    ],
    accentColors: [
      { hex: "#EA580C", label: "Orange" },
      { hex: "#DC2626", label: "Red" },
      { hex: "#16A34A", label: "Bright Green" },
    ],
    borderAccent: "#EA580C",
  },
  {
    icon: Palette,
    category: "Portfolios",
    goal: "Self-Expression & Impact",
    vibe: "Sophisticated, trendy, memorable",
    primaryColors: [
      { hex: "#000000", label: "Pure Black" },
      { hex: "#FFFFFF", label: "Pure White" },
      { hex: "#78716C", label: "Earth Tone" },
    ],
    accentColors: [
      { hex: "#E879F9", label: "Neon Pink" },
      { hex: "#A5F3FC", label: "Pastel Cyan" },
      { hex: "#FDE047", label: "Bright Yellow" },
    ],
    borderAccent: "#E879F9",
  },
  {
    icon: MousePointerClick,
    category: "Landing Pages",
    goal: "Conversion & Focus",
    vibe: "Focused, urgent, distraction-free",
    primaryColors: [
      { hex: "#FFFFFF", label: "White" },
      { hex: "#F8FAFC", label: "Very Light Grey" },
      { hex: "#F1F5F9", label: "Cool Grey" },
    ],
    accentColors: [
      { hex: "#F97316", label: "Big Orange" },
      { hex: "#EF4444", label: "Bold Red" },
      { hex: "#84CC16", label: "Lime" },
    ],
    borderAccent: "#F97316",
  },
  {
    icon: PenTool,
    category: "Blogs & Personal",
    goal: "Warmth & Readability",
    vibe: "Inviting, organic, personal",
    primaryColors: [
      { hex: "#FFFBEB", label: "Cream" },
      { hex: "#FAF5FF", label: "Off-White" },
      { hex: "#1C1917", label: "Dark Charcoal" },
    ],
    accentColors: [
      { hex: "#C2410C", label: "Terracotta" },
      { hex: "#65A30D", label: "Sage Green" },
      { hex: "#D97706", label: "Warm Amber" },
    ],
    borderAccent: "#C2410C",
  },
  {
    icon: Layers,
    category: "SaaS & Web Apps",
    goal: "Utility & Clarity",
    vibe: "Utility-driven, modern, efficient",
    primaryColors: [
      { hex: "#F1F5F9", label: "Light Grey" },
      { hex: "#FAF5FF", label: "Off-White" },
      { hex: "#0F172A", label: "Dark Navy" },
    ],
    accentColors: [
      { hex: "#3B82F6", label: "SaaS Blue" },
      { hex: "#8B5CF6", label: "Tech Purple" },
      { hex: "#22C55E", label: "Status Green" },
    ],
    borderAccent: "#3B82F6",
  },
  {
    icon: BookOpen,
    category: "Education & Informational",
    goal: "Credibility & Learning",
    vibe: "Academic, authoritative, accessible",
    primaryColors: [
      { hex: "#FFFFFF", label: "Stark White" },
      { hex: "#1E3A5F", label: "Navy Blue" },
      { hex: "#14532D", label: "Forest Green" },
    ],
    accentColors: [
      { hex: "#EAB308", label: "Yellow Gold" },
      { hex: "#14B8A6", label: "Teal" },
      { hex: "#A855F7", label: "Bright Purple" },
    ],
    borderAccent: "#14B8A6",
  },
];

const ColorSwatch = ({ hex, label }: { hex: string; label: string }) => (
  <div className="group/swatch flex flex-col items-center gap-1.5">
    <div
      className="w-8 h-8 md:w-10 md:h-10 rounded-lg shadow-sm border border-border/40 transition-transform duration-200 group-hover/swatch:scale-110"
      style={{ backgroundColor: hex }}
    />
    <span className="text-[10px] text-muted-foreground leading-tight text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {label}
    </span>
  </div>
);

const WebDesignMoodBoard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 section-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            variants={itemVariants}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block"
          >
            Colour Psychology
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-4 max-w-2xl"
          >
            The <span className="text-primary italic">Science</span> of Web Design
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base lg:text-lg text-muted-foreground max-w-xl mb-16"
          >
            Every colour choice drives perception. Here's the strategic palette
            blueprint we apply to each website category.
          </motion.p>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {moodBoardData.map((item) => (
              <motion.div
                key={item.category}
                variants={itemVariants}
                className="group glass-panel rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                style={{ borderColor: `${item.borderAccent}20` }}
              >
                {/* Subtle gradient glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: item.borderAccent }}
                />

                {/* Header */}
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.borderAccent}15` }}
                  >
                    <item.icon size={20} style={{ color: item.borderAccent }} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.category}
                    </h3>
                  </div>
                </div>

                {/* Goal */}
                <p className="text-sm font-medium text-foreground mb-1 relative z-10">
                  {item.goal}
                </p>
                <p className="text-xs text-muted-foreground mb-5 relative z-10 italic">
                  {item.vibe}
                </p>

                {/* Color Palettes */}
                <div className="space-y-4 relative z-10">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Primary
                    </p>
                    <div className="flex gap-2">
                      {item.primaryColors.map((c) => (
                        <ColorSwatch key={c.hex} hex={c.hex} label={c.label} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Accent
                    </p>
                    <div className="flex gap-2">
                      {item.accentColors.map((c) => (
                        <ColorSwatch key={c.hex} hex={c.hex} label={c.label} />
                      ))}
                    </div>
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

export default WebDesignMoodBoard;
