import { useNavigate } from "react-router-dom"

export const Appbar = () => {

    const navigate = useNavigate();

    return(
        <>
        Page Logo
        <button className="border border-grey-300 px-2" onClick={() => navigate('/login')}>Login</button>
        <button className="border border-indigo-500 bg-blue-600 px-2" onClick={() => navigate('/register')}>Register</button>
        </>
    )
}