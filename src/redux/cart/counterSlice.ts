import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "COUNTER",
    initialState: {
        counter: 0
    },
    reducers: {
        increment: (state) => {
            state.counter += 1
        },
        decrement: (state) => {
            state.counter -= 1
        },
        reset: (state) => {
            state.counter = 0
        },
        incrementByAmount: (state, qty) => {
            state.counter =+ qty.payload
        }
    }
})

export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
