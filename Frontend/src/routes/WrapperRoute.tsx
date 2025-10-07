import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../app/hooks";
import { authStatus, isUserAuthenticated } from "../components/auth/authSlice";
import Spinner from "../features/Spinner";

export const WrapperRoute = () => {

    const isAuth = useAppSelector(isUserAuthenticated);
    const status = useAppSelector(authStatus);

    if(status === "loading"){
        return <Spinner />
    }

    if(!isAuth){
        return <Navigate to="/login" replace />
    }else{
        return <Outlet />

    }
}