import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";
import { MagneticButton } from "@/components/Navbar";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface Props {
  title: string;
  headline: string;
  subheadline: string;
  keywords: string[];
  heroImage: string;
}

const SolutionHero = ({ title, headline, subheadline, keywords, heroImage }: Props) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Full-screen background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover"
          loading="eager"
          width={1920}
          height={1080}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-12 sm:pt-16 md:pt-20 pb-16 lg:pb-24">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl">
          {/* Breadcrumb */}
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-white/60 hover:text-white/90 transition-colors">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/40" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/#solutions" className="text-white/60 hover:text-white/90 transition-colors">Solutions</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/40" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white/80">{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] mb-4 sm:mb-6 text-white"
          >
            {headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl mb-6 sm:mb-8"
          >
            {subheadline}
          </motion.p>

          {/* Keyword badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="text-[9px] sm:text-[11px] font-semibold tracking-[0.15em] uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 bg-white/5 text-white/80 backdrop-blur-sm whitespace-nowrap"
              >
                {kw}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 sm:gap-4">
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Get in Touch
                <ArrowRight size={16} />
              </Link>
            </MagneticButton>
            <a
              href="/Cybaem_Tech_Portfolio.pdf"
              download
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold border border-white/20 bg-white/5 text-white rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <Download size={16} />
              Download Portfolio
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionHero;
