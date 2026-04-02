'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useZodForm } from '@/hooks/useZodForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useZodForm(contactSchema, {
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSend = form.submit(async (data) => {
    // Simulate a brief delay for user feedback
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSubmitted(true);
    // Form will auto-reset by calling form.reset() in the success state
  });

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
      text: '+44 (0) 20 1234 5678',
      href: 'tel:+442012345678',
    },
    {
      icon: MapPin,
      title: 'Office',
      text: 'London, United Kingdom',
      href: '#',
    },
    {
      icon: Clock,
      title: 'Response Time',
      text: 'Within 24 hours',
      href: '#',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse,_var(--color-primary)_0%,_transparent_70%)] opacity-5 blur-[40px]" />
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Get In{' '}
            <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,_var(--color-primary-light),_var(--color-primary))]">
              Touch
            </span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-lg mx-auto">
            Questions about Nexus AI? Want a demo? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container-page pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="card flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full mb-6 flex items-center justify-center text-2xl bg-[var(--color-success)]">
                  ✓
                </div>
                <h2 className="text-2xl font-bold mb-2 text-[var(--color-text)]">
                  Message Sent!
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-8">
                  Thanks for reaching out. We&apos;ll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    form.reset();
                  }}
                  className="btn border-[var(--color-border)] text-[var(--color-text)]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend} noValidate className="card">
                {form.globalError && (
                  <div
                    className="p-4 rounded-lg mb-6 border text-sm font-medium bg-[var(--color-danger)] bg-opacity-10 border-[var(--color-danger)] border-opacity-20 text-[var(--color-danger)]"
                    role="alert"
                  >
                    {form.globalError}
                  </div>
                )}

                {/* Name Field */}
                <div className="mb-6">
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold mb-2 text-[var(--color-text-secondary)]"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your full name"
                    className={`form-input ${form.fieldError('name') ? 'form-input--error' : ''}`}
                    {...form.register('name')}
                  />
                  {form.fieldError('name') && (
                    <p className="form-error">{form.fieldError('name')}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-6">
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold mb-2 text-[var(--color-text-secondary)]"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    className={`form-input ${form.fieldError('email') ? 'form-input--error' : ''}`}
                    {...form.register('email')}
                  />
                  {form.fieldError('email') && (
                    <p className="form-error">{form.fieldError('email')}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div className="mb-6">
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-semibold mb-2 text-[var(--color-text-secondary)]"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="What is this about?"
                    className={`form-input ${form.fieldError('subject') ? 'form-input--error' : ''}`}
                    {...form.register('subject')}
                  />
                  {form.fieldError('subject') && (
                    <p className="form-error">{form.fieldError('subject')}</p>
                  )}
                </div>

                {/* Message Field */}
                <div className="mb-8">
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold mb-2 text-[var(--color-text-secondary)]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    placeholder="Tell us about your project..."
                    className={`form-input resize-none ${form.fieldError('message') ? 'form-input--error' : ''}`}
                    {...form.register('message')}
                  />
                  {form.fieldError('message') && (
                    <p className="form-error">{form.fieldError('message')}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={form.isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {form.isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <a
                  key={info.title}
                  href={info.href}
                  className="card block group hover:border-[var(--color-primary)] transition-colors duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg flex-shrink-0 bg-[var(--color-bg-subtle)]">
                      <Icon size={20} className="text-[var(--color-primary)]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold mb-1 text-[var(--color-text)]">
                        {info.title}
                      </h3>
                      <p className="text-sm break-all text-[var(--color-text-secondary)]">
                        {info.text}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}