import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const counterSlice = createSlice({
    name: "COUNTER",
    initialState: {
        counter: 0,
        resetValues: false
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
            state.resetValues = true
        },
        clearValues: (state) => {
            state.resetValues = false
        },
        incrementByAmount: (state, qty) => {
            state.counter = (state.counter + qty.payload)
        },
        decrementByAmount: (state, qty) => {
            state.counter = (state.counter - qty.payload)
        }
    }
})

export const { increment, decrement, reset, incrementByAmount, decrementByAmount, clearValues } = counterSlice.actions

export default counterSlice.reducer
