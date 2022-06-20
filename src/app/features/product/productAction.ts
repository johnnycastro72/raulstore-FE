import { createAsyncThunk } from "@reduxjs/toolkit"
import { productSupplier } from "../productSupplier/ProductSupplierSlice"

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

const deleteProductAction = createAsyncThunk('products/deleteProduct',
    async (id: string) => {
        const response = await fetch(`${APIURL}/delete/product/${id}`, { method: "DELETE" });
        return {
            deleted: response.ok,
            id
        }
    })

const addUnitsToInventoryAction = createAsyncThunk('products/updateproduct',
    async (updateProduct: Product) => {
        const response = await (await fetch(`${APIURL}/update/product/${updateProduct.id}`, { method: "PUT", headers: CONTENT, body: JSON.stringify(updateProduct) })).json();
        return response;
    })


const getProductsById =
    async (id: string) => {
        const response = await fetch(`${APIURL}/product/${id}`, { method: "GET" });
        const data: Product = await response.json()
        return data as Product;
    }



export { getAllProductsAction, createProductAction, deleteProductAction, getProductsById, addUnitsToInventoryAction }
