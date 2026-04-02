'use client';

/**
 * Customers Page — Social proof and success stories
 *
 * Created: 2026-03-19T18:23:00Z
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowRight, Star, TrendingUp, Clock, Users } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const stats = [
  { value: '500+', label: 'Companies', icon: Users },
  { value: '10M+', label: 'AI Requests/Month', icon: TrendingUp },
  { value: '99.97%', label: 'Uptime', icon: Clock },
  { value: '4.9/5', label: 'Satisfaction', icon: Star },
];

const testimonials = [
  {
    quote: 'Nexus AI replaced three separate tools for us. The multi-surface experience means our field teams use the same workflows on their phones as our analysts do on desktop.',
    author: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'TechFlow Solutions',
    initials: 'SC',
  },
  {
    quote: 'The workflow engine saved our operations team 40 hours per week. The audit trail gives compliance everything they need without us lifting a finger.',
    author: 'Marcus Rivera',
    role: 'Head of Operations',
    company: 'DataForge Inc',
    initials: 'MR',
  },
  {
    quote: 'Deploying to our conference room displays was seamless — the cinematic surface mode just worked. Our clients are always impressed by the 10-foot UI.',
    author: 'Elena Kowalski',
    role: 'Director of Client Success',
    company: 'Meridian Consulting',
    initials: 'EK',
  },
  {
    quote: 'We evaluated five AI platforms. Nexus was the only one with proper tenant isolation and GDPR deletion built in. Security isn\'t an afterthought here.',
    author: 'James O\'Brien',
    role: 'CISO',
    company: 'FinGuard Capital',
    initials: 'JO',
  },
  {
    quote: 'The voice interface changed how our warehouse team interacts with the system. Hands-free operation with real-time transcription — it\'s the future.',
    author: 'Ana Petrova',
    role: 'CTO',
    company: 'LogiChain Systems',
    initials: 'AP',
  },
  {
    quote: 'Knowledge base search is incredible. Our support team finds answers in seconds instead of minutes. RAG retrieval with source citations means they trust the results.',
    author: 'David Park',
    role: 'Support Director',
    company: 'CloudHarbor',
    initials: 'DP',
  },
];

const caseStudies = [
  {
    company: 'TechFlow Solutions',
    industry: 'SaaS',
    stat: '3x faster',
    detail: 'Customer onboarding with AI-powered workflow automation',
  },
  {
    company: 'FinGuard Capital',
    industry: 'Finance',
    stat: '40h/week saved',
    detail: 'Compliance reporting through automated audit trails',
  },
  {
    company: 'LogiChain Systems',
    industry: 'Logistics',
    stat: '95% accuracy',
    detail: 'Voice command recognition for warehouse operations',
  },
];

const avatarColors = [
  'bg-indigo-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-amber-500',
];

export default function CustomersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 text-center bg-[color:var(--color-surface)]">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
            Trusted by <span className="text-gradient">industry leaders</span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed text-[color:var(--color-text-secondary)]">
            From startups to enterprises, teams choose Nexus AI to power
            their AI-driven workflows.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-[color:var(--color-bg-subtle)]">
        <div className="container-page section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <stat.icon size={24} className="text-[color:var(--color-primary)] mb-2 mx-auto" />
                <div className="text-3xl sm:text-4xl font-black tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-[color:var(--color-text-muted)] mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[color:var(--color-surface)]">
        <div className="container-page section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              What our customers <span className="text-gradient">say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="card p-6 flex flex-col gap-4"
              >
                <Quote size={24} className="text-[color:var(--color-primary-light)] opacity-60" />
                <p className="text-sm leading-relaxed text-[color:var(--color-text-secondary)] flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${avatarColors[i % avatarColors.length]}`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.author}</div>
                    <div className="text-xs text-[color:var(--color-text-muted)]">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-[color:var(--color-bg-subtle)]">
        <div className="container-page section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Case <span className="text-gradient">studies</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-8 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-xs font-semibold text-[color:var(--color-primary)] uppercase tracking-wider mb-2">
                  {cs.industry}
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {cs.company}
                </h3>
                <div className="text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                  {cs.stat}
                </div>
                <p className="text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
                  {cs.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[color:var(--color-surface)]">
        <div className="container-page section-padding">
          <motion.div
            {...fadeUp}
            className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[color:var(--color-primary)] to-purple-600 text-center flex flex-col items-center gap-4"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Join 500+ companies using Nexus AI
            </h2>
            <a
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold bg-white text-[color:var(--color-primary)]"
            >
              Start Free <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
