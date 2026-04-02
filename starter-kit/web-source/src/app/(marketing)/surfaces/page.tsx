'use client';

/**
 * Surfaces Page — Multi-surface device showcase
 *
 * Created: 2026-03-19T18:23:00Z
 * Refactored: 2026-03-31 — Tailwind only, CSS variables, no inline styles
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone, Tablet, Monitor, Tv, ArrowRight,
  Fingerprint, Maximize, Keyboard, Gamepad2,
  Eye, Gauge, Layout, Accessibility,
} from 'lucide-react';
import { Section } from '@/components/layout/Section';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const surfaces = [
  {
    icon: Smartphone,
    name: 'Smartphone',
    tagline: 'Touch-first, everywhere',
    interaction: 'Touch-first',
    input: 'Tap, swipe, voice',
    density: 'High / single-column',
    motion: 'Reduced for battery',
    bgClass: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    details: [
      { icon: Fingerprint, text: 'Gesture-driven navigation with haptic feedback' },
      { icon: Layout, text: 'Single-column layout with bottom sheet overlays' },
      { icon: Gauge, text: 'Optimized for slow networks and battery life' },
      { icon: Accessibility, text: 'Screen reader optimized, 44px+ touch targets' },
    ],
  },
  {
    icon: Tablet,
    name: 'Tablet',
    tagline: 'The best of both worlds',
    interaction: 'Touch + pointer',
    input: 'Touch, stylus, keyboard',
    density: 'Medium',
    motion: 'Moderate',
    bgClass: 'bg-gradient-to-br from-cyan-500 to-blue-500',
    details: [
      { icon: Maximize, text: 'Split-view layouts for multitasking' },
      { icon: Fingerprint, text: 'Stylus support for precision interaction' },
      { icon: Layout, text: 'Adaptive sidebars that collapse on smaller tablets' },
      { icon: Gauge, text: 'Portrait and landscape optimized' },
    ],
  },
  {
    icon: Monitor,
    name: 'Desktop',
    tagline: 'Power-user density',
    interaction: 'Pointer-first',
    input: 'Mouse, keyboard, voice',
    density: 'High / multi-column',
    motion: 'Full animations',
    bgClass: 'bg-gradient-to-br from-emerald-500 to-cyan-500',
    details: [
      { icon: Keyboard, text: 'Full keyboard shortcuts (Cmd+K, Ctrl+/, etc.)' },
      { icon: Layout, text: 'Multi-column layouts with persistent sidebars' },
      { icon: Eye, text: 'Hover states, tooltips, and contextual menus' },
      { icon: Gauge, text: 'Dense information display for productivity' },
    ],
  },
  {
    icon: Tv,
    name: 'Cinematic',
    tagline: '10-foot UI for the big screen',
    interaction: 'Spatial navigation',
    input: 'D-pad, voice',
    density: 'Low / overscan-safe',
    motion: 'Minimal, focused',
    bgClass: 'bg-gradient-to-br from-orange-500 to-amber-500',
    details: [
      { icon: Gamepad2, text: 'D-pad spatial navigation with focus management' },
      { icon: Eye, text: 'Large text (1.25rem base), high-contrast elements' },
      { icon: Layout, text: 'Overscan-safe margins for TV bezel tolerance' },
      { icon: Gauge, text: 'Sub-100ms focus transitions for responsiveness' },
    ],
  },
];

export default function SurfacesPage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────── */}
      <section className="py-32 px-4 sm:py-28 text-center">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            Four surfaces, <span className="text-gradient">one&nbsp;platform</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Nexus AI detects your device at the edge and transforms the entire
            experience — input modality, layout density, animation budget, and accessibility.
          </p>
        </motion.div>
      </section>

      {/* ─── Surface Deep Dives ────────────────── */}
      {surfaces.map((surface, i) => (
        <Section key={surface.name} variant={i % 2 === 0 ? 'default' : 'alternate'} padding="xl">
          <div className="feature grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeUp}
              className={i % 2 === 1 ? 'lg:order-2' : ''}
            >
              {/* Icon box */}
              <div className={`${surface.bgClass} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4`}>
                <surface.icon size={24} />
              </div>

              <h2 className="text-3xl font-bold tracking-tight mb-2">
                {surface.name}
              </h2>
              <p className="text-lg font-medium text-[var(--color-primary)] mb-4">
                {surface.tagline}
              </p>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  ['Interaction', surface.interaction],
                  ['Input', surface.input],
                  ['Density', surface.density],
                  ['Motion', surface.motion],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">
                      {label}
                    </div>
                    <div className="text-sm font-semibold text-[var(--color-text)]">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Detail cards */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className={`grid grid-cols-2 gap-3 ${i % 2 === 1 ? 'lg:order-1' : ''}`}
            >
              {surface.details.map(detail => (
                <div
                  key={detail.text}
                  className="flex flex-col gap-2 p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]"
                >
                  <detail.icon size={20} className="text-[var(--color-primary)]" />
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {detail.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </Section>
      ))}

      {/* ─── CTA ───────────────────────────────── */}
      <Section variant="default" padding="xl">
        <motion.div
          {...fadeUp}
          className="feature bg-gradient-to-br from-[var(--color-primary)] to-purple-600 rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center gap-4"
        >
          <h2 className="text-2xl font-extrabold text-white">
            Try every surface today
          </h2>
          <p className="text-white/85">
            Open Nexus on your phone, tablet, laptop, and TV — it adapts instantly.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-3 font-semibold text-[var(--color-primary)] bg-white rounded-full hover:opacity-90 transition-opacity"
          >
            Start Free <ArrowRight size={16} />
          </a>
        </motion.div>
      </Section>
    </>
  );
}
