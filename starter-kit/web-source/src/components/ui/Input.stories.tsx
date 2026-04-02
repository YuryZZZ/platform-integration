// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'error', 'success'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' }
  },
  args: { label: 'Email Address', placeholder: 'Enter your email', size: 'md' }
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Full Name', placeholder: 'Enter your full name' } };
export const WithHelperText: Story = { args: { label: 'Username', placeholder: 'johndoe123', helperText: 'This will be your public display name' } };
export const ErrorState: Story = { args: { label: 'Email', variant: 'error', errorMessage: 'Please enter a valid email', value: 'invalid-email' } };
export const SuccessState: Story = { args: { label: 'Username', variant: 'success', helperText: 'Username is available', value: 'johndoe' } };
export const Disabled: Story = { args: { label: 'Disabled Input', disabled: true, value: 'Read-only' } };
export const Required: Story = { args: { label: 'Required Field', required: true, placeholder: 'This field is required' } };
export const Small: Story = { args: { label: 'Small Input', size: 'sm', placeholder: 'Small' } };
export const Large: Story = { args: { label: 'Large Input', size: 'lg', placeholder: 'Large' } };
export const Password: Story = { args: { label: 'Password', type: 'password', placeholder: 'Enter password', helperText: 'Must be at least 8 characters' } };
export const Interactive: Story = { render: (args) => { const [v, setV] = useState(''); return <Input {...args} value={v} onChange={e => setV(e.target.value)} />; }, args: { label: 'Interactive', placeholder: 'Type something...' } };
