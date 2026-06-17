import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const useCounter = (end: number, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (startOnView && !isInView) return;
    if (hasStarted.current) return;
    hasStarted.current = true;

    const steps = 60;
    const increment = end / steps;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.round(current * 100) / 100);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end, duration, isInView, startOnView]);

  return { count, ref };
};
