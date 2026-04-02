// @ts-nocheck
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Notification } from '../Notification';

describe('Notification', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders message correctly', () => {
    render(<Notification message="Test notification" />);
    expect(screen.getByText('Test notification')).toBeInTheDocument();
  });

  it('applies type variants', () => {
    const { rerender } = render(<Notification message="Test" type="success" />);
    expect(screen.getByRole('alert')).toHaveClass('notification-success');
    
    rerender(<Notification message="Test" type="error" />);
    expect(screen.getByRole('alert')).toHaveClass('notification-error');
    
    rerender(<Notification message="Test" type="warning" />);
    expect(screen.getByRole('alert')).toHaveClass('notification-warning');
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<Notification message="Test" onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('auto-closes after duration', async () => {
    const onClose = vi.fn();
    render(<Notification message="Test" duration={3000} onClose={onClose} />);
    vi.advanceTimersByTime(3000);
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('has alert role for accessibility', () => {
    render(<Notification message="Test" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
