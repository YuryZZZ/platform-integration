# TASK-024: Next.js Application Architecture (Specs 81-90)

## Objective
Finalize Domain 9 by applying the absolute extreme of Next.js performance optimizations natively. This consists of wiring continuous Core Web Vitals telemetry, guaranteeing SEO metadata exports, mapping rigid ISR routes, and optimizing dynamic components limiting total JS payloads.

## Affected Components
- `portable/src/components/WebVitals.tsx` (Spec 88: Telemetry logger)
- `portable/src/app/layout.tsx` (Spec 82, 85: Global SEO metadata & local font loading)
- `portable/src/app/(marketing)/blog/page.tsx` (Spec 89: Static Incremental Site Regeneration bounds)
- `portable/src/app/(marketing)/page.tsx` (Spec 86, 90: Dynamic imports and absolute Image sizing bounds)

## Sequential Plan
### Step 1: Core Web Vitals Tracking (Spec 88)
- **What**: Create a client component actively mapping layout shifts, FID, and LCP.
- **How**: Utilize `useReportWebVitals` exporting data directly or console simulating production logs.

### Step 2: Global Layout SEO & Fonts (Specs 82, 85)
- **What**: Enforce absolute Metadata mapping inside `layout.tsx` alongside optimized Font definitions removing FOUT entirely.

### Step 3: Progressive Enhancements (Specs 86, 89, 90)
- **What**: Inject ISR parameters natively (`revalidate = 3600`).
- **How**: Map Next/Image bounds ensuring no native layout shifts occur and aggressively lazy-load a heavy component avoiding main-thread blocking.

---

## Execution Record
- [x] Step 1: Web Vitals
- [x] Step 2: SEO & Font Configs
- [x] Step 3: ISR & Lazy Loading

### Status: DONE
