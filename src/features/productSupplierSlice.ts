import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
    value: [
        {
            id: '00001',
            taxPayerId: '88198758',
            supplierName: 'Jhonny Castro Clavijo',
            supplierPhone: '320-3707534',
            supplierNotes: '',
        }, {
            id: '00002',
            taxPayerId: '33454333',
            supplierName: 'Mel Gibson',
            supplierPhone: '1-922394444',
            supplierNotes: '',
        }
    ]
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