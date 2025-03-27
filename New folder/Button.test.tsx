import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../Button'

describe('Button Component', () => {
    test('renders button with children', () => {
        render(<Button>Click Me</Button>)
        expect(screen.getByText('Click Me')).toBeInTheDocument()
    })

    test('calls onClick when clicked', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Click Me</Button>)
        fireEvent.click(screen.getByText('Click Me'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('does not call onClick when disabled', () => {
        const handleClick = jest.fn()
        render(
            <Button disabled onClick={handleClick}>
                Click Me
            </Button>
        )
        fireEvent.click(screen.getByText('Click Me'))
        expect(handleClick).not.toHaveBeenCalled()
    })

    test('displays loading spinner when loading', () => {
        render(<Button loading>Click Me</Button>)
        expect(screen.getByRole('button')).toHaveClass(
            'opacity-50 cursor-not-allowed'
        )
    })

    test('renders button with icon and text', () => {
        render(
            <Button icon={<span data-testid="icon">🔍</span>}>Search</Button>
        )
        expect(screen.getByText('Search')).toBeInTheDocument()
        expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    test('applies correct variant classes', () => {
        render(<Button variant="solid">Solid Button</Button>)
        expect(screen.getByText('Solid Button')).toHaveClass('bg-indigo-600')
    })
    
})
