import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../components/auth/authSlice'
import { apiSlice } from '../api/apiSlice'

export const store = configureStore({

    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: g => g().concat(apiSlice.middleware)
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>