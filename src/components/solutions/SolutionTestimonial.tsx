import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { containerVariants, itemVariants } from "@/lib/animations";
import type { Testimonial } from "@/data/solutionsData";

interface Props {
  testimonial: Testimonial;
  images: [string, string];
}

const SolutionTestimonial = ({ testimonial, images }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-border py-16 sm:py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section label */}
          <motion.span
            variants={itemVariants}
            className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-8 sm:mb-12 block"
          >
            Trusted by global technology leaders
          </motion.span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left: Two images */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
              <div className="rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src={images[0]}
                  alt="Enterprise team collaboration"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden aspect-[3/4] sm:mt-4 lg:mt-8">
                <img
                  src={images[1]}
                  alt="Technology solutions delivery"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Right: Testimonial quote */}
            <motion.div variants={itemVariants} className="mt-6 sm:mt-8 lg:mt-0">
              <blockquote className="relative pl-4 sm:pl-6 border-l-4 border-primary/40">
                <p className="font-display text-base sm:text-lg lg:text-xl xl:text-2xl font-bold leading-snug sm:leading-relaxed mb-6 sm:mb-8 text-foreground">
                  {testimonial.quote}
                </p>
                <footer>
                  <p className="font-display font-semibold text-sm sm:text-base text-foreground">{testimonial.author}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionTestimonial;
