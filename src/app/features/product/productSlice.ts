import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { rootState } from "../../store/store"
import { addUnitsToInventoryAction, createProductAction, deleteProductAction, getAllProductsAction, Product } from "./productAction"

interface productState {
    products: Product[]
    status: 'idle' | 'loading' | 'succeded' | 'failed'
    error: string | null
}

const initialState: productState = {
    products: [],
    status: 'idle',
    error: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllProductsAction.pending, (state: productState, action) => {
                state.status = 'loading';
            })
            .addCase(getAllProductsAction.fulfilled, (state: productState, action: PayloadAction<Product[]>) => {
                state.status = 'succeded';
                state.products = action.payload;
            })
            .addCase(getAllProductsAction.rejected, (state: productState, action) => {
                state.status = 'failed';
                state.error = action.error.message || "";
            })
            .addCase(createProductAction.pending, (state: productState, action) => {
                state.status = 'loading';
            })
            .addCase(createProductAction.fulfilled, (state: productState, action: PayloadAction<Product>) => {
                state.status = 'succeded';
                state.products.push(action.payload);
            })
            .addCase(createProductAction.rejected, (state: productState, action) => {
                state.status = 'failed';
                state.error = action.error.message || "";
            })
            .addCase(deleteProductAction.pending, (state: productState, action) => {
                state.status = 'loading';
            })
            .addCase(deleteProductAction.fulfilled, (state: productState, action: PayloadAction<{deleted: boolean, id: string}>) => {
                state.status = 'succeded';
                if (action.payload.deleted) {
                    const productsWithoutDeleted = state.products.filter((product) => product.id != action.payload.id);
                    state.products = productsWithoutDeleted;
                }
            })
            .addCase(deleteProductAction.rejected, (state: productState, action) => {
                state.status = 'failed';
                state.error = action.error.message || "";
            })
            .addCase(addUnitsToInventoryAction.pending, (state: productState, action) => {
                state.status = 'loading';
            })
            .addCase(addUnitsToInventoryAction.fulfilled, (state: productState, action: PayloadAction<Product>) => {
                state.status = 'succeded';
                const productsUpdated = state.products.map(
                    (product) => {
                        if (product.id === action.payload.id) {
                            return action.payload
                        }
                        return product
                    });
                state.products = productsUpdated;
            })
            .addCase(addUnitsToInventoryAction.rejected, (state: productState, action) => {
                state.status = 'failed';
                state.error = action.error.message || "";
            })
    },
})

export default productSlice.reducer

export const selectAllProducts = (state: rootState) => state.product.products
export const getProductsStatus = (state: rootState) => state.product.status
export const getProductsErrors = (state: rootState) => state.product.error
