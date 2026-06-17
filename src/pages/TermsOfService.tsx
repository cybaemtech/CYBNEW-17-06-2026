import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  { id: "services", number: "1", title: "Services" },
  { id: "service-agreement", number: "2", title: "Service Agreement" },
  { id: "payments", number: "3", title: "Payments" },
  { id: "delivery", number: "4", title: "Delivery" },
  { id: "intellectual-property", number: "5", title: "Intellectual Property" },
  { id: "limitation", number: "6", title: "Limitation of Liability" },
  { id: "modifications", number: "7", title: "Modifications" },
  { id: "contact", number: "8", title: "Contact Information" },
];

const TermsOfService = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Terms of Service – Cybaem Tech Private Limited"
        description="Terms of Service for Cybaem Tech Private Limited. Understand the terms and conditions governing our IT services."
        canonical="/terms-of-service"
      />

      <Navbar />

      {/* Hero Banner */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
            <span className="text-primary text-sm font-medium">Legal Document</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cybaem Tech Private Limited — Please read these terms carefully before using our services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-5">
              <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Table of Contents</h3>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 text-sm group"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20">
                      {s.number}
                    </span>
                    {s.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">

            {/* Intro Card */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-foreground font-semibold text-lg mb-2">Welcome to Cybaem Tech Private Limited</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By using our services, you agree to the following terms and conditions. These terms govern your use of all services provided by Cybaem Tech Private Limited.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <div id="services" className="bg-card border border-border rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">1</span>
                <h2 className="text-foreground text-xl font-semibold">Services</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Cybaem Tech Private Limited provides IT services including software development, website development, cloud services, IT infrastructure setup, cybersecurity services, managed IT services, domain registration, hosting services, and technical consulting.
              </p>
            </div>

            {/* Section 2 */}
            <div id="service-agreement" className="bg-card border border-border rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">2</span>
                <h2 className="text-foreground text-xl font-semibold">Service Agreement</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                All services provided by Cybaem Tech are based on mutually agreed proposals, quotations, or service contracts.
              </p>
            </div>

            {/* Section 3 */}
            <div id="payments" className="bg-card border border-border rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">3</span>
                <h2 className="text-foreground text-xl font-semibold">Payments</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Payments must be made as per the invoice or agreement terms. For project-based services, advance payments may be required before the start of work.
              </p>
            </div>

            {/* Section 4 */}
            <div id="delivery" className="bg-card border border-border rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">4</span>
                <h2 className="text-foreground text-xl font-semibold">Delivery</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Project timelines depend on scope, client inputs, and technical requirements. Delays caused by client-side approvals or data submission may affect timelines.
              </p>
            </div>

            {/* Section 5 */}
            <div id="intellectual-property" className="bg-card border border-border rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">5</span>
                <h2 className="text-foreground text-xl font-semibold">Intellectual Property</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                All developed software, websites, or solutions will be delivered to the client as per the agreed contract terms after completion of payment.
              </p>
            </div>

            {/* Section 6 */}
            <div id="limitation" className="bg-card border border-border rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">6</span>
                <h2 className="text-foreground text-xl font-semibold">Limitation of Liability</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Cybaem Tech shall not be liable for any indirect, incidental, or consequential damages arising from the use of services.
              </p>
            </div>

            {/* Section 7 */}
            <div id="modifications" className="bg-card border border-border rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">7</span>
                <h2 className="text-foreground text-xl font-semibold">Modifications</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Cybaem Tech reserves the right to modify these terms at any time.
              </p>
            </div>

            {/* Section 8 */}
            <div id="contact" className="bg-card border border-primary/30 rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">8</span>
                <h2 className="text-foreground text-xl font-semibold">Contact Information</h2>
              </div>
              <div className="space-y-3">
                <p className="text-foreground font-medium">Cybaem Tech Private Limited</p>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@cybaemtech.com" className="hover:text-primary transition-colors">info@cybaemtech.com</a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                  <a href="https://cybaemtech.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">https://cybaemtech.com</a>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
