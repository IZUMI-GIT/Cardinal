import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../app/hooks";
import { authStatus, isUserAuthenticated } from "../components/auth/authSlice";

export const WrapperRoute = () => {

    const isAuth = useAppSelector(isUserAuthenticated);
    const status = useAppSelector(authStatus);

    if(status === "loading"){
        return (
        <div>
            Loading...
        </div>)
    }

    if (!isAuth){
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}