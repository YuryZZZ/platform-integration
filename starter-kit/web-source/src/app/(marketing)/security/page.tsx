import React from 'react';
import {
  Shield,
  Lock,
  Eye,
  FileCheck,
  Database,
  Globe,
  Key,
  UserCheck,
  AlertTriangle,
  Check,
  ArrowRight,
} from 'lucide-react';

const securityPillars = [
  {
    icon: Lock,
    title: 'Row-Level Security',
    desc: 'Every database query is scoped to the authenticated tenant. RLS policies prevent data leaks even in the event of application-level bugs.',
    iconColor: 'bg-gradient-to-br from-indigo-500 to-purple-500',
  },
  {
    icon: Eye,
    title: 'Audit Logging',
    desc: 'Every sensitive operation is logged with actor, timestamp, action, and before/after state. Immutable audit trails with 90-day retention.',
    iconColor: 'bg-gradient-to-br from-cyan-500 to-blue-500',
  },
  {
    icon: FileCheck,
    title: 'GDPR Compliance',
    desc: 'Automated data deletion pipelines. Transcripts purged at 30 days, audit logs at 90 days. Full data export on request within 48 hours.',
    iconColor: 'bg-gradient-to-br from-green-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'CSP & HSTS',
    desc: 'Content Security Policy prevents XSS and injection attacks. HSTS ensures all connections are encrypted. No mixed content, ever.',
    iconColor: 'bg-gradient-to-br from-amber-500 to-red-500',
  },
  {
    icon: Key,
    title: 'AI Prompt Governance',
    desc: 'All AI prompts are version-controlled and reviewed. System prompts are immutable in production. User inputs are validated and sanitized.',
    iconColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
  },
  {
    icon: Database,
    title: 'Data Isolation',
    desc: 'Tenant data is logically isolated at the database level. Encryption at rest (AES-256) and in transit (TLS 1.3). No shared state between tenants.',
    iconColor: 'bg-gradient-to-br from-orange-500 to-amber-500',
  },
];

const certifications = [
  { label: 'SOC 2 Type II', status: 'Certified', icon: FileCheck },
  { label: 'GDPR', status: 'Compliant', icon: Globe },
  { label: 'WCAG 2.1 AA', status: 'Compliant', icon: UserCheck },
  { label: 'ISO 27001', status: 'In Progress', icon: Shield },
];

const practices = [
  'All data encrypted at rest (AES-256) and in transit (TLS 1.3)',
  'Parameterized database access — no raw SQL interpolation',
  'Zod validation at all user-controlled boundaries',
  'Regular penetration testing by independent third parties',
  'Automated vulnerability scanning in CI/CD pipeline',
  'Principle of least privilege for all service accounts',
  'Multi-factor authentication available for all users',
  'Infrastructure-as-code with change auditing',
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 sm:py-40 px-4 text-center overflow-hidden">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 30%, var(--color-primary) 0%, transparent 70%)',
          }}
          aria-hidden
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Certification Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold uppercase tracking-wider text-[var(--color-success)] bg-[var(--color-success)] bg-opacity-10 rounded-full">
            <Shield className="w-3.5 h-3.5" />
            SOC 2 Type II Certified
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 leading-tight">
            Security you can <span className="text-gradient">trust</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Enterprise-grade security is not an add-on — it&apos;s built into every layer of Nexus AI, from database isolation to AI prompt governance.
          </p>
        </div>
      </section>

      {/* Certifications Bar */}
      <section className="py-8 px-4 bg-[var(--color-bg-subtle)]">
        <div className="container-page">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map(cert => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.label}
                  className="flex items-center gap-3 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg"
                >
                  <Icon className="w-6 h-6 text-[var(--color-success)] flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-[var(--color-text)]">
                      {cert.label}
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        cert.status === 'In Progress'
                          ? 'text-[var(--color-text-muted)]'
                          : 'text-[var(--color-success)]'
                      }`}
                    >
                      {cert.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Pillars */}
      <section className="section-padding bg-[var(--color-bg-subtle)]">
        <div className="container-page">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
              Six pillars of <span className="text-gradient">protection</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
              Defense in depth — every layer is hardened, monitored, and regularly tested.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityPillars.map(pillar => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="flex flex-col gap-4 p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-primary)] transition-colors"
                >
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-white ${pillar.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="section-padding">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Security <span className="text-gradient">best practices</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                We follow industry best practices and regularly update our security posture based on threat intelligence and compliance requirements.
              </p>
              <a
                href="/demo"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:gap-3 transition-all"
              >
                Request security whitepaper
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right: Checklist */}
            <div className="space-y-3">
              {practices.map(practice => (
                <div key={practice} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {practice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="section-padding bg-[var(--color-bg-subtle)]">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
            <AlertTriangle className="w-10 h-10 text-amber-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">
                Responsible Disclosure
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Found a vulnerability? We appreciate responsible disclosure and offer a bug bounty program for qualifying reports.
              </p>
            </div>
            <a
              href="mailto:security@nexusai.dev"
              className="btn btn-primary flex-shrink-0"
            >
              Report a Vulnerability
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
