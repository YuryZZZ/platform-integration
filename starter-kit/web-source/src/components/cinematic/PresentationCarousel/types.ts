import { ReactNode, CSSProperties } from 'react';
export type CarouselEffect = 'cube' | 'card-stack' | 'depth-stack' | 'fade-scale' | 'slide-3d';
export interface CarouselItem<T = unknown> {
  id: string;
  content: ReactNode;
  data?: T;
  thumbnail?: string;
  title?: string;
  description?: string;
}
export interface PresentationCarouselProps<T = unknown> {
  items: CarouselItem<T>[];
  effect?: CarouselEffect;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
  showIndicators?: boolean;
  showNavigation?: boolean;
  infinite?: boolean;
  initialIndex?: number;
  className?: string;
  style?: CSSProperties;
  itemWidth?: number | string;
  itemHeight?: number | string;
  perspective?: number;
  onItemChange?: (index: number, item: CarouselItem<T>) => void;
  onItemClick?: (index: number, item: CarouselItem<T>) => void;
  renderItem?: (item: CarouselItem<T>, index: number, isActive: boolean) => ReactNode;
  ariaLabel?: string;
  reducedMotion?: boolean;
}
