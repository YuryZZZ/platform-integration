// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    hideCloseButton: { control: 'boolean' }
  }
};
export default meta;
type Story = StoryObj<typeof meta>;

const ModalDemo = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Title</h2>
        <p>Modal content goes here. This is a simple modal dialog.</p>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </Modal>
    </>
  );
};

export const Default: Story = { render: ModalDemo, args: { title: 'Default Modal' } };
export const Small: Story = { render: ModalDemo, args: { title: 'Small Modal', size: 'sm' } };
export const Large: Story = { render: ModalDemo, args: { title: 'Large Modal', size: 'lg' } };
export const FullWidth: Story = { render: ModalDemo, args: { title: 'Full Width Modal', size: 'full' } };
export const NoOverlayClose: Story = { render: ModalDemo, args: { title: 'No Overlay Close', closeOnOverlayClick: false } };
export const NoCloseButton: Story = { render: ModalDemo, args: { title: 'No Close Button', hideCloseButton: true } };
