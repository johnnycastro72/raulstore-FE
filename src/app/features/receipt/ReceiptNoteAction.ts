import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../product/productAction";
import { receiptNote } from "./ReceiptNoteSlice";

const APIURL = "https://raulstorebe.herokuapp.com/api/v1"
const CONTENT = { "Content-type": "application/json" }

const getAllReceiptNotesAction = createAsyncThunk('receiptNotes/getAllReceiptNotes',
    async () => {
        const response = await (await fetch(`${APIURL}/receiptnotes`, { method: "GET" })).json();
        return response;
    })

const newReceiptNoteAction = createAsyncThunk('receiptNotes/newReceiptNote',
    async (payload: receiptNote) => {
        const response = await (await fetch(`${APIURL}/create/receiptnote`, { headers: CONTENT, method: "POST", body: JSON.stringify(payload) })).json();
        return response;
    })

const getProductsByProductSupplierId =
    async (id: string) => {
        const response = await fetch(`${APIURL}/product/productsupplier/${id}`, { method: "GET" });
        const data: Product[] = await response.json()
        return data as Product[];
    }

export { getAllReceiptNotesAction, newReceiptNoteAction, getProductsByProductSupplierId }