import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createProductSupplierAction, deleteProductSupplierAction, getAllProductSuppliersAction, updateProductSupplierAction } from "./ProductSupplierAction"
import { rootState } from "../../store/store"

interface productSupplierState {
    suppliers: productSupplier[]
    status: 'idle' | 'loading' | 'succeded' | 'failed'
    error: string | null
}

export interface productSupplier {
    id?: string
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
    },
    extraReducers(builder) {
        builder
            .addCase(getAllProductSuppliersAction.pending, (state: productSupplierState, action) => {
                state.status = 'loading';
            })
            .addCase(getAllProductSuppliersAction.fulfilled, (state: productSupplierState, action: PayloadAction<productSupplier[]>) => {
                state.status = 'succeded';
                state.suppliers = action.payload;
            })
            .addCase(getAllProductSuppliersAction.rejected, (state: productSupplierState, action) => {
                state.status = 'failed';
                state.error = action.error.message || "";
            })
            .addCase(createProductSupplierAction.pending, (state: productSupplierState, action) => {
                state.status = 'loading';
            })
            .addCase(createProductSupplierAction.fulfilled, (state: productSupplierState, action: PayloadAction<productSupplier>) => {
                state.status = 'succeded';
                state.suppliers.push(action.payload);
            })
            .addCase(createProductSupplierAction.rejected, (state: productSupplierState, action) => {
                state.status = 'failed';
                state.error = action.error.message || "";
            })
            .addCase(updateProductSupplierAction.pending, (state: productSupplierState, action) => {
                state.status = 'loading';
            })
            .addCase(updateProductSupplierAction.fulfilled, (state: productSupplierState, action: PayloadAction<productSupplier>) => {
                state.status = 'succeded';
                const suppliersUpdated = state.suppliers.map(
                    (supplier) => {
                        if (supplier.id === action.payload.id) {
                            return action.payload
                        }
                        return supplier
                    });
                state.suppliers = suppliersUpdated;
            })
            .addCase(updateProductSupplierAction.rejected, (state: productSupplierState, action) => {
                state.status = 'failed';
                state.error = action.error.message || "";
            })
            .addCase(deleteProductSupplierAction.pending, (state: productSupplierState, action) => {
                state.status = 'loading';
            })
            .addCase(deleteProductSupplierAction.fulfilled, (state: productSupplierState, action: PayloadAction<{deleted: boolean, id: string}>) => {
                state.status = 'succeded';
               if (action.payload.deleted) {
                    const suppliersWithoutDeleted = state.suppliers.filter((supplier) => supplier.id != action.payload.id);
                    state.suppliers = suppliersWithoutDeleted;
                }
            })
            .addCase(deleteProductSupplierAction.rejected, (state: productSupplierState, action) => {
                state.status = 'failed';
                state.error = action.error.message || "";
            })
    },
})

export default productSupplierSlice.reducer

export const selectAllSuppliers = (state: rootState) => state.productSupplier.suppliers
export const getSuppliersStatus = (state: rootState) => state.productSupplier.status
export const getSuppliersErrors = (state: rootState) => state.productSupplier.error
