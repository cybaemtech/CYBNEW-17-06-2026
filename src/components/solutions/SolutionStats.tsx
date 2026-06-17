import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { containerVariants, itemVariants } from "@/lib/animations";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.round(current * 100) / 100);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, value]);

  const display = Number.isInteger(value) ? Math.round(count) : count.toFixed(value.toString().split('.')[1]?.length || 1);

  return (
    <span ref={ref} className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground">
      {display}{suffix}
    </span>
  );
};

interface Props {
  stats: StatItem[];
}

const SolutionStats = ({ stats }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-primary" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="text-center">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-primary-foreground/70 mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionStats;
