import { useEffect, useRef } from 'react';

export function useTitle(title: string): void {
  const previousTitle = useRef<string>(document.title);

  useEffect(() => {
    const original = previousTitle.current;
    document.title = title;
    
    return () => {
      document.title = original;
    };
  }, [title]);
}
