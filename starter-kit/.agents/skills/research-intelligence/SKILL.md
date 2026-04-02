---
name: research-intelligence
description: Phase 1 of the autonomous loop. Runs competitor analysis, best-practice scanning, and security advisory checks. Outputs structured intelligence into docs/ and creates action tasks.
---

# Research Intelligence Skill

## Purpose
Feed the autonomous loop with fresh intelligence. Runs at the start of every loop cycle. Finds what should be built next based on market signals, competitor moves, and security advisories.

---

## Research Sources (in priority order)

| Source | Tool | Frequency |
|--------|------|-----------|
| Competitor sites | `read_url_content` | Every loop cycle |
| Best practices | `search_web` | Every loop cycle |
| Security advisories | `search_web` + `npm audit` | Every loop cycle |
| Google dev docs | Firebase MCP search | On-demand |
| Design trends | `search_web` | Weekly |

---

## Step 1 — Load Research Targets

```
1. Read docs/COMPETITOR_RESEARCH.md → extract competitor URLs from the "Targets" section
   If file doesn't exist: create it with the template below

2. Read docs/PROJECT_SPEC.md → extract:
   - Product category / industry
   - Target audience
   - Key differentiators
```

**COMPETITOR_RESEARCH.md Template** (create if missing):
```markdown
# Competitor Research

**Project:** [from PROJECT_SPEC]
**Last Updated:** [ISO date]

## Research Targets

### Competitors
| URL | What to Extract |
|-----|----------------|
| https://competitor1.com | Pricing, hero messaging, CTA text |
| https://competitor2.com | Feature list, social proof, trust signals |
| https://competitor3.com | UX patterns, navigation, onboarding flow |

### Industry Blogs
| URL | What to Watch |
|-----|--------------|
| https://blog.example.com | New techniques, framework updates |

## Intelligence Log
[entries added by Antigravity on each research cycle]
```

---

## Step 2 — Scrape Competitors

For each competitor URL:

```javascript
// Use read_url_content (fast, no JS needed for most marketing sites):
read_url_content({ url: "https://competitor.com" })
read_url_content({ url: "https://competitor.com/pricing" })
read_url_content({ url: "https://competitor.com/features" })
```

Extract and record:
- Hero headline + subheadline (what problem do they claim to solve?)
- Primary CTA text (what action do they push?)
- Pricing model (free tier? per seat? usage-based?)
- Key features list
- Trust signals (logos, testimonials, numbers)
- Any recent changes vs last research cycle

---

## Step 3 — Scan for Best Practices

```javascript
search_web({ 
  query: `[product category] best practices [current year] site:blog.logrocket.com OR site:web.dev OR site:smashingmagazine.com`
})

search_web({
  query: `Next.js 15 performance optimization [current year]`
})

search_web({
  query: `Firebase Firestore security rules best practices [current year]`
})
```

---

## Step 4 — Security Advisory Scan

```powershell
# Check for vulnerabilities in current dependencies:
npm audit --json | head -100

# Search for critical CVEs in the stack:
search_web({ query: "Next.js security vulnerability CVE [current month]" })
search_web({ query: "Firebase security advisory [current month]" })
```

---

## Step 5 — Record Intelligence

Append findings to `docs/COMPETITOR_RESEARCH.md`:

```markdown
## Research Cycle — [ISO date]

### Competitor Intelligence
| Competitor | Finding | Action Item |
|-----------|---------|-------------|
| competitor1.com | Changed hero to "Build faster with AI" — more urgent CTA | Review our hero copy |
| competitor2.com | Added free tier — no CC required | Consider free tier strategy |

### Best Practice Findings
- [finding 1 — with source URL]
- [finding 2]

### Security Advisories
- [none found / or: CVE-XXXX-XXXXX — update package X from Y to Z]

### Recommended Actions
1. [action 1 — will become TASK-NNN]
2. [action 2]
```

---

## Step 6 — Create Action Tasks

For each "Recommended Action", create a TASK file:

```markdown
# TASK-[NNN]: [action title]

**Status:** PLAN
**Phase:** RESEARCH output
**Priority:** HIGH | MEDIUM | LOW
**Source:** research-intelligence cycle [date]
**Skill:** [stitch-design | lovable-scaffold | firebase-wire | etc]

## Goal
[What to implement based on the research finding]

## Context
[Quote the specific finding from COMPETITOR_RESEARCH.md]
```

---

## Research Frequency

The loop runs research automatically. To force a research cycle:
- User types "research" → immediately run Steps 1-6
- Every 5 loop cycles, force a full research pass regardless
- Store cycle count in `docs/CURRENT_STATUS.md` under `Loop Cycle Count`

---

## Intelligence Score

After each research cycle, score each competitor 1-10 on:
- Design quality
- Feature completeness  
- SEO / discoverability
- Pricing competitiveness

Track the scores over time in `docs/COMPETITOR_RESEARCH.md` to spot trends.
