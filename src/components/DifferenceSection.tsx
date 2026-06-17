import { motion } from "framer-motion";
import { User, FileCheck, ShieldCheck } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";
import sectionTeam from "@/assets/section-team.avif";

const protocols = [
  { icon: User, title: "Single Point of Accountability", desc: "Every project is assigned a dedicated UK/UAE time-zone aligned Project Owner. No communication black holes." },
  { icon: FileCheck, title: 'The "Zero Scope-Creep" Architecture', desc: "We mandate comprehensive requirement freezes and technical scope sign-offs before a single line of code is written." },
  { icon: ShieldCheck, title: "Uncompromising Compliance", desc: "Operating under dual ISO certifications, your intellectual property and data are secured to international enterprise standards from Day 1." },
];

const DifferenceSection = () => {
  return (
    <section id="approach" className="section-border py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.span variants={itemVariants} className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4">The Cybaem Difference</motion.span>
              <motion.h2 variants={itemVariants} className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-6">Premium IT Service Solutions: Risk Out of Global Outsourcing.</motion.h2>
              <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed text-lg mb-8">
                Most international technology projects fail because of poor communication, shifting goalposts, and a lack of quality control. We built Cybaem Tech to solve exactly that. Rooted in over 14 years of rigorous QA automation and elite product leadership, our company DNA is obsessed with process. We don't just write code; we deliver bulletproof business outcomes.
              </motion.p>
              <motion.div variants={itemVariants} className="relative rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <img src={sectionTeam} alt="Cybaem engineering team collaborating" className="w-full h-64 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105" loading="lazy" width={640} height={256} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-medium text-white/80 tracking-wider uppercase">14+ Years of Engineering Excellence</span>
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.p variants={itemVariants} className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">The Delivery Guarantee Protocol</motion.p>
              {protocols.map((item) => (
                <motion.div key={item.title} variants={itemVariants} className="glass-panel rounded-xl p-6 group hover:border-primary/30 transition-all duration-500 cursor-default hover:-translate-y-1 hover:translate-x-1">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
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

export default DifferenceSection;
