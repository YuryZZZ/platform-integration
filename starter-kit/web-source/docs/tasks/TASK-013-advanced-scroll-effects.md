# TASK-013: Advanced Scroll Effects & Micro-Interactions

## Objective
Implement visually stunning scroll effects, parallax backgrounds, and intersection observer-based animations to elevate the user experience. By utilizing `framer-motion` and custom hooks, we will wrap CMS components (Hero, FeatureGrid, CTA) in intelligent, high-performance animation borders.

## Affected Components
- `src/components/animations/Reveal.tsx` (New): Scroll-triggered fade/slide intersection component.
- `src/components/animations/ParallaxScroll.tsx` (New): Subtly shifts background or foreground content based on scroll depth.
- `src/components/animations/AnimatedCounter.tsx` (New): Number increments from 0 to target on view.
- `src/components/layout/HeroSection.tsx`: Enhance with `Reveal` and `ParallaxScroll`.
- `src/components/layout/FeatureGrid.tsx`: Enhance with staggered `Reveal`.
- `src/components/layout/CustomerWinCard.tsx`: Enhance text metrics with `AnimatedCounter`.
- `src/components/layout/CtaBand.tsx`: Implement floating noise/grain and subtle background parallax.

## Sequential Plan

### Step 1: Core Animation Primitives (`Reveal` & `ParallaxScroll`)
- **What**: Create reusable observer-based wrapper components capable of handling directional slides, fades, and scale-ins.
- **How**: Utilize `framer-motion`'s `useInView` and `useScroll` hooks mapped to styled wrappers.

### Step 2: Data Interaction Elements (`AnimatedCounter`)
- **What**: Create `AnimatedCounter` to seamlessly ramp metrics strings when scrolled into view.
- **How**: Use `framer-motion` `useSpring` and `useTransform` logic hooked into a vanilla React span.

### Step 3: CMS Block Enhancements
- **What**: Wrap the `HeroSection`, `FeatureGrid`, and `CtaBand` within the new animation wrappers to achieve a premium "glass" aesthetic dynamically loading on scroll.
- **How**: Modify the `portable/src/components/layout/*` components without breaking CMS contracts.

### Step 4: Verification and Typechecking
- **What**: Ensure build checks pass without ts errors.
- **How**: `<npm run typecheck>`

## Execution Record
- [x] Step 1: Core Animation Primitives
- [x] Step 2: Data Interaction Elements
- [x] Step 3: CMS Block Enhancements
- [x] Step 4: Verification and Automation

### Status: DONE
Advanced scroll effects, parallax scenes, and data interactions are fully integrated and strictly typechecked.
