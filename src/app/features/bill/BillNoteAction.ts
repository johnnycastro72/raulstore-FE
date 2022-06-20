import { createAsyncThunk } from "@reduxjs/toolkit";

const APIURL = "https://raulstorebe.herokuapp.com/api/v1"
const CONTENT = { "Content-type": "application/json" }

const getAllBillNotesAction = createAsyncThunk('billNotes/getAllBillNotes',
    async () => {
        const response = await (await fetch(`${APIURL}/billnotes`, { method: "GET" })).json();
        return response;
    })

export { getAllBillNotesAction }