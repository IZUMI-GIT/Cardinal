import { createSlice, type PayloadAction,  } from "@reduxjs/toolkit";

export interface User {
    id: number,
    email: string,
    username?: string,
    role?: string
}

export interface Auth {
    status: 'idle' | 'authenticated' | 'unauthenticated' | 'error' | 'loading',
    user: null | User,
    error?: null | {statusCode: number, message: string},
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
        setAuthStatus(state, action: PayloadAction<Auth["status"]>){
            state.status = action.payload;
        },
        setAuthError(state, action: PayloadAction<Auth['error']>) {
            state.status = 'error';
            state.error = action.payload
        },
        setAuthUsername(state, action:PayloadAction<User["username"]>){
            if(state.user){
                state.user.username = action.payload;
            }
        }
    }

})

export const { setAuthUser, clearAuth, setAuthStatus, setAuthError, setAuthUsername } = authSlice.actions;
export default authSlice.reducer;
//here 's' means state.
export const userData = (s: {auth: Auth}) => s.auth.user;
export const isUserAuthenticated = (s: {auth: Auth}) => s.auth.status === 'authenticated' && s.auth.user != null
export const authStatus = (s: {auth: Auth}) => s.auth.status;