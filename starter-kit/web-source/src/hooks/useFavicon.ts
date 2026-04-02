import { useEffect, useRef } from 'react';

export function useFavicon(href: string): void {
  const previousHref = useRef<string | null>(null);

  useEffect(() => {
    const link: HTMLLinkElement = 
      document.querySelector("link[rel*='icon']") || 
      document.createElement('link');
    
    if (!document.querySelector("link[rel*='icon']")) {
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    
    previousHref.current = link.href;
    link.href = href;
    
    return () => {
      if (previousHref.current) {
        link.href = previousHref.current;
      }
    };
  }, [href]);
}
