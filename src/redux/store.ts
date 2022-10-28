import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './cart/counterSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})