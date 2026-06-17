import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Award, Activity, Users, Clock, CheckCircle } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";
import awsLogo from "@/assets/aws-logo.svg";
import microsoftLogo from "@/assets/microsoft-logo.svg";
import iso27017Logo from "@/assets/iso-27017-logo.png";
import iso27001Logo from "@/assets/iso-27001-logo.jpeg";

// Partner logos
import partnerAws from "@/assets/partners/aws.svg";
import partnerMicrosoft from "@/assets/partners/microsoft.svg";
import partnerDell from "@/assets/partners/dell.svg";
import partnerHp from "@/assets/partners/hp.svg";
import partnerLenovo from "@/assets/partners/lenovo.svg";
import partnerAzure from "@/assets/partners/azure.svg";
import partnerFortinet from "@/assets/partners/fortinet.svg";
import partnerSophos from "@/assets/partners/sophos.jpg";
import partnerTataTele from "@/assets/partners/tata-tele.png";
import partnerEset from "@/assets/partners/eset.svg";
import partnerRedington from "@/assets/partners/redington.png";
import partnerMass from "@/assets/partners/mass.webp";
import partnerEnticesoft from "@/assets/partners/enticesoft.png";
import partnerRazorpay from "@/assets/partners/razorpay.png";

const useCounter = (end: number, duration: number = 2000, start: number = 0, inView: boolean = false) => {
  const [count, setCount] = useState(start);
  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start, inView]);
  return count;
};

const CertBadge = ({ children, subtitle }: { children: React.ReactNode; subtitle: string }) => (
  <motion.div className="flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl border border-border/60 bg-card/50 hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.25)] transition-all duration-500 group cursor-default hover:-translate-y-1.5 hover:scale-[1.03]">
    {children}
    <span className="text-xs text-muted-foreground mt-3 font-medium tracking-wide group-hover:text-primary transition-colors">{subtitle}</span>
  </motion.div>
);

/* ── Partner logos ── */
const partners = [
  { name: "Enticesoft", logo: partnerEnticesoft },
  { name: "Microsoft", logo: partnerMicrosoft },
  { name: "Dell", logo: partnerDell },
  { name: "HP", logo: partnerHp },
  { name: "Lenovo", logo: partnerLenovo },
  { name: "AWS", logo: partnerAws },
  { name: "Azure", logo: partnerAzure },
  { name: "Fortinet", logo: partnerFortinet },
  { name: "Sophos", logo: partnerSophos },
  { name: "ESET", logo: partnerEset },
  { name: "TATA Tele", logo: partnerTataTele },
  { name: "MASS", logo: partnerMass },
  { name: "Redington", logo: partnerRedington },
  { name: "Razorpay", logo: partnerRazorpay },
];

const PartnerLogo = ({ name, logo }: { name: string; logo: string | null }) => (
  <div className="flex-shrink-0 flex items-center justify-center w-[140px] h-[80px] px-2">
    {logo ? (
      <img
        src={logo}
        alt={name}
        className="h-16 max-w-[120px] object-contain"
        loading="lazy"
        width={120}
        height={64}
      />
    ) : (
      <span className="font-display font-bold text-sm text-muted-foreground/70 whitespace-nowrap tracking-wide">
        {name}
      </span>
    )}
  </div>
);

const ClientLogosMarquee = () => (
  <motion.div variants={itemVariants} className="mb-14 overflow-hidden">
    <div className="flex items-center gap-4 mb-6">
      <div className="flex-1 h-px bg-border" />
      <span className="text-xs text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
        <CheckCircle size={12} className="text-primary" />
        Our Partners
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
    <div className="relative rounded-2xl border border-border/40 bg-white py-2 overflow-hidden">
      <div className="flex items-center gap-0 animate-marquee">
        {[...partners, ...partners].map((p, i) => (
          <PartnerLogo key={`${p.name}-${i}`} name={p.name} logo={p.logo} />
        ))}
      </div>
    </div>
  </motion.div>
);

const TrustAnchorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const uptimeCount = useCounter(999, 2000, 900, isInView);
  const deploymentCount = useCounter(48, 1500, 0, isInView);
  const talentCount = useCounter(100, 1800, 0, isInView);
  const projectsCount = useCounter(500, 2200, 0, isInView);

  const metrics = [
    { icon: Activity, value: `${(uptimeCount / 10).toFixed(1)}%`, label: "Uptime SLA", sublabel: "Last 12 months", color: "text-primary" },
    { icon: Clock, value: `${deploymentCount}h`, label: "Resource Deployment", sublabel: "Average turnaround", color: "text-primary" },
    { icon: Users, value: `${talentCount}%`, label: "Certified Talent Pool", sublabel: "ISO & cloud certified", color: "text-primary" },
    { icon: Award, value: `${projectsCount}+`, label: "Projects Delivered", sublabel: "Enterprise grade", color: "text-primary" },
  ];

  return (
    <section ref={ref} className="section-border py-16 lg:py-20 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3">Trust & Compliance</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Enterprise-Grade IT Service Credentials</h2>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            <CertBadge subtitle="Information Security">
              <div className="flex flex-col items-center gap-1">
                <img src={iso27001Logo} alt="ISO 27001 Certified" className="w-20 lg:w-24 h-auto" width={96} height={96} />
              </div>
            </CertBadge>
            <CertBadge subtitle="Cloud Security">
              <div className="flex flex-col items-center gap-1">
                <img src={iso27017Logo} alt="ISO 27017:2015 Cloud Security" className="w-20 lg:w-24 h-auto" width={96} height={96} />
              </div>
            </CertBadge>
            <CertBadge subtitle="Advanced Partner">
              <div className="flex flex-col items-center gap-1">
                <img src={awsLogo} alt="AWS Advanced Partner" className="w-24 lg:w-28 h-auto" width={112} height={67} />
              </div>
            </CertBadge>
            <CertBadge subtitle="Gold Certified">
              <div className="flex flex-col items-center gap-1">
                <img src={microsoftLogo} alt="Microsoft Gold Certified" className="w-28 lg:w-32 h-auto" width={128} height={55} />
              </div>
            </CertBadge>
          </motion.div>

          {/* Client Logos Marquee */}
          <ClientLogosMarquee />

          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-14">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
              <CheckCircle size={12} className="text-primary" />
              Real-Time Metrics
            </span>
            <div className="flex-1 h-px bg-border" />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center lg:text-left group">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <metric.icon size={16} className="text-primary" />
                  </div>
                </div>
                <span className={`block text-3xl lg:text-4xl font-display font-bold ${metric.color} mb-1`}>{metric.value}</span>
                <span className="block text-sm font-medium text-foreground mb-0.5">{metric.label}</span>
                <span className="block text-xs text-muted-foreground">{metric.sublabel}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustAnchorSection;
