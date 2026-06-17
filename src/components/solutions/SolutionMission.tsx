import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

interface Offering {
  title: string;
  description: string;
}

interface Props {
  offerings: Offering[];
}

const SolutionMission = ({ offerings }: Props) => {
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
          {/* Left: Image placeholder */}
          <motion.div variants={itemVariants} className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-card to-muted overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-display font-bold text-primary/30">C</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Cybaem Approach</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Offerings */}
          <div>
            <motion.span variants={itemVariants} className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              Our Approach
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-4xl font-bold leading-tight mb-10">
              Core Capabilities
            </motion.h2>
            <div className="space-y-8">
              {offerings.map((offering) => (
                <motion.div key={offering.title} variants={itemVariants} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">{offering.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{offering.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionMission;
