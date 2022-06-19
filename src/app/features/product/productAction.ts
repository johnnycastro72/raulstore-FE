import { createAsyncThunk } from "@reduxjs/toolkit"
import { productSupplier } from "../productSupplier/productSupplierSlice"

const APIURL = "https://raulstorebe.herokuapp.com/api/v1"
const CONTENT = { "Content-type": "application/json" }

export interface Product {
    id?: string
    name: string
    description: string
    units: number
    price: number
    minimumUnits: number
    maximumUnits: number
    productSupplierDTO: productSupplier
}

const getAllProductsAction = createAsyncThunk('products/getAllProducts',
    async () => {
        const response = await (await fetch(`${APIURL}/products`, { method: "GET" })).json();
        return response;
    })

const createProductAction = createAsyncThunk('products/createProduct',
    async (payload: Product) => {
        const response = await (await fetch(`${APIURL}/create/product`, { headers: CONTENT, method: "POST", body: JSON.stringify(payload) })).json();
        return response;
    })


export { getAllProductsAction, createProductAction }
