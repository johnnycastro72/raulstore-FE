import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { rootState } from "../../store/store"
import { getAllBillNotesAction } from "./BillNoteAction"

interface billNoteState {
    billNotes: billNote[]
    status: 'idle' | 'loading' | 'succeded' | 'failed'
    error: string | null
}

export interface billNote {
    id?: string
    billId: string
    billDate: string
    customerName: string
    salesPerson: string
    billTotal: number
    items: billProduct[]
}

export interface billProduct {
    productId: string
    productName: string
    billQuantity: number
    productUnits: number
    productPrice: number
    productMinimumUnits: number
}

const initialState: billNoteState = {
    billNotes: [],
    status: 'idle',
    error: null
}

const BillNoteSlice = createSlice({
    name: 'billNote',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getAllBillNotesAction.pending, (state: billNoteState, action) => {
                state.status = 'loading';
            })
            .addCase(getAllBillNotesAction.fulfilled, (state: billNoteState, action: PayloadAction<billNote[]>) => {
                state.status = 'succeded';
                state.billNotes = action.payload;
            })
            .addCase(getAllBillNotesAction.rejected, (state: billNoteState, action) => {
                state.status = 'failed';
                state.error = action.error.message || "";
            })
    },
})

export default BillNoteSlice.reducer

export const selectAllBills = (state: rootState) => state.billNote.billNotes
export const getBillsStatus = (state: rootState) => state.billNote.status
export const getBillsErrors = (state: rootState): any => state.billNote.error
