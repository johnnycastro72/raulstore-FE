import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { rootState } from "../../store/store"

interface productSupplierState {
    suppliers: productSupplier[],
    status: string, // 'idle' | 'loading' | 'succeded' | 'failed'
    error: null
}

export interface productSupplier {
    id: string
    taxPayerId: string
    supplierName: string
    supplierPhone?: string
    supplierNotes?: string
}

const initialState: productSupplierState = {
    suppliers: [],
    status: 'idle',
    error: null

}

const productSupplierSlice = createSlice({
    name: 'productSupplier',
    initialState,
    reducers: {
        getAllProductSupplier: (state, action: PayloadAction<productSupplier[]>) => {
            state.suppliers = action.payload
        },
        addProductSupplier: (state, action: PayloadAction<productSupplier>) => {
            state.suppliers.push(action.payload)
        },
        removeProductSupplier: (state, action: PayloadAction<number>) => {
            state.suppliers.splice(action.payload, 1)
        }
    }
})

export default productSupplierSlice.reducer

export const { getAllProductSupplier, addProductSupplier, removeProductSupplier } = productSupplierSlice.actions

export const selectAllSuppliers = (state: rootState) => state.productSupplier.suppliers