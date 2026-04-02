export interface ScrollTriggerConfig {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface ScrollTriggerEntry {
  el: HTMLElement;
  onEnter?: () => void;
  onLeave?: () => void;
  onProgress?: (progress: number) => void;
}

export class ScrollTrigger {
  private observers: Map<HTMLElement, IntersectionObserver> = new Map();
  private entries: Map<HTMLElement, ScrollTriggerEntry> = new Map();
  private triggeredElements: Set<HTMLElement> = new Set();

  register(entry: ScrollTriggerEntry, config: ScrollTriggerConfig = {}): void {
    const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = config;
    this.entries.set(entry.el, entry);
    
    const thresholds = Array.isArray(threshold) ? threshold : [threshold];
    
    const observer = new IntersectionObserver(
      (obsEntries) => {
        obsEntries.forEach((obsEntry) => {
          const el = obsEntry.target as HTMLElement;
          const entryData = this.entries.get(el);
          
          if (!entryData) return;
          
          if (obsEntry.isIntersecting) {
            if (triggerOnce && this.triggeredElements.has(el)) return;
            
            entryData.onEnter?.();
            
            if (obsEntry.intersectionRatio !== undefined) {
              entryData.onProgress?.(obsEntry.intersectionRatio);
            }
            
            if (triggerOnce) {
              this.triggeredElements.add(el);
            }
          } else {
            if (!triggerOnce || !this.triggeredElements.has(el)) {
              entryData.onLeave?.();
            }
          }
        });
      },
      { threshold: thresholds, rootMargin }
    );
    
    observer.observe(entry.el);
    this.observers.set(entry.el, observer);
  }

  unregister(el: HTMLElement): void {
    const observer = this.observers.get(el);
    if (observer) {
      observer.disconnect();
      this.observers.delete(el);
    }
    this.entries.delete(el);
    this.triggeredElements.delete(el);
  }

  updateProgress(el: HTMLElement, callback: (progress: number) => void): void {
    const entry = this.entries.get(el);
    if (entry) {
      entry.onProgress = callback;
    }
  }

  isVisible(el: HTMLElement): boolean {
    const observer = this.observers.get(el);
    if (!observer) return false;
    
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  }

  destroy(): void {
    this.observers.forEach(obs => obs.disconnect());
    this.observers.clear();
    this.entries.clear();
    this.triggeredElements.clear();
  }
}
