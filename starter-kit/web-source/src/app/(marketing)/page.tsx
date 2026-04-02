/**
 * Homepage — Nexus Design Template
 * Clean, modern SaaS landing page. Token-driven, responsive, light/dark ready.
 */

import {
  Sparkles, Shield, Zap, Globe, ArrowRight,
  Layers, BarChart3, Lock, CheckCircle2, Star,
} from 'lucide-react';

/* ──────────────────────────────── Data ──────────────────────────────── */

const STATS = [
  { value: '55+', label: 'UI Components' },
  { value: '13', label: 'Pages Ready' },
  { value: '4', label: 'Surface Types' },
  { value: '100%', label: 'Accessible' },
];

const FEATURES = [
  {
    icon: Layers,
    title: 'Multi-Surface Design',
    desc: 'Adaptive layouts for smartphone, tablet, desktop, and cinematic displays. One codebase, every screen.',
  },
  {
    icon: Zap,
    title: 'Blazing Fast',
    desc: 'Built on Next.js 15 with React 19 and Turbopack. Sub-second page loads with optimized bundling.',
  },
  {
    icon: Shield,
    title: 'Enterprise Ready',
    desc: 'Built-in accessibility, WCAG compliance, and security best practices. Ship with confidence.',
  },
  {
    icon: Globe,
    title: 'Token-Driven Theming',
    desc: 'Swap colors, fonts, and radii through CSS variables. Re-skin the entire template in minutes.',
  },
  {
    icon: BarChart3,
    title: 'Full Component Library',
    desc: '55+ production-ready components — buttons, modals, cards, forms, tables, and more.',
  },
  {
    icon: Lock,
    title: 'TypeScript First',
    desc: 'Strict TypeScript throughout. Full type safety, IntelliSense, and zero runtime surprises.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Nexus saved us weeks of design work. The component library is incredibly polished.',
    name: 'Sarah Chen',
    role: 'Head of Product',
    company: 'Acme Corp',
    stars: 5,
  },
  {
    quote: 'The multi-surface system is exactly what we needed. Our TV app and mobile site share one codebase.',
    name: 'Marcus Rivera',
    role: 'CTO',
    company: 'StreamLine',
    stars: 5,
  },
  {
    quote: 'Clean, well-structured, and easy to customize. The token system makes re-branding effortless.',
    name: 'Anya Patel',
    role: 'Design Lead',
    company: 'Forge Studio',
    stars: 5,
  },
];

const STACK = [
  'Next.js 15', 'React 19', 'TypeScript 5', 'Tailwind CSS 4',
  'Framer Motion', 'Zod', 'Lucide Icons', 'Vitest',
];

/* ──────────────────────────────── Page ──────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="container-page text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-xs font-medium text-[var(--color-text-secondary)] mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            Production-ready template
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-fade-in-up">
            Build beautiful portals,{' '}
            <span className="text-gradient">ship faster</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            A modern, multi-surface web portal template with 55+ components,
            13 ready-made pages, and a token-driven design system that adapts
            to any brand.
          </p>

          {/* CTA pair */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <a href="/demo" className="btn btn-primary btn-lg gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/features" className="btn btn-secondary btn-lg">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="pb-16">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="text-center p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)]"
              >
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-primary)] mb-1">
                  {s.value}
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 sm:py-20 bg-[var(--color-bg-subtle)]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything you need to ship
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              A complete design system and page collection, built with modern
              tools and best practices.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="card group">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-light)] flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="section-padding">
        <div className="container-page text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-3">Built with the modern stack</h2>
          <p className="text-[var(--color-text-muted)] mb-10">
            Industry-standard tools, zero compromise.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {STACK.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-sm font-medium text-[var(--color-text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-20 bg-[var(--color-bg-subtle)]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Loved by teams
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              Hear from teams who shipped faster with the Nexus template.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card flex flex-col">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto p-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to build?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Clone the template, swap the tokens, and start shipping.
              No vendor lock-in, no recurring fees.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/demo" className="btn btn-primary btn-lg gap-2">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/pricing" className="btn btn-secondary btn-lg">
                View Pricing
              </a>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
                Free to start
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
                MIT License
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
                Full source code
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
