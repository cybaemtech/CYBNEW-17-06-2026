import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Accessibility Statement | Cybaem Tech"
        description="Cybaem Tech is committed to ensuring digital accessibility for people with disabilities. Read our accessibility statement and WCAG compliance commitment."
        canonical="/accessibility"
        keywords="accessibility statement, WCAG compliance, digital accessibility, Cybaem Tech accessibility"
      />
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-8">
            Accessibility Statement
          </h1>

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
            <p>
              Cybaem Tech Pvt. Ltd. is committed to ensuring digital accessibility for people with disabilities.
              We are continually improving the user experience for everyone and applying the relevant accessibility
              standards to ensure we provide equal access to all users.
            </p>

            <h2>Our Commitment</h2>
            <p>
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA.
              These guidelines explain how to make web content more accessible to people with a wide
              array of disabilities, including visual, auditory, physical, speech, cognitive, language,
              learning, and neurological disabilities.
            </p>

            <h2>Measures Taken</h2>
            <ul>
              <li>Semantic HTML structure with proper heading hierarchy</li>
              <li>Sufficient colour contrast ratios throughout the website</li>
              <li>Keyboard navigable interface with visible focus indicators</li>
              <li>Skip-to-content navigation link for screen reader users</li>
              <li>Alt text on meaningful images</li>
              <li>Responsive design that adapts to various screen sizes and zoom levels</li>
              <li>ARIA landmarks and roles where appropriate</li>
            </ul>

            <h2>Known Limitations</h2>
            <p>
              While we strive for comprehensive accessibility, some content may not yet fully meet all
              WCAG 2.1 Level AA standards. We are actively working to identify and resolve any issues.
            </p>

            <h2>Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of the Cybaem Tech website. If you encounter
              accessibility barriers or have suggestions for improvement, please contact us:
            </p>
            <ul>
              <li>Email: <a href="mailto:sales@cybaemtech.com">sales@cybaemtech.com</a></li>
              <li>Phone: <a href="tel:+919028541383">+91-9028541383</a></li>
            </ul>
            <p>We aim to respond to accessibility feedback within 5 business days.</p>

            <h2>Continuous Improvement</h2>
            <p>
              We view accessibility as an ongoing effort. Our team regularly reviews and updates this
              website to maintain and improve its accessibility. This statement was last updated on
              March 2026.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Accessibility;
