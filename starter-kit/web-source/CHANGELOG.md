# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Toast component**: Fully accessible notification system with configurable positions, durations, and themes
- **Tabs component**: Tab navigation with keyboard navigation, animated transitions, and flexible content panels
- **TvCard component**: Cinematic card component with hover effects, loading states, and metadata display
- **TvMenu component**: Contextual menu system with keyboard navigation and submenu support
- **TvList component**: Virtualized list component with generic type support, infinite scrolling, and item actions
- **DropdownMenu component**: Compound component with context-based state management and accessibility features
- **Tooltip component**: Configurable tooltip with position, delay, and keyboard accessibility
- **Skeleton component**: Loading placeholders with text/rect/circle variants and pulse/shimmer animations
- **Spinner component**: Animated loading spinner with configurable size, speed, and color
- **ErrorBoundary component**: Error catching with retry functionality and fallback UI

### Hooks
- **useAnimation**: Motion intensity and preset-based animation system with cleanup management
- **useLocalStorage**: Type-safe local storage operations with JSON serialization and event synchronization
- **useCopyToClipboard**: Clipboard operations with fallback support and status feedback
- **useAnnounce**: ARIA live region announcements for screen reader accessibility

### Utilities
- **Validation utilities**: Form validation with Zod schemas and error message generation
- **Performance utilities**: FPS monitoring, render timing, and metric collection
- **Animation utilities**: Spring physics, easing functions, and animation frame management
- **Navigation utilities**: Spatial navigation with keyboard focus management
- **Surface utilities**: Material elevation, shadow generation, and depth management

### Tests
- **Integration tests**: Component interaction testing with Vitest and React Testing Library
- **Unit tests**: Component, hook, and utility testing with comprehensive coverage
- **E2E tests**: Playwright configuration for Chromium, Firefox, and WebKit
- **Test utilities**: Mock setup, test data factories, and custom matchers

### Documentation
- **Component stories**: Storybook stories for all UI components with interactive controls
- **API documentation**: TypeScript interfaces, prop documentation, and usage examples
- **Test documentation**: Testing patterns, best practices, and setup guides

## [0.1.0] - 2026-03-16

### Added
- **Project initialization**: React TypeScript project with Vite build system
- **Design system foundation**: Color tokens, typography scale, spacing system
- **Component architecture**: Base component patterns, styling conventions, and export structure
- **Development tooling**: ESLint, Prettier, TypeScript configuration
- **Storybook setup**: Component documentation with MDX support
- **Testing infrastructure**: Vitest, React Testing Library, Playwright

### Changed
- **Build configuration**: Optimized Vite config for production builds
- **TypeScript configuration**: Strict mode with comprehensive type checking

### Fixed
- **Import aliases**: Resolved module resolution for absolute imports
- **Styling conflicts**: Normalized CSS conflicts between component libraries

---
[Unreleased]: https://github.com/owner/repo/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/owner/repo/releases/tag/v0.1.0
