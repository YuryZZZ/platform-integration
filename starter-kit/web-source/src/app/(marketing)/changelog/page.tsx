import type { Metadata } from 'next';
import React from 'react';
import { Section } from '@/components/layout/Section';
import { ContentGrid } from '@/components/layout/ContentGrid';
import { Rocket, Zap, Bug, GitBranch } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'See what is new in Nexus AI. Latest features, improvements, and bug fixes.',
};

const releases = [
  {
    version: '2.4.0',
    date: 'March 25, 2026',
    headline: 'Agentic Workflows & Multi-Modal Support',
    changes: [
      { type: 'feature', text: 'New autonomous agent nodes in Workflow Builder' },
      { type: 'feature', text: 'Support for GPT-4o and Gemini 1.5 Pro vision capabilities' },
      { type: 'improvement', text: 'Reduced RAG latency by 40% using overlapping semantic chunking' },
      { type: 'fix', text: 'Resolved layout shifting on tablet viewports' },
    ]
  },
  {
    version: '2.3.5',
    date: 'March 10, 2026',
    headline: 'Security Hardening & Team Roles',
    changes: [
      { type: 'feature', text: 'Custom RBAC (Role-Based Access Control) for enterprise teams' },
      { type: 'improvement', text: 'Audit logs now include IP address and user agent metadata' },
      { type: 'improvement', text: 'Enhanced CSRF protection for all API endpoints' },
      { type: 'fix', text: 'Fixed intermittent auth session timeouts' },
    ]
  },
  {
    version: '2.3.0',
    date: 'February 28, 2026',
    headline: 'Voice Engine 2.0',
    changes: [
      { type: 'feature', text: 'Low-latency streaming speech-to-text (STT) via WebSockets' },
      { type: 'feature', text: 'New high-fidelity neural voices for text-to-speech (TTS)' },
      { type: 'improvement', text: 'Auto-detection for 45 additional languages' },
      { type: 'fix', text: 'Corrected echo cancellation issues in mobile browsers' },
    ]
  },
  {
    version: '2.2.0',
    date: 'February 12, 2026',
    headline: 'Universal Model Resolver',
    changes: [
      { type: 'feature', text: 'Switch LLM providers (OpenAI, Anthropic, Google) with a single config' },
      { type: 'improvement', text: 'Standardized token usage reporting across all providers' },
      { type: 'improvement', text: 'Improved fallback logic when primary models are unavailable' },
    ]
  },
  {
    version: '2.1.0',
    date: 'January 30, 2026',
    headline: 'Performance & UX Overhaul',
    changes: [
      { type: 'improvement', text: 'Migrated to Next.js 15 and React 19 for improved hydration speed' },
      { type: 'feature', text: 'Dark mode now supports system preference synchronization' },
      { type: 'fix', text: 'Fixed Z-index issues in the navigation sidebar' },
      { type: 'fix', text: 'Resolved data race condition in Firestore document updates' },
    ]
  }
];

const typeStyles: Record<string, { color: string, icon: any }> = {
  feature: { color: 'text-[var(--color-success)] bg-[var(--color-success)]', icon: Rocket },
  improvement: { color: 'text-blue-500 bg-blue-500', icon: Zap },
  fix: { color: 'text-yellow-500 bg-yellow-500', icon: Bug },
};

export default function ChangelogPage() {
  return (
    <main>
      <section className="py-24 px-4 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
          Changelog
        </h1>
        <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Product updates and technical improvements to the Nexus AI platform.
        </p>
      </section>

      <Section variant="default" padding="lg">
        <ContentGrid>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--color-border)] before:to-transparent">
              {releases.map((release, i) => (
                <div key={release.version} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  {/* Dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-px md:translate-x-0">
                    <GitBranch size={16} />
                  </div>

                  {/* Content */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[var(--color-primary)] px-2 py-1 bg-[var(--color-primary)] bg-opacity-10 rounded-full">
                        v{release.version}
                      </span>
                      <time className="text-sm text-[var(--color-text-muted)] font-medium">
                        {release.date}
                      </time>
                    </div>

                    <h2 className="text-xl font-bold mb-4">{release.headline}</h2>

                    <ul className="space-y-3">
                      {release.changes.map((change, ci) => {
                        const style = typeStyles[change.type];
                        const Icon = style.icon;
                        return (
                          <li key={ci} className="flex items-start gap-3">
                            <span className={`mt-1 flex-shrink-0 w-5 h-5 rounded flex items-center justify-center ${style.color} bg-opacity-10`}>
                              <Icon size={12} />
                            </span>
                            <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                              {change.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentGrid>
      </Section>
    </main>
  );
}
