// @ts-nocheck
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('handles value change', () => {
    const onChange = vi.fn()
    render(<Input value="initial" onChange={onChange} />)
    
    const input = screen.getByDisplayValue('initial')
    fireEvent.change(input, { target: { value: 'new value' } })
    
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'new value' })
    }))
  })

  it('applies disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />)
    
    const input = screen.getByPlaceholderText('Disabled input')
    expect(input).toBeDisabled()
    expect(input).toHaveAttribute('disabled')
  })

  it('applies error state', () => {
    const { container } = render(<Input error placeholder="Error input" />)
    
    // Check for error class or styling
    expect(container.firstChild).toHaveClass(expect.stringContaining('error'))
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows placeholder text', () => {
    render(<Input placeholder="Type here..." />)
    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument()
  })

  it('handles different type variants', () => {
    const { container: textContainer } = render(<Input type="text" />)
    const { container: emailContainer } = render(<Input type="email" />)
    const { container: passwordContainer } = render(<Input type="password" />)
    
    const textInput = textContainer.querySelector('input')
    const emailInput = emailContainer.querySelector('input')
    const passwordInput = passwordContainer.querySelector('input')
    
    expect(textInput).toHaveAttribute('type', 'text')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
})
