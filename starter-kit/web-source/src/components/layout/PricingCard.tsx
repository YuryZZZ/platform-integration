'use client';

import React from 'react';

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  price: string | null;
  priceSuffix: string;
  description: string;
  features: PricingFeature[];
  ctaLabel: string;
  ctaHref: string;
  popular?: boolean;
}

export interface PricingCardProps {
  tier: PricingTier;
}

/**
 * PricingCard — Displays a single pricing plan tier.
 */
export function PricingCard({ tier }: PricingCardProps) {
  return (
    <div
      style={{
        border: tier.popular
          ? '2px solid var(--color-primary, #6366f1)'
          : '1px solid var(--color-border, #333)',
        borderRadius: '1rem',
        padding: '2rem',
        background: 'var(--color-surface, rgba(255,255,255,0.03))',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {tier.popular && (
        <div
          style={{
            position: 'absolute',
            top: '-0.75rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-primary, #6366f1)',
            color: '#fff',
            padding: '0.25rem 1rem',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          Most Popular
        </div>
      )}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        {tier.name}
      </h3>
      <div style={{ marginBottom: '0.75rem' }}>
        {tier.price != null ? (
          <>
            <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>{tier.price}</span>
            <span style={{ color: 'var(--color-text-secondary, #888)' }}>
              {tier.priceSuffix}
            </span>
          </>
        ) : (
          <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Custom</span>
        )}
      </div>
      <p
        style={{
          color: 'var(--color-text-secondary, #888)',
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
          lineHeight: 1.5,
        }}
      >
        {tier.description}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', flex: 1 }}>
        {tier.features.map((f, i) => (
          <li
            key={i}
            style={{
              padding: '0.375rem 0',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: f.included
                ? 'var(--color-text, #fff)'
                : 'var(--color-text-disabled, #555)',
              textDecoration: f.included ? 'none' : 'line-through',
            }}
          >
            <span>{f.included ? '✓' : '—'}</span>
            {f.text}
          </li>
        ))}
      </ul>
      <a
        href={tier.ctaHref}
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          background: tier.popular
            ? 'var(--color-primary, #6366f1)'
            : 'transparent',
          border: tier.popular
            ? 'none'
            : '1px solid var(--color-border, #333)',
          color: tier.popular ? '#fff' : 'var(--color-text, #fff)',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        {tier.ctaLabel}
      </a>
    </div>
  );
}
