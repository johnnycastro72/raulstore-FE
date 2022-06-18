import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "../app/store/store";

export interface userStateType {
    user: null | userType
}

export interface userType {
    displayName?: string
    email?: string
    photoURL?: string
    uid?: string
}

const initialState: userStateType = {
    user: null
}

const loggedInSlice = createSlice({
    name: 'logged',
    initialState,
    reducers: {
        logInReducer(state: userStateType, action: PayloadAction<userType>) {
            const stateLoggedIn = { ...state, user: action.payload }
            return stateLoggedIn
        },
        logOutReducer() {
            return { user: null }
        },
    }
})

export default loggedInSlice.reducer

export const { logInReducer, logOutReducer } = loggedInSlice.actions

export const selectLogged  = (state: rootState) => state.logged