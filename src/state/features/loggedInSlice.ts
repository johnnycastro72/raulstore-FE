import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface stateType {
    user: null | userType
}

export interface userType {
    displayName?: string
    email?: string
    photoURL?: string
    uid?: string
}

const initialState: stateType = {
    user: null
}

const loggedInSlice = createSlice({
    name: 'logged',
    initialState,
    reducers: {
        logInReducer(state: stateType, action: PayloadAction<userType>) {
            const stateLoggedIn = { ...state, user: action.payload }
            return stateLoggedIn
        },
        logOutReducer() {
            return { user: null }
        }
    }
})

export default loggedInSlice.reducer

export const { logInReducer, logOutReducer } = loggedInSlice.actions