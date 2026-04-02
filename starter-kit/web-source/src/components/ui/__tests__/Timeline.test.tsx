// @ts-nocheck
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline, TimelineItem } from '../Timeline';

describe('Timeline', () => {
  it('renders children correctly', () => {
    render(
      <Timeline>
        <TimelineItem>Event 1</TimelineItem>
        <TimelineItem>Event 2</TimelineItem>
      </Timeline>
    );
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
  });

  it('applies className prop', () => {
    render(<Timeline className="custom-timeline"><div>Test</div></Timeline>);
    expect(screen.getByRole('list')).toHaveClass('custom-timeline');
  });

  it('has list role for accessibility', () => {
    render(<Timeline><div>Test</div></Timeline>);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});

describe('TimelineItem', () => {
  it('renders children correctly', () => {
    render(<TimelineItem>Timeline Item Content</TimelineItem>);
    expect(screen.getByText('Timeline Item Content')).toBeInTheDocument();
  });

  it('applies position prop', () => {
    const { rerender } = render(<TimelineItem position="left">Left Item</TimelineItem>);
    expect(screen.getByRole('listitem')).toHaveClass('timeline-item-left');
    
    rerender(<TimelineItem position="right">Right Item</TimelineItem>);
    expect(screen.getByRole('listitem')).toHaveClass('timeline-item-right');
  });

  it('applies className prop', () => {
    render(<TimelineItem className="custom-item">Test</TimelineItem>);
    expect(screen.getByRole('listitem')).toHaveClass('custom-item');
  });

  it('has listitem role for accessibility', () => {
    render(<TimelineItem>Test</TimelineItem>);
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });
});
