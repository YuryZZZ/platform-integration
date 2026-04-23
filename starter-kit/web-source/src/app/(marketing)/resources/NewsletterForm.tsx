'use client';

import React from 'react';
import { Newspaper } from 'lucide-react';

export default function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Thank you for subscribing!');
      }}
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="form-input flex-1"
        required
      />
      <button type="submit" className="btn btn-primary whitespace-nowrap">
        Subscribe
      </button>
    </form>
  );
}
