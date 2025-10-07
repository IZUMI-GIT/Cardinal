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

    console.log("isAuth :", isAuth)
    if(!isAuth){
        console.log(isAuth)
        console.log("coming")
        return <Navigate to="/login" replace />
    }else{
        console.log("Came here")
        return <Outlet />

    }
}