import { useState } from "react";
import { Link } from "react-router-dom";


const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">    
            <div className="w-full max-w-sm bg-white border border-gray-200 p-6 rounded-2xl shadow-lg">
                <form className="space-y-2">
                    <label className="block text-md font-medium text-gray-700" htmlFor="email">
                        Name: 
                    </label>
                    <input className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        type="text" name="name" id="name"
                        value={name} autoComplete="email"
                        onChange={(e) => {setName(e.target.value)}}
                        placeholder="enter your name"                    
                    />
                    <label className="block text-md font-medium text-gray-700" htmlFor="email">
                        Email: 
                    </label>
                    <input className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-gray-500"
                        type="email" name="email" id="email"
                        value={email} autoComplete="email"
                        onChange={(e) => {setEmail(e.target.value)}}
                        placeholder="enter your email ID"
                    />
                    <label className="block text-md font-medium text-gray-700" htmlFor="password">
                        Password: 
                    </label>
                    <input className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-gray-400"
                        type="password" name="password" id="password"
                        value={password} autoComplete="password"
                        onChange={(e) => {setPassword(e.target.value)}}
                        placeholder="enter password"
                    />
                    <p className="text-xs text-gray-500">
                        Atleast 8 characters, include a number & symbol
                    </p>
                    <label className="block text-md font-medium text-gray-700" htmlFor="confirm">
                        Confirm Password:
                    </label>
                    <input className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-gray-400"
                        type="password" name="confirm" id="confirm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="re-enter your password"
                    />
                    <p className="text-xs text-gray-500">
                        *Re-type password
                    </p>
                    <button className="w-full bg-blue-600 rounded-lg px-3 py-2 text-white text-medium font-medium hover:bg-blue-700 focus:ring-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit" disabled = {!email || password.length < 8 || password === confirmPassword}>
                        SignUp
                    </button>
                    <label className="text-sm  text-gray-400">
                        Already have an account?
                        <Link to="/login" className="text-blue-400">SignIn</Link>
                    </label>
                </form>
            </div>
        </div>
    )
}


export default Register;