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
        }
    }
})

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer
