import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ForgotPasswordForm from './ForgotPasswordForm'
import { apiForgotPassword } from '@/services/AuthService'
import '@testing-library/jest-dom'

// ✅ Mock API call
jest.mock('@/services/AuthService', () => ({
    apiForgotPassword: jest.fn(),
}))

const renderComponent = () => {
    return render(
        <BrowserRouter future={{ v7_startTransition: true }}>
            <ForgotPasswordForm />
        </BrowserRouter>
    )
}

describe('ForgotPasswordForm Component', () => {
    test('renders form elements', () => {
        renderComponent()

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /send email/i })
        ).toBeInTheDocument()
        expect(screen.getByText(/Sign in/i)).toBeInTheDocument()
    })

    test('shows validation error when trying to submit empty form', async () => {
        renderComponent()

        fireEvent.click(screen.getByRole('button', { name: /send email/i }))

        await waitFor(() => {
            expect(
                screen.getByText(/Please enter your email/i)
            ).toBeInTheDocument()
        })
    })

    test('calls API on valid form submission', async () => {
        ;(apiForgotPassword as jest.Mock).mockResolvedValue({ success: true })

        renderComponent()

        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'test@example.com' },
        })
        fireEvent.click(screen.getByRole('button', { name: /send email/i }))

        await waitFor(() => {
            expect(apiForgotPassword).toHaveBeenCalledWith({
                email: 'test@example.com',
            })
        })
    })

    test('shows success message on successful API response', async () => {
        ;(apiForgotPassword as jest.Mock).mockResolvedValue({ success: true })

        renderComponent()

        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'test@posbasil.com' },
        })
        fireEvent.click(screen.getByRole('button', { name: /send email/i }))

        await waitFor(() => {
            expect(screen.getByText(/Check your email/i)).toBeInTheDocument()
            expect(
                screen.getByText(
                    /We have sent a password recovery instruction/i
                )
            ).toBeInTheDocument()
        })
    })

    test('shows error message if API request fails', async () => {
        ;(apiForgotPassword as jest.Mock).mockRejectedValue({
            response: { data: { message: 'Email not found' } },
        })

        renderComponent()

        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'invalid@example.com' },
        })
        fireEvent.click(screen.getByRole('button', { name: /send email/i }))

        await waitFor(() => {
            expect(screen.getByText(/Email not found/i)).toBeInTheDocument()
        })
    })
})
