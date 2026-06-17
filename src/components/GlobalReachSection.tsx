import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { containerVariants, itemVariants } from "@/lib/animations";

interface Region {
  id: string;
  name: string;
  flag: string;
  detail: string;
  phase: string;
  phaseYear: string;
  orbitRadius: number;
  duration: number;
  startAngle: number;
}

const regions: Region[] = [
  { id: "india", name: "India", flag: "🇮🇳", detail: "Fastest-growing consumer market. Key focus on Tier-1 & Tier-2 cities with digital-first distribution.", phase: "Phase 1", phaseYear: "2025", orbitRadius: 90, duration: 42, startAngle: 0 },
  { id: "uk", name: "United Kingdom", flag: "🇬🇧", detail: "Primary European gateway. Regulatory alignment and financial services infrastructure expansion.", phase: "Phase 1", phaseYear: "2025", orbitRadius: 140, duration: 62, startAngle: 90 },
  { id: "dubai", name: "Dubai", flag: "🇦🇪", detail: "Strategic Middle East hub. Enterprise partnerships and fintech innovation corridor with free-zone advantages.", phase: "Phase 1", phaseYear: "2025", orbitRadius: 190, duration: 52, startAngle: 45 },
  { id: "africa", name: "Africa", flag: "🌍", detail: "High-growth emerging markets. Strategic entry via Nigeria, Kenya, and South Africa corridors.", phase: "Phase 2", phaseYear: "2026", orbitRadius: 240, duration: 85, startAngle: 180 },
  { id: "europe", name: "Europe", flag: "🇪🇺", detail: "Continental expansion through Germany, France, and Benelux. Regulatory framework established.", phase: "Phase 2", phaseYear: "2026", orbitRadius: 290, duration: 115, startAngle: 270 },
  { id: "us", name: "United States", flag: "🇺🇸", detail: "North American market entry targeting enterprise SaaS and healthcare verticals across major tech hubs.", phase: "Phase 3", phaseYear: "2027", orbitRadius: 340, duration: 130, startAngle: 135 },
];

const phases = [
  { label: "Phase 1", year: "2025", color: "hsl(var(--primary))" },
  { label: "Phase 2", year: "2026", color: "hsl(142 71% 45%)" },
  { label: "Phase 3", year: "2027", color: "hsl(38 92% 50%)" },
];

const OrbitPlanet = ({
  region,
  onHover,
  onLeave,
  onMouseMove,
}: {
  region: Region;
  onHover: (r: Region) => void;
  onLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
}) => {
  const phaseColor = region.phase === "Phase 1" ? "hsl(var(--primary))" : "hsl(142 71% 45%)";

  return (
    <div
      className="absolute inset-0 rounded-full"
      style={{
        animation: `spin ${region.duration}s linear infinite`,
      }}
    >
      <div
        className="absolute flex flex-col items-center gap-1 cursor-pointer"
        style={{
          top: 0,
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onMouseEnter={() => onHover(region)}
        onMouseLeave={onLeave}
        onMouseMove={onMouseMove}
      >
        {/* Planet dot */}
        <div
          className="w-4 h-4 rounded-full border-2 shadow-lg transition-transform hover:scale-150"
          style={{
            borderColor: phaseColor,
            backgroundColor: phaseColor,
            boxShadow: `0 0 12px ${phaseColor}`,
          }}
        />
        {/* Label pill — pure CSS counter-rotation */}
        <div
          className="flex items-center gap-1 px-2 py-0.5 sm:gap-1.5 sm:px-2.5 sm:py-1 rounded-full border whitespace-nowrap"
          style={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            animation: `spin-reverse ${region.duration}s linear infinite`,
          }}
        >
          <span className="text-xs sm:text-sm">{region.flag}</span>
          <span className="text-[9px] sm:text-[11px] font-medium" style={{ color: "hsl(var(--foreground))" }}>
            {region.name}
          </span>
        </div>
      </div>
    </div>
  );
};

const GlobalReachSection = () => {
  const [tooltip, setTooltip] = useState<{ region: Region; x: number; y: number } | null>(null);

  const handleHover = useCallback((region: Region) => {
    setTooltip((prev) => (prev ? { ...prev, region } : { region, x: 0, y: 0 }));
  }, []);
  const handleLeave = useCallback(() => setTooltip(null), []);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY } : prev));
  }, []);

  return (
    <section className="section-border py-24 lg:py-32 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          {/* Header */}
          <div className="max-w-2xl mb-12 sm:mb-16">
            <motion.span variants={itemVariants} className="inline-block text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-primary mb-3 sm:mb-4">
              Strategic Growth Regions 2025–2027
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
              Your Local IT Service Partner, Deployed Globally.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed\">
              Whether you are scaling a SaaS startup in London, securing healthcare infrastructure in Dubai, or
              expanding enterprise operations across the globe, Cybaem Tech provides seamless, time-zone optimized
              support and world-class engineering talent. We're scaling strategically into high-growth markets. Our
              phased expansion plan targets key regions where digital transformation demand is accelerating fastest.
            </motion.p>
          </div>

          {/* Orbital System */}
          <motion.div variants={itemVariants} className="mb-12 overflow-x-auto md:overflow-visible">
            <div
              className="relative mx-auto"
              style={{
                width: "min(100%, 640px)",
                minWidth: "280px",
                aspectRatio: "1",
                backgroundImage:
                  "linear-gradient(hsl(var(--border) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            >
              {/* Orbit rings */}
              {regions.map((r) => (
                <div
                  key={r.id + "-ring"}
                  className="absolute rounded-full border"
                  style={{
                    width: r.orbitRadius * 2,
                    height: r.orbitRadius * 2,
                    top: `calc(50% - ${r.orbitRadius}px)`,
                    left: `calc(50% - ${r.orbitRadius}px)`,
                    borderColor: "hsl(var(--border) / 0.4)",
                  }}
                />
              ))}

              {/* HQ Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border"
                    style={{
                      borderColor: "hsl(var(--primary) / 0.3)",
                      width: 64,
                      height: 64,
                      margin: -8,
                      animation: `ripple 3s ease-out ${i * 1}s infinite`,
                    }}
                  />
                ))}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm"
                  style={{
                    background: "radial-gradient(circle, hsl(var(--primary)), hsl(var(--primary) / 0.6))",
                    color: "hsl(var(--primary-foreground))",
                    boxShadow: "0 0 30px hsl(var(--primary) / 0.4)",
                  }}
                >
                  HQ
                </div>
              </div>

              {/* Planets on orbits */}
              {regions.map((r) => (
                <div
                  key={r.id}
                  className="absolute rounded-full"
                  style={{
                    width: r.orbitRadius * 2,
                    height: r.orbitRadius * 2,
                    top: `calc(50% - ${r.orbitRadius}px)`,
                    left: `calc(50% - ${r.orbitRadius}px)`,
                  }}
                >
                  <OrbitPlanet region={r} onHover={handleHover} onLeave={handleLeave} onMouseMove={handleMouseMove} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Phase Legend */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6">
            {phases.map((p) => (
              <div key={p.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-xs font-medium text-muted-foreground">
                  {p.label} — {p.year}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Cursor tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-4 py-3 rounded-xl border max-w-xs"
          style={{
            left: tooltip.x + 16,
            top: tooltip.y + 16,
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            boxShadow: "0 8px 32px hsl(var(--foreground) / 0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{tooltip.region.flag}</span>
            <span className="font-display font-bold text-sm" style={{ color: "hsl(var(--foreground))" }}>
              {tooltip.region.name}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">{tooltip.region.detail}</p>
          <span
            className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor:
                tooltip.region.phase === "Phase 1" ? "hsl(var(--primary) / 0.15)" : "hsl(142 71% 45% / 0.15)",
              color: tooltip.region.phase === "Phase 1" ? "hsl(var(--primary))" : "hsl(142 71% 45%)",
            }}
          >
            {tooltip.region.phase} — {tooltip.region.phaseYear}
          </span>
        </div>
      )}
    </section>
  );
};

export default GlobalReachSection;
