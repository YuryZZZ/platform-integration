// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from './Button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <h3>Card Title</h3>
      </Card.Header>
      <Card.Body>
        <p>This is the card body content.</p>
      </Card.Body>
      <Card.Footer>
        <Button size="sm">Action</Button>
      </Card.Footer>
    </Card>
  )
};

export const Simple: Story = {
  render: () => (
    <Card>
      <Card.Body>
        <p>Simple card with just body content.</p>
      </Card.Body>
    </Card>
  )
};

export const WithActions: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <h3>Actions Card</h3>
      </Card.Header>
      <Card.Body>
        <p>Card with multiple actions.</p>
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary" size="sm">Cancel</Button>
        <Button size="sm">Confirm</Button>
      </Card.Footer>
    </Card>
  )
};
