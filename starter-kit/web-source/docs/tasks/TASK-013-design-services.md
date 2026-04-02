# TASK-013: Design Services Page & Cinematic Gallery

## Objective
Implement a high-end "Services" page under the marketing router (`/services`) utilizing the newly established "Synthetic Ether" design system (ultra-premium typography, glassmorphism, depth over outlines). We will introduce a new `CinematicGallery` component to showcase core capabilities in a visually stunning, spatial layout mapping to the "Services: Cinematic Gallery" concept.

## Affected Components
- `portable/src/app/(marketing)/layout.tsx`: Add "Services" to main navigation.
- `portable/src/app/(marketing)/services/page.tsx`: Create the main entry point for the new premium page.
- `portable/src/components/cinematic/CinematicGallery.tsx`: A new interactive gallery for presenting services.
- `portable/src/components/layout/ServiceCard.tsx`: Reusable floating glass card used within the grid.

## Sequential Plan
### Step 1: Nav Integration
- **What**: Expose the new route to the global Marketing shell.
- **How**: Update `portable/src/app/(marketing)/layout.tsx` to include `{ label: 'Services', href: '/services' }`.

### Step 2: Cinematic Components Setup
- **What**: Create the `ServiceCard` and `CinematicGallery` UI pieces incorporating glassmorphism (`surface-container-highest` with backdrop-blur) and tonal shadows.
- **How**: Design components within `portable/src/components/cinematic/` and `portable/src/components/layout/` using the system's motion and surface tokens.

### Step 3: Page Assembly
- **What**: Compose the `/services` page.
- **How**: Use `HeroSection`, `Section`, and `ContentGrid` + our new cinematic components. Build a layout that avoids standard borders and leverages high typography contrast.

### Step 4: Verify Subagent Check
- **What**: Ensure visual fidelity without layout breaks or lint issues.
- **How**: Run `/verify-pyramid` and check via `browser_subagent`.

---

## Execution Record
- [x] Step 1: Nav Integration
- [x] Step 2: Cinematic Components Setup
- [x] Step 3: Page Assembly
- [x] Step 4: Verification and Automation

### Status: DONE
Task completed. Cinematic components constructed and page assembled. Note that Turbopack may cache aggressively, requiring a restart of the local Next.js dev server.
