import { render, screen, fireEvent } from '@testing-library/react'
import Input from './Input'
import '@testing-library/jest-dom'

describe('Input Component', () => {
    test('renders input with default properties', () => {
        render(<Input placeholder="Enter text" />)
        const inputElement = screen.getByPlaceholderText('Enter text')
        expect(inputElement).toBeInTheDocument()
        expect(inputElement).toHaveAttribute('type', 'text')
    })

    test('renders input with a custom type', () => {
        render(<Input type="password" placeholder="Enter password" />)
        const inputElement = screen.getByPlaceholderText('Enter password') // Use placeholder to find the element
        expect(inputElement).toHaveAttribute('type', 'password')
    })

    test('renders textarea when textArea prop is true', () => {
        render(<Input textArea placeholder="Enter message" />)
        const textAreaElement = screen.getByPlaceholderText('Enter message')
        expect(textAreaElement.tagName).toBe('TEXTAREA')
    })

    test('renders input with prefix and suffix', () => {
        render(<Input prefix="🔍" suffix="✅" placeholder="Search here" />)

        expect(screen.getByText('🔍')).toBeInTheDocument()
        expect(screen.getByText('✅')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Search here')).toBeInTheDocument()
    })

    test('calls onChange event when typing', () => {
        const handleChange = jest.fn()
        render(<Input onChange={handleChange} />)

        const inputElement = screen.getByRole('textbox')
        fireEvent.change(inputElement, { target: { value: 'Hello' } })

        expect(handleChange).toHaveBeenCalledTimes(1)
    })

    test('handles controlled value', () => {
        render(<Input value="Controlled" />)
        const inputElement = screen.getByRole('textbox')
        expect(inputElement).toHaveValue('Controlled')
    })

    test('renders input as disabled', () => {
        render(<Input disabled />)
        const inputElement = screen.getByRole('textbox')
        expect(inputElement).toBeDisabled()
    })

    test('applies custom classNames when provided', () => {
        render(<Input className="custom-input" />)
        const inputElement = screen.getByRole('textbox')
        expect(inputElement).toHaveClass('custom-input')
    })

    test('renders with affix gutters correctly', () => {
        render(<Input prefix="Prefix" suffix="Suffix" />)
        expect(screen.getByText('Prefix')).toBeInTheDocument()
        expect(screen.getByText('Suffix')).toBeInTheDocument()
    })
})
