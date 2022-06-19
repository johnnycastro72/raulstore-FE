import { createAsyncThunk } from "@reduxjs/toolkit"
import { Product } from "../product/productAction";
import { productSupplier } from "./productSupplierSlice";

const APIURL = "https://raulstorebe.herokuapp.com/api/v1"
const CONTENT = { "Content-type": "application/json" }

const getAllProductSuppliersAction = createAsyncThunk('productSuppliers/getAllProductSuppliers',
    async () => {
        const response = await (await fetch(`${APIURL}/productsuppliers`, { method: "GET" })).json();
        return response;
    })

const createProductSupplierAction = createAsyncThunk('productSuppliers/createProductSupplier',
    async (payload: productSupplier) => {
        const response = await (await fetch(`${APIURL}/create/productsupplier`, { headers: CONTENT, method: "POST", body: JSON.stringify(payload) })).json();
        return response;
    })

const updateProductSupplierAction = createAsyncThunk('productSuppliers/updateProductSupplier',
    async (payload: productSupplier) => {
        const response = await (await fetch(`${APIURL}/update/productsupplier`, { headers: CONTENT, method: "POST", body: JSON.stringify(payload) })).json();
        return response;
    })

const deleteProductSupplierAction = createAsyncThunk('productSuppliers/deleteProductSupplier',
    async (id: string) => {
        const response = await fetch(`${APIURL}/delete/productsupplier/${id}`, { method: "DELETE" });
        return {
            deleted: response.ok,
            id
        }
    })

const getProductsByProductSupplierId =
    async (id: string) => {
        const response = await fetch(`${APIURL}/product/productsupplier/${id}`, { method: "GET" });
        const data: Product[] = await response.json()
        return data as Product[];
    }

export { getAllProductSuppliersAction, createProductSupplierAction, updateProductSupplierAction, deleteProductSupplierAction, getProductsByProductSupplierId }