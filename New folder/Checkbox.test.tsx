import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Checkbox from './Checkbox'
import userEvent from '@testing-library/user-event';
describe('Checkbox Component', () => {
    
    test('renders Checkbox with label', () => {
        render(<Checkbox>Check Me</Checkbox>)
        expect(screen.getByText('Check Me')).toBeInTheDocument()
    })

    test('renders Checkbox as readonly', () => {
        render(<Checkbox readOnly>Readonly Checkbox</Checkbox>)
        const checkbox = screen.getByLabelText('Readonly Checkbox')
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).toHaveAttribute('readonly')
    })

    test('does not call onChange when disabled', () => {
        const onChangeMock = jest.fn()
        render(
            <Checkbox disabled onChange={onChangeMock}>
                Disabled Checkbox
            </Checkbox>
        )

        const checkbox = screen.getByLabelText('Disabled Checkbox')
        fireEvent.click(checkbox)

        expect(onChangeMock).not.toHaveBeenCalled()
        expect(checkbox).toBeDisabled()
    })

    test('calls onChange when clicked', async () => {
        const onChangeMock = jest.fn()
        render(<Checkbox onChange={onChangeMock}>Clickable Checkbox</Checkbox>)

        const checkbox = screen.getByRole('checkbox', {
            name: 'Clickable Checkbox',
        })

        await userEvent.click(checkbox) // Use userEvent for better simulation

        expect(onChangeMock).toHaveBeenCalledTimes(1)
    })

    test('toggles checked state when clicked', () => {
        render(<Checkbox>Toggle Checkbox</Checkbox>)

        const checkbox = screen.getByLabelText(
            'Toggle Checkbox'
        ) as HTMLInputElement
        expect(checkbox.checked).toBe(false)

        fireEvent.click(checkbox)
        expect(checkbox.checked).toBe(true)

        fireEvent.click(checkbox)
        expect(checkbox.checked).toBe(false)
    })
})
