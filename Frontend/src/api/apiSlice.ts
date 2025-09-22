import { createApi } from '@reduxjs/toolkit/query/react'
import type { User } from '../components/auth/authSlice'
import baseQueryWithReAuth from './refreshPromise'

export const apiSlice = createApi({

    reducerPath: 'api',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['User', 'Refresh'],
    endpoints: builder => ({
        me: builder.query<User, void>({
            query: () => "/me",
            providesTags: ['User']
        }),
        signup: builder.mutation<User, {name: string, email: string, password: string}>({
            query: ({name, email, password}) => ({
                url: '/signup',
                method: 'POST',
                body: {
                    name,
                    email,
                    password
                }
            })
        }),
        username: builder.mutation<User,{email: string, username: string}>({
            query: ({email, username}) => ({
                url: '/username',
                method: 'PATCH',
                body: {
                    email,
                    username
                }
            })
        }),
        login: builder.mutation<User, {email: string, password: string}>({
            query: ({email, password}) => ({
                url: '/signin',
                method: 'POST',
                body: {
                    email,
                    password
                }
            }),
            invalidatesTags: ['User', 'Refresh'] 
        }),
        refresh: builder.mutation<void, void>({
            query: () => ({
                url: '/refresh',
                method: 'POST',
            }),
            invalidatesTags: ['Refresh']
        }),
        logout: builder.mutation<void, void>({
            query: () =>({
                url: '/logout',
                method: 'POST'
            })
        })
    })
})


export const { 
    useMeQuery,
    useLoginMutation,
    useSignupMutation,
    useUsernameMutation,
    useRefreshMutation,
    useLogoutMutation
} = apiSlice