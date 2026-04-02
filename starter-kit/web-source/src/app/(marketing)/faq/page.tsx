'use client';

import React from 'react';
import { Search } from 'lucide-react';

const categories = [
  {
    title: 'Getting Started',
    items: [
      { question: 'What is Nexus AI?', answer: 'Nexus AI is an intelligent multi-surface platform delivering conversational AI, voice commands, workflow automation, and knowledge base retrieval across smartphone, tablet, desktop, and cinematic displays.' },
      { question: 'How do I get started?', answer: 'Create a free account — you get 1,000 AI requests/month on the Starter plan, no credit card required. The onboarding wizard walks you through your first chat, voice command, and workflow in under 5 minutes.' },
      { question: 'Do I need technical expertise?', answer: 'Not at all. The chat interface and workflow builder are designed for non-technical users. Developers will love the API, custom prompt governance, and advanced workflow scripting.' },
      { question: 'What languages do you support?', answer: 'Nexus AI supports 40+ languages for voice recognition and chat. Infrastructure runs on global CDN with custom data residency on Enterprise plans.' },
    ],
  },
  {
    title: 'Features',
    items: [
      { question: 'What AI models does Nexus support?', answer: 'Multi-model routing — connect OpenAI (GPT-4), Anthropic (Claude 3), or your own fine-tuned models. The AI gateway handles routing, fallbacks, and rate limiting automatically.' },
      { question: 'How does the voice interface work?', answer: 'Push-to-talk recording via MediaRecorder → server-side STT → AI gateway. Sub-second latency in most conditions.' },
      { question: 'What can I automate with workflows?', answer: 'Multi-step sequences with conditions, parallel branches, human-in-the-loop approval gates, scheduled triggers, and webhook integrations. Every step has retry logic and audit logging.' },
      { question: 'How does the knowledge base work?', answer: 'Upload documents (PDF, DOCX, TXT), websites, or structured data. pgvector generates embeddings with HNSW indexing. RAG retrieval finds relevant passages with source citations.' },
    ],
  },
  {
    title: 'Security',
    items: [
      { question: 'Is Nexus AI SOC 2 certified?', answer: 'Yes — SOC 2 Type II certified with annual independent audits. Enterprise customers receive a copy upon request.' },
      { question: 'How do you handle GDPR?', answer: 'Automated deletion pipelines: transcripts purged at 30 days, audit logs at 90 days. Full data export within 48 hours on request.' },
      { question: 'How is my data isolated?', answer: 'Row-level security (RLS) scopes every query to the authenticated tenant. Encryption at rest (AES-256) and in transit (TLS 1.3).' },
      { question: 'Do you support SSO?', answer: 'Yes — SAML-based SSO on Enterprise plans. Supports Okta, Azure AD, Google Workspace, and any SAML 2.0 provider.' },
    ],
  },
  {
    title: 'Billing',
    items: [
      { question: 'Can I try for free?', answer: 'Yes. Starter is free forever (1,000 requests/month). Pro has a 14-day free trial — no credit card required.' },
      { question: 'What if I exceed my limit?', answer: 'Notifications at 80% and 100%. Purchase additional packs ($10/5,000 requests) or upgrade. We never cut off active conversations.' },
      { question: 'Annual billing discounts?', answer: 'Yes — 20% off Pro with annual billing. Contact sales for 10+ seat volume discounts.' },
      { question: 'Can I cancel anytime?', answer: 'Absolutely. No contracts, no fees. Downgrade to Starter and keep your data.' },
    ],
  },
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCategories = searchQuery
    ? categories
        .map(cat => ({
          ...cat,
          items: cat.items.filter(
            item =>
              item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter(cat => cat.items.length > 0)
    : categories;

  return (
    <>
      {/* Hero Section */}
      <section className="py-32 px-4 sm:py-40 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 leading-tight">
            Frequently asked <span className="text-gradient">questions</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
            Everything you need to know about Nexus AI.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xs mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-[var(--color-bg-subtle)]">
        <div className="container-page max-w-2xl mx-auto">
          {filteredCategories.map((category, catIndex) => (
            <div key={category.title} className={catIndex > 0 ? 'mt-12' : ''}>
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)]">{category.title}</h2>
              <div className="space-y-2">
                {category.items.map(item => (
                  <details
                    key={item.question}
                    className="group border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-surface)] hover:bg-opacity-80 transition-colors"
                  >
                    <summary className="flex items-center justify-between w-full px-5 py-4 cursor-pointer font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
                      <span>{item.question}</span>
                      <svg
                        className="w-5 h-5 transition-transform group-open:rotate-180 flex-shrink-0 ml-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </summary>
                    <div className="px-5 py-4 border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-page max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-[var(--color-text)]">Still have questions?</h2>
          <p className="text-[var(--color-text-secondary)] mb-8">Our team responds within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/demo" className="btn btn-primary">
              Contact Us
            </a>
            <a href="/login" className="btn btn-secondary">
              Try It Free
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
