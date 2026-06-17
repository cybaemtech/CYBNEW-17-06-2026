import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import crmAceDemo from "@/assets/crm-ace-demo.mp4";
import projectManagementDemo from "@/assets/project-management-demo.mp4";
import documentManagementDemo from "@/assets/document-management-demo.mp4.asset.json";
import itsmDemo from "@/assets/itsm-demo.mp4.asset.json";
import siteEngineerDemo from "@/assets/site-engineer-demo.mp4.asset.json";
import hrManagementDemo from "@/assets/hr-management-demo.mp4.asset.json";

const products = [
  {
    title: "Cybaem Nova",
    category: "Sales & CRM",
    tag: "AI-Powered Business Operating System",
    description:
      "Intelligent CRM with predictive lead scoring, automated pipeline management, and AI-driven customer insights.",
    image: "/images/product-card-1.avif",
    video: crmAceDemo,
  },
  {
    title: "Project Management Tool",
    category: "Operations",
    tag: "Enterprise",
    description:
      "Smart task automation, resource allocation, and milestone tracking with real-time collaboration for distributed teams.",
    image: "/images/product-card-2.avif",
    video: projectManagementDemo,
  },
  {
    title: "Document Management System",
    category: "DMS",
    tag: "Secure",
    description:
      "AI-powered document search, classification, version control, and compliance-ready audit trails for enterprise content.",
    image: "/images/product-card-3.avif",
    video: documentManagementDemo.url,
  },
  {
    title: "ITSM Tool",
    category: "IT Service",
    tag: "24/7",
    description:
      "Complete IT service management with automated ticketing, SLA tracking, change management, and self-service portal.",
    image: "/images/product-card-4.avif",
    video: itsmDemo.url,
  },
  {
    title: "Site Engineer Ecosystem",
    category: "Field Ops",
    tag: "Mobile-First",
    description:
      "Field operations platform for site engineers with real-time reporting, asset tracking, and offline-capable mobile access.",
    image: "/images/product-card-5.avif",
    video: siteEngineerDemo.url,
  },
  {
    title: "HR Management System",
    category: "People",
    tag: "Scalable",
    description:
      "End-to-end HR platform covering recruitment, onboarding, payroll, performance reviews, and compliance management.",
    image: "/images/product-card-6.avif",
    video: hrManagementDemo.url,
  },
];

const stats = [
  {
    value: "99.9%",
    label: "uptime SLA",
    description: "Uninterrupted enterprise-grade reliability.",
  },
  {
    value: "48-hour",
    label: "resource deployment",
    description: "Certified experts, deployed in 48 hours.",
  },
];

interface ProductVideoProps {
  image: string;
  title: string;
  video: string;
}

const ProductVideo = ({ image, title, video }: ProductVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = async () => {
    const element = videoRef.current;
    if (!element) return;
    element.currentTime = 0;
    try {
      await element.play();
    } catch {
      // autoplay can be blocked in some browsers even when muted
    }
  };

  const handleMouseLeave = () => {
    const element = videoRef.current;
    if (!element) return;
    element.pause();
    element.currentTime = 0;
  };

  return (
    <div
      className="group relative h-full w-full overflow-hidden bg-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        muted
        loop
        playsInline
        preload="none"
        poster={image}
        aria-label={`${title} demo video`}
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-background/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/88 px-4 py-3 backdrop-blur-sm transition-all duration-300 group-hover:bg-background/94">
        <div className="flex items-center gap-3 text-foreground">
          <PlayCircle className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold">Hover to preview</p>
            <p className="text-xs text-muted-foreground">Muted loop · no sound controls</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Silent demo</span>
      </div>
    </div>
  );
};

const EnterpriseProductsShowcase = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-12 lg:mb-16"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Product Ecosystem</p>
              <h2 className="font-display text-3xl font-bold leading-[1.05] text-foreground md:text-5xl lg:text-6xl">
                ISO-certified. Zero scope creep. <span className="text-primary">Always secure.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                A smarter product showcase built for decision-makers: each platform gets its own split-screen section
                with a dedicated demo area and a clearer business narrative.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:max-w-xl">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-panel rounded-2xl p-5">
                  <div className="font-display text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                    {stat.label}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="space-y-8 lg:space-y-10">
          {products.map((product, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={product.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.04 }}
                className="glass-panel overflow-hidden rounded-[2rem] border border-border/80"
              >
                <div className="grid lg:grid-cols-12">
                  <div
                    className={`relative min-h-[260px] lg:min-h-[360px] ${isEven ? "lg:order-1" : "lg:order-2"} lg:col-span-4`}
                  >
                    <ProductVideo image={product.image} title={product.title} video={product.video} />
                  </div>

                  <div className={`flex items-center ${isEven ? "lg:order-2" : "lg:order-1"} lg:col-span-8`}>
                    <div className="flex h-full w-full flex-col justify-center p-6 sm:p-8 lg:p-12">
                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                          {product.category}
                        </span>
                        <span className="rounded-full border border-border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {product.tag}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold leading-tight text-foreground md:text-4xl">
                        {product.title}
                      </h3>

                      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                        {product.description}
                      </p>

                      <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-muted/70 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            Delivery focus
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-foreground">
                            Configured for enterprise rollout, secure adoption, and workflow alignment.
                          </p>
                        </div>
                        <div className="rounded-2xl bg-muted/70 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            Demo area
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-foreground">
                            Silent hover previews now available across all six enterprise products.
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                        Product details
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EnterpriseProductsShowcase;
