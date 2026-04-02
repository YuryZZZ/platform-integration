'use client';

import React from 'react';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  heading: React.ReactNode;
  description: string;
  features: Feature[];
  columns?: number;
}

/**
 * FeatureGrid — Responsive grid of feature/capability cards.
 */
export function FeatureGrid({
  heading,
  description,
  features,
  columns = 3,
}: FeatureGridProps) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          {heading}
        </h2>
        <p style={{ color: 'var(--color-text-secondary, #888)', maxWidth: 600, margin: '0 auto' }}>
          {description}
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '1.5rem',
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              border: '1px solid var(--color-border, #333)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              background: 'var(--color-surface, rgba(255,255,255,0.03))',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{f.icon}</div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              {f.title}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary, #888)', lineHeight: 1.5 }}>
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
