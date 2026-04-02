/**
 * SEO Metadata Utilities — Nexus AI
 *
 * Reusable helpers for per-page metadata generation.
 * Works with Next.js 15 `generateMetadata()` / static `metadata` exports.
 *
 * Usage in a page:
 *   import { createPageMeta } from '@/lib/seo/metadata';
 *
 *   export const metadata = createPageMeta({
 *     title: 'Dashboard',
 *     description: 'Your AI workspace overview',
 *     path: '/dashboard',
 *   });
 */

import type { Metadata } from 'next';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Nexus AI';
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

interface PageMetaOptions {
  /** Page title (will be appended with "| Nexus AI" by the root layout template) */
  title: string;
  /** Page description for search engines */
  description: string;
  /** Canonical path (e.g. '/pricing') — defaults to '' */
  path?: string;
  /** Override OG image URL */
  ogImage?: string;
  /** Set to true for pages that should NOT be indexed (admin, app, etc.) */
  noIndex?: boolean;
  /** Additional keywords */
  keywords?: string[];
}

/**
 * Build a per-page Metadata object that merges cleanly with the root layout.
 */
export function createPageMeta(opts: PageMetaOptions): Metadata {
  const canonical = `${SITE_URL}${opts.path ?? ''}`;

  return {
    title: opts.title,
    description: opts.description,

    ...(opts.keywords?.length
      ? { keywords: opts.keywords }
      : {}),

    alternates: {
      canonical,
    },

    openGraph: {
      title: `${opts.title} | ${SITE_NAME}`,
      description: opts.description,
      url: canonical,
      type: 'website',
      ...(opts.ogImage
        ? { images: [{ url: opts.ogImage, width: 1200, height: 630 }] }
        : {}),
    },

    twitter: {
      card: 'summary_large_image',
      title: `${opts.title} | ${SITE_NAME}`,
      description: opts.description,
      ...(opts.ogImage ? { images: [opts.ogImage] } : {}),
    },

    ...(opts.noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

// ─── JSON-LD Structured Data ────────────────────────────────

interface OrganizationLdOptions {
  name?: string;
  url?: string;
  logo?: string;
}

/** Generate Organization JSON-LD (place in root layout) */
export function organizationJsonLd(opts: OrganizationLdOptions = {}): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: opts.name ?? SITE_NAME,
    url: opts.url ?? SITE_URL,
    ...(opts.logo ? { logo: opts.logo } : {}),
  });
}

interface WebPageLdOptions {
  title: string;
  description: string;
  path?: string;
}

/** Generate WebPage JSON-LD (place in per-page metadata) */
export function webPageJsonLd(opts: WebPageLdOptions): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.title,
    description: opts.description,
    url: `${SITE_URL}${opts.path ?? ''}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  });
}

interface FaqLdOptions {
  questions: { question: string; answer: string }[];
}

/** Generate FAQ JSON-LD for FAQ / pricing pages */
export function faqJsonLd(opts: FaqLdOptions): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: opts.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  });
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

/** Generate BreadcrumbList JSON-LD */
export function breadcrumbJsonLd(items: BreadcrumbItem[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  });
}
