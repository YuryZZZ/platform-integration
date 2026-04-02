'use client';

/**
 * Product Page — Deep dive into Nexus AI capabilities
 *
 * Created: 2026-03-19T18:23:00Z
 * Refactored: 2026-03-31 — Tailwind only, CSS variables, no inline styles
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare, Mic, GitBranch, BookOpen, Shield, Zap,
  Layers, Code, Database, Cpu, Cloud, Workflow, BrainCircuit, Globe, Lock,
  ArrowRight,
} from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { FeatureGrid } from '@/components/layout/FeatureGrid';
import { CustomerWinCard } from '@/components/layout/CustomerWinCard';
import { CtaBand } from '@/components/layout/CtaBand';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const capabilities = [
  {
    icon: <MessageSquare />,
    title: 'AI Chat',
    description: 'Connect to any LLM provider — OpenAI, Anthropic, or your own fine-tuned models. Stream responses in real-time with full RAG retrieval.',
  },
  {
    icon: <Mic />,
    title: 'Voice Interface',
    description: 'Record, transcribe, and process voice commands in real-time. Our MediaRecorder → STT → AI pipeline delivers sub-second latency.',
  },
  {
    icon: <GitBranch />,
    title: 'Workflow Engine',
    description: 'Build complex multi-step workflows with our drag-and-drop builder. Every step supports retries, conditions, and parallel execution.',
  },
  {
    icon: <BookOpen />,
    title: 'Knowledge Base',
    description: 'Upload documents, websites, or structured data. Our pgvector pipeline generates embeddings automatically.',
  },
  {
    icon: <Shield />,
    title: 'Enterprise Security',
    description: 'Row-level security isolates every tenant. GDPR deletion pipelines ensure compliance. Audit-logged with immutable timestamps.',
  },
  {
    icon: <Zap />,
    title: 'Multi-Surface',
    description: 'One codebase, four surfaces. Nexus detects your device at the edge and transforms the UI — from touch to D-pad.',
  },
];

const integrations = [
  { icon: <Code />, title: 'REST API', description: 'Fully documented API' },
  { icon: <Database />, title: 'PostgreSQL', description: 'ACID compliant' },
  { icon: <Cpu />, title: 'pgvector', description: 'Vector embeddings' },
  { icon: <Cloud />, title: 'Vercel', description: 'Edge deployed' },
  { icon: <Workflow />, title: 'Webhooks', description: 'Real-time events' },
  { icon: <BrainCircuit />, title: 'OpenAI', description: 'GPT-4o ready' },
  { icon: <Globe />, title: 'Multi-CDN', description: 'Global edge cache' },
  { icon: <Lock />, title: 'OAuth 2.0', description: 'Secure auth' },
];

export default function ProductPage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────── */}
      <section className="relative pt-14 pb-10 px-4 sm:pt-20 sm:pb-12 text-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-10"
        />
        <motion.div {...fadeUp} className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] bg-blue-50/10 rounded-full mb-6">
            <Layers size={14} /> Product Overview
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            The complete AI platform{' '}
            <span className="text-gradient">for modern teams</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Six deeply integrated capabilities that work together to give your team
            AI superpowers — from chat to voice to automated workflows.
          </p>
        </motion.div>
      </section>

      {/* ─── Capabilities Deep Dive ───────────── */}
      <Section variant="default" padding="xl">
        <FeatureGrid
          heading="Core Capabilities"
          description="Everything you need to build AI-first applications."
          features={capabilities}
          columns={3}
        />
      </Section>

      {/* ─── Customer Success ─────────────────── */}
      <Section variant="alternate" padding="xl">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <CustomerWinCard
              data={{
                quote: "Nexus allowed us to ship our AI features 5x faster than building them in-house. The workflow builder alone saved us months of engineering time.",
                author: "Elena Rodriguez",
                title: "CTO",
                company: "Frontend Masters",
                metric: "5x",
                metricLabel: "faster time to market"
              }}
            />
          </motion.div>
        </div>
      </Section>

      {/* ─── Integrations ──────────────────────── */}
      <Section variant="default" padding="xl">
        <FeatureGrid
          heading={<>Integrates with your <span className="text-gradient">existing stack</span></>}
          description="Connect Nexus to the tools and services you already use."
          features={integrations}
          columns={4}
        />
      </Section>

      {/* ─── Bottom CTA ────────────────────────── */}
      <Section variant="alternate" padding="xl">
        <motion.div {...fadeUp}>
          <CtaBand
            headline="Start building today"
            description="Free tier includes 1,000 AI requests/month. No credit card required."
            primaryCta={{ label: "Get Started Free", href: "/login" }}
          />
        </motion.div>
      </Section>
    </>
  );
}
  