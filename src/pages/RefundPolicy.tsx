import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  { id: "service-based", number: "1", title: "Service-Based Business" },
  { id: "cancellation", number: "2", title: "Cancellation" },
  { id: "refund-eligibility", number: "3", title: "Refund Eligibility" },
  { id: "non-refundable", number: "4", title: "Non-Refundable Services" },
  { id: "refund-processing", number: "5", title: "Refund Processing" },
  { id: "contact", number: "6", title: "Contact for Refund Requests" },
];

const RefundCancellationPolicy = () => {
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
        title="Refund & Cancellation Policy – Cybaem Tech Private Limited"
        description="Refund and Cancellation Policy for Cybaem Tech Private Limited. Learn about our refund eligibility, cancellation process, and non-refundable services."
        canonical="/refund-cancellation-policy"
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
            Refund & <span className="text-primary">Cancellation</span> Policy
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cybaem Tech Private Limited — Understand our refund and cancellation terms before using our services.
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-foreground font-semibold text-lg mb-2">Refund & Cancellation Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This policy outlines the conditions under which refunds and cancellations are processed at Cybaem Tech Private Limited. Please read carefully before engaging our services.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <div id="service-based" className="bg-card border border-border rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">1</span>
                <h2 className="text-foreground text-xl font-semibold">Service-Based Business</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Cybaem Tech Private Limited provides IT and software services. Due to the nature of digital and service-based work, refunds may be limited once work has started.
              </p>
            </div>

            {/* Section 2 */}
            <div id="cancellation" className="bg-card border border-border rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">2</span>
                <h2 className="text-foreground text-xl font-semibold">Cancellation</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Clients may cancel services before the project begins. In such cases, any advance payment may be refunded after deducting administrative or consultation charges.
              </p>
            </div>

            {/* Section 3 */}
            <div id="refund-eligibility" className="bg-card border border-border rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">3</span>
                <h2 className="text-foreground text-xl font-semibold">Refund Eligibility</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">Refunds may be considered only if:</p>
              <ul className="space-y-3">
                {[
                  "The project has not started",
                  "Work has not been delivered",
                  "Cancellation request is made within the agreed time frame",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 4 */}
            <div id="non-refundable" className="bg-card border border-destructive/20 rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-destructive/10 text-destructive font-bold text-sm flex items-center justify-center">4</span>
                <h2 className="text-foreground text-xl font-semibold">Non-Refundable Services</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">The following services are non-refundable once delivered or activated:</p>
              <ul className="space-y-3">
                {[
                  "Domain registration",
                  "Hosting services",
                  "Software licenses",
                  "Third-party subscriptions",
                  "Completed development work",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 5 */}
            <div id="refund-processing" className="bg-card border border-border rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">5</span>
                <h2 className="text-foreground text-xl font-semibold">Refund Processing</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Approved refunds will be processed within <span className="text-foreground font-medium">7–10 business days</span> through the original payment method.
              </p>
            </div>

            {/* Section 6 */}
            <div id="contact" className="bg-card border border-primary/30 rounded-2xl p-8 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">6</span>
                <h2 className="text-foreground text-xl font-semibold">Contact for Refund Requests</h2>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@cybaemtech.com" className="hover:text-primary transition-colors">info@cybaemtech.com</a>
              </div>
            </div>

          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RefundCancellationPolicy;
