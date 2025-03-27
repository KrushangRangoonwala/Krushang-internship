import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Radio from './Radio'

describe('Radio Component', () => {
    test('renders correctly with default props', () => {
        render(<Radio value="test" />)

        const radio = screen.getByRole('radio')
        expect(radio).toBeInTheDocument()
        expect(radio).toHaveAttribute('type', 'radio')
        expect(radio).not.toBeChecked()
    })

    test('renders checked when defaultChecked is true', () => {
        render(<Radio value="test" defaultChecked />)
        const radio = screen.getByRole('radio')
        expect(radio).toBeChecked()
    })

    test('renders checked when controlled via checked prop', () => {
        render(<Radio value="test" checked />)
        const radio = screen.getByRole('radio')
        expect(radio).toBeChecked()
    })

    test('calls onChange when clicked', () => {
        const handleChange = jest.fn()
        render(<Radio value="test" onChange={handleChange} />)

        const radio = screen.getByRole('radio')
        fireEvent.click(radio)

        expect(handleChange).toHaveBeenCalledWith('test', expect.any(Object))
    })

    test('does not call onChange when disabled', () => {
        const handleChange = jest.fn()
        render(<Radio value="test" onChange={handleChange} disabled />)

        const radio = screen.getByRole('radio')
        fireEvent.click(radio)

        expect(handleChange).not.toHaveBeenCalled()
    })

    test('does not call onChange when readOnly', () => {
        const handleChange = jest.fn()
        render(<Radio value="test" onChange={handleChange} readOnly />)

        const radio = screen.getByRole('radio')
        fireEvent.click(radio)

        expect(handleChange).not.toHaveBeenCalled()
    })

    test('updates checked state when groupValue changes', () => {
        const { rerender } = render(<Radio value="test" />)
        const radio = screen.getByRole('radio')

        expect(radio).not.toBeChecked()

        rerender(<Radio value="test" checked />)
        expect(radio).toBeChecked()
    })
})
