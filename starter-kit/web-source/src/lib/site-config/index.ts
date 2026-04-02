/**
 * Site Configuration API — Template Engine
 * Fetches and manages site configuration from CMS or static config.
 * Used by the template to load everything needed to render a complete website:
 * - Design tokens (theme)
 * - Navigation structure
 * - Site metadata (title, description, social, etc.)
 * - Page data
 * 
 * Created: 2026-03-20T10:20:00Z
 */

import type { DesignTokens } from '@/lib/design-tokens/DesignTokenProvider';
import type { ContentBlock } from '@/components/blocks/ContentBlocks';

/* ─────────────────────────────────────────────────────────── */
/*  Type Definitions                                           */
/* ─────────────────────────────────────────────────────────── */

export interface SiteConfig {
  siteId: string;
  siteName: string;
  siteTagline?: string;
  siteDescription?: string;
  siteLogo?: string;
  siteFavicon?: string;
  siteUrl?: string;

  /* Social */
  social?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    github?: string;
  };

  /* Contact */
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };

  /* Legal */
  legal?: {
    privacyPolicyUrl?: string;
    termsOfServiceUrl?: string;
    cookiePolicyUrl?: string;
  };

  /* Theme */
  designTokens: DesignTokens;

  /* Navigation */
  navigation: NavigationConfig;

  /* Footer */
  footer?: FooterConfig;

  /* Analytics */
  analytics?: {
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
    plausibleDomain?: string;
    customScripts?: string[];
  };

  /* Feature Flags */
  features?: {
    blog?: boolean;
    portfolio?: boolean;
    ecommerce?: boolean;
    newsletter?: boolean;
    chatWidget?: boolean;
    searchEnabled?: boolean;
    darkModeToggle?: boolean;
  };
}

export interface NavigationConfig {
  mainMenu: NavItem[];
  mobileMenu?: NavItem[];
  ctaButton?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'ghost';
  };
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  badge?: string;
  external?: boolean;
}

export interface FooterConfig {
  columns: FooterColumn[];
  bottomText?: string;
  showSocial?: boolean;
  newsletter?: {
    enabled: boolean;
    title?: string;
    placeholder?: string;
  };
}

export interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}

export interface PageData {
  id: string;
  slug: string;
  title: string;
  description?: string;
  blocks: ContentBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    noIndex?: boolean;
  };
  publishedAt?: string;
  updatedAt?: string;
}

/* ─────────────────────────────────────────────────────────── */
/*  Default Config — generic template (override via CMS)       */
/* ─────────────────────────────────────────────────────────── */

/** Site name + branding — configure these in CMS or .env */
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Portal';
const SITE_TAGLINE = process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Your Website Platform';

export const defaultSiteConfig: SiteConfig = {
  siteId: 'default',
  siteName: SITE_NAME,
  siteTagline: SITE_TAGLINE,
  siteDescription: 'A fully configurable website platform. Clone, configure, and deploy.',
  designTokens: {},

  navigation: {
    mainMenu: [
      { id: 'features', label: 'Features', href: '/features' },
      { id: 'pricing', label: 'Pricing', href: '/pricing' },
      { id: 'about', label: 'About', href: '/about' },
      { id: 'blog', label: 'Blog', href: '/blog' },
      { id: 'contact', label: 'Contact', href: '/contact' },
    ],
    ctaButton: {
      label: 'Get Started',
      href: '/demo',
      variant: 'primary',
    },
  },

  footer: {
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Templates', href: '/template-preview' },
          { label: 'Changelog', href: '/changelog' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Documentation', href: '/docs' },
          { label: 'Blog', href: '/blog' },
          { label: 'FAQ', href: '/faq' },
          { label: 'Support', href: '/contact' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Careers', href: '/careers' },
          { label: 'Contact', href: '/contact' },
          { label: 'Partners', href: '/partners' },
        ],
      },
    ],
    bottomText: `© ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.`,
    showSocial: true,
    newsletter: {
      enabled: true,
      title: 'Stay updated',
      placeholder: 'Enter your email',
    },
  },

  features: {
    blog: true,
    portfolio: false,
    ecommerce: false,
    newsletter: true,
    chatWidget: false,
    searchEnabled: true,
    darkModeToggle: true,
  },
};

/* ─────────────────────────────────────────────────────────── */
/*  Config Fetching                                            */
/* ─────────────────────────────────────────────────────────── */

/**
 * Fetch site config — CMS-first, fallback to default.
 * In production this fetches from Payload CMS or a static JSON file.
 */
export async function getSiteConfig(siteId?: string): Promise<SiteConfig> {
  try {
    // Try CMS first
    const cmsConfig = await fetchFromCMS(siteId);
    if (cmsConfig) return mergeConfig(cmsConfig);
  } catch {
    // CMS unavailable — use default
  }

  return defaultSiteConfig;
}

/**
 * Fetch page data from CMS by slug.
 */
export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';
    const res = await fetch(`${baseUrl}/api/pages?where[slug][equals]=${slug}&depth=2`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const page = data?.docs?.[0];
    if (!page) return null;

    return {
      id: page.id,
      slug: page.slug,
      title: page.title,
      description: page.seo?.metaDescription || '',
      blocks: page.blocks || [],
      seo: page.seo || {},
      publishedAt: page.createdAt,
      updatedAt: page.updatedAt,
    };
  } catch {
    return null;
  }
}

/**
 * Fetch all published pages (for static generation).
 */
export async function getAllPages(): Promise<PageData[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';
    const res = await fetch(`${baseUrl}/api/pages?limit=100&depth=1`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.docs || []).map((page: Record<string, unknown>) => ({
      id: page.id as string,
      slug: page.slug as string,
      title: page.title as string,
      description: '',
      blocks: (page.blocks as ContentBlock[]) || [],
      publishedAt: page.createdAt as string,
      updatedAt: page.updatedAt as string,
    }));
  } catch {
    return [];
  }
}

/* ─────────────────────────────────────────────────────────── */
/*  Internal helpers                                           */
/* ─────────────────────────────────────────────────────────── */

async function fetchFromCMS(siteId?: string): Promise<Partial<SiteConfig> | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';
  const query = siteId ? `?where[siteId][equals]=${siteId}` : '';
  const res = await fetch(`${baseUrl}/api/globals/site-config${query}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

function mergeConfig(partial: Partial<SiteConfig>): SiteConfig {
  return {
    ...defaultSiteConfig,
    ...partial,
    designTokens: { ...defaultSiteConfig.designTokens, ...partial.designTokens },
    navigation: {
      ...defaultSiteConfig.navigation,
      ...partial.navigation,
      mainMenu: partial.navigation?.mainMenu || defaultSiteConfig.navigation.mainMenu,
    },
    footer: partial.footer
      ? {
          columns: partial.footer.columns || defaultSiteConfig.footer?.columns || [],
          bottomText: partial.footer.bottomText || defaultSiteConfig.footer?.bottomText,
          showSocial: partial.footer.showSocial ?? defaultSiteConfig.footer?.showSocial,
          newsletter: {
            enabled: partial.footer.newsletter?.enabled ?? defaultSiteConfig.footer?.newsletter?.enabled ?? true,
            title: partial.footer.newsletter?.title || defaultSiteConfig.footer?.newsletter?.title,
            placeholder: partial.footer.newsletter?.placeholder || defaultSiteConfig.footer?.newsletter?.placeholder,
          },
        }
      : defaultSiteConfig.footer,
    features: {
      ...defaultSiteConfig.features,
      ...partial.features,
    },
  };
}

/* ─────────────────────────────────────────────────────────── */
/*  Barrel Export Type                                         */
/* ─────────────────────────────────────────────────────────── */

export type { DesignTokens } from '@/lib/design-tokens/DesignTokenProvider';
