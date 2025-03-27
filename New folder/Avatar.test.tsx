import { render, screen } from '@testing-library/react'
import Avatar from './Avatar'
import '@testing-library/jest-dom'

describe('Avatar Component', () => {
    test('renders Avatar with image', () => {
        render(
            <Avatar
                size={32}
                shape="circle"
                src="avatar.png"
                alt="User Avatar"
            />
        )
        const imgElement = screen.getByRole('img')
        expect(imgElement).toHaveAttribute('src', 'avatar.png')
    })

    test('renders Avatar with text', () => {
        render(
            <Avatar size={32} shape="circle">
                U
            </Avatar>
        )
        const textElement = screen.getByText('U')
        expect(textElement).toBeInTheDocument()
    })
})
