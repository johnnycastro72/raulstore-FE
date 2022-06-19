import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { rootState } from "../../store/store"
import { createProductAction, getAllProductsAction, Product } from "./productAction"

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
    },
})

export default productSlice.reducer

export const selectAllProducts = (state: rootState) => state.product.products
export const getProductsStatus = (state: rootState) => state.product.status
export const getProductsErrors = (state: rootState) => state.product.error
