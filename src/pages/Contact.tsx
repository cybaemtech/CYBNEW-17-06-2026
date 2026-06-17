import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { contactSeoData } from "@/data/seo/contactSeo";
import { MapPin, Phone, Mail, ArrowRight, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { containerVariants, itemVariants } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const serviceCategories = [
  "Enterprise Software",
  "Website Designing",
  "IT Augmentation",
  "Cloud / Managed IT & Security",
  "Digital Growth Plan",
];

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
  email: z.string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email format")
    .max(255, "Email must not exceed 255 characters"),
  mobile: z.string()
    .trim()
    .min(1, "Mobile number is required")
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Invalid mobile number format")
    .refine(val => /[0-9]/.test(val), "Mobile number must contain at least one digit"),
  category: z.string()
    .min(1, "Please select a service category"),
  message: z.string()
    .trim()
    .optional()
    .default(""),
});

const faqs = [
  {
    question: "What services does Cybaem Tech provide?",
    answer:
      "Cybaem Tech is a one-stop IT, Software Product Development (NPD), Networking, and Digital Marketing company in India. We specialize in Digital Marketing Services (SEO, SMM, PPC, Branding), IT Infrastructure Management, Server Implementation & Support (Windows & Linux), Microsoft 365 Services, Cloud Hosting Solutions, Website Development, and Cybersecurity Services. Our goal is to empower businesses with end-to-end technology and marketing solutions that deliver measurable growth.",
  },
  {
    question: "How quickly will you respond?",
    answer:
      "We typically respond to all inquiries within 2-4 business hours. For urgent matters, please call us directly at +91 90 2854 1383.",
  },
  {
    question: "Do you offer a free initial consultation?",
    answer:
      "Yes, we provide a complimentary 30-minute consultation to understand your requirements and discuss how our services can benefit your business.",
  },
  {
    question: "Can you sign an NDA before we share details?",
    answer:
      "Absolutely. We understand the importance of confidentiality and are happy to sign a Non-Disclosure Agreement before discussing your project details.",
  },
  {
    question: "What engagement models do you support?",
    answer:
      "We offer flexible engagement models including project-based, dedicated team, staff augmentation, and managed services to suit your specific needs and budget.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes, we offer comprehensive post-deployment support including maintenance, updates, monitoring, and technical assistance based on agreed SLAs.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We serve various industries including healthcare, finance, e-commerce, manufacturing, education, and government sectors with tailored technology solutions.",
  },
];

const contactCards = [
  {
    icon: MapPin,
    title: "Office Address",
    lines: ["Suratwala Mark Plazzo, Hinjawadi,", "Pune, Maharashtra 411057"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["Business: +91-9028541383", "Business: 020 2069010200", "Career & Support: +91 8484815905"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["sales@cybaemtech.com"],
    href: "mailto:sales@cybaemtech.com",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", mobile: "", category: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const faqRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const formInView = useInView(formRef, { once: true, margin: "-100px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSending(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.mobile,
        category: form.category,
        message: form.message,
        sourcePage: window.location.href,
      };
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Something went wrong");
      }
      setForm({ name: "", email: "", mobile: "", category: "", message: "" });
      setShowSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={contactSeoData.title}
        description={contactSeoData.description}
        canonical={contactSeoData.canonical}
        keywords={contactSeoData.keywords}
        ogDescription={contactSeoData.ogDescription}
        ogImageAlt={contactSeoData.ogImageAlt}
        twitterDescription={contactSeoData.twitterDescription}
        twitterImageAlt={contactSeoData.twitterImageAlt}
        jsonLd={contactSeoData.jsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-foreground blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-foreground blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span
              variants={itemVariants}
              className="text-xs font-medium tracking-[0.2em] uppercase text-primary-foreground/60 mb-4 block"
            >
              Contact
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
            >
              Connect with our
              <br />
              IT Service technical leadership
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-primary-foreground/70 leading-relaxed">
              Submit your inquiry. Our senior team responds within 24 hours—no intermediaries, no delays.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form + Image */}
      <section ref={formRef} className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          >
            {/* Form */}
            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className="h-14 bg-muted/50 border-border text-base placeholder:text-muted-foreground/50 focus:border-primary"
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground"
                >
                  Business Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="company@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="h-14 bg-muted/50 border-border text-base placeholder:text-muted-foreground/50 focus:border-primary"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="mobile"
                  className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground"
                >
                  Mobile Number
                </Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.mobile}
                  onChange={handleChange}
                  className="h-14 bg-muted/50 border-border text-base placeholder:text-muted-foreground/50 focus:border-primary"
                />
                {errors.mobile && <p className="text-sm text-destructive">{errors.mobile}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
                  Service Category
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => {
                    setForm({ ...form, category: value });
                    if (errors.category) setErrors({ ...errors, category: "" });
                  }}
                >
                  <SelectTrigger className="h-14 bg-muted/50 border-border text-base focus:border-primary">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground"
                >
                  Your Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={handleChange}
                  className="min-h-[160px] bg-muted/50 border-border text-base placeholder:text-muted-foreground/50 focus:border-primary resize-none"
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {sending ? "Sending..." : "Send message"}
                <Send size={16} />
              </motion.button>
            </motion.form>

            {/* Image + Contact cards */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/images/contact-hero.avif"
                  alt="Cybaem Tech team meeting"
                  className="w-full h-[360px] object-cover"
                  loading="lazy"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {contactCards.map((card) => (
                  <div key={card.title} className="glass-panel rounded-xl p-6 space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <card.icon size={18} className="text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-sm">{card.title}</h3>
                    <div className="space-y-1">
                      {card.lines.map((line, i) =>
                        card.href ? (
                          <a
                            key={i}
                            href={card.href}
                            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={i} className="text-sm text-muted-foreground">
                            {line}
                          </p>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">Our Location</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold leading-tight">Find Us Here</h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <div className="w-full h-96 md:h-[500px] relative">
              <iframe
                title="Cybaem Tech Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.635261367137!2d73.74575887496471!3d18.59047548251667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b71e64b665df%3A0xf2de2df843c281ce!2sCybaem%20Tech!5e0!3m2!1sen!2sin!4v1758686264653!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'invert(90%) hue-rotate(180deg) saturate(1.2) brightness(0.9) contrast(1.1)'
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="section-border py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={faqInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <motion.span
              variants={itemVariants}
              className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block text-center"
            >
              Frequently Asked Questions
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-display text-3xl lg:text-4xl font-bold leading-tight mb-4 text-center"
            >
              Got Questions? We've Got Answers
            </motion.h2>
            <motion.p variants={itemVariants} className="text-muted-foreground text-center mb-12">
              Get answers to common questions about our services and solutions.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="glass-panel rounded-xl px-6 border">
                    <AccordionTrigger className="text-left font-display font-semibold text-base hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary rounded-2xl p-10 lg:p-16 text-center"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
              Let's discuss how CYBAEM TECH can help you optimize operations, enhance security, and achieve scalable
              business growth.
            </p>
            <a
              href="https://wa.me/918530171515?text=Hi%20Cybaem%20Tech%2C%20I%20am%20reaching%20out%20to%20you%20for%20the%20services%20-%20Software%20Product%20Development%2C%20Managed%20IT%20Services%2C%20Website%20Designing%2C%20Digital%20Marketing%2C%20IT%20Augmentation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition-opacity"
            >
              Contact Us Today
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Thank You Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader className="items-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <DialogTitle className="text-2xl font-display font-bold">Thank You!</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground leading-relaxed">
              Your message has been sent successfully. Our senior team will get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={() => setShowSuccess(false)}
            className="mt-4 inline-flex items-center justify-center px-8 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Got it
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
