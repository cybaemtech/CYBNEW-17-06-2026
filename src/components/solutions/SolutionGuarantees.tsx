import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { containerVariants, itemVariants } from "@/lib/animations";
import type { Guarantee } from "@/data/solutionsData";

interface Props {
  guarantees: Guarantee[];
}

const SolutionGuarantees = ({ guarantees }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-border py-16 sm:py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {guarantees.map((g) => (
            <motion.div
              key={g.label}
              variants={itemVariants}
              className="glass-panel rounded-xl p-4 sm:p-6 lg:p-8 group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
            >
              <div className="mb-4 sm:mb-6 flex items-baseline gap-1 sm:gap-2">
                <span className="font-display text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary">
                  {g.stat}
                </span>
                <span className="text-xs sm:text-sm lg:text-base font-display font-semibold text-foreground">
                  {g.label}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-grow">
                {g.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionGuarantees;
