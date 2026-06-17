import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "cybaem_cookie_consent";

const getStoredPreferences = (): CookiePreferences | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = getStoredPreferences();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setVisible(false);
  };

  const acceptAll = () => {
    savePreferences({ necessary: true, analytics: true, marketing: true });
  };

  const rejectOptional = () => {
    savePreferences({ necessary: true, analytics: false, marketing: false });
  };

  const saveCustom = () => {
    savePreferences(preferences);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
        >
          <div className="container mx-auto max-w-2xl">
            <div className="bg-card border border-border rounded-xl shadow-lg px-4 py-3">
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Cookie size={14} className="text-primary shrink-0" />
                  <h3 className="font-display font-semibold text-foreground text-xs">
                    We value your privacy
                  </h3>
                </div>
                <button
                  onClick={rejectOptional}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close cookie banner"
                >
                  <X size={14} />
                </button>
              </div>

              <p className="text-[11px] text-muted-foreground leading-snug mb-2.5">
                We use cookies to enhance your experience and analyse traffic per India's DPDP Act, 2023.{" "}
                <Link to="/cookie-policy" className="text-primary hover:underline">
                  Cookie Policy
                </Link>
              </p>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-2"
                  >
                    <div className="space-y-1.5 pt-2 border-t border-border">
                      <label className="flex items-center gap-2 cursor-not-allowed opacity-70">
                        <input type="checkbox" checked disabled className="accent-primary w-3 h-3" />
                        <span className="text-[11px] font-medium text-foreground">Necessary</span>
                        <span className="text-[10px] text-muted-foreground">— Always active</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences((p) => ({ ...p, analytics: e.target.checked }))}
                          className="accent-primary w-3 h-3"
                        />
                        <span className="text-[11px] font-medium text-foreground">Analytics</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences((p) => ({ ...p, marketing: e.target.checked }))}
                          className="accent-primary w-3 h-3"
                        />
                        <span className="text-[11px] font-medium text-foreground">Marketing</span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={acceptAll}
                  className="px-3 py-1 text-[11px] font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
                >
                  Accept All
                </button>
                <button
                  onClick={rejectOptional}
                  className="px-3 py-1 text-[11px] font-medium border border-border text-foreground rounded-md hover:bg-muted transition-colors"
                >
                  Reject
                </button>
                {showDetails ? (
                  <button
                    onClick={saveCustom}
                    className="px-3 py-1 text-[11px] font-medium text-primary hover:underline transition-colors"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setShowDetails(true)}
                    className="px-3 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Customise
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
