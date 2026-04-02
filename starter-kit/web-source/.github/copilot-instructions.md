# Copilot Instructions for Nexus AI Design System

## Project Overview
This is a React 19 TypeScript design system with cinematic/TV mode navigation capabilities.

## Code Style Guidelines
- Use TypeScript with strict mode
- Prefer functional components with hooks
- Use named exports over default exports
- Follow the existing component structure in `src/components/`
- Use the utility functions from `src/lib/utils` for styling

## Component Patterns
- Components should be TV-navigation compatible (support spatial navigation)
- Include proper ARIA attributes for accessibility
- Use the design tokens from the theme system
- Follow the existing patterns for component variants and sizes

## Testing
- Write unit tests with Jest and React Testing Library
- Include stories in Storybook for visual testing
- Test TV navigation interactions

## Documentation
- Add JSDoc comments for public APIs
- Update component README files when modifying components
- Keep the Storybook stories up to date
