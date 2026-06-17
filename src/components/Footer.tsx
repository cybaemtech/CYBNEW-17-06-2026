import { Link } from "react-router-dom";
import cybaemLogo from "@/assets/cybaem-logo.png";
import { allSolutions } from "@/data/solutionsData";

const Footer = () => (
  <footer className="border-t border-border py-12 bg-background text-foreground">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        <div>
          <img src={cybaemLogo} alt="Cybaem Tech" className="h-10 w-auto mb-4" width={180} height={40} />
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-4">
            ISO-certified global technology partner delivering enterprise software, cloud security, and digital growth solutions.
          </p>
          <address className="not-italic text-xs text-muted-foreground leading-relaxed space-y-1">
            <p>Suratwala Mark Plazzo, Hinjawadi,<br />Pune, Maharashtra 411057, India</p>
            <p>
              <a href="tel:+919028541383" className="hover:text-foreground transition-colors">+91-9028541383</a>
              {" · "}
              <a href="tel:+912069010200" className="hover:text-foreground transition-colors">020 2069010200</a>
            </p>
            <p>
              <a href="mailto:sales@cybaemtech.com" className="hover:text-foreground transition-colors">sales@cybaemtech.com</a>
            </p>
          </address>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-4">Solutions</h4>
          <nav className="space-y-2">
            {allSolutions.map((s) => (
              <Link key={s.slug} to={`/solutions/${s.slug}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {s.title}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-4">Company</h4>
          <nav className="space-y-2">
            <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
            <Link to="/portfolio" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Portfolio</Link>
            <Link to="/life-at-cybaemtech" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Life At CybaemTech</Link>
            <Link to="/blog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
            <Link to="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-4">Connect</h4>
          <div className="space-y-2">
            <a href="https://www.linkedin.com/company/cybaemtech/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
            <a href="https://www.instagram.com/cybaemtech/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
            <a href="https://www.youtube.com/@cybaemtech" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">YouTube</a>
            <a href="https://www.facebook.com/cybaemtech/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Facebook</a>
            <a href="https://x.com/Cybaem_Tech" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">X (Twitter)</a>
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Cybaem Tech Pvt. Ltd. All rights reserved.</span>
        <div className="flex flex-wrap gap-6">
          <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          <Link to="/cookie-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link>
          <Link to="/refund-cancellation-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Refund Policy</Link>
          <Link to="/accessibility" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Accessibility</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
