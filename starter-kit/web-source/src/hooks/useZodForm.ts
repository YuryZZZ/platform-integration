'use client';

/**
 * useZodForm — Zod-powered form hook with server action support.
 *
 * Wraps React state + Zod validation for instant client-side feedback
 * and structured error messages on submit.
 *
 * Usage:
 *   const form = useZodForm(contactSchema, { name: '', email: '' });
 *   <input {...form.register('name')} />
 *   {form.fieldError('name') && <span>{form.fieldError('name')}</span>}
 *   <button disabled={form.isSubmitting} onClick={form.submit(handleSubmit)} />
 */

import { useState, useCallback } from 'react';
import { z, ZodError, type ZodSchema } from 'zod';

export interface ZodFormReturn<T extends Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  globalError: string | null;
  isSubmitting: boolean;
  isValid: boolean;
  touched: Partial<Record<keyof T, boolean>>;

  /** Get input props for a field */
  register: (field: keyof T) => {
    name: string;
    value: string | number | readonly string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: () => void;
  };

  /** Get the first error message for a field (only if touched) */
  fieldError: (field: keyof T) => string | undefined;

  /** Submit handler — validates, then calls your async function */
  submit: (handler: (data: T) => Promise<void> | void) => (e?: React.FormEvent) => Promise<void>;

  /** Set a single field value programmatically */
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;

  /** Set a server-side error on a specific field */
  setError: (field: keyof T, message: string) => void;

  /** Set a global (non-field) error */
  setGlobalError: (message: string | null) => void;

  /** Reset form to initial values */
  reset: () => void;
}

export function useZodForm<T extends Record<string, unknown>>(
  schema: ZodSchema<T>,
  initialValues: T,
): ZodFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (field: keyof T, value: unknown) => {
      try {
        // Validate the full object so cross-field rules work
        schema.parse({ ...values, [field]: value });
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      } catch (err) {
        if (err instanceof ZodError) {
          const fieldIssue = err.issues.find((i) => i.path[0] === field);
          if (fieldIssue) {
            setErrors((prev) => ({ ...prev, [field]: fieldIssue.message }));
          } else {
            setErrors((prev) => {
              const next = { ...prev };
              delete next[field];
              return next;
            });
          }
        }
      }
    },
    [schema, values],
  );

  const register = useCallback(
    (field: keyof T) => ({
      name: field as string,
      value: (values[field] ?? '') as string | number | readonly string[],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const val = e.target.type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
        setValues((prev) => ({ ...prev, [field]: val }));
        // Clear error on type
        if (errors[field]) {
          setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
          });
        }
      },
      onBlur: () => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        validateField(field, values[field]);
      },
    }),
    [values, errors, validateField],
  );

  const fieldError = useCallback(
    (field: keyof T): string | undefined => {
      return touched[field] ? errors[field] : undefined;
    },
    [errors, touched],
  );

  const submit = useCallback(
    (handler: (data: T) => Promise<void> | void) => async (e?: React.FormEvent) => {
      e?.preventDefault();
      setGlobalError(null);

      // Mark all fields touched
      const allTouched = Object.keys(values).reduce(
        (acc, k) => ({ ...acc, [k]: true }),
        {} as Record<keyof T, boolean>,
      );
      setTouched(allTouched);

      // Validate
      const result = schema.safeParse(values);
      if (!result.success) {
        const newErrors: Partial<Record<keyof T, string>> = {};
        for (const issue of result.error.issues) {
          const field = issue.path[0] as keyof T;
          if (!newErrors[field]) {
            newErrors[field] = issue.message;
          }
        }
        setErrors(newErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        await handler(result.data);
      } catch (err) {
        setGlobalError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, schema],
  );

  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setError = useCallback((field: keyof T, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setGlobalError(null);
    setIsSubmitting(false);
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    globalError,
    isSubmitting,
    isValid,
    touched,
    register,
    fieldError,
    submit,
    setValue,
    setError,
    setGlobalError,
    reset,
  };
}

export default useZodForm;
