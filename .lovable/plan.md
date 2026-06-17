

# Performance Optimization Plan — Core Web Vitals Fix

The uploaded screenshots show poor Core Web Vitals scores (FCP, LCP, TBT all "Likely Poor", CLS "Needs Improvement"). The strategic roadmap highlights three priorities: optimize image delivery, reduce render-blocking resources, and improve FCP/LCP.

## Root Cause Analysis

1. **LCP / FCP (Likely Poor)**: The hero image (`hero-new.avif`) is bundled via ES import, meaning it loads only after JS parses. Google Fonts stylesheet is loaded with a print-to-all swap hack that delays text rendering. Framer Motion is imported in 27+ components — the entire library lands in the initial bundle.

2. **TBT (Likely Poor)**: Heavy Framer Motion animation calculations on mount. Multiple `useScroll`, `useTransform`, and `useInView` hooks firing simultaneously. The `setInterval`-based counter animations in TrustAnchorSection run eagerly.

3. **CLS (Needs Improvement)**: Font swap from system to Inter/Space Grotesk causes layout shift. Images without explicit dimensions in some components. The marquee animation may cause reflows.

---

## Implementation Plan

### 1. Optimize Image Delivery (HIGH priority)

- **Preload hero image**: Add `<link rel="preload" as="image" href="/hero-new.avif">` in `index.html` so the LCP image starts fetching before JS parses
- Move the hero image to `public/` folder so it has a stable URL for preloading
- Add explicit `width`/`height` to all `<img>` tags missing them (partner logos, cert badges) to prevent CLS

### 2. Reduce Render-Blocking Resources (HIGH priority)

- **Inline critical font CSS**: Add `font-display: swap` declarations directly in `index.html` `<style>` for Inter and Space Grotesk so text renders immediately with fallback fonts
- **Defer Framer Motion on below-fold sections**: Lazy-load `TrustAnchorSection`, `DifferenceSection`, `SolutionsSection`, `GlobalReachSection`, `OrbitSection`, and `CTASection` using `React.lazy` so their Framer Motion code doesn't block the initial bundle
- Move `CookieConsentBanner` to lazy load (not critical for FCP)

### 3. Reduce TBT — Lighten Initial JS Execution

- **Simplify hero animations**: Replace Framer Motion `useScroll`/`useTransform` parallax in HeroSection with CSS-only parallax (`background-attachment: fixed` or `will-change: transform` with a simpler intersection observer), or at minimum remove the scroll-linked transforms that fire on every frame
- **Defer counter animations**: The `useCounter` / `AnimatedCounter` hooks are fine since they already use `useInView`, but ensure they don't initialize until truly in view
- Remove the `useScroll` + `useTransform` from the Navbar if it's only for subtle opacity changes — use CSS `position: sticky` + scroll-driven styling instead

### 4. Fix CLS — Layout Stability

- Add `font-display: optional` or explicit fallback font size-adjust to prevent font-swap layout shifts
- Add explicit `aspect-ratio` or `width/height` to the hero image container so space is reserved before the image loads
- Set fixed dimensions on partner logo containers (already done) and cert badge images

### 5. Suspense Fallback Improvement

- Replace the blank `<div className="min-h-screen bg-background" />` Suspense fallback with a lightweight skeleton that matches the hero layout, preventing a blank flash

---

## Technical Details

**Files to modify:**
- `index.html` — Add hero image preload link, inline critical font CSS
- `src/pages/Index.tsx` — Lazy-load below-fold sections
- `src/components/HeroSection.tsx` — Move image to public, simplify parallax, ensure dimensions
- `src/components/TrustAnchorSection.tsx` — Add explicit image dimensions
- `src/components/DifferenceSection.tsx` — Add explicit image dimensions
- `src/components/Navbar.tsx` — Simplify scroll-driven transforms
- `src/App.tsx` — Lazy-load CookieConsentBanner
- `src/index.css` — Add font-display declarations and size-adjust fallbacks

**Expected impact:**
- FCP: Significantly improved by preloading hero image + inlining font CSS
- LCP: Improved by preloading + code-splitting below-fold sections
- TBT: Reduced by lazy-loading Framer Motion-heavy components and simplifying scroll listeners
- CLS: Fixed by explicit dimensions and font fallback sizing

