import { useRef, useState, useEffect } from 'react';
import './Collapse.css';

interface CollapseProps {
  isOpen?: boolean;
  children: React.ReactNode;
  duration?: number;
}

export function Collapse({ isOpen = false, children, duration = 300 }: CollapseProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current?.scrollHeight);
      const timer = setTimeout(() => setHeight(undefined), duration);
      return () => clearTimeout(timer);
    } else {
      setHeight(contentRef.current?.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [isOpen, duration]);

  return (
    <div
      className="collapse"
      style={{
        height,
        overflow: 'hidden',
        transition: `height ${duration}ms ease`
      }}
      ref={contentRef}
    >
      {children}
    </div>
  );
}
