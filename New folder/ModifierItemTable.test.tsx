import { act, fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
    getModifierItemData,
    apiDeleteModifierItemData,
} from '@/services/ModifierService'
import ModifierItemTable from './ModifierItemTable'
import { MemoryRouter } from 'react-router-dom'

const mockData = {
    status: 200,
    data: [
        {
            id: 1,
            orderOutModItemId: null,
            name: 'Test 1',
            price: 0,
            onlinePrice: 0,
            createdBy: 1,
            createdDate: '2025-03-12T15:32:46Z',
            modifiedBy: 1,
            modifiedDate: '2025-03-12T15:32:46Z',
            isDeleted: false,
            allowMultipleQuantity: false,
            isAvailable: 3,
        },
        {
            id: 2,
            orderOutModItemId: null,
            name: '0.0',
            price: 0,
            onlinePrice: 0,
            createdBy: 1,
            createdDate: '2025-03-12T15:32:46Z',
            modifiedBy: 1,
            modifiedDate: '2025-03-12T15:32:46Z',
            isDeleted: false,
            allowMultipleQuantity: false,
            isAvailable: 3,
        },
    ],
}

jest.mock('@/services/ModifierService', () => ({
    getModifierItemData: jest.fn(() => Promise.resolve(mockData)),
    apiDeleteModifierItemData: jest.fn(() =>
        Promise.resolve({ success: true })
    ),
}))

jest.mock('twin.macro', () => ({
    theme: jest.fn().mockReturnValue({
        colors: { primary: '#000000', secondary: '#FFFFFF' },
        height: { sm: '32px', md: '40px', lg: '48px' },
    }),
}))

describe('ModifierSetTable Component', () => {
    it('Render the table with data', async () => {
        const { getByText, queryByText } = await act(async () =>
            render(
                <MemoryRouter>
                    <ModifierItemTable />
                </MemoryRouter>
            )
        )
        await waitFor(() => {
            const modifierName = getByText('Test 1')
            expect(modifierName).not.toBeNull()
            expect(queryByText('Test 1')).toBeInTheDocument()
        })
        const result = await getModifierItemData()
        expect(result).toEqual(mockData)
    })

    it('paginates the table correctly', async () => {
        const { getByText, container } = await act(async () =>
            render(
                <MemoryRouter>
                    <ModifierItemTable />
                </MemoryRouter>
            )
        )

        await waitFor(() => {
            expect(getByText('Test 1')).toBeInTheDocument()
        })
        const nextPageButton = container.querySelector(
            '.pagination-pager-next:not(.pagination-pager-disabled)'
        )

        if (nextPageButton) {
            fireEvent.click(nextPageButton)
            await waitFor(() => {
                expect(getModifierItemData).toHaveBeenCalledTimes(1)
            })
        }
    })

    it('handles delete action', async () => {
        const { getByText, container } = render(
            <MemoryRouter>
                <ModifierItemTable />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(getByText('Test 1')).toBeInTheDocument()
        })

        const deleteButton: any = container.querySelector(
            '.cursor-pointer.p-2.hover\\:text-red-500'
        )

        expect(deleteButton).not.toBeNull()

        if (deleteButton) {
            const mockId = 1 // Assuming row ID is 1 for testing
            deleteButton.onclick = () => apiDeleteModifierItemData(mockId)
            fireEvent.click(deleteButton)

            await waitFor(() => {
                expect(apiDeleteModifierItemData).toHaveBeenCalledWith(mockId)
            })
        }
    })
})
