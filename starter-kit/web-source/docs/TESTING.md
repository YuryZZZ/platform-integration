# Testing Guide
*(Test commands, surface matrix, and Definition of Done)*

## Run Tests

```bash
npm run test                    # Unit tests (Vitest)
npm run test:e2e                # Full Playwright E2E suite
npm run test:e2e:tv             # TV-specific traversal and focus
npm run test:e2e:voice          # Voice baseline path
npm run test:visual             # Visual regression
npm run test:rls                # RLS policy validation
npm run test:integrations       # Integration adapter tests
npm run test:pipeline           # Full site generation pipeline end-to-end
npm run bundle-check            # Bundle budget enforcement
npm run lighthouse-ci           # Lighthouse performance gate
```

## Playwright Surface Matrix

| Suite | Surface | Covers |
|-------|---------|--------|
| `mobile.spec.ts` | Smartphone | Public routes, CTA interaction, voice fallback |
| `desktop.spec.ts` | Desktop | App dashboard, workflow, knowledge base, settings |
| `tv.navigation.spec.ts` | Cinematic | Full D-pad traversal, focus ring always visible, no traps, back nav |
| `tv.dynamic.spec.ts` | Cinematic | Focus recovery after dynamic content load |
| `voice/baseline.spec.ts` | All | MediaRecorder path, push-to-talk, text input fallback |
| `reduced-motion.spec.ts` | All | Motion disabled — static fallbacks confirmed |
| `animation-fallback.spec.ts` | All | `animation-timeline` unavailable — IO fallback confirmed |

## TV Release Certification

Playwright TV coverage is necessary but **not sufficient** for release sign-off.

Every major release candidate must complete:
1. Samsung Tizen emulator / simulator validation
2. LG webOS emulator validation
3. At least one **real-device** validation pass for TV-critical journeys

> Emulator results are directional only. Real-device sign-off is required.

## Definition of Done

A feature is done only when **all** of the following are true:

- [ ] Code compiles with zero type errors (`npm run typecheck`)
- [ ] All unit tests pass (`npm run test`)
- [ ] Playwright E2E passes for all affected surfaces
- [ ] Visual regression shows no unintended changes
- [ ] Bundle budget is within CI hard-fail limits
- [ ] Lighthouse scores meet SLOs for all affected surfaces
- [ ] RLS policies validated if tenant-scoped data touched
- [ ] Accessibility audit passes (WCAG 2.1 AA)
- [ ] Feature flags tested in both enabled and disabled states
- [ ] Documentation updated (DESIGN.md, route map, API docs)
