import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { rootState } from '../../store/store'
import { productSupplier } from '../productSupplier/ProductSupplierSlice'
import { getAllReceiptNotesAction, newReceiptNoteAction } from './ReceiptNoteAction'

interface receiptNoteState {
    receiptNotes: receiptNote[]
    status: 'idle' | 'loading' | 'succeded' | 'failed'
    error: string | null
}

export interface receiptNote {
    id?: string
    receiptNumber: string
    productSupplier: productSupplier
    receiptDate: string
    items: receiptProduct[]
}

export interface receiptProduct {
    productId: string
    productName: string
    quantity: number
    productUnits: number
    maximumUnits: number
}

const initialState: receiptNoteState = {
    receiptNotes: [],
    status: 'idle',
    error: null
}

const ReceiptNoteSlice = createSlice({
    name: 'receiptNote',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getAllReceiptNotesAction.pending, (state: receiptNoteState, action) => {
                state.status = 'loading';
            })
            .addCase(getAllReceiptNotesAction.fulfilled, (state: receiptNoteState, action: PayloadAction<receiptNote[]>) => {
                state.status = 'succeded';
                state.receiptNotes = action.payload;
            })
            .addCase(getAllReceiptNotesAction.rejected, (state: receiptNoteState, action) => {
                state.status = 'failed';
                state.error = action.error.message || "";
            })
            .addCase(newReceiptNoteAction.pending, (state: receiptNoteState, action) => {
                state.status = 'loading';
            })
            .addCase(newReceiptNoteAction.fulfilled, (state: receiptNoteState, action: PayloadAction<receiptNote>) => {
                state.status = 'succeded';
                state.receiptNotes.push(action.payload);
            })
            .addCase(newReceiptNoteAction.rejected, (state: receiptNoteState, action) => {
                state.status = 'failed';
                state.error = action.error.message || "";
            })
    },
})

export default ReceiptNoteSlice.reducer

export const selectAllReceipts = (state: rootState) => state.receiptNote.receiptNotes
export const getReceiptsStatus = (state: rootState) => state.receiptNote.status
export const getReceiptsErrors = (state: rootState): any => state.receiptNote.error
