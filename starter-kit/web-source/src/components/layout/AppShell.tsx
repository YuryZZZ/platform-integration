'use client';

import React from 'react';

export interface AppShellProps {
  children: React.ReactNode;
}

/**
 * AppShell — Authenticated application chrome wrapper.
 * Renders the sidebar / header / footer around page content.
 * Design-agnostic: actual chrome is injected by the active theme.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div
      className="app-shell"
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
      }}
    >
      <main style={{ flex: 1, padding: '1.5rem' }}>{children}</main>
    </div>
  );
}
