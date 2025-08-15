import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/tests/utils/test-helpers'
import Card from '@/components/ui/Card'

describe('Card', () => {
  it('renders children content', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    )
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders with title', () => {
    render(<Card title="Card Title">Content</Card>)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card Title').tagName).toBe('H3')
  })

  it('renders with description', () => {
    render(<Card description="Card description">Content</Card>)
    expect(screen.getByText('Card description')).toBeInTheDocument()
  })

  it('renders with title and description', () => {
    render(
      <Card title="Title" description="Description">
        Content
      </Card>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Card className="custom-card-class">Content</Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-card-class')
  })

  it('renders as a div when no href is provided', () => {
    render(<Card>Div Card</Card>)
    const card = screen.getByTestId('card')
    expect(card.tagName).toBe('DIV')
  })

  it('renders as a link when href is provided', () => {
    render(<Card href="/test">Link Card</Card>)
    const card = screen.getByTestId('card')
    expect(card.tagName).toBe('A')
    expect(card).toHaveAttribute('href', '/test')
  })

  it('renders as external link when href starts with http', () => {
    render(<Card href="https://example.com">External Link</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('target', '_blank')
    expect(card).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Card onClick={handleClick}>Clickable Card</Card>)
    const card = screen.getByTestId('card')
    
    card.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with image', () => {
    render(<Card image="/test-image.jpg" title="Image Card">Content</Card>)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'Image Card')
  })

  it('applies cursor pointer when onClick is provided', () => {
    render(<Card onClick={() => {}}>Clickable</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('cursor-pointer')
  })

  it('has correct base styles', () => {
    render(<Card>Basic Card</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-md')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Card ref={ref}>Ref Card</Card>)
    
    expect(ref).toHaveBeenCalled()
  })

  it('combines href and onClick', () => {
    const handleClick = vi.fn()
    render(<Card href="/test" onClick={handleClick}>Link with onClick</Card>)
    const card = screen.getByTestId('card')
    
    expect(card).toHaveAttribute('href', '/test')
    card.click()
    expect(handleClick).toHaveBeenCalled()
  })

  it('renders empty image alt when no title provided', () => {
    render(<Card image="/test-image.jpg">Content</Card>)
    const image = screen.getByAltText('')
    expect(image).toBeInTheDocument()
  })
})