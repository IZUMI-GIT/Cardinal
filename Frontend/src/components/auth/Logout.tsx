import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../api/apiSlice";
import { useAppDispatch } from "../../app/hooks";
import { clearAuth } from "./authSlice";

const Logout = () => {

    const [signOut] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try{
            const result = await signOut();
            console.log(result);

            if(result.data){
                dispatch(clearAuth());
                navigate('/');
            }
        }catch{
            console.log("Logout failed")
        }
    }

    return(
        <button className="px-3 py-2 rounded-lg focus:outline-none focus:text-white hover:bg-black hover:text-white focus:ring-2 focus:ring-black"
            onClick={handleSignOut}>
            Logout
        </button>
    )
}


export default Logout;