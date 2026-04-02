/**
 * useForm Hook
 * Form state management with validation
 */

import { useState, useCallback, useMemo, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';

// ─── Inlined validation types (no backend dependency) ────
export type Validator = (value: unknown) => { valid: boolean; errors: string[] };

export interface FieldSchema {
  required?: boolean;
  validators: Validator[];
}

export type HandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
export type HandleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
export type HandleSubmit = (e: FormEvent<HTMLFormElement>) => void;

export interface FormState<T> {
  values: T;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
}

export interface UseFormReturn<T extends Record<string, unknown>> extends FormState<T> {
  handleChange: HandleChange;
  handleBlur: HandleBlur;
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => HandleSubmit;
  reset: () => void;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setFieldError: (field: string, errors: string[]) => void;
  validateField: (field: string) => string[];
  validateForm: () => boolean;
  getFieldProps: (field: string) => { value: unknown; onChange: HandleChange; onBlur: HandleBlur };
}

/**
 * Options for useForm hook
 */
interface UseFormOptions<T extends Record<string, unknown>> {
  schema?: Record<string, FieldSchema>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

/**
 * Validate a single field using its schema
 */
const validateFieldWithValue = (
  value: unknown,
  fieldSchema: FieldSchema | undefined
): string[] => {
  if (!fieldSchema) return [];

  const errors: string[] = [];

  // Check required first
  if (fieldSchema.required) {
    const requiredValidator: Validator = (v) => {
      if (v === null || v === undefined) return { valid: false, errors: ['Required'] };
      if (typeof v === 'string' && v.trim() === '') return { valid: false, errors: ['Required'] };
      if (Array.isArray(v) && v.length === 0) return { valid: false, errors: ['Required'] };
      return { valid: true, errors: [] };
    };
    const result = requiredValidator(value);
    if (!result.valid) {
      errors.push(...result.errors);
      return errors; // Don't run other validators if required fails
    }
  }

  // Run all validators
  for (const validator of fieldSchema.validators) {
    const result = validator(value);
    if (!result.valid) {
      errors.push(...result.errors);
    }
  }

  return errors;
};

/**
 * useForm - Form state management hook with validation
 */
export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  options: UseFormOptions<T> = {}
): UseFormReturn<T> {
  const {
    schema = {},
    validateOnChange = false,
    validateOnBlur = true,
  } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validate a single field and return errors
   */
  const validateField = useCallback(
    (field: string): string[] => {
      const value = values[field as keyof T];
      const fieldSchema = schema[field];
      const fieldErrors = validateFieldWithValue(value, fieldSchema);
      
      setErrors((prev) => ({
        ...prev,
        [field]: fieldErrors,
      }));

      return fieldErrors;
    },
    [values, schema]
  );

  /**
   * Validate entire form
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string[]> = {};
    let isValid = true;

    for (const field of Object.keys(schema)) {
      const value = values[field as keyof T];
      const fieldSchema = schema[field];
      const fieldErrors = validateFieldWithValue(value, fieldSchema);
      
      if (fieldErrors.length > 0) {
        isValid = false;
        newErrors[field] = fieldErrors;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [values, schema]);

  /**
   * Handle input change
   */
  const handleChange: HandleChange = useCallback(
    (e) => {
      const { name, value, type } = e.target;
      const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

      setValues((prev) => ({
        ...prev,
        [name]: newValue,
      }));

      if (validateOnChange && schema[name]) {
        const fieldSchema = schema[name];
        const fieldErrors = validateFieldWithValue(newValue, fieldSchema);
        setErrors((prev) => ({
          ...prev,
          [name]: fieldErrors,
        }));
      } else if (errors[name]) {
        // Clear error on change
        setErrors((prev) => {
          const { [name]: _, ...rest } = prev;
          return rest;
        });
      }
    },
    [validateOnChange, schema, errors]
  );

  /**
   * Handle input blur
   */
  const handleBlur: HandleBlur = useCallback(
    (e) => {
      const { name } = e.target;

      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      if (validateOnBlur && schema[name]) {
        validateField(name);
      }
    },
    [validateOnBlur, schema, validateField]
  );

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void | Promise<void>): HandleSubmit => {
      return async (e) => {
        e.preventDefault();

        // Mark all fields as touched
        const allTouched: Record<string, boolean> = {};
        for (const field of Object.keys(schema)) {
          allTouched[field] = true;
        }
        setTouched(allTouched);

        // Validate all fields
        const isValid = validateForm();

        if (isValid) {
          setIsSubmitting(true);
          try {
            await onSubmit(values);
          } finally {
            setIsSubmitting(false);
          }
        }
      };
    },
    [values, schema, validateForm]
  );

  /**
   * Reset form to initial values
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Set a single field value programmatically
   */
  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  /**
   * Set field errors programmatically
   */
  const setFieldError = useCallback((field: string, fieldErrors: string[]) => {
    setErrors((prev) => ({
      ...prev,
      [field]: fieldErrors,
    }));
  }, []);

  /**
   * Get props for a field (for easy spreading)
   */
  const getFieldProps = useCallback(
    (field: string) => ({
      value: values[field as keyof T] ?? '',
      onChange: handleChange,
      onBlur: handleBlur,
    }),
    [values, handleChange, handleBlur]
  );

  /**
   * Compute if form is valid
   */
  const isValid = useMemo(() => {
    return Object.values(errors).every((fieldErrors) => fieldErrors.length === 0);
  }, [errors]);

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
    validateField,
    validateForm,
    getFieldProps,
  };
}

export default useForm;
