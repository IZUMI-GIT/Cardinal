import { createSlice, type PayloadAction,  } from "@reduxjs/toolkit";

export interface User {
    id: number,
    email: string,
    username: string,
    role?: string
}

export interface Auth {
    status: 'idle' | 'authenticated' | 'unauthenticated' | 'error',
    user: null | User,
    error?: null | string,
    lastCheckedAt?: null | number
}

const initialState: Auth = {
    status: 'idle',
    user: null,
    error: null,
    lastCheckedAt: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.status = "authenticated";
            state.lastCheckedAt = Date.now();
            state.error = null
        },
        clearAuth(state){
            state.user = null;
            state.status = 'unauthenticated'
        },
        setAuthStatus(state, action: PayloadAction<Auth['status']>){
            state.status = action.payload
        },
        setAuthError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        }
    }

})

export const { setAuthUser, clearAuth, setAuthStatus, setAuthError } = authSlice.actions;
export default authSlice.reducer;

export const userData = (s: {auth: Auth}) => s.auth.user;
export const isUserAuthenticated = (s: {auth: Auth}) => s.auth.status === 'authenticated' && s.auth.user != null
export const authStatus = (s: {auth: Auth}) => s.auth.status;