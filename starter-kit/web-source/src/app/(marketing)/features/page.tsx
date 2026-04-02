/**
 * Features Page — /features
 * Marketing features page with detailed capability showcase.
 */

import Link from 'next/link';
import type { Metadata } from 'next';
import { FileText, Copy, Newspaper, Bot, Zap, Mic, Home, Globe, Plug } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features — Nexus AI',
  description: 'Explore the full capabilities of Nexus AI: headless CMS, AI chat, workflow automation, property portals, and multi-site management.',
};

const featureCategories = [
  {
    category: 'Content Management',
    items: [
      {
        icon: FileText,
        title: 'Headless CMS',
        desc: 'Payload CMS v3 with PostgreSQL backend. Block-based page builder, rich text editor, media library, and SEO tools.',
        details: ['Block-based editors', 'Multi-language support', 'Version history', 'Draft & publish workflow'],
      },
      {
        icon: Copy,
        title: 'Bulk Page Generation',
        desc: 'Generate thousands of location, service, or listing pages from CSV/JSON data feeds automatically.',
        details: ['Template-based generation', 'Data feed import (CSV/JSON/API)', 'SEO meta auto-generation', 'Scheduled publishing'],
      },
      {
        icon: Newspaper,
        title: 'Blog Engine',
        desc: 'Full blog with categories, tags, author profiles, and AI-assisted content creation.',
        details: ['AI content drafting', 'Scheduled posts', 'RSS/Atom feed', 'Social sharing'],
      },
    ],
  },
  {
    category: 'AI & Automation',
    items: [
      {
        icon: Bot,
        title: 'AI Chat Assistant',
        desc: 'Multi-model AI (OpenAI, Anthropic, Google) trained on your content. Customer support 24/7.',
        details: ['RAG with pgvector', 'Multi-model routing', 'Conversation history', 'Handoff to human'],
      },
      {
        icon: Zap,
        title: 'Workflow Automation',
        desc: 'Event-driven automation for content, leads, emails, and CRM sync.',
        details: ['Visual workflow builder', 'Trigger-action patterns', 'Webhook support', 'Error recovery'],
      },
      {
        icon: Mic,
        title: 'Voice Interface',
        desc: 'Speech-to-text, text-to-speech, and voice-guided page creation.',
        details: ['Whisper transcription', 'Multi-language TTS', 'Voice commands', 'Accessibility mode'],
      },
    ],
  },
  {
    category: 'Portal & Sites',
    items: [
      {
        icon: Home,
        title: 'Property Portal',
        desc: 'Full listing management: search, filters, maps, virtual tours, lead capture.',
        details: ['Advanced search & filtering', 'Google Maps integration', 'Virtual tour embeds', 'Agent dashboard'],
      },
      {
        icon: Globe,
        title: 'Multi-Site',
        desc: 'Manage multiple brands and domains from one dashboard with tenant isolation.',
        details: ['Custom domains per site', 'Isolated data per tenant', 'Shared component library', 'White-label ready'],
      },
      {
        icon: Plug,
        title: 'Integrations Hub',
        desc: 'Connect GitHub, Firebase Studio, Google Stitch, Lovable, and 20+ other services.',
        details: ['GitHub CI/CD', 'Firebase Auth & Hosting', 'Stitch AI design', 'Lovable app builder'],
      },
    ],
  },
];

function FeatureCard({ icon: Icon, title, desc, details }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  details: string[];
}) {
  return (
    <div className="card p-6 sm:p-8 flex flex-col h-full">
      <div className="mb-4">
        <Icon className="w-10 h-10 text-[var(--color-primary)]" />
      </div>

      <h3 className="text-xl font-semibold mb-3 text-[var(--color-text)]">
        {title}
      </h3>

      <p className="mb-5 flex-grow text-[var(--color-text-secondary)]">
        {desc}
      </p>

      <ul className="space-y-2">
        {details.map((detail) => (
          <li key={detail} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
            <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-page text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full text-sm font-medium bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]">
            🔧 Platform Capabilities
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[var(--color-text)]">
            Everything You Need<br />
            <span className="text-gradient">In One Platform</span>
          </h1>

          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 text-[var(--color-text-secondary)]">
            From a small construction marketing site to a property portal with millions of pages — Nexus AI scales with you.
          </p>
        </div>
      </section>

      {/* Features by Category */}
      {featureCategories.map((category) => (
        <section key={category.category} className="section-padding border-b border-[var(--color-border)]">
          <div className="container-page">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[var(--color-text)]">
              {category.category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {category.items.map((item) => (
                <FeatureCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                  details={item.details}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="section-padding bg-[var(--color-bg-subtle)]">
        <div className="container-page text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--color-text)]">
            Ready to Build Something Amazing?
          </h2>

          <p className="text-lg mb-8 max-w-2xl mx-auto text-[var(--color-text-secondary)]">
            Start with a free trial. Scale as you grow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register" className="btn btn-primary btn-lg w-full sm:w-auto">
              Start Free Trial
            </Link>
            <Link href="/contact" className="btn btn-secondary btn-lg w-full sm:w-auto">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}