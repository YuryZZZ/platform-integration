/**
 * Marketing Layout — Nexus Design Template
 * Clean header + footer using CSS variables for easy re-skinning.
 * Fully responsive. No inline styles.
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Nexus — Modern Web Portal Template',
    template: '%s | Nexus',
  },
  description:
    'A beautifully crafted, multi-surface web portal template. Built with Next.js 15, Tailwind CSS 4, and a token-driven design system.',
  openGraph: {
    title: 'Nexus — Modern Web Portal Template',
    description:
      'Ship faster with a production-ready template featuring 55+ components, 13 pages, and full dark mode support.',
    siteName: 'Nexus',
    type: 'website',
  },
};

/* ────────────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Customers', href: '/customers' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
];

const FOOTER_COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Surfaces', href: '/surfaces' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/resources' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Customers', href: '/customers' },
      { label: 'Demo', href: '/demo' },
    ],
  },
];

/* ────────────────────────────────────────────────────────── */

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5 group">
      <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center shadow-sm">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <span className="text-lg font-extrabold tracking-tight text-[var(--color-text)]"
        style={{ fontFamily: 'var(--font-display)' }}>
        Nexus
      </span>
    </a>
  );
}

function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 flex items-center border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-lg">
      <div className="container-page w-full flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3.5 py-2 rounded-md text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="hidden sm:inline-flex px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            Contact
          </a>
          <a
            href="/demo"
            className="btn btn-primary"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
      <div className="container-page py-16">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand col */}
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)] max-w-xs">
              A modern, multi-surface web portal template. Built for teams that
              ship fast and care about design.
            </p>
          </div>

          {/* Link cols */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-[var(--color-border)]">
          <span className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} Nexus. All rights reserved.
          </span>
          <div className="flex gap-6">
            {['Privacy', 'Terms'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────────────────── */

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
