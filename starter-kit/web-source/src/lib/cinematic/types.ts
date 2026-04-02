import type { RefObject } from 'react';

/**
 * Options for configuring TV navigation behavior
 */
export interface TvNavigationOptions {
  /** Reference to the container element that holds focusable elements */
  containerRef: RefObject<HTMLElement>;
  /** Initial element index to focus on mount */
  initialFocusIndex?: number;
  /** Callback fired when navigation direction changes */
  onNavigate?: (direction: 'up' | 'down' | 'left' | 'right') => void;
  /** Callback fired when select/enter action is triggered */
  onSelect?: () => void;
  /** Callback fired when back action is triggered */
  onBack?: () => void;
  /** Enable wrap-around navigation (default: false) */
  wrap?: boolean;
  /** Threshold for spatial navigation distance (default: 0.5) */
  spatialThreshold?: number;
}

/**
 * Represents a focusable element in the navigation system
 */
export interface FocusableElement {
  /** Unique identifier for the element */
  id: string;
  /** React ref to the DOM element */
  ref: RefObject<HTMLElement>;
  /** Cached bounding rectangle for spatial calculations */
  rect?: DOMRect;
  /** Whether the element is disabled and should be skipped */
  disabled?: boolean;
  /** Group ID for grouped navigation */
  groupId?: string;
  /** Priority for focus order (higher = more important) */
  priority?: number;
}

/**
 * Return type for useTvNavigation hook
 */
export interface TvNavigationResult {
  /** Currently focused element ID */
  focusedId: string | null;
  /** Register a new focusable element */
  registerElement: (id: string, ref: RefObject<HTMLElement>, options?: FocusableOptions) => void;
  /** Unregister a focusable element */
  unregisterElement: (id: string) => void;
  /** Manually focus an element by ID */
  focusElement: (id: string) => void;
  /** Move focus in a specific direction */
  moveFocus: (direction: NavigationDirection) => void;
  /** All registered focusable elements */
  elements: Map<string, FocusableElement>;
  /** Whether navigation is currently enabled */
  isEnabled: boolean;
  /** Toggle navigation on/off */
  setEnabled: (enabled: boolean) => void;
}

/**
 * Options when registering a focusable element
 */
export interface FocusableOptions {
  /** Whether element is disabled */
  disabled?: boolean;
  /** Group ID for grouped navigation */
  groupId?: string;
  /** Focus priority */
  priority?: number;
}

/**
 * Navigation direction types
 */
export type NavigationDirection = 'up' | 'down' | 'left' | 'right';

/**
 * Key mapping for TV remote input
 */
export interface KeyMap {
  up: string[];
  down: string[];
  left: string[];
  right: string[];
  select: string[];
  back: string[];
}

/**
 * Default key mapping for TV navigation
 */
export const DEFAULT_KEY_MAP: KeyMap = {
  up: ['ArrowUp', 'w', 'W'],
  down: ['ArrowDown', 's', 'S'],
  left: ['ArrowLeft', 'a', 'A'],
  right: ['ArrowRight', 'd', 'D'],
  select: ['Enter', ' ', 'Space'],
  back: ['Escape', 'Backspace'],
};

/**
 * Spatial navigation score for element selection
 */
export interface SpatialScore {
  element: FocusableElement;
  score: number;
  distance: number;
  alignment: number;
}
