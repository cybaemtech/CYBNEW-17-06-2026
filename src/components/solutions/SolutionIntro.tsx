import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { containerVariants, itemVariants } from "@/lib/animations";

interface Props {
  heading: string;
  paragraphs: [string, string];
}

const SolutionIntro = ({ heading, paragraphs }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-border py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
        >
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight">
            {heading}
          </motion.h2>
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <motion.p key={i} variants={itemVariants} className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionIntro;
