import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { containerVariants, itemVariants } from "@/lib/animations";

interface OrbitAvatar {
  initials: string;
  color: string;
  orbitRadius: number;
  duration: number;
  startAngle: number;
  size: number;
}

const avatars: OrbitAvatar[] = [
  { initials: "JW", color: "hsl(207 60% 31%)", orbitRadius: 100, duration: 20, startAngle: 0, size: 40 },
  { initials: "FA", color: "hsl(207 60% 41%)", orbitRadius: 100, duration: 20, startAngle: 120, size: 36 },
  { initials: "SM", color: "hsl(207 50% 35%)", orbitRadius: 100, duration: 20, startAngle: 240, size: 38 },
  { initials: "RK", color: "hsl(207 60% 31%)", orbitRadius: 160, duration: 28, startAngle: 45, size: 42 },
  { initials: "AH", color: "hsl(207 45% 40%)", orbitRadius: 160, duration: 28, startAngle: 165, size: 36 },
  { initials: "DL", color: "hsl(207 55% 36%)", orbitRadius: 160, duration: 28, startAngle: 285, size: 40 },
  { initials: "NK", color: "hsl(207 60% 31%)", orbitRadius: 220, duration: 36, startAngle: 90, size: 38 },
  { initials: "PT", color: "hsl(207 50% 38%)", orbitRadius: 220, duration: 36, startAngle: 210, size: 42 },
  { initials: "MR", color: "hsl(207 60% 44%)", orbitRadius: 220, duration: 36, startAngle: 330, size: 36 },
];

const OrbitingAvatar = ({ avatar }: { avatar: OrbitAvatar }) => (
  <div
    className="absolute"
    style={{
      width: avatar.size,
      height: avatar.size,
      left: "50%",
      top: "50%",
      marginLeft: -avatar.size / 2,
      marginTop: -avatar.size / 2,
      animation: `orbit-spin ${avatar.duration}s linear infinite`,
    }}
  >
    <div
      className="absolute rounded-full border-2 border-primary/30 flex items-center justify-center font-display font-bold text-xs shadow-lg"
      style={{
        width: avatar.size,
        height: avatar.size,
        backgroundColor: avatar.color,
        color: "white",
        transform: `translateX(${avatar.orbitRadius}px) rotate(${avatar.startAngle}deg)`,
        transformOrigin: "center center",
        animation: `orbit-spin-reverse ${avatar.duration}s linear infinite`,
      }}
    >
      {avatar.initials}
    </div>
  </div>
);

const OrbitSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: "hsl(var(--primary))" }}>
      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[100, 160, 220].map((r) => (
          <div key={r} className="absolute rounded-full border border-primary-foreground/10" style={{ width: r * 2, height: r * 2 }} />
        ))}
      </div>

      {/* Orbiting avatars */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative" style={{ width: 0, height: 0 }}>
          {avatars.map((avatar, i) => (
            <OrbitingAvatar key={i} avatar={avatar} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center max-w-2xl mx-auto">
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-6 text-primary-foreground">
            Start Your <span className="italic font-light">Transformation</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-primary-foreground/70 leading-relaxed mb-10">
            Partner with certified engineers and architects who deliver enterprise-grade solutions on time, every time.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold bg-primary-foreground text-primary rounded-full hover:opacity-90 transition-opacity">
              Book A Discovery Call
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrbitSection;
