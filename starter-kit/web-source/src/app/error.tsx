/**
 * Global Error Page — Step 127
 * Error boundary fallback for page-level errors
 * 
 * Created: 2026-03-18T17:01:00Z
 */

'use client';

import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: 'var(--space-4)',
      textAlign: 'center',
    }}>
      <div style={{
        width: '3rem',
        height: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-full)',
        background: 'rgba(239, 68, 68, 0.1)',
        color: 'var(--feedback-error)',
        fontSize: '1.5rem',
        marginBottom: 'var(--space-4)',
      }}>
        ⚠
      </div>
      <h2 style={{
        fontSize: 'var(--text-lg)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-2)',
      }}>
        Something went wrong
      </h2>
      <p style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)',
        maxWidth: '24rem',
        marginBottom: 'var(--space-4)',
      }}>
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <button
        onClick={reset}
        style={{
          padding: 'var(--space-2-5) var(--space-4)',
          background: 'var(--color-primary-500)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-lg)',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
        }}
      >
        Try Again
      </button>
    </div>
  );
}
