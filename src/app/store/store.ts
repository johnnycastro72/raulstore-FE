import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from '../features/loggedInSlice'
import productSupplierReducer from '../features/productSupplier/ProductSupplierSlice'
import productReducer from "../features/product/productSlice";
import receiptReducer from "../features/receipt/ReceiptNoteSlice";

const store = configureStore({
    reducer: {
        logged: loggedInReducer,
        productSupplier: productSupplierReducer,
        product: productReducer,
        receiptNote: receiptReducer
    }   
})

export type rootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch

export default store