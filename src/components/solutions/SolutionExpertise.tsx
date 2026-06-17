import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { containerVariants, itemVariants } from "@/lib/animations";

interface ExpertiseItem {
  name: string;
  category: string;
}

interface Props {
  expertise: ExpertiseItem[];
  title: string;
}

const SolutionExpertise = ({ expertise, title }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-border py-16 sm:py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.span variants={itemVariants} className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 sm:mb-4 block">
            Technology Stack
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-8 sm:mb-12">
            Tools & Expertise Behind {title}
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            {expertise.map((item) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                className="glass-panel rounded-lg sm:rounded-xl p-3 sm:p-6 text-center group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase text-primary/60 block mb-1 sm:mb-2">
                  {item.category}
                </span>
                <span className="font-display text-xs sm:text-sm font-semibold text-foreground">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionExpertise;
