import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

interface Props {
  heading: string;
  points: string[];
}

const SolutionVision = ({ heading, points }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-border py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Content */}
          <div>
            <motion.span variants={itemVariants} className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              Strategic Vision
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-4xl font-bold leading-tight mb-10">
              {heading}
            </motion.h2>
            <div className="space-y-5">
              {points.map((point) => (
                <motion.div key={point} variants={itemVariants} className="flex items-start gap-3">
                  <ArrowRight size={16} className="text-primary mt-1 shrink-0" />
                  <p className="text-base text-muted-foreground leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Image placeholder */}
          <motion.div variants={itemVariants} className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-card to-muted overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/8 via-primary/3 to-transparent flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-display font-bold text-primary/30">V</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Vision Forward</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionVision;
