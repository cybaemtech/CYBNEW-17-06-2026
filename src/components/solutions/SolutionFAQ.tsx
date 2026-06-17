import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { containerVariants, itemVariants } from "@/lib/animations";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
  title: string;
}

const SolutionFAQ = ({ faqs, title }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-border py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="max-w-3xl mx-auto">
          <motion.span variants={itemVariants} className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block text-center">
            Frequently Asked Questions
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-4xl font-bold leading-tight mb-12 text-center">
            {title} — Answered
          </motion.h2>

          <motion.div variants={itemVariants}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glass-panel rounded-xl px-6 border">
                  <AccordionTrigger className="text-left font-display font-semibold text-base hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionFAQ;
