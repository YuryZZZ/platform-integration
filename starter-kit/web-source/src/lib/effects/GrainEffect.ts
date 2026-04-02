export type GrainDirection = 'static' | 'random' | 'horizontal' | 'vertical';
export type GrainStyle = 'monochrome' | 'color' | 'sepia';

export interface GrainConfig {
  intensity?: number;
  contrast?: number;
  size?: 'fine' | 'medium' | 'coarse';
  animated?: boolean;
  animationSpeed?: number;
  direction?: GrainDirection;
  style?: GrainStyle;
  fixed?: boolean;
}

export const defaultGrainConfig: Required<GrainConfig> = {
  intensity: 0.08,
  contrast: 1,
  size: 'fine',
  animated: true,
  animationSpeed: 0.2,
  direction: 'random',
  style: 'monochrome',
  fixed: true,
};

const grainSVG = encodeURIComponent(`<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`);

export function generateGrainCSS(config: GrainConfig = {}): string {
  const cfg = { ...defaultGrainConfig, ...config };
  const sizeMap = { fine: '100px', medium: '250px', coarse: '500px' };
  const size = sizeMap[cfg.size];
  return `
.grain-overlay {
  position: ${cfg.fixed ? 'fixed' : 'absolute'};
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 9999; opacity: ${cfg.intensity};
  background-image: url("data:image/svg+xml,${grainSVG}");
  background-repeat: repeat; background-size: ${size} ${size};
  ${cfg.animated ? `animation: grainShift ${cfg.animationSpeed}s steps(10) infinite;` : ''}
}
@keyframes grainShift {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-2%, -2%); }
  20% { transform: translate(2%, 2%); }
  30% { transform: translate(-1%, 1%); }
  40% { transform: translate(1%, -1%); }
  50% { transform: translate(-2%, 2%); }
  60% { transform: translate(2%, -2%); }
  70% { transform: translate(-1%, -1%); }
  80% { transform: translate(1%, 1%); }
  90% { transform: translate(-2%, -2%); }
}
  `.trim();
}

export function getGrainOverlayStyles(config: GrainConfig = {}): React.CSSProperties {
  const cfg = { ...defaultGrainConfig, ...config };
  const sizeValue = cfg.size === 'fine' ? '100px' : cfg.size === 'medium' ? '250px' : '500px';
  return {
    position: cfg.fixed ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 9999,
    opacity: cfg.intensity,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundSize: `${sizeValue} ${sizeValue}`,
  };
}

export const grainPresets = {
  cinematic: { intensity: 0.08, size: 'medium' as const, animated: true },
  vintage: { intensity: 0.12, size: 'coarse' as const, style: 'sepia' as const },
  digital: { intensity: 0.05, size: 'fine' as const, animated: false },
};
