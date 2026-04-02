'use client';

/**
 * Resources Page — Documentation, API, tutorials, and blog
 *
 * Created: 2026-03-19T18:23:00Z
 * Refactored: 2026-03-31 — Tailwind only, CSS variables, no inline styles
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Video, ExternalLink, Newspaper } from 'lucide-react';
import { Section } from '@/components/layout/Section';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const resourceSections = [
  {
    icon: Book,
    title: 'Documentation',
    desc: 'Comprehensive guides for every feature',
    items: [
      { title: 'Getting Started Guide', desc: 'Set up your account and first workflow in 5 minutes', tag: 'Beginner' },
      { title: 'AI Chat Integration', desc: 'Multi-model routing, streaming, and RAG retrieval', tag: 'Feature' },
      { title: 'Voice Interface Setup', desc: 'Push-to-talk configuration and language support', tag: 'Feature' },
      { title: 'Workflow Builder Guide', desc: 'Visual builder, conditions, retries, and approvals', tag: 'Feature' },
    ],
  },
  {
    icon: Code,
    title: 'API Reference',
    desc: 'REST API documentation with examples',
    items: [
      { title: 'Authentication API', desc: 'JWT tokens, session management, and SSO', tag: 'Auth' },
      { title: 'Chat API', desc: 'Send messages, stream responses, manage conversations', tag: 'AI' },
      { title: 'Knowledge Base API', desc: 'Upload docs, query embeddings, manage sources', tag: 'AI' },
      { title: 'Workflows API', desc: 'Create, execute, and monitor workflows', tag: 'Core' },
    ],
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    desc: 'Watch and learn from step-by-step walkthroughs',
    items: [
      { title: 'Platform Overview', desc: '10-minute tour of all Nexus AI capabilities', tag: '10 min' },
      { title: 'Building Your First Workflow', desc: 'Drag-and-drop workflow creation tutorial', tag: '8 min' },
      { title: 'Voice Command Setup', desc: 'Configure voice interface for your team', tag: '5 min' },
      { title: 'Enterprise Security Deep Dive', desc: 'RLS, audit trails, and GDPR compliance', tag: '15 min' },
    ],
  },
];

const blogPosts = [
  { title: 'Introducing Multi-Surface AI', desc: 'How Nexus adapts across 4 device types', date: 'Mar 15, 2026', tag: 'Product' },
  { title: 'RAG Retrieval Best Practices', desc: 'Optimize your knowledge base for accurate answers', date: 'Mar 10, 2026', tag: 'Engineering' },
  { title: 'SOC 2 Type II: Our Journey', desc: 'What we learned getting SOC 2 certified', date: 'Mar 5, 2026', tag: 'Security' },
];

export default function ResourcesPage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────── */}
      <section className="py-32 px-4 sm:py-20 text-center">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            <span className="text-gradient">Resources</span> & learning
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Guides, tutorials, and references to help you get the most out of Nexus AI.
          </p>
        </motion.div>
      </section>

      {/* ─── Resource Sections ──────────────────── */}
      {resourceSections.map((sec, si) => (
        <Section key={sec.title} variant={si % 2 === 0 ? 'default' : 'alternate'} padding="lg">
          <div className="feature">
            <motion.div {...fadeUp} className="flex items-center gap-3 mb-6">
              <sec.icon size={24} className="text-[var(--color-primary)] flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold">{sec.title}</h2>
                <p className="text-sm text-[var(--color-text-secondary)]">{sec.desc}</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sec.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                  className="p-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] cursor-pointer hover:shadow-md transition-shadow flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2 py-1 rounded-full">
                      {item.tag}
                    </span>
                    <ExternalLink size={14} className="text-[var(--color-text-muted)]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--color-text)]">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      ))}

      {/* ─── Blog Section ──────────────────────── */}
      <Section variant="default" padding="xl">
        <div className="feature">
          <motion.div {...fadeUp} className="flex items-center gap-3 mb-6">
            <Newspaper size={24} className="text-[var(--color-primary)] flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold">Latest from the blog</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">Product updates, engineering insights, and best practices</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="p-6 bg-[var(--color-bg-subtle)] rounded-xl border border-[var(--color-border)] cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold text-[var(--color-primary)]">
                    {post.tag}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {post.date}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--color-text)] mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {post.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
