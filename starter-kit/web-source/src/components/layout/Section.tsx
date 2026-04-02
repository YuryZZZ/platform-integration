'use client';

import React from 'react';

export interface SectionProps {
  variant?: 'default' | 'alternate';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const paddingMap: Record<string, string> = {
  sm: '2rem 0',
  md: '3rem 0',
  lg: '4.5rem 0',
  xl: '6rem 0',
};

/**
 * Section — Generic marketing page section wrapper.
 * Provides consistent padding and alternating background treatment.
 */
export function Section({
  variant = 'default',
  padding = 'lg',
  children,
  className = '',
  id,
}: SectionProps) {
  const bg =
    variant === 'alternate'
      ? 'var(--color-surface-alt, rgba(255,255,255,0.02))'
      : 'transparent';

  return (
    <section
      id={id}
      className={className}
      style={{
        padding: paddingMap[padding] ?? paddingMap.lg,
        background: bg,
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {children}
      </div>
    </section>
  );
}
