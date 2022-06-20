import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../product/productAction";

const APIURL = "https://raulstorebe.herokuapp.com/api/v1"
const CONTENT = { "Content-type": "application/json" }

const getAllBillNotesAction = createAsyncThunk('billNotes/getAllBillNotes',
    async () => {
        const response = await (await fetch(`${APIURL}/billnotes`, { method: "GET" })).json();
        return response;
    })

const getProductsInStockGreaterThanAction =
    async (units: number) => {
        const response = await fetch(`${APIURL}/product/stock/${units}`, { method: "GET" });
        const data: Product[] = await response.json();
        return data as Product[];
    }

export { getAllBillNotesAction, getProductsInStockGreaterThanAction }