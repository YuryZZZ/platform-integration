// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'destructive'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' }
  },
  args: { children: 'Button', variant: 'primary', size: 'md' }
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary', children: 'Primary Button' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary Button' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Ghost Button' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Destructive Button' } };
export const Small: Story = { args: { size: 'sm', children: 'Small Button' } };
export const Large: Story = { args: { size: 'lg', children: 'Large Button' } };
export const Disabled: Story = { args: { disabled: true, children: 'Disabled Button' } };
export const Loading: Story = { args: { loading: true, children: 'Loading Button' } };
export const FullWidth: Story = { args: { fullWidth: true, children: 'Full Width Button' }, parameters: { layout: 'padded' } };
