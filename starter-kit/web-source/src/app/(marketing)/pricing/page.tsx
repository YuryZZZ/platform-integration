import React from 'react';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '0',
    priceSuffix: '/month',
    description: 'For individuals exploring AI-powered workflows.',
    features: [
      { text: '1,000 AI requests/month', included: true },
      { text: '1 workspace', included: true },
      { text: '5 workflows', included: true },
      { text: 'Community support', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Single surface', included: true },
    ],
    ctaLabel: 'Start Free',
    ctaHref: '/login',
    recommended: false,
  },
  {
    name: 'Pro',
    price: '49',
    priceSuffix: '/user/month',
    description: 'For growing teams that need power and flexibility.',
    features: [
      { text: '25,000 AI requests/month', included: true },
      { text: 'Unlimited workspaces', included: true },
      { text: 'Unlimited workflows', included: true },
      { text: 'Priority support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'All 4 surfaces', included: true },
      { text: 'Voice interface', included: true },
      { text: 'Knowledge base (10GB)', included: true },
      { text: 'Custom AI prompts', included: true },
    ],
    ctaLabel: 'Start Free Trial',
    ctaHref: '/login?plan=pro',
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: null,
    priceSuffix: '',
    description: 'For organizations with advanced security and scale needs.',
    features: [
      { text: 'Unlimited AI requests', included: true },
      { text: 'Unlimited everything', included: true },
      { text: 'Dedicated support engineer', included: true },
      { text: 'SOC 2 Type II report', included: true },
      { text: 'GDPR DPA', included: true },
      { text: 'SSO / SAML', included: true },
      { text: 'Custom data residency', included: true },
      { text: 'SLA guarantee (99.99%)', included: true },
      { text: 'On-premise deployment', included: true },
      { text: 'Custom model fine-tuning', included: true },
    ],
    ctaLabel: 'Contact Sales',
    ctaHref: '/demo',
    recommended: false,
  },
];

const faqs = [
  {
    question: 'Can I switch plans at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'What happens when I hit my AI request limit?',
    answer: 'We\'ll notify you at 80% and 100%. You can purchase additional request packs or upgrade your plan. We never cut off active conversations.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer: 'Yes — annual billing saves you 20%. Contact us for team discounts on 10+ seats.',
  },
  {
    question: 'Is there a free trial for Pro?',
    answer: 'Absolutely. Pro comes with a 14-day free trial, no credit card required. You keep your data if you downgrade.',
  },
  {
    question: 'What\'s included in the Enterprise SLA?',
    answer: '99.99% uptime guarantee with financial credits for any breach. Dedicated support with 15-minute response times for critical issues.',
  },
];

export default function PricingPage() {
  return (
    <>
      {/* ─── Hero Section ──────────────────────── */}
      <section className="pt-12 pb-8 px-4 sm:pt-16 sm:pb-10 sm:px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-3">
            Simple, <span className="text-gradient">transparent</span> pricing
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Start free, scale when you're ready. No surprise fees, no hidden limits.
          </p>
        </div>
      </section>

      {/* ─── Pricing Cards Section ─────────────── */}
      <section className="pb-8 sm:pb-12 px-4 sm:px-6">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-max">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative card h-full transition-all duration-300 ${
                  plan.recommended
                    ? 'md:ring-2 md:ring-[var(--color-primary)] md:scale-105'
                    : ''
                }`}
              >
                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-block bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-xs font-semibold px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {plan.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  {plan.price !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-[var(--color-text)]">
                        ${plan.price}
                      </span>
                      <span className="text-sm text-[var(--color-text-muted)]">
                        {plan.priceSuffix}
                      </span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-[var(--color-text)]">
                      Custom pricing
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <a
                  href={plan.ctaHref}
                  className={`block w-full mb-5 py-2.5 px-4 text-center font-medium rounded-lg transition-all duration-200 ${
                    plan.recommended
                      ? 'btn btn-primary'
                      : 'btn btn-secondary'
                  }`}
                >
                  {plan.ctaLabel}
                </a>

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3"
                    >
                      {feature.included ? (
                        <Check className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-[var(--color-text-muted)] flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? 'text-[var(--color-text)]'
                            : 'text-[var(--color-text-muted)]'
                        }`}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ───────────────────────── */}
      <section className="py-10 sm:py-14 bg-[var(--color-bg-subtle)]">
        <div className="container-page">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-3">
                Frequently asked questions
              </h2>
              <p className="text-base sm:text-lg text-[var(--color-text-secondary)]">
                Everything you need to know about our pricing.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group card overflow-hidden cursor-pointer hover:bg-[var(--color-surface)] transition-colors"
                >
                  <summary className="flex items-center justify-between gap-4 p-4 sm:p-5 font-semibold text-[var(--color-text)] select-none">
                    <span>{faq.question}</span>
                    <div className="text-[var(--color-text-muted)] transition-transform group-open:rotate-180">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 border-t border-[var(--color-border)]">
                    <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Band ──────────────────────────── */}
      <section className="py-10 sm:py-14">
        <div className="container-page">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-4">
              Ready to get started?
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] mb-8">
              14-day free trial. No credit card required.
            </p>
            <a
              href="/login"
              className="btn btn-primary btn-lg inline-block"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
