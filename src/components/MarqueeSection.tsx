import { Shield, Award, Cloud, Monitor } from "lucide-react";

const badges = [
  { icon: Shield, label: "ISO 27001:2022" },
  { icon: Shield, label: "ISO 27017:2015" },
  { icon: Cloud, label: "AWS Certified" },
  { icon: Monitor, label: "Microsoft Partner" },
  { icon: Award, label: "99.9% Uptime SLA" },
  { icon: Award, label: "48-Hour Deployment" },
  { icon: Award, label: "100% Certified Talent" },
];

const MarqueeSection = () => {
  const items = [...badges, ...badges];

  return (
    <section className="section-border py-6 overflow-hidden bg-card/50">
      <div className="flex marquee">
        {items.map((badge, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 whitespace-nowrap"
          >
            <badge.icon size={16} className="text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              {badge.label}
            </span>
            <span className="text-muted-foreground/30 mx-4">•</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarqueeSection;
