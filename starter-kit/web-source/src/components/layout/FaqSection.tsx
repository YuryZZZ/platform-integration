'use client';

import React, { useState, useCallback } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  heading: string;
  description?: string;
  items: FaqItem[];
  allowMultiple?: boolean;
}

/**
 * FaqSection — Accordion FAQ component for marketing pages.
 */
export function FaqSection({
  heading,
  description,
  items,
  allowMultiple = false,
}: FaqSectionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = useCallback(
    (index: number) => {
      setOpenIndices((prev) => {
        const next = new Set(allowMultiple ? prev : []);
        if (prev.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    },
    [allowMultiple],
  );

  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          {heading}
        </h2>
        {description && (
          <p style={{ color: 'var(--color-text-secondary, #888)' }}>{description}</p>
        )}
      </div>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {items.map((item, i) => {
          const isOpen = openIndices.has(i);
          return (
            <div
              key={i}
              style={{
                borderBottom: '1px solid var(--color-border, #333)',
                padding: '1rem 0',
              }}
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 0,
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'inherit',
                }}
              >
                {item.question}
                <span style={{ marginLeft: '1rem', flexShrink: 0 }}>
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <div
                  style={{
                    paddingTop: '0.75rem',
                    color: 'var(--color-text-secondary, #888)',
                    lineHeight: 1.6,
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
