import { useState, useEffect, RefObject } from 'react';

/**
 * Hook that observes an element's intersection with a viewport or parent element.
 * Returns a boolean indicating if the element is currently visible (intersecting).
 * 
 * @param ref - React ref object pointing to the target element
 * @param options - IntersectionObserver options (threshold, root, rootMargin)
 * @returns Boolean indicating if the element is currently visible
 * 
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const isVisible = useIntersectionObserver(ref, { threshold: 0.5 });
 * 
 * return (
 *   <div ref={ref}>
 *     {isVisible ? 'Visible!' : 'Not visible'}
 *   </div>
 * );
 * 
 * @example // Lazy loading images
 * const imgRef = useRef<HTMLImageElement>(null);
 * const isVisible = useIntersectionObserver(imgRef);
 * 
 * return (
 *   <img ref={imgRef} src={isVisible ? actualSrc : placeholderSrc} />
 * );
 */
export function useIntersectionObserver<T extends HTMLElement>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit
): boolean {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const el = ref?.current;

    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [ref, options?.threshold, options?.root, options?.rootMargin]);

  return isIntersecting;
}

export default useIntersectionObserver;
