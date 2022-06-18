import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { rootState } from "../store/store"

interface productSupplierState {
    value: productSupplier[]
}

export interface productSupplier {
    id: string
    taxPayerId: string
    supplierName: string
    supplierPhone?: string
    supplierNotes?: string
}

const initialState: productSupplierState = {
    value: []
}

const productSupplierSlice = createSlice({
    name: 'productSupplier',
    initialState,
    reducers: {
        getAllProductSupplier: (state, action: PayloadAction<productSupplier[]>) => {
            state.value = action.payload
        },
        addProductSupplier: (state, action: PayloadAction<productSupplier>) => {
            state.value.push(action.payload)
        },
        removeProductSupplier: (state, action: PayloadAction<number>) => {
            state.value.splice(action.payload, 1)
        }
    }
})

export default productSupplierSlice.reducer

export const { getAllProductSupplier, addProductSupplier, removeProductSupplier } = productSupplierSlice.actions

export const selectProductSupplier = (state: rootState) => state.productSupplier.value