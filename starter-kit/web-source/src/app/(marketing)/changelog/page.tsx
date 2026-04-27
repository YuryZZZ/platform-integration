import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { ContentGrid } from '@/components/layout/ContentGrid';
import { Badge } from '@/components/ui/Badge';
import { Rocket, Zap, Bug, GitCommit, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Changelog | Nexus AI',
  description: 'The latest updates, improvements, and fixes for the Nexus AI platform.',
};

const releases = [
  {
    version: 'v2.4.0',
    date: 'March 25, 2026',
    headline: 'Multi-Surface Synchronization & Cinematic Layouts',
    changes: [
      { type: 'feature', text: 'Real-time state synchronization across desktop, mobile, and ultra-wide surfaces.' },
      { type: 'improvement', text: 'Enhanced GPU acceleration for cinematic background animations.' },
      { type: 'fix', text: 'Resolved layout shift on TV-mode dashboard grids.' },
    ],
  },
  {
    version: 'v2.3.5',
    date: 'March 10, 2026',
    headline: 'Knowledge Base Expansion & Provider Updates',
    changes: [
      { type: 'feature', text: 'Support for Anthropic Claude 3.5 Sonnet in the AI Gateway.' },
      { type: 'improvement', text: 'Improved RAG retrieval accuracy with semantic re-ranking.' },
      { type: 'improvement', text: 'Added 12 new edge regions for lower API latency.' },
    ],
  },
  {
    version: 'v2.3.0',
    date: 'February 20, 2026',
    headline: 'Voice Interface v2 & Performance Hardening',
    changes: [
      { type: 'feature', text: 'New low-latency WebSocket stream for real-time voice feedback.' },
      { type: 'improvement', text: 'Reduced STT processing time by 30% through parallel chunking.' },
      { type: 'fix', text: 'Fixed memory leak in long-running voice sessions.' },
      { type: 'fix', text: 'Corrected CSS container query compatibility in Safari 16.' },
    ],
  },
  {
    version: 'v2.2.0',
    date: 'February 5, 2026',
    headline: 'Workflow Engine & Audit Trails',
    changes: [
      { type: 'feature', text: 'Visual workflow builder with drag-and-drop step management.' },
      { type: 'feature', text: 'Immutable audit logs for all tenant-level operations.' },
      { type: 'improvement', text: 'Optimized cold-start times for Cloud Run deployments.' },
    ],
  },
  {
    version: 'v2.1.0',
    date: 'January 15, 2026',
    headline: 'Security Hardening & Multi-Tenant RLS',
    changes: [
      { type: 'feature', text: 'Row-Level Security (RLS) enforcement at the database level.' },
      { type: 'improvement', text: 'Enhanced Zod validation for all API ingress points.' },
      { type: 'fix', text: 'Resolved session timeout issues in high-concurrency environments.' },
    ],
  },
];

const getTypeStyles = (type: string) => {
  switch (type) {
    case 'feature':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'improvement':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'fix':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'feature':
      return <Rocket size={14} className="mr-1" />;
    case 'improvement':
      return <Zap size={14} className="mr-1" />;
    case 'fix':
      return <Bug size={14} className="mr-1" />;
    default:
      return <GitCommit size={14} className="mr-1" />;
  }
};

export default function ChangelogPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 border-b border-[var(--color-border)]">
        <div className="container-page">
          <Badge variant="outline" className="mb-4">Changelog</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Platform <span className="text-gradient">Updates</span>
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl">
            Everything new in Nexus AI. We ship updates every week to make your AI operations faster and more secure.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <Section padding="lg">
        <ContentGrid>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-border)] via-[var(--color-border)] to-transparent -translate-x-1/2 hidden sm:block"></div>

            <div className="space-y-16">
              {releases.map((release, index) => (
                <div key={release.version} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 sm:left-1/2 top-2 w-4 h-4 rounded-full bg-[var(--color-primary)] border-4 border-[var(--color-bg)] -translate-x-1/2 z-10 hidden sm:block"></div>

                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 items-start ${index % 2 === 0 ? 'sm:text-right' : ''}`}>
                    {/* Date/Version Info */}
                    <div className={`${index % 2 === 0 ? 'sm:order-1' : 'sm:order-2 sm:text-left'}`}>
                      <div className="flex items-center sm:block gap-3 mb-2 sm:mb-0">
                        <Badge variant="secondary" className="mb-2">{release.version}</Badge>
                        <p className="text-sm font-medium text-[var(--color-text-muted)]">{release.date}</p>
                      </div>
                      <h2 className="text-2xl font-bold mt-2 text-[var(--color-text)]">
                        {release.headline}
                      </h2>
                    </div>

                    {/* Change List */}
                    <div className={`${index % 2 === 0 ? 'sm:order-2 sm:text-left' : 'sm:order-1'}`}>
                      <div className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm hover:shadow-md transition-shadow">
                        <ul className="space-y-4">
                          {release.changes.map((change, cIndex) => (
                            <li key={cIndex} className="flex items-start gap-3">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border mt-1 shrink-0 ${getTypeStyles(change.type)}`}>
                                {getTypeIcon(change.type)}
                                {change.type}
                              </span>
                              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                {change.text}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentGrid>
      </Section>

      {/* Subscribe Footer */}
      <Section variant="alternate" padding="lg">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Never miss an update</h3>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Get the Nexus AI changelog delivered to your inbox every month.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input type="email" placeholder="you@company.com" className="form-input" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </Section>
    </div>
  );
}
