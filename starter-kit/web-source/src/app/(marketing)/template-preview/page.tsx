/**
 * Template Preview — Live demo of all content blocks
 * Shows every block type rendered with sample data.
 * This page serves as both a demo and a testing ground for the template system.
 * 
 * Created: 2026-03-20T10:35:00Z
 */

'use client';

import React, { useState } from 'react';
import { PageRenderer } from '@/components/blocks/ContentBlocks';
import { DesignTokenProvider, presetThemes } from '@/lib/design-tokens/DesignTokenProvider';
import type { ContentBlock } from '@/components/blocks/ContentBlocks';
import type { DesignTokens } from '@/lib/design-tokens/DesignTokenProvider';

/* ─────────────────────────────────────────────────────────── */
/*  Sample Data — all block types                              */
/* ─────────────────────────────────────────────────────────── */

const sampleBlocks: ContentBlock[] = [
  {
    type: 'hero',
    badge: 'Now in Public Beta',
    headline: 'Build stunning websites with',
    highlightedText: 'zero friction.',
    subheadline: 'The ultimate website platform template. Clone it, configure it in the CMS, and ship a production-grade site in minutes — not months.',
    primaryCta: { label: 'Get Started Free', href: '#' },
    secondaryCta: { label: 'Watch Demo', href: '#' },
    backgroundVariant: 'mesh',
    alignment: 'center',
  },
  {
    type: 'logoCloud',
    label: 'Trusted by teams at',
    logos: [
      { name: 'Vercel' }, { name: 'Stripe' }, { name: 'Shopify' },
      { name: 'Linear' }, { name: 'Notion' }, { name: 'Figma' },
    ],
  },
  {
    type: 'featureGrid',
    label: 'Capabilities',
    title: 'Everything you need, nothing you don\'t.',
    subtitle: 'A complete toolkit to build, manage, and scale any website — from a single template.',
    columns: 3,
    features: [
      { icon: 'sparkles', title: 'AI-Powered Content', description: 'Generate pages, copy, and SEO metadata using built-in AI workflows.', color: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
      { icon: 'shield', title: 'Enterprise Security', description: 'Role-based access, audit logs, SSO — security that scales with your team.', color: 'linear-gradient(135deg, #059669, #10b981)' },
      { icon: 'zap', title: 'Blazing Performance', description: 'Static generation, edge caching, and optimized bundles deliver sub-second loads.', color: 'linear-gradient(135deg, #d97706, #f59e0b)' },
      { icon: 'globe', title: 'Multi-Site Ready', description: 'One codebase, unlimited sites. Each with its own theme, content, and domain.', color: 'linear-gradient(135deg, #0891b2, #06b6d4)' },
      { icon: 'code', title: 'Developer-First CMS', description: 'Typed collections, REST + GraphQL APIs, and local dev with hot reload.', color: 'linear-gradient(135deg, #ec4899, #f472b6)' },
      { icon: 'chart', title: 'Built-in Analytics', description: 'Track visitors, page views, conversions — all without third-party scripts.', color: 'linear-gradient(135deg, #7c3aed, #a78bfa)' },
    ],
  },
  {
    type: 'stats',
    items: [
      { value: '10', suffix: '+', label: 'Block Types' },
      { value: '6', label: 'Preset Themes' },
      { value: '<1', suffix: 's', label: 'Page Loads' },
      { value: '100', suffix: '%', label: 'CMS-Driven' },
    ],
  },
  {
    type: 'content',
    layout: 'text-only',
    title: 'One template. Any website.',
    body: '<p>The Nexus AI template system is built around <strong>reusable content blocks</strong> that are assembled by the CMS. Each block is a self-contained UI component with its own styling, animations, and responsive behavior.</p><p>Change the <strong>design tokens</strong> in the CMS to re-theme the entire site — colors, fonts, spacing, and motion — without touching a single line of code. Switch between preset themes or create your own.</p>',
  },
  {
    type: 'divider',
    variant: 'gradient',
  },
  {
    type: 'testimonials',
    label: 'What People Say',
    title: 'Loved by builders worldwide.',
    items: [
      { quote: 'We shipped our marketing site in 2 days instead of 2 months. The block system is incredibly flexible.', author: 'Sarah Chen', role: 'CTO', company: 'TechCorp', rating: 5 },
      { quote: 'Finally, a template that doesn\'t look like a template. The design quality is exceptional.', author: 'Marcus Rivera', role: 'Design Lead', company: 'Pixel Studio', rating: 5 },
      { quote: 'The CMS-driven theming is a game changer. We manage 12 client sites from one repo.', author: 'Aisha Patel', role: 'Agency Owner', company: 'Digital Forge', rating: 5 },
    ],
  },
  {
    type: 'pricing',
    label: 'Pricing',
    title: 'Start free. Scale when ready.',
    subtitle: 'No credit card required. Upgrade anytime.',
    plans: [
      {
        name: 'Starter',
        price: '$0',
        period: 'mo',
        description: 'Perfect for personal projects',
        features: ['1 website', '5 pages', 'Community support', 'Basic analytics'],
        cta: { label: 'Get Started', href: '#' },
      },
      {
        name: 'Pro',
        price: '$29',
        period: 'mo',
        description: 'For teams and growing businesses',
        features: ['Unlimited websites', 'Unlimited pages', 'Priority support', 'Advanced analytics', 'Custom domains', 'AI content generation'],
        cta: { label: 'Start Pro Trial', href: '#' },
        featured: true,
        badge: 'Most Popular',
      },
      {
        name: 'Enterprise',
        price: '$99',
        period: 'mo',
        description: 'For agencies and large teams',
        features: ['Everything in Pro', 'SSO / SAML', 'Dedicated support', 'Custom integrations', 'SLA guarantee', 'White-label'],
        cta: { label: 'Contact Sales', href: '#' },
      },
    ],
  },
  {
    type: 'faq',
    label: 'FAQ',
    title: 'Questions? Answered.',
    items: [
      { question: 'How does the template system work?', answer: 'The template uses content blocks — reusable UI components configured via the CMS. You assemble pages by stacking blocks, and the system renders them with your design tokens applied.' },
      { question: 'Can I use this for client projects?', answer: 'Absolutely. The template is designed for agencies. Clone the repo, configure the CMS for your client, and deploy. Each client gets their own theme and content while sharing the same codebase.' },
      { question: 'What CMS does this use?', answer: 'Payload CMS v3, which runs alongside Next.js. It supports typed collections, REST + GraphQL APIs, role-based access, and local development with hot reload.' },
      { question: 'Can I customise the blocks?', answer: 'Yes. Each block is a standard React component with its own CSS. You can modify existing blocks or create entirely new ones. The BlockRenderer automatically picks up new block types.' },
      { question: 'Is it SEO-friendly?', answer: 'Very. Pages are statically generated with proper meta tags, Open Graph images, structured data, and semantic HTML. The CMS has built-in SEO fields for every page.' },
    ],
  },
  {
    type: 'cta',
    title: 'Ready to build something amazing?',
    subtitle: 'Start free. No credit card. Ship in minutes.',
    primaryCta: { label: 'Start Building', href: '#' },
    secondaryCta: { label: 'Read the Docs', href: '#' },
  },
];

/* ─────────────────────────────────────────────────────────── */
/*  Theme Selector Bar                                         */
/* ─────────────────────────────────────────────────────────── */

const themeNames = Object.keys(presetThemes);

function ThemeBar({
  active,
  onChange,
}: {
  active: string;
  onChange: (name: string) => void;
}) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      background: 'rgba(15, 23, 42, 0.9)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    }}>
      <span style={{
        fontSize: '0.6875rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase' as const,
        color: 'rgba(148, 163, 184, 0.6)',
        alignSelf: 'center',
        marginRight: '0.5rem',
      }}>
        Theme:
      </span>
      {themeNames.map((name) => (
        <button
          key={name}
          onClick={() => onChange(name)}
          style={{
            padding: '0.375rem 0.875rem',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'capitalize' as const,
            transition: 'all 0.2s',
            color: active === name ? 'white' : 'rgba(148, 163, 184, 0.8)',
            background: active === name ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Main Preview Page                                          */
/* ─────────────────────────────────────────────────────────── */

export default function TemplatePreviewPage() {
  const [activeTheme, setActiveTheme] = useState('nexus');

  const tokens: Partial<DesignTokens> = presetThemes[activeTheme] || {};

  return (
    <DesignTokenProvider tokens={tokens} scope="root">
      <PageRenderer blocks={sampleBlocks} />
      <ThemeBar active={activeTheme} onChange={setActiveTheme} />
    </DesignTokenProvider>
  );
}
