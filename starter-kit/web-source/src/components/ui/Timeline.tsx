import React from 'react';
import './Timeline.css';

export interface TimelineItemProps {
  children: React.ReactNode;
  dot?: React.ReactNode;
  position?: 'left' | 'right';
}

export interface TimelineProps {
  children: React.ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return <div className="timeline">{children}</div>;
}

export function TimelineItem({ children, dot, position = 'left' }: TimelineItemProps) {
  return (
    <div className={`timeline__item timeline__item--${position}`}>
      <div className="timeline__dot">{dot || <span className="timeline__dot-default" />}</div>
      <div className="timeline__content">{children}</div>
    </div>
  );
}
