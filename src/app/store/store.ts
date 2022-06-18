import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from '../features/loggedInSlice'
import productSupplierReducer from '../features/productSupplier/productSupplierSlice'

const store = configureStore({
    reducer: {
        logged: loggedInReducer,
        productSupplier: productSupplierReducer
    }   
})

export type rootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch

export default store