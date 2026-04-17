import type { Metadata } from 'next';
import React from 'react';
import { Mail, Phone, MapPin, Clock, Shield, CheckCircle2 } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Have questions about Nexus AI? Our team is here to help you build the future.',
};

const valueProps = [
  {
    icon: Shield,
    title: 'Enterprise-ready',
    desc: 'Dedicated support for large-scale deployments and compliance.',
  },
  {
    icon: CheckCircle2,
    title: 'Expert Guidance',
    desc: 'Work with our AI architects to design your perfect workflow.',
  },
];

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    text: 'hello@nexus-ai.com',
    href: 'mailto:hello@nexus-ai.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    text: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    title: 'Office',
    text: '123 Innovation Way, San Francisco, CA',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Response Time',
    text: 'Under 24 hours',
    href: '#',
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-24 px-4 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
          Get in <span className="text-gradient">touch</span>
        </h1>
        <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Whether you&apos;re looking for a custom demo, have technical questions, or just want to say hi — we&apos;re all ears.
        </p>
      </section>

      <Section variant="default" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Value Props & Info */}
          <div>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-8">Why talk to us?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {valueProps.map((prop, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-[var(--color-bg-subtle)] rounded-2xl border border-[var(--color-border)]">
                    <div className="p-3 bg-[var(--color-primary)] bg-opacity-10 rounded-xl h-fit">
                      <prop.icon className="text-[var(--color-primary)]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{prop.title}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)]">{prop.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, i) => (
                <a
                  key={i}
                  href={info.href}
                  className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-primary)] transition-colors group"
                >
                  <info.icon className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] mb-4 transition-colors" size={20} />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">{info.title}</h4>
                  <p className="font-medium text-[var(--color-text)]">{info.text}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-[var(--color-surface)] p-8 sm:p-10 rounded-3xl border border-[var(--color-border)] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-5 blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Send a message</h3>
              <p className="text-[var(--color-text-secondary)] mb-8">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
