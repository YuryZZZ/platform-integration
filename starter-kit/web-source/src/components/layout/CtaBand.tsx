'use client';

import React from 'react';

export interface CtaBandProps {
  headline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

/**
 * CtaBand — Full-width call-to-action band for marketing pages.
 */
export function CtaBand({
  headline,
  description,
  primaryCta,
  secondaryCta,
}: CtaBandProps) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '4rem 1.5rem',
        background: 'var(--color-surface-alt, rgba(255,255,255,0.03))',
        borderRadius: '1rem',
        margin: '2rem 0',
      }}
    >
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>
        {headline}
      </h2>
      <p style={{ color: 'var(--color-text-secondary, #888)', marginBottom: '1.5rem', maxWidth: 520, margin: '0 auto 1.5rem' }}>
        {description}
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href={primaryCta.href}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            background: 'var(--color-primary, #6366f1)',
            color: '#fff',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {primaryCta.label}
        </a>
        {secondaryCta && (
          <a
            href={secondaryCta.href}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--color-border, #333)',
              color: 'var(--color-text, #fff)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            {secondaryCta.label}
          </a>
        )}
      </div>
    </div>
  );
}
