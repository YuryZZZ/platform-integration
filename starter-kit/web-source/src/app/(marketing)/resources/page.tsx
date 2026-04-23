import type { Metadata } from 'next';
import React from 'react';
import { Section } from '@/components/layout/Section';
import { ContentGrid } from '@/components/layout/ContentGrid';
import { Newspaper, ArrowRight, Calendar, Clock } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

export const metadata: Metadata = {
  title: 'Resources & Blog',
  description: 'Guides, tutorials, and the latest news from the Nexus AI team.',
};

const categories = ['All', 'Case Studies', 'Guides', 'News'];

const blogPosts = [
  {
    title: 'Introducing Multi-Surface AI',
    excerpt: 'How Nexus AI adapts across 4 device types to provide a seamless experience.',
    category: 'News',
    readTime: '5 min',
    date: 'Mar 15, 2026',
  },
  {
    title: 'RAG Retrieval Best Practices',
    excerpt: 'Optimize your knowledge base for accurate answers and lower latency.',
    category: 'Guides',
    readTime: '8 min',
    date: 'Mar 10, 2026',
  },
  {
    title: 'Enterprise Security Deep Dive',
    excerpt: 'How we handle RLS, audit trails, and GDPR compliance at scale.',
    category: 'Guides',
    readTime: '12 min',
    date: 'Mar 5, 2026',
  },
  {
    title: 'Global Retailer Scales with Nexus',
    excerpt: 'Case study: How a Fortune 500 retailer automated 70% of customer support.',
    category: 'Case Studies',
    readTime: '10 min',
    date: 'Feb 28, 2026',
  },
  {
    title: 'The Future of Agentic Workflows',
    excerpt: 'Exploring the shift from simple automation to autonomous AI agents.',
    category: 'News',
    readTime: '7 min',
    date: 'Feb 20, 2026',
  },
  {
    title: 'Optimizing Token Usage in LLMs',
    excerpt: 'Practical tips to reduce costs without sacrificing response quality.',
    category: 'Guides',
    readTime: '6 min',
    date: 'Feb 12, 2026',
  },
];

export default function ResourcesPage() {
  return (
    <main>
      {/* ─── Hero Section ──────────────────────── */}
      <section className="py-24 px-4 text-center bg-[var(--color-bg-subtle)]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-gradient">Resources</span> & Insights
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
            Everything you need to master Nexus AI, from deep-dive guides to the latest product updates.
          </p>
        </div>
      </section>

      {/* ─── Filters ───────────────────────────── */}
      <Section variant="default" padding="sm">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                cat === 'All'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Section>

      {/* ─── Blog Grid ─────────────────────────── */}
      <Section variant="default" padding="lg">
        <ContentGrid>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <article
                key={i}
                className="group flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-video bg-[var(--color-bg-subtle)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[var(--color-primary)] text-xs font-bold rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-[var(--color-border)]">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-3 transition-all">
                      Read Article
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ContentGrid>
      </Section>

      {/* ─── Newsletter ────────────────────────── */}
      <Section variant="alternate" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <Newspaper className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Stay updated</h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
            Get the latest guides and product updates delivered straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </Section>
    </main>
  );
}
