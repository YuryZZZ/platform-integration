# Components

## UI Primitives (`@/components/ui`)

### Button

Interactive button component with multiple variants.

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'ghost' \| 'destructive' | 'primary' | Visual style |
| size | 'sm' \| 'md' \| 'lg' \| 'tv' | 'md' | Size variant |
| disabled | boolean | false | Disable interaction |
| loading | boolean | false | Show loading state |

### Card

Container component for grouped content.

```tsx
import { Card } from '@/components/ui';

<Card variant="elevated" padding="lg">
  <Card.Header>Title</Card.Header>
  <Card.Body>Content here</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Input

Form input with validation states.

```tsx
import { Input } from '@/components/ui';

<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error="Invalid email format"
/>
```

### Dialog/Modal

Overlay dialog for focused interactions.

```tsx
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui';

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <h2>Dialog Title</h2>
    <p>Dialog content here</p>
  </DialogContent>
</Dialog>
```

## Cinematic Components (`@/components/cinematic`)

### TvButton

TV-optimized button with 64px minimum touch target.

```tsx
import { TvButton } from '@/components/cinematic';

<TvButton
  focusId="btn-submit"
  onFocus={() => console.log('Focused')}
  onSelect={() => console.log('Selected')}
>
  Submit
</TvButton>
```

### TvContainer

Overscan-safe container with 5% padding.

```tsx
import { TvContainer } from '@/components/cinematic';

<TvContainer>
  <YourContent />
</TvContainer>
```

### TvMenu

Navigation-ready menu with spatial navigation.

```tsx
import { TvMenu } from '@/components/cinematic';

<TvMenu 
  items={menuItems} 
  orientation="horizontal"
  onSelect={handleSelect} 
/>
```

## Layout Components (`@/components/layout`)

### Stack

Vertical or horizontal stack with consistent spacing.

```tsx
import { Stack } from '@/components/layout';

<Stack direction="column" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

### Grid

Responsive grid layout system.

```tsx
import { Grid } from '@/components/layout';

<Grid columns={3} gap="lg">
  <Grid.Item>Cell 1</Grid.Item>
  <Grid.Item>Cell 2</Grid.Item>
  <Grid.Item>Cell 3</Grid.Item>
</Grid>
```

### Container

Centered fluid wrapper with dynamic percentage paddings for ultra-wide scaling up to 8K.

```tsx
import { Container } from '@/components/layout';

<Container size="lg">
  Page content
</Container>
```
