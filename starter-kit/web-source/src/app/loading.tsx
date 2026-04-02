/**
 * Global Loading — Step 126
 * Skeleton loading state for route transitions
 * 
 * Created: 2026-03-18T17:01:00Z
 */

import React from 'react';

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: 'var(--space-4)',
    }}>
      <div style={{
        width: '2.5rem',
        height: '2.5rem',
        border: '3px solid var(--surface-3)',
        borderTopColor: 'var(--color-primary-500)',
        borderRadius: 'var(--radius-full)',
        animation: 'spin 0.6s linear infinite',
      }} />
      <p style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)',
      }}>
        Loading…
      </p>
    </div>
  );
}
