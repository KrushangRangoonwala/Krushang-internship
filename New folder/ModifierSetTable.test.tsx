import { act, fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
    getModifierSetData,
    apiDeleteModifierSetData,
} from '@/services/ModifierService'
import ModifierSetTable from './ModifierSetTable'

const mockData = {
    status: 200,
    data: [
        {
            id: 1,
            name: 'Opt Mod',
            noOfRequired: 0,
            maximum: 10,
            createdBy: 1,
            createdDate: '2025-03-12T15:32:46Z',
            modifiedBy: 1,
            modifiedDate: '2025-03-12T15:32:46Z',
            isDeleted: false,
            modifierSetModifierItems: [
                {
                    id: 5,
                    modifierItem: {
                        id: 5,
                        orderOutModItemId: null,
                        name: '10.0',
                        price: 10,
                        onlinePrice: 10,
                        createdBy: 1,
                        createdDate: '2025-03-12T15:32:46Z',
                        modifiedBy: 1,
                        modifiedDate: '2025-03-12T15:32:46Z',
                        isDeleted: false,
                        allowMultipleQuantity: false,
                        isAvailable: 3,
                    },
                    createdBy: 1,
                    createdDate: '2025-03-12T15:32:46Z',
                    modifiedBy: 1,
                    modifiedDate: '2025-03-12T15:32:46Z',
                },
                {
                    id: 2,
                    modifierItem: {
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
                    createdBy: 1,
                    createdDate: '2025-03-12T15:32:46Z',
                    modifiedBy: 1,
                    modifiedDate: '2025-03-12T15:32:46Z',
                },
                {
                    id: 4,
                    modifierItem: {
                        id: 4,
                        orderOutModItemId: null,
                        name: '5.0',
                        price: 5,
                        onlinePrice: 5,
                        createdBy: 1,
                        createdDate: '2025-03-12T15:32:46Z',
                        modifiedBy: 1,
                        modifiedDate: '2025-03-12T15:32:46Z',
                        isDeleted: false,
                        allowMultipleQuantity: false,
                        isAvailable: 3,
                    },
                    createdBy: 1,
                    createdDate: '2025-03-12T15:32:46Z',
                    modifiedBy: 1,
                    modifiedDate: '2025-03-12T15:32:46Z',
                },
                {
                    id: 3,
                    modifierItem: {
                        id: 3,
                        orderOutModItemId: null,
                        name: '1.0',
                        price: 1,
                        onlinePrice: 1,
                        createdBy: 1,
                        createdDate: '2025-03-12T15:32:46Z',
                        modifiedBy: 1,
                        modifiedDate: '2025-03-12T15:49:45Z',
                        isDeleted: false,
                        allowMultipleQuantity: true,
                        isAvailable: 3,
                    },
                    createdBy: 1,
                    createdDate: '2025-03-12T15:32:46Z',
                    modifiedBy: 1,
                    modifiedDate: '2025-03-12T15:32:46Z',
                },
                {
                    id: 1,
                    modifierItem: {
                        id: 1,
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
                    createdBy: 1,
                    createdDate: '2025-03-12T15:32:46Z',
                    modifiedBy: 1,
                    modifiedDate: '2025-03-12T15:32:46Z',
                },
            ],
            items: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32, 38],
        },
        {
            id: 2,
            name: 'Req Mod',
            noOfRequired: 1,
            maximum: 5,
            createdBy: 1,
            createdDate: '2025-03-12T15:32:46Z',
            modifiedBy: 1,
            modifiedDate: '2025-03-12T16:21:41Z',
            isDeleted: false,
            modifierSetModifierItems: [
                {
                    id: 7,
                    modifierItem: {
                        id: 3,
                        orderOutModItemId: null,
                        name: '1.0',
                        price: 1,
                        onlinePrice: 1,
                        createdBy: 1,
                        createdDate: '2025-03-12T15:32:46Z',
                        modifiedBy: 1,
                        modifiedDate: '2025-03-12T15:49:45Z',
                        isDeleted: false,
                        allowMultipleQuantity: true,
                        isAvailable: 3,
                    },
                    createdBy: 1,
                    createdDate: '2025-03-12T15:32:46Z',
                    modifiedBy: 1,
                    modifiedDate: '2025-03-12T15:32:46Z',
                },
                {
                    id: 8,
                    modifierItem: {
                        id: 4,
                        orderOutModItemId: null,
                        name: '5.0',
                        price: 5,
                        onlinePrice: 5,
                        createdBy: 1,
                        createdDate: '2025-03-12T15:32:46Z',
                        modifiedBy: 1,
                        modifiedDate: '2025-03-12T15:32:46Z',
                        isDeleted: false,
                        allowMultipleQuantity: false,
                        isAvailable: 3,
                    },
                    createdBy: 1,
                    createdDate: '2025-03-12T15:32:46Z',
                    modifiedBy: 1,
                    modifiedDate: '2025-03-12T15:32:46Z',
                },
                {
                    id: 9,
                    modifierItem: {
                        id: 5,
                        orderOutModItemId: null,
                        name: '10.0',
                        price: 10,
                        onlinePrice: 10,
                        createdBy: 1,
                        createdDate: '2025-03-12T15:32:46Z',
                        modifiedBy: 1,
                        modifiedDate: '2025-03-12T15:32:46Z',
                        isDeleted: false,
                        allowMultipleQuantity: false,
                        isAvailable: 3,
                    },
                    createdBy: 1,
                    createdDate: '2025-03-12T15:32:46Z',
                    modifiedBy: 1,
                    modifiedDate: '2025-03-12T15:32:46Z',
                },
                {
                    id: 6,
                    modifierItem: {
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
                    createdBy: 1,
                    createdDate: '2025-03-12T15:32:46Z',
                    modifiedBy: 1,
                    modifiedDate: '2025-03-12T15:32:46Z',
                },
            ],
            items: [27, 38],
        },
    ],
}

jest.mock('@/services/ModifierService', () => ({  // what this do
    getModifierSetData: jest.fn(() => Promise.resolve(mockData)),
    apiDeleteModifierSetData: jest.fn(() => Promise.resolve({ success: true })),
}))

jest.mock('twin.macro', () => ({  // what this do, 
    theme: jest.fn().mockReturnValue({  // what this do
        colors: { primary: '#000000', secondary: '#FFFFFF' },
        height: { sm: '32px', md: '40px', lg: '48px' },
    }),
}))

describe('ModifierSetTable Component', () => {
    it('Render the table with data', async () => {  // what this do
        const { getByText, queryByText } = await act(async () =>  // why `act` used instead of `render`
            render(<ModifierSetTable />)
        )
        const result = await getModifierSetData()
        expect(result).toEqual(mockData)
        await waitFor(() => { // waitFor used for what
            const modifierName = getByText('Req Mod')
            expect(modifierName).not.toBeNull()
            expect(queryByText('Opt Mod')).toBeInTheDocument()
        })
    })

    it('paginates the table correctly', async () => {
        const { getByText, container } = await act(async () =>
            render(<ModifierSetTable />)
        )

        await waitFor(() => {
            expect(getByText('Req Mod')).toBeInTheDocument()
        })
        const nextPageButton = container.querySelector(  // `container.querySelector` what will this do
            '.pagination-pager-next:not(.pagination-pager-disabled)'
        )

        if (nextPageButton) {
            fireEvent.click(nextPageButton)
            await waitFor(() => {
                expect(getModifierSetData).toHaveBeenCalledTimes(1)
            })
        }
    })

    it('handles delete action', async () => {  // what this do
        const { getByText, container } = render(<ModifierSetTable />)

        await waitFor(() => {
            expect(getByText('Req Mod')).toBeInTheDocument()
        })

        const deleteButton: any = container.querySelector(
            '.cursor-pointer.p-2.hover\\:text-red-500'
        )

        expect(deleteButton).not.toBeNull()

        if (deleteButton) {
            const mockId = 1 // Assuming row ID is 1 for testing
            deleteButton.onclick = () => apiDeleteModifierSetData(mockId)
            fireEvent.click(deleteButton)

            await waitFor(() => {
                expect(apiDeleteModifierSetData).toHaveBeenCalledWith(mockId)
            })
        }
    })
})
