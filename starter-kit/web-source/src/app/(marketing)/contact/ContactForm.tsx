'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useZodForm } from '@/hooks/useZodForm';
import { CheckCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['Developer', 'Product Manager', 'Executive', 'Other'], {
    errorMap: () => ({ message: 'Please select your role' }),
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useZodForm(contactSchema, {
    name: '',
    company: '',
    email: '',
    role: 'Developer' as any,
    message: '',
  });

  const onSubmit = form.submit(async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Submission failed');

      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  });

  if (isSuccess) {
    return (
      <div className="py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-16 h-16 bg-[var(--color-success)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-[var(--color-success)]" size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-2">Message received!</h3>
        <p className="text-[var(--color-text-secondary)] mb-8">
          Thanks for reaching out. A member of our team will contact you soon.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="btn border border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-[var(--color-text-secondary)]">Name</label>
          <input
            id="name"
            {...form.register('name')}
            placeholder="John Doe"
            className={`form-input w-full ${form.fieldError('name') ? 'border-[var(--color-danger)]' : ''}`}
          />
          {form.fieldError('name') && <p className="text-xs text-[var(--color-danger)]">{form.fieldError('name')}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-semibold text-[var(--color-text-secondary)]">Company</label>
          <input
            id="company"
            {...form.register('company')}
            placeholder="Acme Corp"
            className={`form-input w-full ${form.fieldError('company') ? 'border-[var(--color-danger)]' : ''}`}
          />
          {form.fieldError('company') && <p className="text-xs text-[var(--color-danger)]">{form.fieldError('company')}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-[var(--color-text-secondary)]">Email</label>
          <input
            id="email"
            type="email"
            {...form.register('email')}
            placeholder="john@company.com"
            className={`form-input w-full ${form.fieldError('email') ? 'border-[var(--color-danger)]' : ''}`}
          />
          {form.fieldError('email') && <p className="text-xs text-[var(--color-danger)]">{form.fieldError('email')}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-semibold text-[var(--color-text-secondary)]">Role</label>
          <select
            id="role"
            {...form.register('role')}
            className={`form-input w-full ${form.fieldError('role') ? 'border-[var(--color-danger)]' : ''}`}
          >
            <option value="Developer">Developer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Executive">Executive</option>
            <option value="Other">Other</option>
          </select>
          {form.fieldError('role') && <p className="text-xs text-[var(--color-danger)]">{form.fieldError('role')}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-[var(--color-text-secondary)]">Message</label>
        <textarea
          id="message"
          {...form.register('message')}
          rows={4}
          placeholder="How can we help you?"
          className={`form-input w-full resize-none ${form.fieldError('message') ? 'border-[var(--color-danger)]' : ''}`}
        />
        {form.fieldError('message') && <p className="text-xs text-[var(--color-danger)]">{form.fieldError('message')}</p>}
      </div>

      <button
        type="submit"
        disabled={form.isSubmitting}
        className="btn btn-primary w-full py-4 text-lg font-bold disabled:opacity-50"
      >
        {form.isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
