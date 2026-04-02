export type NoiseType = 'fractal' | 'turbulence' | 'static';

export interface NoiseConfig {
  type?: NoiseType;
  baseFrequency?: string;
  numOctaves?: number;
  opacity?: number;
  seed?: number;
  animate?: boolean;
  animationDuration?: number;
  blendMode?: 'normal' | 'multiply' | 'overlay' | 'screen' | 'soft-light';
}

export const defaultNoiseConfig: Required<NoiseConfig> = {
  type: 'turbulence',
  baseFrequency: '0.65',
  numOctaves: 3,
  opacity: 0.15,
  seed: 0,
  animate: false,
  animationDuration: 0.5,
  blendMode: 'overlay',
};

export function generateNoiseFilter(config: NoiseConfig = {}): string {
  const cfg = { ...defaultNoiseConfig, ...config };
  const filterId = `noise-${cfg.seed}-${Date.now()}`;
  return `
<svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; width: 0; height: 0;">
<defs>
<filter id="${filterId}" x="0%" y="0%" width="100%" height="100%">
<feTurbulence type="${cfg.type === 'static' ? 'fractalNoise' : 'turbulence'}" baseFrequency="${cfg.baseFrequency}" numOctaves="${cfg.numOctaves}" seed="${cfg.seed}" result="noise" />
<feColorMatrix type="saturate" values="0" in="noise" result="desaturatedNoise" />
<feComponentTransfer in="desaturatedNoise" result="opacityAdjusted">
<feFuncA type="linear" slope="${cfg.opacity}" />
</feComponentTransfer>
</filter>
</defs>
</svg>
  `.trim();
}

export function getNoiseStyles(config: NoiseConfig = {}): React.CSSProperties {
  const cfg = { ...defaultNoiseConfig, ...config };
  return { filter: `url(#noise-${cfg.seed}-${Date.now()})`, position: 'relative' };
}

export const noisePresets = {
  subtle: { opacity: 0.05, baseFrequency: '0.8', numOctaves: 1 },
  medium: { opacity: 0.15, baseFrequency: '0.65', numOctaves: 3 },
  heavy: { opacity: 0.3, baseFrequency: '0.5', numOctaves: 5 },
  cinematic: { opacity: 0.12, baseFrequency: '0.02 0.1', numOctaves: 4, blendMode: 'overlay' },
  static: { type: 'static' as const, opacity: 0.2, baseFrequency: '0.9', numOctaves: 1 },
};
