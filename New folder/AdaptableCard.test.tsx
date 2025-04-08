import { act, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import AdaptableCard from "./AdaptableCard"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { PreloadedState } from '@reduxjs/toolkit'

const mockReduxState = {
    theme: {
        layout: {
            type: 'BASIL',
        },
    },
}

// const salesDashboardReducer = (state = mockReduxState.theme) => state

const store = configureStore({
    reducer: { theme: (state = mockReduxState.theme) => state },  // in reducer's `theme` we have to pass a function in typeScript
    //reducer: { theme: mockReduxState.theme}, // gives error
})

it('rendered', async () => {
    await act(() => render(
        <Provider store={store}>
            <AdaptableCard>
                AdaptableCard Children
            </AdaptableCard>
        </Provider>
    ))

    expect(screen.getByText('AdaptableCard Children')).toBeInTheDocument();
})