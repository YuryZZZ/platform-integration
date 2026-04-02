/**
 * JsonLd — Inject structured data into page <head>.
 *
 * Usage:
 *   <JsonLd data={organizationJsonLd()} />
 *   <JsonLd data={faqJsonLd({ questions: [...] })} />
 */

import React from 'react';

interface JsonLdProps {
  /** Stringified JSON-LD data (from the seo/metadata helpers) */
  data: string;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
