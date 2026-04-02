'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Zap, Users, Globe, ArrowRight } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } };

const values = [
  { icon: Target, title: 'User-First', desc: 'Every feature starts with a real user problem. We ship solutions, not technology for technology\'s sake.' },
  { icon: Heart, title: 'Craft', desc: 'We obsess over details — from sub-100ms focus transitions on TV to pixel-perfect spacing on mobile.' },
  { icon: Zap, title: 'Speed', desc: 'Performance is a feature. We maintain strict budgets: <1.5s LCP, <200ms INP, <120KB route JS.' },
  { icon: Users, title: 'Inclusion', desc: 'WCAG 2.1 AA compliance isn\'t a checkbox — it\'s in our DNA. Every surface, every interaction.' },
];

const teamStats = [
  { value: '30+', label: 'Engineers' },
  { value: '12', label: 'Countries' },
  { value: '4', label: 'Surfaces supported' },
  { value: '99.97%', label: 'Uptime' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
            Building the future of <span className="text-gradient">adaptive AI</span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed text-[color:var(--color-text-secondary)] max-w-2xl mx-auto">
            We believe AI should meet you where you are — on any screen, in any context,
            with enterprise-grade security you can trust.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-[color:var(--color-bg-subtle)]">
        <div className="container-page section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {teamStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
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

      {/* Values Section */}
      <section className="bg-[color:var(--color-surface)]">
        <div className="container-page section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Our <span className="text-gradient">values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="card p-6 flex flex-col gap-3"
              >
                <v.icon size={28} className="text-[color:var(--color-primary)]" />
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-[color:var(--color-text-secondary)] flex-1">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-[color:var(--color-bg-subtle)]">
        <div className="container-page section-padding">
          <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Our mission
              </h2>
              <p className="text-[color:var(--color-text-secondary)] leading-relaxed mb-4">
                AI is transforming how people work — but most AI tools only work on desktop browsers. We&apos;re building Nexus AI so that intelligent assistance is available on <em>every screen</em> in your life.
              </p>
              <p className="text-[color:var(--color-text-secondary)] leading-relaxed">
                Whether you&apos;re on a construction site with your phone, presenting in a boardroom on a smart TV, or deep in analysis at your desk — Nexus adapts the experience to match your context, your device, and your workflow.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Globe size={160} className="text-[color:var(--color-primary-light)] opacity-40" />
            </div>
          </motion.div>
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
              Join our team
            </h2>
            <p className="text-white/85">
              We&apos;re hiring engineers, designers, and product managers across 12 countries.
            </p>
            <a
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold bg-white text-[color:var(--color-primary)]"
            >
              View Openings <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
