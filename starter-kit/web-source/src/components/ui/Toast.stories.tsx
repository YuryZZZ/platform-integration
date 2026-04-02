// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, ToastViewport, ToastContainer, useToast } from './Toast';
import { Button } from './Button';

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: ToastContainer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ToastContainer>;

// Helper component to trigger toasts
const ToastTrigger = ({ 
  variant = 'default', 
  duration, 
  manualDismiss = false 
}: { 
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  manualDismiss?: boolean;
}) => {
  const { showToast } = useToast();
  
  const handleClick = () => {
    const messages: Record<string, { title: string; description?: string }> = {
      default: { title: 'Notification', description: 'This is a default toast message.' },
      success: { title: 'Success!', description: 'Your changes have been saved.' },
      error: { title: 'Error', description: 'Something went wrong. Please try again.' },
      warning: { title: 'Warning', description: 'This action cannot be undone.' },
      info: { title: 'Information', description: 'Here is some useful information.' },
    };
    
    const message = messages[variant] || messages.default;
    
    showToast({
      ...message,
      variant,
      duration: manualDismiss ? 0 : duration,
      dismissible: manualDismiss,
    });
  };
  
  return <Button onClick={handleClick}>Show {variant} toast</Button>;
};

export const Default: Story = {
  render: () => <ToastTrigger variant="default" />,
};

export const Success: Story = {
  render: () => <ToastTrigger variant="success" />,
};

export const Error: Story = {
  render: () => <ToastTrigger variant="error" />,
};

export const Warning: Story = {
  render: () => <ToastTrigger variant="warning" />,
};

export const Info: Story = {
  render: () => <ToastTrigger variant="info" />,
};

export const Stacked: Story = {
  render: () => {
    const { showToast } = useToast();
    
    const handleShowAll = () => {
      showToast({ title: 'First notification', description: 'This is the first toast.' });
      setTimeout(() => {
        showToast({ title: 'Second notification', description: 'This is the second toast.', variant: 'success' });
      }, 200);
      setTimeout(() => {
        showToast({ title: 'Third notification', description: 'This is the third toast.', variant: 'warning' });
      }, 400);
    };
    
    return <Button onClick={handleShowAll}>Show stacked toasts</Button>;
  },
};

export const WithCustomDuration: Story = {
  render: () => <ToastTrigger variant="info" duration={10000} />,
  parameters: {
    docs: {
      description: {
        story: 'This toast will remain visible for 10 seconds before auto-dismissing.',
      },
    },
  },
};

export const WithManualDismiss: Story = {
  render: () => <ToastTrigger variant="warning" manualDismiss />,
  parameters: {
    docs: {
      description: {
        story: 'This toast requires manual dismissal - it will not auto-close.',
      },
    },
  },
};
