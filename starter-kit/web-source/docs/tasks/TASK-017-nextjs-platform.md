# Task 017: React Next.js Platform Architecture (Specs 21-30)

## Status: COMPLETED

### What
Execute Domain 3 of `TASK-100-SPECS.md` structuring the core React Next.js framework spanning streaming layouts, RSC patterns, internationalization, and optimized metadata extraction.

### Specs Addressed (21-30)
21. [x] `nextjs`: Configure Next.js App Router providing strict streaming hydration.
22. [x] `nextjs`: Implement Next.js Layout architectures utilizing deeply nested loading states.
23. [x] `nextjs`: Map Next.js generic SEO metadata definitions dynamically matching site context.
24. [x] `nextjs`: Deploy React Server Components (RSC) shifting heavy DOM computations backend.
25. [x] `nextjs`: Configure Next.js Middleware handling global authentication redirects flawlessly.
26. [x] `nextjs`: Structure Next.js absolute alias imports standardizing module references globally.
27. [x] `nextjs`: Pre-render Next.js marketing pages statically ensuring immediate initial unloads.
28. [x] `nextjs`: Implement Next.js Image component optimization shrinking bandwidth footprints.
29. [x] `nextjs`: Setup Next.js Internationalization (i18n) routes adapting locale routing immediately.
30. [x] `nextjs`: Profile Next.js strict bundle Analyzer pipelines catching massive library bloats.

### Implementation Plan
1. **Config & Aliases (26, 30):** Update `tsconfig.json` and `next.config.ts` defining strict module paths and enabling `@next/bundle-analyzer`.
2. **Middleware & i18n (25, 29):** Author `src/middleware.ts` to implement i18n locale parsing linked directly to authentication redirects.
3. **Layout Foundation (21, 22, 23):** Setup `src/app/[locale]/layout.tsx`, `loading.tsx`, and generic `generateMetadata` adhering strictly to App Router streaming specs.
4. **RSC & Pages (24, 27, 28):** Refactor a marketing landing page `src/app/[locale]/page.tsx` entirely as a Server Component, pre-rendered statically, employing `next/image` structures for minimal footprint.
