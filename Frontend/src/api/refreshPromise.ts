import { fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clearAuth, setAuthUser, type User } from "../components/auth/authSlice";


const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: 'include'
})

const is401 = (error: unknown): boolean => {
    if(!error || typeof error !== 'object' || 'id' in error) return false
    
    return (error as FetchBaseQueryError).status === 401;
}

const baseQueryWithReAuth :BaseQueryFn<string | FetchArgs> = async (args, api, extraOptions) => {

    let result = await rawBaseQuery(args, api, extraOptions);

    if(!is401(result.error)) return result;

    const refreshResult = await rawBaseQuery(
        {
        url: '/refresh',
        method: 'POST'
        },api,extraOptions
    )

    if(refreshResult.data && typeof refreshResult.data === 'object'){
        const user = refreshResult.data as User;
        api.dispatch(setAuthUser(user))

        result = await rawBaseQuery(args, api, extraOptions)
    }else{
        api.dispatch(clearAuth())
    }

    return result;
}


export default baseQueryWithReAuth;