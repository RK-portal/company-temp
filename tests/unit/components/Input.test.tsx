import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@/tests/utils/test-helpers'
import userEvent from '@testing-library/user-event'
import Input from '@/components/ui/Input'

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" name="email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders without label', () => {
    render(<Input name="email" placeholder="Enter email" />)
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<Input label="Name" name="name" />)
    
    const input = screen.getByLabelText('Name')
    await user.type(input, 'John Doe')
    
    expect(input).toHaveValue('John Doe')
  })

  it('calls onChange handler', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    
    render(<Input label="Name" name="name" onChange={handleChange} />)
    const input = screen.getByLabelText('Name')
    
    await user.type(input, 'a')
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled()
    })
  })

  it('can be disabled', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    
    render(<Input label="Name" name="name" disabled onChange={handleChange} />)
    const input = screen.getByLabelText('Name')
    
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:bg-neutral-50', 'disabled:cursor-not-allowed')
    
    await user.type(input, 'text')
    expect(handleChange).not.toHaveBeenCalled()
    expect(input).toHaveValue('')
  })

  it('shows error message', () => {
    render(<Input label="Email" name="email" error="Invalid email address" />)
    
    expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
    const input = screen.getByLabelText('Email')
    expect(input).toHaveClass('border-error-500')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows helper text', () => {
    render(<Input label="Password" name="password" helperText="Must be at least 8 characters" />)
    
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument()
  })

  it('does not show helper text when error is present', () => {
    render(
      <Input 
        label="Email" 
        name="email" 
        error="Invalid email" 
        helperText="Enter your email address" 
      />
    )
    
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
    expect(screen.queryByText('Enter your email address')).not.toBeInTheDocument()
  })

  it('supports different input types', () => {
    const { rerender } = render(<Input label="Email" name="email" type="email" />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    
    rerender(<Input label="Password" name="password" type="password" />)
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
    
    rerender(<Input label="Phone" name="phone" type="tel" />)
    expect(screen.getByLabelText('Phone')).toHaveAttribute('type', 'tel')
    
    rerender(<Input label="Age" name="age" type="number" />)
    expect(screen.getByLabelText('Age')).toHaveAttribute('type', 'number')
  })

  it('applies custom className', () => {
    render(<Input label="Name" name="name" className="custom-input" />)
    const input = screen.getByLabelText('Name')
    
    expect(input).toHaveClass('custom-input')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Input label="Name" name="name" ref={ref} />)
    
    expect(ref).toHaveBeenCalled()
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement)
  })

  it('generates unique id when not provided', () => {
    render(
      <>
        <Input label="First" name="first" />
        <Input label="Second" name="second" />
      </>
    )
    
    const first = screen.getByLabelText('First')
    const second = screen.getByLabelText('Second')
    
    expect(first.id).toBeTruthy()
    expect(second.id).toBeTruthy()
    expect(first.id).not.toBe(second.id)
  })

  it('uses provided id', () => {
    render(<Input label="Email" name="email" id="custom-email-input" />)
    const input = screen.getByLabelText('Email')
    
    expect(input.id).toBe('custom-email-input')
  })

  it('applies fullWidth styles', () => {
    const { container } = render(<Input label="Full Width" name="fullwidth" fullWidth />)
    const wrapper = container.firstChild
    
    expect(wrapper).toHaveClass('w-full')
  })

  it('has correct aria-describedby for error', () => {
    render(<Input label="Email" name="email" error="Invalid email" />)
    const input = screen.getByLabelText('Email')
    
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('-error'))
  })

  it('has correct aria-describedby for helper text', () => {
    render(<Input label="Email" name="email" helperText="Enter your email" />)
    const input = screen.getByLabelText('Email')
    
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('-helper'))
  })

  it('has correct test id', () => {
    render(<Input label="Test Input" name="test" />)
    expect(screen.getByTestId('input')).toBeInTheDocument()
  })

  it('preserves additional props', () => {
    render(
      <Input 
        label="Custom" 
        name="custom" 
        data-custom="value"
        autoComplete="off"
        maxLength={10}
      />
    )
    const input = screen.getByLabelText('Custom')
    
    expect(input).toHaveAttribute('data-custom', 'value')
    expect(input).toHaveAttribute('autoComplete', 'off')
    expect(input).toHaveAttribute('maxLength', '10')
  })
})