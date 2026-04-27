import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { ContentGrid } from '@/components/layout/ContentGrid';
import { Book, Newspaper, ArrowRight, Clock, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Resources & Blog | Nexus AI',
  description: 'Guides, case studies, and news from the Nexus AI team.',
};

const blogPosts = [
  {
    id: 1,
    title: 'Scaling AI Agents in Enterprise Environments',
    excerpt: 'Learn the architectural patterns for deploying autonomous agents across distributed teams.',
    category: 'Guides',
    readTime: '8 min',
    date: 'March 24, 2026',
  },
  {
    id: 2,
    title: 'Acme Corp: 40% Efficiency Gain with Nexus',
    excerpt: 'How one of the world\'s largest retailers transformed their supply chain with voice-enabled AI.',
    category: 'Case Studies',
    readTime: '12 min',
    date: 'March 20, 2026',
  },
  {
    id: 3,
    title: 'Nexus Platform v2.4: Multi-Surface Sync',
    excerpt: 'Introducing seamless handoff between desktop, mobile, and ultra-wide cinematic surfaces.',
    category: 'News',
    readTime: '5 min',
    date: 'March 15, 2026',
  },
  {
    id: 4,
    title: 'The Future of Human-AI Voice Interaction',
    excerpt: 'Deep dive into our latest low-latency speech-to-text engine and natural language understanding.',
    category: 'Guides',
    readTime: '10 min',
    date: 'March 10, 2026',
  },
  {
    id: 5,
    title: 'Security First: RLS and Data Isolation',
    excerpt: 'Why Row-Level Security is the foundation of trust in multi-tenant AI platforms.',
    category: 'Guides',
    readTime: '7 min',
    date: 'March 5, 2026',
  },
  {
    id: 6,
    title: 'Global Expansion: New Edge Regions',
    excerpt: 'Nexus AI is now available in 12 new regions across EMEA and APAC for lower latency.',
    category: 'News',
    readTime: '4 min',
    date: 'March 1, 2026',
  },
];

const categories = ['All', 'Case Studies', 'Guides', 'News'];

export default function ResourcesPage() {
  return (
    <div className="pt-16">
      {/* Hero Header */}
      <section className="py-20 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
        <div className="container-page text-center">
          <Badge variant="outline" className="mb-4">Resources</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Knowledge <span className="text-gradient">Hub</span>
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Deep dives, industry insights, and the latest updates from the Nexus AI team.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 z-20 bg-[var(--color-bg)] border-b border-[var(--color-border)]">
        <div className="container-page py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <Section padding="lg">
        <ContentGrid>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="card group cursor-pointer hover:border-[var(--color-primary)] transition-all duration-300">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-xs text-[var(--color-text-muted)]">
                      <Clock size={12} className="mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border)]">
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">
                      {post.date}
                    </span>
                    <span className="flex items-center text-sm font-semibold text-[var(--color-primary)]">
                      Read More <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContentGrid>
      </Section>

      {/* Newsletter CTA */}
      <Section variant="alternate" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex p-3 rounded-2xl bg-[var(--color-primary)] bg-opacity-10 text-[var(--color-primary)] mb-6">
            <Newspaper size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Stay ahead of the curve</h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
            Subscribe to our monthly newsletter for curated AI research, platform tips, and industry news.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@company.com"
              className="form-input flex-grow"
              required
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap">
              Subscribe Now
            </button>
          </form>
        </div>
      </Section>
    </div>
  );
}
