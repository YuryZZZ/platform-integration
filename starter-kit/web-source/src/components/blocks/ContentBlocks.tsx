/**
 * Content Blocks — CMS-driven page building system
 * Each block maps to a Payload CMS component type and renders with the design system
 * 
 * This is the core of the template system — any website can be built from these blocks.
 * 
 * Created: 2026-03-20T10:05:00Z
 */

'use client';

import './blocks.css';
import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, Star, Quote,
  Sparkles, ChevronRight, Users, Zap,
  Shield, BarChart3, Globe, Code2,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────── */
/*  Types                                                      */
/* ─────────────────────────────────────────────────────────── */

export interface BlockProps {
  id?: string;
  className?: string;
}

export interface HeroBlockData extends BlockProps {
  type: 'hero';
  badge?: string;
  headline: string;
  highlightedText?: string;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundVariant?: 'gradient' | 'mesh' | 'minimal' | 'image';
  backgroundImage?: string;
  alignment?: 'center' | 'left';
}

export interface FeatureGridBlockData extends BlockProps {
  type: 'featureGrid';
  label?: string;
  title: string;
  subtitle?: string;
  features: Array<{
    icon?: string;
    title: string;
    description: string;
    color?: string;
    featured?: boolean;
  }>;
  columns?: 2 | 3 | 4;
  variant?: 'cards' | 'bento' | 'minimal';
}

export interface CtaBlockData extends BlockProps {
  type: 'cta';
  title: string;
  subtitle?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: 'gradient' | 'outlined' | 'minimal';
}

export interface TestimonialsBlockData extends BlockProps {
  type: 'testimonials';
  label?: string;
  title?: string;
  items: Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
    rating?: number;
  }>;
  variant?: 'carousel' | 'grid' | 'stacked';
}

export interface StatsBlockData extends BlockProps {
  type: 'stats';
  items: Array<{
    value: string;
    label: string;
    suffix?: string;
    prefix?: string;
  }>;
  variant?: 'default' | 'cards' | 'inline';
}

export interface LogoCloudBlockData extends BlockProps {
  type: 'logoCloud';
  label?: string;
  logos: Array<{
    name: string;
    image?: string;
  }>;
}

export interface ContentBlockData extends BlockProps {
  type: 'content';
  layout: 'text-only' | 'text-image' | 'image-text' | 'two-column';
  title?: string;
  body: string;
  image?: string;
  imageAlt?: string;
}

export interface PricingBlockData extends BlockProps {
  type: 'pricing';
  label?: string;
  title?: string;
  subtitle?: string;
  plans: Array<{
    name: string;
    price: string;
    period?: string;
    description?: string;
    features: string[];
    cta: { label: string; href: string };
    featured?: boolean;
    badge?: string;
  }>;
}

export interface FaqBlockData extends BlockProps {
  type: 'faq';
  label?: string;
  title?: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export interface DividerBlockData extends BlockProps {
  type: 'divider';
  variant?: 'line' | 'gradient' | 'dots' | 'space';
}

export type ContentBlock =
  | HeroBlockData
  | FeatureGridBlockData
  | CtaBlockData
  | TestimonialsBlockData
  | StatsBlockData
  | LogoCloudBlockData
  | ContentBlockData
  | PricingBlockData
  | FaqBlockData
  | DividerBlockData;

/* ─────────────────────────────────────────────────────────── */
/*  Animation Presets                                          */
/* ─────────────────────────────────────────────────────────── */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const iconMap: Record<string, React.ElementType> = {
  sparkles: Sparkles, zap: Zap, shield: Shield,
  chart: BarChart3, globe: Globe, code: Code2,
  users: Users, star: Star, check: CheckCircle2,
};

/* ─────────────────────────────────────────────────────────── */
/*  Hero Block                                                 */
/* ─────────────────────────────────────────────────────────── */

export function HeroBlock({
  badge, headline, highlightedText, subheadline,
  primaryCta, secondaryCta, backgroundVariant = 'gradient',
  alignment = 'center', id,
}: HeroBlockData) {
  return (
    <section id={id} className="block-hero" data-variant={backgroundVariant} data-align={alignment}>
      <div className="block-hero__bg" />
      <div className="block-hero__content">
        {badge && (
          <motion.div {...fadeUp} className="block-hero__badge">
            <span className="block-hero__badge-dot" />
            {badge}
          </motion.div>
        )}
        <motion.h1 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="block-hero__headline">
          {headline}{' '}
          {highlightedText && <span className="block-hero__highlight">{highlightedText}</span>}
        </motion.h1>
        {subheadline && (
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="block-hero__sub">
            {subheadline}
          </motion.p>
        )}
        {(primaryCta || secondaryCta) && (
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }} className="block-hero__ctas">
            {primaryCta && (
              <a href={primaryCta.href} className="block-btn block-btn--primary">
                {primaryCta.label} <ArrowRight size={16} />
              </a>
            )}
            {secondaryCta && (
              <a href={secondaryCta.href} className="block-btn block-btn--secondary">
                {secondaryCta.label} <ChevronRight size={16} />
              </a>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Feature Grid Block                                         */
/* ─────────────────────────────────────────────────────────── */

export function FeatureGridBlock({
  label, title, subtitle, features,
  columns = 3, variant = 'cards', id,
}: FeatureGridBlockData) {
  return (
    <section id={id} className="block-features" data-variant={variant}>
      <div className="block-features__header">
        {label && <motion.span {...fadeUp} className="block-section-label">{label}</motion.span>}
        <motion.h2 {...fadeUp} className="block-section-title">{title}</motion.h2>
        {subtitle && <motion.p {...fadeUp} className="block-section-sub">{subtitle}</motion.p>}
      </div>
      <div className="block-features__grid" data-columns={columns}>
        {features.map((feat, i) => {
          const Icon = feat.icon ? iconMap[feat.icon] || Sparkles : Sparkles;
          return (
            <motion.div
              key={feat.title}
              {...stagger}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`block-feature-card ${feat.featured ? 'block-feature-card--featured' : ''}`}
            >
              <div className="block-feature-card__icon" style={{ background: feat.color || 'var(--gradient-primary)' }}>
                <Icon size={20} />
              </div>
              <h3 className="block-feature-card__title">{feat.title}</h3>
              <p className="block-feature-card__desc">{feat.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  CTA Block                                                  */
/* ─────────────────────────────────────────────────────────── */

export function CtaBlock({
  title, subtitle, primaryCta, secondaryCta,
  variant = 'gradient', id,
}: CtaBlockData) {
  return (
    <section id={id} className="block-cta" data-variant={variant}>
      <motion.div {...fadeUp} className="block-cta__card">
        <div className="block-cta__glow" />
        <h2 className="block-cta__title">{title}</h2>
        {subtitle && <p className="block-cta__sub">{subtitle}</p>}
        <div className="block-cta__actions">
          <a href={primaryCta.href} className="block-btn block-btn--primary block-btn--lg">
            {primaryCta.label} <ArrowRight size={16} />
          </a>
          {secondaryCta && (
            <a href={secondaryCta.href} className="block-btn block-btn--ghost">
              {secondaryCta.label}
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Testimonials Block                                         */
/* ─────────────────────────────────────────────────────────── */

export function TestimonialsBlock({
  label, title, items, variant = 'grid', id,
}: TestimonialsBlockData) {
  return (
    <section id={id} className="block-testimonials" data-variant={variant}>
      <div className="block-testimonials__header">
        {label && <span className="block-section-label">{label}</span>}
        {title && <h2 className="block-section-title">{title}</h2>}
      </div>
      <div className="block-testimonials__grid">
        {items.map((item, i) => (
          <motion.div
            key={i}
            {...stagger}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="block-testimonial-card"
          >
            <Quote size={20} className="block-testimonial-card__quote-icon" />
            <p className="block-testimonial-card__text">&ldquo;{item.quote}&rdquo;</p>
            {item.rating && (
              <div className="block-testimonial-card__rating">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" />
                ))}
              </div>
            )}
            <div className="block-testimonial-card__author">
              <div className="block-testimonial-card__avatar">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.author} />
                ) : (
                  <span>{item.author.charAt(0)}</span>
                )}
              </div>
              <div>
                <p className="block-testimonial-card__name">{item.author}</p>
                <p className="block-testimonial-card__role">{item.role}, {item.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Stats Block                                                */
/* ─────────────────────────────────────────────────────────── */

export function StatsBlock({ items, variant = 'default', id }: StatsBlockData) {
  return (
    <section id={id} className="block-stats" data-variant={variant}>
      <div className="block-stats__grid">
        {items.map((stat, i) => (
          <motion.div
            key={stat.label}
            {...stagger}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="block-stat"
          >
            <span className="block-stat__value">
              {stat.prefix}{stat.value}{stat.suffix}
            </span>
            <span className="block-stat__label">{stat.label}</span>
            <div className="block-stat__divider" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Logo Cloud Block                                           */
/* ─────────────────────────────────────────────────────────── */

export function LogoCloudBlock({ label, logos, id }: LogoCloudBlockData) {
  return (
    <section id={id} className="block-logos">
      {label && <p className="block-logos__label">{label}</p>}
      <div className="block-logos__track">
        {logos.map((logo, i) => (
          <span key={i} className="block-logo">{logo.name}</span>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Content Block                                              */
/* ─────────────────────────────────────────────────────────── */

export function ContentBlock({
  layout, title, body, image, imageAlt, id,
}: ContentBlockData) {
  return (
    <section id={id} className="block-content" data-layout={layout}>
      <motion.div {...fadeUp} className="block-content__inner">
        {(layout === 'text-image' || layout === 'image-text') && image && (
          <div className="block-content__media">
            <img src={image} alt={imageAlt || ''} className="block-content__image" />
          </div>
        )}
        <div className="block-content__text">
          {title && <h2 className="block-content__title">{title}</h2>}
          <div className="block-content__body" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Pricing Block                                              */
/* ─────────────────────────────────────────────────────────── */

export function PricingBlock({
  label, title, subtitle, plans, id,
}: PricingBlockData) {
  return (
    <section id={id} className="block-pricing">
      <div className="block-pricing__header">
        {label && <span className="block-section-label">{label}</span>}
        {title && <h2 className="block-section-title">{title}</h2>}
        {subtitle && <p className="block-section-sub">{subtitle}</p>}
      </div>
      <div className="block-pricing__grid">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            {...stagger}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`block-pricing-card ${plan.featured ? 'block-pricing-card--featured' : ''}`}
          >
            {plan.badge && <span className="block-pricing-card__badge">{plan.badge}</span>}
            <h3 className="block-pricing-card__name">{plan.name}</h3>
            {plan.description && <p className="block-pricing-card__desc">{plan.description}</p>}
            <div className="block-pricing-card__price">
              <span className="block-pricing-card__amount">{plan.price}</span>
              {plan.period && <span className="block-pricing-card__period">/{plan.period}</span>}
            </div>
            <ul className="block-pricing-card__features">
              {plan.features.map((feat, j) => (
                <li key={j}><CheckCircle2 size={14} /> {feat}</li>
              ))}
            </ul>
            <a href={plan.cta.href} className={`block-btn ${plan.featured ? 'block-btn--primary' : 'block-btn--secondary'} block-btn--full`}>
              {plan.cta.label}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  FAQ Block                                                  */
/* ─────────────────────────────────────────────────────────── */

export function FaqBlock({ label, title, items, id }: FaqBlockData) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section id={id} className="block-faq">
      <div className="block-faq__header">
        {label && <span className="block-section-label">{label}</span>}
        {title && <h2 className="block-section-title">{title}</h2>}
      </div>
      <div className="block-faq__list">
        {items.map((item, i) => (
          <motion.div key={i} {...stagger} transition={{ delay: i * 0.05, duration: 0.4 }}>
            <button
              className={`block-faq__item ${openIndex === i ? 'block-faq__item--open' : ''}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span className="block-faq__question">{item.question}</span>
              <ChevronRight size={16} className="block-faq__chevron" />
            </button>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="block-faq__answer"
              >
                <p>{item.answer}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Divider Block                                              */
/* ─────────────────────────────────────────────────────────── */

export function DividerBlock({ variant = 'gradient', id }: DividerBlockData) {
  return <div id={id} className="block-divider" data-variant={variant} />;
}

/* ─────────────────────────────────────────────────────────── */
/*  Block Renderer — renders any ContentBlock by type          */
/* ─────────────────────────────────────────────────────────── */

export function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'hero':        return <HeroBlock {...block} />;
    case 'featureGrid': return <FeatureGridBlock {...block} />;
    case 'cta':         return <CtaBlock {...block} />;
    case 'testimonials':return <TestimonialsBlock {...block} />;
    case 'stats':       return <StatsBlock {...block} />;
    case 'logoCloud':   return <LogoCloudBlock {...block} />;
    case 'content':     return <ContentBlock {...block} />;
    case 'pricing':     return <PricingBlock {...block} />;
    case 'faq':         return <FaqBlock {...block} />;
    case 'divider':     return <DividerBlock {...block} />;
    default:            return null;
  }
}

/* ─────────────────────────────────────────────────────────── */
/*  Page Renderer — renders an array of blocks                 */
/* ─────────────────────────────────────────────────────────── */

export function PageRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="page-renderer">
      {blocks.map((block, i) => (
        <BlockRenderer key={block.id || `block-${i}`} block={block} />
      ))}
    </div>
  );
}
