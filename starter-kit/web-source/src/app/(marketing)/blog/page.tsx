/**
 * Blog Index Page — /blog
 * Blog listing with sample posts. CMS-powered in production.
 */

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Nexus AI',
  description: 'Latest insights on AI, content automation, property tech, and digital marketing.',
};

const posts = [
  {
    slug: 'ai-powered-content-automation',
    title: 'AI-Powered Content Automation: The Future of Website Management',
    excerpt: 'How modern AI tools can generate, optimise, and publish content at scale — from blog posts to thousands of location pages.',
    date: '2026-03-15',
    readTime: '6 min read',
    category: 'AI & Automation',
    author: 'Nexus AI Team',
  },
  {
    slug: 'property-portal-seo-guide',
    title: 'Property Portal SEO: Ranking Millions of Listing Pages',
    excerpt: 'Strategies for indexing and ranking large-scale property portals with dynamic content and pagination.',
    date: '2026-03-10',
    readTime: '8 min read',
    category: 'SEO',
    author: 'Nexus AI Team',
  },
  {
    slug: 'headless-cms-construction',
    title: 'Why Construction Companies Need a Headless CMS',
    excerpt: 'From service area pages to project portfolios — how a headless CMS transforms construction marketing.',
    date: '2026-03-05',
    readTime: '5 min read',
    category: 'CMS',
    author: 'Nexus AI Team',
  },
  {
    slug: 'multi-tenant-saas-architecture',
    title: 'Building Multi-Tenant SaaS with Next.js and PostgreSQL',
    excerpt: 'Architecture patterns for row-level security, tenant isolation, and shared infrastructure.',
    date: '2026-02-28',
    readTime: '10 min read',
    category: 'Engineering',
    author: 'Nexus AI Team',
  },
  {
    slug: 'workflow-automation-leads',
    title: '5 Workflow Automations That Double Lead Conversion',
    excerpt: 'Practical automation recipes for instant replies, lead scoring, follow-ups, and CRM sync.',
    date: '2026-02-20',
    readTime: '7 min read',
    category: 'Marketing',
    author: 'Nexus AI Team',
  },
  {
    slug: 'firebase-studio-lovable-integration',
    title: 'Rapid Prototyping: Firebase Studio + Lovable + Nexus AI',
    excerpt: 'How to use AI builders to prototype, then ship production sites through the Nexus AI platform.',
    date: '2026-02-15',
    readTime: '6 min read',
    category: 'Integrations',
    author: 'Nexus AI Team',
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container-page text-center max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-[var(--color-bg-subtle)] text-sm font-medium text-[var(--color-text-secondary)]">
            Blog
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Insights & <span className="text-gradient">Updates</span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)]">
            AI, automation, property tech, and digital marketing.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="card p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
                  <span className="inline-block mb-3 px-2 py-1 rounded-md bg-[var(--color-bg-subtle)] text-xs font-semibold text-[var(--color-primary)]">
                    {post.category}
                  </span>
                  <h2 className="text-lg font-bold mb-3 leading-tight line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                    <span>
                      {new Date(post.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
