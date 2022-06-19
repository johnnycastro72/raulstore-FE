import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from '../features/loggedInSlice'
import productSupplierReducer from '../features/productSupplier/productSupplierSlice'
import productReducer from "../features/product/productSlice";

const store = configureStore({
    reducer: {
        logged: loggedInReducer,
        productSupplier: productSupplierReducer,
        product: productReducer
    }   
})

export type rootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch

export default store