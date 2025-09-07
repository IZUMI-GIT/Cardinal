import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface User {
    id: number,
    name: string,
    email: string,
    role?: string
}
export interface Auth {
    status: 'idle' | 'authenticated' | 'unauthenticated' | 'error' | 'checking',
    user: null | User,
    error?: string | null,
    lastCheckedAt?: number
}

const initialState: Auth = {
    status: 'idle',
    user: null,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setAuthUser(state, action: PayloadAction<User>){
            state.user = action.payload;
            state.status = 'authenticated';
            state.error = null;
            state.lastCheckedAt = Date.now()
        },

        clearAuth(state, action: PayloadAction){
            state.user = null;
            state.status = "unauthenticated";
            state.error = null
            console.log(action.payload)
        },

        setAuthStatus(state, action:PayloadAction<Auth["status"]>){
            console.log(state);
            state.status = action.payload
        },

        setAuthError(state, action:PayloadAction<string | null>){
            console.log(state, action.payload);
            state.error = action.payload
        },

        //setAuthStatus("checking")
    }
})


//exporting the generated reducer functions
export default authSlice.reducer;
export const {setAuthUser, clearAuth, setAuthStatus, setAuthError} = authSlice.actions

export const selectAuthStatus = (s: RootState) => s.auth.status;
export const selectCurrentUser = (s: RootState) => s.auth.user;
export const selectIsAuthenticated = (s: RootState) => {
    const x = Boolean(s.auth.user && s.auth.status === "authenticated")
    return x;
}