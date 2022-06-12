import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from './features/loggedInSlice'

const store = configureStore({
    reducer: {
        logged: loggedInReducer
    }
})

type storeType = ReturnType<typeof store.getState>

export default store

export type { storeType }