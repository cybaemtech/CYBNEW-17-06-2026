import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CookiePolicy = () => {
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "what-are-cookies", title: "What Are Cookies?" },
    { id: "types-of-cookies", title: "Types of Cookies We Use" },
    { id: "cookie-details", title: "Detailed Cookie Information" },
    { id: "third-party-cookies", title: "Third-Party Cookies" },
    { id: "consent", title: "Cookie Consent" },
    { id: "managing-cookies", title: "Managing and Deleting Cookies" },
    { id: "browser-settings", title: "Browser-Specific Settings" },
    { id: "impact", title: "Impact of Disabling Cookies" },
    { id: "web-beacons", title: "Web Beacons and Pixels" },
    { id: "local-storage", title: "Local Storage and Session Storage" },
    { id: "do-not-track", title: "Do Not Track Signals" },
    { id: "updates", title: "Updates to Cookie Policy" },
    { id: "contact", title: "Contact Information" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background legal-light-theme">
      <SEOHead
        title="Cookie Policy - CybaemTech"
        description="CybaemTech Cookie Policy. Understand how we use cookies and tracking technologies on our website."
        canonical="/cookie-policy"
      />

      <Navbar />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Cookie Policy – <span className="text-primary">Cybaem<span className="text-foreground">Tech</span></span>
            </h1>
            <div className="space-y-2">
              <p className="text-muted-foreground text-lg">
                <strong>Effective Date:</strong> June 15, 2025
              </p>
              <p className="text-muted-foreground text-lg">
                <strong>Website:</strong> <a href="https://www.cybaemtech.com" className="text-primary hover:underline">www.cybaemtech.com</a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <Card className="bg-card border-border sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">On this page</h3>
                  <nav className="max-h-[calc(100vh-12rem)] overflow-y-auto invisible-scrollbar">
                    <ul className="space-y-2 pr-2">
                      {sections.map((section, index) => (
                        <li key={section.id}>
                          <button
                            onClick={() => scrollToSection(section.id)}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors text-left w-full"
                          >
                            {index + 1}. {section.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            <div className="lg:col-span-3">
              <Card className="bg-card border-border">
                <CardContent className="p-6 md:p-8">
                  <div className="prose max-w-none">

                    <section id="introduction" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        CybaemTech Private Limited ("CybaemTech", "we", "our", "us") uses cookies and similar tracking technologies on our website (www.cybaemtech.com) to enhance your browsing experience, analyze website traffic, and deliver personalized content.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        This Cookie Policy explains what cookies are, the types of cookies we use, how we use them, and how you can manage your cookie preferences. This policy should be read alongside our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        This policy complies with the Information Technology Act, 2000, the Digital Personal Data Protection Act, 2023 (DPDP Act), and applicable Indian data protection regulations.
                      </p>
                    </section>

                    <Separator className="bg-border my-8" />

                    <section id="what-are-cookies" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">2. What Are Cookies?</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, provide analytical information, and personalize your experience.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-2">Cookies serve various functions, including:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li><strong>Remembering preferences:</strong> Storing your language, region, and display settings</li>
                        <li><strong>Authentication:</strong> Keeping you logged in during your session</li>
                        <li><strong>Security:</strong> Helping protect your account and detect fraudulent activity</li>
                        <li><strong>Analytics:</strong> Understanding how visitors interact with the website</li>
                        <li><strong>Advertising:</strong> Delivering relevant advertisements based on your interests</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.1 Session vs. Persistent Cookies</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser. They are used to maintain your session while navigating the website.</li>
                        <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period or until you manually delete them. They remember your preferences across visits.</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.2 First-Party vs. Third-Party Cookies</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                        <li><strong>First-Party Cookies:</strong> Set by our website (www.cybaemtech.com) directly. These are essential for website functionality and analytics.</li>
                        <li><strong>Third-Party Cookies:</strong> Set by external services we use (e.g., Google Analytics, social media platforms). These may track your activity across different websites.</li>
                      </ul>
                    </section>

                    <Separator className="bg-border my-8" />

                    <section id="types-of-cookies" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">3. Types of Cookies We Use</h2>

                      <h3 className="text-xl font-semibold text-foreground mb-3">3.1 Strictly Necessary Cookies</h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">
                        These cookies are essential for the website to function properly. They cannot be disabled.
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li>Enable core website functionality (page navigation, access to secure areas)</li>
                        <li>Session management and load balancing</li>
                        <li>Security features (CSRF protection, XSS prevention)</li>
                        <li>Cookie consent preferences storage</li>
                      </ul>
                      <div className="bg-muted p-4 rounded-lg mb-4">
                        <p className="text-muted-foreground text-sm"><strong>Legal Basis:</strong> Legitimate interest — necessary for website operation</p>
                        <p className="text-muted-foreground text-sm"><strong>Consent Required:</strong> No</p>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.2 Functional Cookies</h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">
                        These cookies enhance website functionality and personalization:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li>Remember your language and region preferences</li>
                        <li>Store accessibility settings (font size, contrast)</li>
                        <li>Remember form data for convenience</li>
                        <li>Maintain theme preferences (dark/light mode)</li>
                      </ul>
                      <div className="bg-muted p-4 rounded-lg mb-4">
                        <p className="text-muted-foreground text-sm"><strong>Legal Basis:</strong> Consent</p>
                        <p className="text-muted-foreground text-sm"><strong>Consent Required:</strong> Yes</p>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.3 Analytics and Performance Cookies</h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">
                        These cookies collect anonymous data about how visitors use our website:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li>Track page views, session duration, and bounce rates</li>
                        <li>Identify most and least popular pages</li>
                        <li>Measure website performance and load times</li>
                        <li>Understand user navigation patterns and behavior</li>
                        <li>Generate aggregated statistical reports</li>
                      </ul>
                      <div className="bg-muted p-4 rounded-lg mb-4">
                        <p className="text-muted-foreground text-sm"><strong>Legal Basis:</strong> Consent</p>
                        <p className="text-muted-foreground text-sm"><strong>Consent Required:</strong> Yes</p>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">3.4 Marketing and Advertising Cookies</h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">
                        These cookies are used to deliver relevant advertisements and measure campaign effectiveness:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li>Track user behavior across websites for targeted advertising</li>
                        <li>Measure the effectiveness of marketing campaigns</li>
                        <li>Deliver personalized advertisements based on your interests</li>
                        <li>Limit the number of times you see a specific advertisement</li>
                        <li>Retargeting and remarketing functionality</li>
                      </ul>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-muted-foreground text-sm"><strong>Legal Basis:</strong> Explicit consent</p>
                        <p className="text-muted-foreground text-sm"><strong>Consent Required:</strong> Yes (explicit opt-in)</p>
                      </div>
                    </section>

                    <Separator className="bg-border my-8" />

                    <section id="cookie-details" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">4. Detailed Cookie Information</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-muted-foreground">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-2 text-left">Cookie Name</th>
                              <th className="px-4 py-2 text-left">Provider</th>
                              <th className="px-4 py-2 text-left">Purpose</th>
                              <th className="px-4 py-2 text-left">Type</th>
                              <th className="px-4 py-2 text-left">Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border">
                              <td className="px-4 py-2">_ga</td>
                              <td className="px-4 py-2">Google Analytics</td>
                              <td className="px-4 py-2">Distinguishes unique users</td>
                              <td className="px-4 py-2">Analytics</td>
                              <td className="px-4 py-2">2 years</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="px-4 py-2">_ga_*</td>
                              <td className="px-4 py-2">Google Analytics 4</td>
                              <td className="px-4 py-2">Maintains session state</td>
                              <td className="px-4 py-2">Analytics</td>
                              <td className="px-4 py-2">2 years</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="px-4 py-2">_gid</td>
                              <td className="px-4 py-2">Google Analytics</td>
                              <td className="px-4 py-2">Distinguishes unique users</td>
                              <td className="px-4 py-2">Analytics</td>
                              <td className="px-4 py-2">24 hours</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="px-4 py-2">_gat</td>
                              <td className="px-4 py-2">Google Analytics</td>
                              <td className="px-4 py-2">Throttles request rate</td>
                              <td className="px-4 py-2">Analytics</td>
                              <td className="px-4 py-2">1 minute</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="px-4 py-2">cookie_consent</td>
                              <td className="px-4 py-2">CybaemTech</td>
                              <td className="px-4 py-2">Stores cookie preferences</td>
                              <td className="px-4 py-2">Necessary</td>
                              <td className="px-4 py-2">1 year</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="px-4 py-2">auth_token</td>
                              <td className="px-4 py-2">CybaemTech</td>
                              <td className="px-4 py-2">Authentication session</td>
                              <td className="px-4 py-2">Necessary</td>
                              <td className="px-4 py-2">Session</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2">_fbp</td>
                              <td className="px-4 py-2">Meta (Facebook)</td>
                              <td className="px-4 py-2">Ad delivery and measurement</td>
                              <td className="px-4 py-2">Marketing</td>
                              <td className="px-4 py-2">3 months</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </section>

                    <Separator className="bg-border my-8" />

                    <section id="third-party-cookies" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Cookies</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Our website uses services from third parties that may set their own cookies on your device. We do not control these cookies. The main third-party services we use include:
                      </p>

                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="text-foreground font-semibold mb-2">Google Analytics (GA4)</h4>
                          <p className="text-muted-foreground text-sm mb-1"><strong>Purpose:</strong> Website analytics and performance measurement</p>
                          <p className="text-muted-foreground text-sm mb-1"><strong>Data Collected:</strong> Page views, session duration, demographics, device info</p>
                          <p className="text-muted-foreground text-sm"><strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></p>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="text-foreground font-semibold mb-2">Google Tag Manager</h4>
                          <p className="text-muted-foreground text-sm mb-1"><strong>Purpose:</strong> Tag management for analytics and marketing scripts</p>
                          <p className="text-muted-foreground text-sm"><strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></p>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="text-foreground font-semibold mb-2">Google Ads</h4>
                          <p className="text-muted-foreground text-sm mb-1"><strong>Purpose:</strong> Advertising, conversion tracking, remarketing</p>
                          <p className="text-muted-foreground text-sm"><strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></p>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="text-foreground font-semibold mb-2">LinkedIn Insight Tag</h4>
                          <p className="text-muted-foreground text-sm mb-1"><strong>Purpose:</strong> B2B marketing analytics and ad targeting</p>
                          <p className="text-muted-foreground text-sm"><strong>Privacy Policy:</strong> <a href="https://www.linkedin.com/legal/privacy-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">linkedin.com/legal/privacy-policy</a></p>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="text-foreground font-semibold mb-2">Meta (Facebook) Pixel</h4>
                          <p className="text-muted-foreground text-sm mb-1"><strong>Purpose:</strong> Social media advertising and conversion tracking</p>
                          <p className="text-muted-foreground text-sm"><strong>Privacy Policy:</strong> <a href="https://www.facebook.com/privacy/policy/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">facebook.com/privacy/policy</a></p>
                        </div>
                      </div>
                    </section>

                    <Separator className="bg-border my-8" />

                    <section id="consent" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookie Consent</h2>

                      <h3 className="text-xl font-semibold text-foreground mb-3">6.1 How We Obtain Consent</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li>When you first visit our website, a cookie consent banner is displayed</li>
                        <li>You can choose to accept all cookies, reject non-essential cookies, or customize your preferences</li>
                        <li>Strictly necessary cookies do not require consent and cannot be rejected</li>
                        <li>Pre-ticked boxes are never used — consent is always opt-in</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-foreground mb-3">6.2 Granular Consent</h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">You can provide consent on a category-by-category basis:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li>Functional Cookies — Accept or Reject</li>
                        <li>Analytics Cookies — Accept or Reject</li>
                        <li>Marketing Cookies — Accept or Reject</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-foreground mb-3">6.3 Changing Your Preferences</h3>
                      <p className="text-muted-foreground leading-relaxed mb-2">You can change your cookie preferences at any time by:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li>Clearing your browser cookies and revisiting the website</li>
                        <li>Adjusting your browser settings</li>
                        <li>Contacting us at <a href="mailto:rohan@cybaemtech.com" className="text-primary hover:underline">rohan@cybaemtech.com</a></li>
                      </ul>

                      <h3 className="text-xl font-semibold text-foreground mb-3">6.4 Consent Records</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We maintain records of your cookie consent preferences, including the date, time, and specific categories consented to, for compliance and audit purposes.
                      </p>
                    </section>

                    <Separator className="bg-border my-8" />

                    <section id="managing-cookies" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">7. Managing and Deleting Cookies</h2>
                      <p className="text-muted-foreground leading-relaxed mb-2">
                        You have full control over cookies stored on your device. You can:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li><strong>Accept all cookies:</strong> Allow all cookies for the best website experience</li>
                        <li><strong>Reject non-essential cookies:</strong> Only allow strictly necessary cookies</li>
                        <li><strong>Customize preferences:</strong> Choose which categories of cookies to allow</li>
                        <li><strong>Delete existing cookies:</strong> Remove all cookies stored by our website through browser settings</li>
                        <li><strong>Block future cookies:</strong> Configure your browser to block cookies from our website</li>
                      </ul>
                    </section>

                    <Separator className="bg-border my-8" />

                    <section id="browser-settings" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">8. Browser-Specific Settings</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        You can manage cookies through your browser settings. Here are instructions for popular browsers:
                      </p>

                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="text-foreground font-semibold mb-2">Google Chrome</h4>
                          <p className="text-muted-foreground text-sm">Settings → Privacy and Security → Cookies and other site data</p>
                          <p className="text-muted-foreground text-sm"><a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Chrome Cookie Settings Guide</a></p>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="text-foreground font-semibold mb-2">Mozilla Firefox</h4>
                          <p className="text-muted-foreground text-sm">Settings → Privacy & Security → Cookies and Site Data</p>
                          <p className="text-muted-foreground text-sm"><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Firefox Cookie Settings Guide</a></p>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="text-foreground font-semibold mb-2">Safari</h4>
                          <p className="text-muted-foreground text-sm">Preferences → Privacy → Manage Website Data</p>
                          <p className="text-muted-foreground text-sm"><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Safari Cookie Settings Guide</a></p>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="text-foreground font-semibold mb-2">Microsoft Edge</h4>
                          <p className="text-muted-foreground text-sm">Settings → Cookies and site permissions → Manage and delete cookies</p>
                          <p className="text-muted-foreground text-sm"><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Edge Cookie Settings Guide</a></p>
                        </div>
                      </div>
                    </section>

                    <Separator className="bg-border my-8" />

                    <section id="impact" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">9. Impact of Disabling Cookies</h2>
                      <p className="text-muted-foreground leading-relaxed mb-2">
                        If you choose to disable or reject certain cookies, please be aware that:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li>Some features of the website may not function properly</li>
                        <li>Your preferences and settings may not be remembered between visits</li>
                        <li>You may need to log in each time you visit</li>
                        <li>The website experience may be less personalized</li>
                        <li>We may not be able to analyze and improve website performance effectively</li>
                      </ul>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>Strictly necessary cookies cannot be disabled</strong> as they are essential for the basic operation of the website.
                      </p>
                    </section>

                    <Separator className="bg-border my-8" />

                    <section id="web-beacons" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">10. Web Beacons and Pixels</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        In addition to cookies, we may use web beacons (also known as "tracking pixels" or "clear GIFs") in our website and emails.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-2">Web beacons are used to:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li>Track whether an email has been opened or clicked</li>
                        <li>Measure the effectiveness of marketing campaigns</li>
                        <li>Collect anonymous data about user interactions</li>
                        <li>Enable retargeting and remarketing functionality</li>
                      </ul>
                      <p className="text-muted-foreground leading-relaxed">
                        Web beacons work in conjunction with cookies and are subject to the same consent requirements described above.
                      </p>
                    </section>

                    <Separator className="bg-border my-8" />

                    <section id="local-storage" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">11. Local Storage and Session Storage</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        In addition to cookies, our website may use HTML5 Local Storage and Session Storage to store data locally on your device.
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li><strong>Local Storage:</strong> Persists data even after the browser is closed. Used for storing user preferences and authentication tokens.</li>
                        <li><strong>Session Storage:</strong> Data is cleared when the browser tab is closed. Used for temporary session data.</li>
                      </ul>
                      <p className="text-muted-foreground leading-relaxed">
                        These technologies are subject to the same consent and privacy requirements as cookies. You can clear local and session storage through your browser's developer tools or privacy settings.
                      </p>
                    </section>

                    <Separator className="bg-border my-8" />

                    <section id="do-not-track" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">12. Do Not Track Signals</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Some browsers offer a "Do Not Track" (DNT) feature that sends a signal to websites indicating that you do not wish to be tracked.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Currently, there is no universally accepted standard for how companies should respond to DNT signals. However, we respect your privacy preferences and encourage you to use our cookie consent controls to manage your tracking preferences on our website.
                      </p>
                    </section>

                    <Separator className="bg-border my-8" />

                    <section id="updates" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">13. Updates to Cookie Policy</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        We may update this Cookie Policy from time to time to reflect changes in our practices, technology, third-party services, or applicable laws.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-2">When we make changes:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                        <li>The "Effective Date" at the top of this policy will be updated</li>
                        <li>Material changes will be notified through a prominent notice on our website</li>
                        <li>We may request renewed cookie consent for significant changes</li>
                      </ul>
                      <p className="text-muted-foreground leading-relaxed">
                        We recommend reviewing this Cookie Policy periodically to stay informed about our use of cookies.
                      </p>
                    </section>

                    <Separator className="bg-border my-8" />

                    <section id="contact" className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">14. Contact Information</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        For any questions, concerns, or requests regarding this Cookie Policy:
                      </p>
                      <div className="bg-muted p-4 rounded-lg mb-6">
                        <p className="text-foreground mb-2"><strong>CybaemTech Private Limited</strong></p>
                        <p className="text-muted-foreground"><strong>Email:</strong> <a href="mailto:rohan@cybaemtech.com" className="text-primary hover:underline">rohan@cybaemtech.com</a></p>
                        <p className="text-muted-foreground"><strong>Phone:</strong> <a href="tel:+918530171515" className="text-primary hover:underline">+91 85301 71515</a></p>
                        <p className="text-muted-foreground"><strong>Address:</strong> 304, Suratwala Mark Plazzo, Hinjawadi, Pune, Maharashtra 411057</p>
                        <p className="text-muted-foreground"><strong>Website:</strong> <a href="https://www.cybaemtech.com" className="text-primary hover:underline">www.cybaemtech.com</a></p>
                      </div>
                    </section>

                    <Separator className="bg-border my-8" />

                    <div className="text-center py-8">
                      <p className="text-muted-foreground text-lg mb-4"><strong>Last Updated:</strong> June 15, 2025</p>
                      <p className="text-muted-foreground mb-2">&copy; 2025 CybaemTech Private Limited. All rights reserved.</p>
                      <p className="text-muted-foreground text-sm"><strong>Company Registration:</strong> U62099PN2025PTC237404</p>
                      <p className="text-muted-foreground text-sm"><strong>Registered Office:</strong> RoC-Pune</p>
                      <p className="text-muted-foreground text-sm"><strong>Website:</strong> <a href="https://www.cybaemtech.com" className="text-primary hover:underline">www.cybaemtech.com</a></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiePolicy;