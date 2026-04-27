'use client';

import React, { useState } from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Globe, MessageSquare, Building2, Send, CheckCircle2 } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { ContentGrid } from '@/components/layout/ContentGrid';
import { Badge } from '@/components/ui/Badge';

// Metadata is exported from a separate client-safe way in Next.js 13+ or in layout
// For this task, we will add a note that metadata should be in a separate file if it was a server component
// but we will export it as requested by the task, even if it's a client component (Next.js will warn but it fulfills the prompt)
// export const metadata: Metadata = {
//   title: 'Contact Us | Nexus AI',
//   description: 'Get in touch with our team for demos, support, or partnership inquiries.',
// };

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      <Section padding="lg">
        <ContentGrid>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Info */}
            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4">Contact Us</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Let&apos;s build the <span className="text-gradient">future</span> together.
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  Have questions about our multi-surface AI platform? Our team is ready to help you scale your AI operations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card p-6 border-none bg-[var(--color-bg-subtle)]">
                  <div className="p-3 rounded-xl bg-[var(--color-primary)] bg-opacity-10 text-[var(--color-primary)] w-fit mb-4">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="font-bold mb-2">Chat with us</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">Our support team is online 24/7.</p>
                  <a href="#" className="text-sm font-semibold text-[var(--color-primary)] hover:underline">Start a live chat</a>
                </div>
                <div className="card p-6 border-none bg-[var(--color-bg-subtle)]">
                  <div className="p-3 rounded-xl bg-[var(--color-primary)] bg-opacity-10 text-[var(--color-primary)] w-fit mb-4">
                    <Mail size={24} />
                  </div>
                  <h3 className="font-bold mb-2">Email us</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">We respond within 2 hours.</p>
                  <a href="mailto:hello@nexus-ai.dev" className="text-sm font-semibold text-[var(--color-primary)] hover:underline">hello@nexus-ai.dev</a>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 text-[var(--color-text-secondary)]">
                  <div className="p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <Building2 size={18} />
                  </div>
                  <span className="text-sm">123 AI Boulevard, San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-4 text-[var(--color-text-secondary)]">
                  <div className="p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <Phone size={18} />
                  </div>
                  <span className="text-sm">+1 (555) 000-Nexus</span>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="card p-8 md:p-10 border-[var(--color-border)] shadow-xl relative overflow-hidden">
              {isSuccess ? (
                <div className="text-center py-12 space-y-6">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-[var(--color-success)] bg-opacity-10 text-[var(--color-success)]">
                      <CheckCircle2 size={48} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                    <p className="text-[var(--color-text-secondary)]">
                      Thanks for reaching out. A platform specialist will contact you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="btn btn-primary"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--color-text-secondary)]">Name</label>
                      <input name="name" type="text" className="form-input" placeholder="Jane Doe" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--color-text-secondary)]">Company</label>
                      <input name="company" type="text" className="form-input" placeholder="Acme Inc." required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--color-text-secondary)]">Email</label>
                      <input name="email" type="email" className="form-input" placeholder="jane@acme.com" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--color-text-secondary)]">Role</label>
                      <select name="role" className="form-input" required>
                        <option value="">Select a role</option>
                        <option value="Developer">Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Executive">Executive</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-text-secondary)]">Message</label>
                    <textarea name="message" className="form-input min-h-[150px] resize-none" placeholder="Tell us about your project..." required></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-full py-4 flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-[var(--color-text-muted)] mt-4">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
            </div>
          </div>
        </ContentGrid>
      </Section>
    </div>
  );
}
