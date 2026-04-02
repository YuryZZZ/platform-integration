'use client';

import React from 'react';

export interface CustomerWinData {
  quote: string;
  author: string;
  title: string;
  company: string;
  metric: string;
  metricLabel: string;
}

export interface CustomerWinCardProps {
  data: CustomerWinData;
}

/**
 * CustomerWinCard — Testimonial / customer success card with a highlight metric.
 */
export function CustomerWinCard({ data }: CustomerWinCardProps) {
  return (
    <div
      style={{
        border: '1px solid var(--color-border, #333)',
        borderRadius: '1rem',
        padding: '2rem',
        background: 'var(--color-surface, rgba(255,255,255,0.03))',
      }}
    >
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary, #6366f1)' }}>
            {data.metric}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary, #888)' }}>
            {data.metricLabel}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <blockquote style={{ margin: 0, fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1rem' }}>
            &ldquo;{data.quote}&rdquo;
          </blockquote>
          <div style={{ fontWeight: 600 }}>{data.author}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary, #888)' }}>
            {data.title}, {data.company}
          </div>
        </div>
      </div>
    </div>
  );
}
