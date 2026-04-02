# Design System API Reference

*Auto-generated documentation for the award-winning design system*

---

## Cinematic Components

### AnimatedText

**Location:** `src/components/cinematic/AnimatedText/index.tsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | required | Text content to animate |
| effect | string | 'fade' | Animation effect type |
| splitBy | 'characters' \| 'words' \| 'lines' | 'characters' | How to split text |
| staggerDelay | number | 0.03 | Delay between each segment |
| duration | number | 0.5 | Animation duration per segment |
| className | string | - | Additional CSS classes |
| once | boolean | true | Only animate once |
| loop | boolean | false | Loop animation |

**Effects:** `fade`, `bounce`, `wave`, `scale`, `blur`, `slide-up`, `slide-down`

**Usage:**
```tsx
<AnimatedText
  text="Hello World"
  effect="bounce"
  splitBy="characters"
  staggerDelay={0.05}
  duration={0.5}
/>
```

---

### SplitText

**Location:** `src/components/cinematic/SplitText/SplitText.tsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | string | required | Text content |
| splitType | 'chars' \| 'words' \| 'lines' \| 'words-and-chars' | 'chars' | Split mode |
| staggerFrom | 'first' \| 'last' \| 'center' \| 'random' | 'first' | Stagger direction |
| staggerDelay | number | 0.03 | Delay between segments |
| trigger | 'inView' \| 'load' \| 'hover' \| 'click' | 'inView' | Animation trigger |
| scrambleOnHover | boolean | false | Enable scramble effect |
| loop | boolean | false | Loop animation |

**Usage:**
```tsx
<SplitText splitType="words" staggerFrom="center" staggerDelay={0.1}>
  Animated Text
</SplitText>
```

---

### ScrollReveal

**Location:** `src/components/cinematic/ScrollReveal/index.tsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| effect | RevealEffect | 'fade' | Animation effect |
| duration | number | 0.5 | Animation duration |
| delay | number | 0 | Animation delay |
| threshold | number | 0.1 | Viewport threshold |
| once | boolean | true | Only animate once |
| children | ReactNode | required | Content to reveal |

**Effects:** `fade`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `scale`, `rotate`, `blur`

**Usage:**
```tsx
<ScrollReveal effect="slide-up" duration={0.6} threshold={0.2}>
  <YourContent />
</ScrollReveal>
```

---

### ParallaxLayer

**Location:** `src/components/cinematic/ParallaxLayer/index.tsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| speed | number | 0.5 | Parallax speed (-1 to 1) |
| offset | [string, string] | ['start', 'end'] | Scroll offset |
| children | ReactNode | required | Content to parallax |

**Usage:**
```tsx
<ParallaxLayer speed={0.3}>
  <BackgroundImage />
</ParallaxLayer>
```

---

### PresentationCarousel

**Location:** `src/components/cinematic/PresentationCarousel/index.tsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | CarouselItem[] | required | Carousel items |
| effect | CarouselEffect | 'cube' | 3D effect type |
| autoPlay | boolean | false | Auto-play carousel |
| autoPlayInterval | number | 5000 | Auto-play interval (ms) |
| showIndicators | boolean | true | Show dot indicators |
| showNavigation | boolean | true | Show arrow buttons |
| infinite | boolean | true | Infinite loop |
| itemWidth | number \| string | 400 | Item width |
| itemHeight | number \| string | 300 | Item height |
| perspective | number | 1200 | 3D perspective |

**Effects:** `cube`, `card-stack`, `depth-stack`, `fade-scale`, `slide-3d`

**Usage:**
```tsx
const items = [
  { id: '1', content: <Slide1 />, title: 'Slide 1' },
  { id: '2', content: <Slide2 />, title: 'Slide 2' },
];
<PresentationCarousel items={items} effect="cube" autoPlay />
```

---

### Typewriter

**Location:** `src/components/cinematic/Typewriter/index.tsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | required | Text to type |
| speed | number | 50 | Typing speed (ms per char) |
| delay | number | 0 | Initial delay (ms) |
| cursor | boolean | true | Show cursor |
| cursorChar | string | '\|' | Cursor character |
| loop | boolean | false | Loop animation |
| deleteSpeed | number | 30 | Delete speed (ms) |
| pauseDuration | number | 1500 | Pause before delete |

**Usage:**
```tsx
<Typewriter text="Hello World" speed={50} cursor loop />
```

---

## Navigation Components

### MorphNav

**Location:** `src/components/navigation/MorphNav.tsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | MorphNavItem[] | required | Navigation items |
| variant | 'horizontal' \| 'vertical' \| 'floating' | 'horizontal' | Layout variant |
| blobColor | string | '#3b82f6' | Blob color |
| onItemClick | (item) => void | - | Item click callback |

**Usage:**
```tsx
const navItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
];
<MorphNav items={navItems} variant="horizontal" />
```

---

### LiquidTransition

**Location:** `src/components/navigation/LiquidTransition.tsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| blobColor | string | '#1a1a2a' | Transition blob color |
| duration | number | 0.8 | Transition duration |
| children | ReactNode | required | Content to wrap |

**Usage:**
```tsx
<LiquidTransition>
  <YourPageContent />
</LiquidTransition>
```

---

## Animation Hooks

### useSpring

**Location:** `src/hooks/useSpring.ts`

**Signature:** `useSpring<T>(config?: SpringConfig): [RefObject<T>, SpringValue]`

**Config:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| stiffness | number | 100 | Spring stiffness |
| damping | number | 10 | Spring damping |
| mass | number | 1 | Spring mass |

**Usage:**
```tsx
const [ref, spring] = useSpring<HTMLDivElement>({ stiffness: 100, damping: 10 });
```

---

### useMagnetic

**Location:** `src/hooks/useMagnetic.ts`

**Signature:** `useMagnetic<T>(config?: MagneticConfig): [RefObject<T>, { x: number; y: number }]`

**Config:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| strength | number | 0.3 | Magnetic strength |
| radius | number | 150 | Magnetic radius |

**Usage:**
```tsx
const [ref, position] = useMagnetic<HTMLButtonElement>({
  strength: 0.4,
  radius: 150
});
```

---

### useGlitch

**Location:** `src/hooks/useGlitch.ts`

**Signature:** `useGlitch(options?: GlitchOptions): [boolean, () => void, () => void]`

**Options:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| intensity | number | 1 | Glitch intensity |
| interval | number | 100 | Glitch interval |
| duration | number | 300 | Glitch duration |

**Usage:**
```tsx
const [isGlitching, start, stop] = useGlitch({ intensity: 1, duration: 300 });
<button onClick={start}>Trigger Glitch</button>
```

---

## Animation Presets

### Basic Presets

**Location:** `src/lib/animation/presets.ts`

**Available Presets:**
- `fadeIn`, `fadeOut`
- `slideInUp`, `slideInDown`, `slideOutUp`, `slideOutDown`
- `scaleIn`, `scaleOut`
- `bounce`, `pulse`, `shake`

### Advanced Presets

**Location:** `src/lib/animation/advancedPresets.ts`

**Available Presets:**
- `liquid` - Organic scale/skew morphing
- `glitch` - Stepped digital distortion
- `flip3d` - Perspective Y-axis rotation
- `magnetic` - Elastic cursor attraction
- `parallax` - Vertical reveal with fade
- `elastic` - Spring-bounce scaling
- `revealMask` - Clip-path polygon reveals
- `morph` - Border-radius + rotation transforms

**Usage:**
```tsx
import { advancedPresets } from '@/lib/animation';
const preset = advancedPresets.liquid('medium');
```

---

## Scroll System

### LocomotiveScroll

**Location:** `src/lib/scroll/LocomotiveScroll.ts`

**Constructor:** `new LocomotiveScroll(config?: LocomotiveScrollConfig)`

**Methods:**
| Method | Description |
|--------|-------------|
| scrollTo(target, options?) | Scroll to element/position |
| onScroll(callback) | Add scroll listener |
| update() | Update scroll limits |
| destroy() | Cleanup instance |

**Usage:**
```tsx
const scroll = new LocomotiveScroll({ smooth: true, lerp: 0.1 });
scroll.scrollTo('#section-2', { duration: 1000 });
```

---

### ScrollTrigger

**Location:** `src/lib/scroll/ScrollTrigger.ts`

**Methods:**
| Method | Description |
|--------|-------------|
| register(entry, config?) | Register element for scroll watching |
| unregister(el) | Unregister element |
| destroy() | Cleanup instance |

**Usage:**
```tsx
const trigger = new ScrollTrigger();
trigger.register({
  el: elementRef.current,
  onEnter: () => console.log('Entered'),
  onLeave: () => console.log('Left'),
});
```

---

## Effect Utilities

### NoiseEffect

**Location:** `src/lib/effects/NoiseEffect.ts`

**Functions:**
| Function | Description |
|----------|-------------|
| generateNoiseFilter(config?) | Generate SVG noise filter |
| getNoiseStyles(config?) | Get React CSS styles |
| noisePresets | Preset configurations |

**Presets:** `subtle`, `medium`, `heavy`, `cinematic`, `static`

**Usage:**
```tsx
const styles = getNoiseStyles(noisePresets.cinematic);
<div style={styles}>Content with noise</div>
```

---

### GrainEffect

**Location:** `src/lib/effects/GrainEffect.ts`

**Functions:**
| Function | Description |
|----------|-------------|
| generateGrainCSS(config?) | Generate grain CSS |
| getGrainOverlayStyles(config?) | Get overlay styles |
| grainPresets | Preset configurations |

**Presets:** `cinematic`, `vintage`, `digital`

**Usage:**
```tsx
<div style={{ position: 'relative' }}>
  <div style={getGrainOverlayStyles(grainPresets.cinematic)} />
  <Content />
</div>
```

---

## WebGL/3D System

### WebGLRenderer

**Location:** `src/lib/webgl/WebGLRenderer.ts`

**Constructor:** `new WebGLRenderer(config: WebGLRendererConfig)`

**Methods:**
| Method | Description |
|--------|-------------|
| start() | Start render loop |
| stop() | Stop render loop |
| resize() | Handle resize |
| dispose() | Cleanup resources |
| getScene() | Get Three.js scene |
| getCamera() | Get Three.js camera |
| getRenderer() | Get Three.js renderer |

**Usage:**
```tsx
const renderer = new WebGLRenderer({ container: canvasRef.current, antialias: true });
renderer.start();
```

---

### Scene

**Location:** `src/lib/webgl/Scene.ts`

**Methods:**
| Method | Description |
|--------|-------------|
| add(id, object) | Add object to scene |
| remove(id) | Remove object from scene |
| get(id) | Get object by ID |
| clear() | Remove all objects |

---

## Magnetic System

### MagneticField

**Location:** `src/lib/magnetic/MagneticField.ts`

**Methods:**
| Method | Description |
|--------|-------------|
| register(el, config?) | Register element for magnetic effect |
| unregister(el) | Unregister element |
| destroy() | Cleanup instance |

**Usage:**
```tsx
const field = new MagneticField();
field.register(buttonRef.current, { strength: 0.3, radius: 200 });
```

---

## Main Export Index

**Location:** `src/index.ts`

The main index file exports all components, hooks, utilities, and types from the design system.

```tsx
// Components
export * from './components';
export * from './components/cinematic';
export * from './components/navigation';

// Hooks
export * from './hooks';

// Libraries
export * from './lib/animation';
export * from './lib/scroll';
export * from './lib/magnetic';
export * from './lib/effects';
export * from './lib/webgl';

// Types
export * from './types';
```
