export interface MagneticConfig {
  strength?: number;
  radius?: number;
  easing?: number;
}

export interface MagneticState {
  x: number;
  y: number;
  distance: number;
}

export class MagneticField {
  private elements: Map<HTMLElement, MagneticConfig> = new Map();
  private positions: Map<HTMLElement, MagneticState> = new Map();
  private cursorPos = { x: 0, y: 0 };
  private rafId: number | null = null;

  constructor() {
    window.addEventListener('mousemove', this.onMouseMove);
  }

  private onMouseMove = (e: MouseEvent): void => {
    this.cursorPos.x = e.clientX;
    this.cursorPos.y = e.clientY;
  }

  register(el: HTMLElement, config: MagneticConfig = {}): void {
    this.elements.set(el, { strength: 0.3, radius: 200, easing: 0.15, ...config });
    this.positions.set(el, { x: 0, y: 0, distance: 0 });
    if (!this.rafId) this.start();
  }

  unregister(el: HTMLElement): void {
    this.elements.delete(el);
    this.positions.delete(el);
    if (this.elements.size === 0) this.stop();
  }

  private start(): void {
    const animate = () => {
      this.elements.forEach((config, el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          (this.cursorPos.x - centerX) ** 2 +
          (this.cursorPos.y - centerY) ** 2
        );
        const state = this.positions.get(el)!;
        if (distance < config.radius!) {
          const factor = (1 - distance / config.radius!) * config.strength!;
          state.x += ((this.cursorPos.x - centerX) * factor - state.x) * config.easing!;
          state.y += ((this.cursorPos.y - centerY) * factor - state.y) * config.easing!;
          state.distance = distance;
        } else {
          state.x += (0 - state.x) * config.easing!;
          state.y += (0 - state.y) * config.easing!;
          state.distance = distance;
        }
        el.style.transform = `translate(${state.x}px, ${state.y}px)`;
      });
      this.rafId = requestAnimationFrame(animate);
    };
    this.rafId = requestAnimationFrame(animate);
  }

  private stop(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  destroy(): void {
    this.stop();
    window.removeEventListener('mousemove', this.onMouseMove);
  }
}
