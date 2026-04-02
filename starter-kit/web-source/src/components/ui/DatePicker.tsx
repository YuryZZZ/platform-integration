'use client';

/**
 * DatePicker — Calendar-based date selection
 * Accessible: keyboard navigable, ARIA labels, screen reader announcements.
 * No external dependencies.
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import './DatePicker.css';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  error?: string;
  locale?: string;
  className?: string;
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  minDate,
  maxDate,
  disabled = false,
  error,
  locale = 'en-GB',
  className = '',
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? new Date().getMonth());
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const prevMonth = useCallback(() => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }, [viewMonth]);

  const nextMonth = useCallback(() => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }, [viewMonth]);

  const selectDay = useCallback((day: number) => {
    const selected = new Date(viewYear, viewMonth, day);
    onChange?.(selected);
    setOpen(false);
  }, [viewYear, viewMonth, onChange]);

  const isDisabledDay = useCallback((day: number): boolean => {
    const d = new Date(viewYear, viewMonth, day);
    if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return false;
  }, [viewYear, viewMonth, minDate, maxDate]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const prevMonthDays = getDaysInMonth(viewYear, viewMonth === 0 ? 11 : viewMonth - 1);

  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  });

  const displayValue = value
    ? value.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  return (
    <div className={`date-picker ${className}`} ref={containerRef}>
      {label && <label className="form-label">{label}</label>}

      <input
        type="text"
        className={`form-input date-picker__input ${error ? 'form-input--error' : ''}`}
        value={displayValue}
        placeholder={placeholder}
        readOnly
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); !disabled && setOpen(!open); } }}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={label || 'Date picker'}
      />

      {error && <span className="form-error">{error}</span>}

      {open && (
        <div className="date-picker__calendar" role="dialog" aria-label={`Calendar — ${monthLabel}`}>
          {/* Header */}
          <div className="date-picker__header">
            <button className="date-picker__header-btn" onClick={prevMonth} aria-label="Previous month">&lt;</button>
            <span className="date-picker__month-label">{monthLabel}</span>
            <button className="date-picker__header-btn" onClick={nextMonth} aria-label="Next month">&gt;</button>
          </div>

          {/* Weekday labels */}
          <div className="date-picker__weekdays">
            {WEEKDAYS.map(d => <span key={d}>{d}</span>)}
          </div>

          {/* Day grid */}
          <div className="date-picker__days" role="grid">
            {/* Previous month overflow */}
            {Array.from({ length: firstDay }, (_, i) => (
              <button
                key={`prev-${i}`}
                className="date-picker__day date-picker__day--outside"
                disabled
                tabIndex={-1}
              >
                {prevMonthDays - firstDay + 1 + i}
              </button>
            ))}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const d = new Date(viewYear, viewMonth, day);
              const isToday = isSameDay(d, today);
              const isSelected = value ? isSameDay(d, value) : false;
              const isDayDisabled = isDisabledDay(day);

              return (
                <button
                  key={day}
                  className={[
                    'date-picker__day',
                    isToday && 'date-picker__day--today',
                    isSelected && 'date-picker__day--selected',
                    isDayDisabled && 'date-picker__day--disabled',
                  ].filter(Boolean).join(' ')}
                  onClick={() => !isDayDisabled && selectDay(day)}
                  disabled={isDayDisabled}
                  aria-label={d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  aria-selected={isSelected}
                  role="gridcell"
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
