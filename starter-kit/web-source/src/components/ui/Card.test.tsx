// @ts-nocheck
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <div data-testid="test-content">Test Content</div>
      </Card>
    )
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })

  it('applies elevation variants', () => {
    const { container: container1 } = render(<Card elevation="sm">Test</Card>)
    const { container: container2 } = render(<Card elevation="md">Test</Card>)
    const { container: container3 } = render(<Card elevation="lg">Test</Card>)
    
    // Check that different elevation classes are applied
    expect(container1.firstChild).toHaveClass(expect.stringContaining('sm'))
    expect(container2.firstChild).toHaveClass(expect.stringContaining('md'))
    expect(container3.firstChild).toHaveClass(expect.stringContaining('lg'))
  })

  it('applies rounded variants', () => {
    const { container: container1 } = render(<Card rounded="none">Test</Card>)
    const { container: container2 } = render(<Card rounded="md">Test</Card>)
    const { container: container3 } = render(<Card rounded="full">Test</Card>)
    
    // Check that different rounded classes are applied
    expect(container1.firstChild).toHaveClass(expect.stringContaining('none'))
    expect(container2.firstChild).toHaveClass(expect.stringContaining('md'))
    expect(container3.firstChild).toHaveClass(expect.stringContaining('full'))
  })

  it('renders with image', () => {
    render(
      <Card>
        <Card.Image src="test.jpg" alt="Test" />
        <Card.Content>Content</Card.Content>
      </Card>
    )
    expect(screen.getByAltText('Test')).toBeInTheDocument()
  })

  it('renders with actions', () => {
    render(
      <Card>
        <Card.Content>Content</Card.Content>
        <Card.Actions>
          <button>Action 1</button>
          <button>Action 2</button>
        </Card.Actions>
      </Card>
    )
    expect(screen.getByText('Action 1')).toBeInTheDocument()
    expect(screen.getByText('Action 2')).toBeInTheDocument()
  })
})
