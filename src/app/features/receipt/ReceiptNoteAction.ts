import { createAsyncThunk } from "@reduxjs/toolkit";

const APIURL = "https://raulstorebe.herokuapp.com/api/v1"
const CONTENT = { "Content-type": "application/json" }

const getAllReceiptNotesAction = createAsyncThunk('receiptNotes/getAllReceiptNotes',
    async () => {
        const response = await (await fetch(`${APIURL}/receiptnotes`, { method: "GET" })).json();
        return response;
    })

export { getAllReceiptNotesAction }