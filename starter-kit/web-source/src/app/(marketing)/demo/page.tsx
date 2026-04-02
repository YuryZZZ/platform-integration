'use client';

import React from 'react';
import {
  Calendar,
  MessageSquare,
  Mic,
  GitBranch,
  BookOpen,
  Shield,
  ArrowRight,
} from 'lucide-react';

const demoFeatures = [
  { icon: MessageSquare, label: 'AI Chat with multi-model routing' },
  { icon: Mic, label: 'Voice interface with real-time STT' },
  { icon: GitBranch, label: 'Workflow engine with visual builder' },
  { icon: BookOpen, label: 'Knowledge base with RAG retrieval' },
  { icon: Shield, label: 'Enterprise security overview' },
];

export default function DemoPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-32 sm:py-40 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 leading-tight">
            See Nexus AI <span className="text-gradient">in action</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Book a personalized demo with our team and see how Nexus AI can transform your workflows.
          </p>
        </div>
      </section>

      {/* Form + Features Section */}
      <section className="section-padding bg-[var(--color-bg-subtle)]">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">Request a demo</h2>
              <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                  >
                    Work Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50"
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Acme Inc"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                  >
                    What are you looking to solve? (optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your use case..."
                    className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book Demo
                </button>
              </form>
            </div>

            {/* Right: What You'll See */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-[var(--color-text)]">What you&apos;ll see</h2>

              {/* Feature List */}
              <div className="space-y-3 mb-8">
                {demoFeatures.map(feature => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.label}
                      className="flex items-center gap-4 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:bg-opacity-80 transition-colors"
                    >
                      <Icon className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" />
                      <span className="text-sm font-medium text-[var(--color-text)]">
                        {feature.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Self-Service Card */}
              <div className="p-6 rounded-lg border border-[var(--color-primary)] bg-[var(--color-primary)] bg-opacity-5">
                <h3 className="text-base font-semibold text-[var(--color-text)] mb-2">
                  Prefer self-service?
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                  Create a free account and explore Nexus AI at your own pace with 1,000 free AI requests.
                </p>
                <a
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:gap-3 transition-all"
                >
                  Start Free
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
