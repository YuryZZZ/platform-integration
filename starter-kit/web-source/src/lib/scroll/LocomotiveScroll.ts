export interface LocomotiveScrollConfig {
  el?: HTMLElement | Window;
  smooth?: boolean;
  multiplier?: number;
  lerp?: number;
}

export interface ScrollState {
  x: number;
  y: number;
  limit: { x: number; y: number };
  progress: number;
  direction: 'up' | 'down' | null;
  speed: number;
}

export type ScrollCallback = (state: ScrollState) => void;

const DEFAULT_EASING = (t: number) => 1 - Math.pow(1 - t, 3);

export class LocomotiveScroll {
  private scroll = { x: 0, y: 0 };
  private velocity = { x: 0, y: 0 };
  private limit = { x: 0, y: 0 };
  private direction: 'up' | 'down' | null = null;
  private speed = 0;
  private isScrolling = false;
  private isRunning = false;
  private rafId: number | null = null;
  private lastScroll = 0;
  private callbacks: ScrollCallback[] = [];

  constructor(private config: LocomotiveScrollConfig = {}) {
    this.init();
  }

  private init(): void {
    this.updateLimit();
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('resize', this.onResize, { passive: true });
    this.start();
  }

  private handleScroll = (): void => {
    if (!this.config.smooth) {
      this.scroll.y = window.scrollY;
      this.scroll.x = window.scrollX;
      this.notify();
    }
  };

  private onWheel = (e: WheelEvent): void => {
    if (!this.config.smooth) return;
    e.preventDefault();
    const delta = e.deltaY * (this.config.multiplier || 1);
    this.velocity.y += delta;
    if (!this.isScrolling) {
      this.isScrolling = true;
      document.documentElement.classList.add('is-scrolling');
    }
    if (!this.isRunning) this.start();
  };

  private onResize = (): void => {
    this.updateLimit();
  };

  private updateLimit(): void {
    this.limit.x = document.documentElement.scrollWidth - window.innerWidth;
    this.limit.y = document.documentElement.scrollHeight - window.innerHeight;
  }

  private start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  private stop(): void {
    this.isRunning = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private animate = (): void => {
    if (!this.isRunning) return;
    this.velocity.y *= (1 - (this.config.lerp || 0.1));
    this.velocity.x *= (1 - (this.config.lerp || 0.1));
    this.scroll.y += this.velocity.y;
    this.scroll.x += this.velocity.x;
    this.scroll.y = Math.max(0, Math.min(this.scroll.y, this.limit.y));
    this.scroll.x = Math.max(0, Math.min(this.scroll.x, this.limit.x));
    if (Math.abs(this.velocity.y) < 0.1 && Math.abs(this.velocity.x) < 0.1) {
      this.velocity.y = 0;
      this.velocity.x = 0;
      if (this.isScrolling) {
        this.isScrolling = false;
        document.documentElement.classList.remove('is-scrolling');
      }
    }
    window.scrollTo(this.scroll.x, this.scroll.y);
    this.updateDirection();
    this.updateSpeed();
    this.notify();
    this.rafId = requestAnimationFrame(() => this.animate());
  };

  private updateDirection(): void {
    if (this.scroll.y > this.lastScroll) this.direction = 'down';
    else if (this.scroll.y < this.lastScroll) this.direction = 'up';
    else this.direction = null;
    this.lastScroll = this.scroll.y;
  }

  private updateSpeed(): void {
    this.speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
  }

  private notify(): void {
    const state: ScrollState = {
      ...this.scroll,
      limit: this.limit,
      progress: this.limit.y > 0 ? this.scroll.y / this.limit.y : 0,
      direction: this.direction,
      speed: this.speed,
    };
    this.callbacks.forEach(cb => cb(state));
  }

  onScroll(callback: ScrollCallback): () => void {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) this.callbacks.splice(index, 1);
    };
  }

  scrollTo(y: number, duration: number = 1000): void {
    const start = this.scroll.y;
    const diff = y - start;
    const startTime = performance.now();
    const animate = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      this.scroll.y = start + diff * DEFAULT_EASING(progress);
      window.scrollTo(this.scroll.x, this.scroll.y);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  destroy(): void {
    this.stop();
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('resize', this.onResize);
  }
}
