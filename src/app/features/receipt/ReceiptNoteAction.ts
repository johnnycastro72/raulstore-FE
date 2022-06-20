import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../product/ProductAction";

const APIURL = "https://raulstorebe.herokuapp.com/api/v1"
const CONTENT = { "Content-type": "application/json" }

const getAllReceiptNotesAction = createAsyncThunk('receiptNotes/getAllReceiptNotes',
    async () => {
        const response = await (await fetch(`${APIURL}/receiptnotes`, { method: "GET" })).json();
        return response;
    })

const getProductsByProductSupplierId =
    async (id: string) => {
        const response = await fetch(`${APIURL}/product/productsupplier/${id}`, { method: "GET" });
        const data: Product[] = await response.json()
        return data as Product[];
    }

export { getAllReceiptNotesAction, getProductsByProductSupplierId }