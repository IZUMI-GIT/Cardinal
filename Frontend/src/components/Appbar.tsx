import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks";
import { authStatus, isUserAuthenticated } from "./auth/authSlice";
import Spinner from "../features/Spinner";
import Logout from "./auth/Logout";
import logo from "../assets/kanban.svg"

export const Appbar = () => {

    const navigate = useNavigate();
    const isAuth = useAppSelector(isUserAuthenticated);
    const status = useAppSelector(authStatus);




    if(status === "loading"){
        return <Spinner />
    }

    if(!isAuth){
        return(
            <div className="space-y">
                <img src={logo} width={40} height={40} onClick={() => navigate('/')}/>
                <button className="px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-700" 
                onClick={() => navigate('/login')}>
                    Login
                </button>
                <button className="px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:bg-black focus:ring-2 hover:bg-gray-700 focus:ring-black" 
                    onClick={() => navigate('/register')}>
                        Register
                </button>

            </div>
        ) 
    }else{
        return(
            <>
                Page Logo
                <Logout />
            </>
        )
    }
}