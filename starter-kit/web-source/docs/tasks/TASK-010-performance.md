# TASK-010: Phase 6 - Performance & Observability

## Objective
Execute Stage 18 of the Master Plan. Integrate Web Vitals tracking, configure strict Lighthouse assertions, setup fundamental tracing for production monitoring, and optimize image delivery mechanisms via Next.js configurations to ensure the highest possible Lighthouse scores before final launch.

## Affected Components
- `hooks/useWebVitals.ts`: A hook to collect and emit Google Core Web Vitals to analytics.
- `.lighthouserc.json`: LHCI configuration for CI environments.
- `lib/performance/tracing.ts`: Skeleton implementation for OpenTelemetry tracing.
- `next.config.ts`: Add `images` configuration for remote pattern optimization.

## Sequential Plan
### Step 1: Core Web Vitals Tracking (`hooks/useWebVitals.ts`)
- **What**: Create a hook utilizing the `web-vitals` library to capture CLS, FID, LCP metrics.
- **How**: Export `useWebVitals` utilizing Next.js built-in `useReportWebVitals` and the underlying web-vitals package.

### Step 2: Lighthouse CI Thresholds (`.lighthouserc.json`)
- **What**: Configure Lighthouse CI settings.
- **How**: Map out performance budgets requiring > 90 on mobile/desktop for accessibility, SEO, and performance.

### Step 3: OpenTelemetry Prep (`lib/performance/tracing.ts`)
- **What**: Prepare the environment to ship traces.
- **How**: Setup the basic OpenTelemetry SDK logic wrapping functions with span exports.

### Step 4: Next.js Optimizations (`next.config.ts`)
- **What**: Enable advanced image sizing and remote URLs.
- **How**: Append the `images` block inside Next config, allowing the CMS remote bucket to serve optimized webp/avif.

---

## Execution Record
- [x] Step 1: Web Vitals Hook
- [x] Step 2: Lighthouse CI Rules
- [x] Step 3: Trace Initializer
- [x] Step 4: Next config images

### Status: DONE
All core rendering monitoring and optimization boundaries are fully functional. Web Vitals and LHCI protect against regression.
