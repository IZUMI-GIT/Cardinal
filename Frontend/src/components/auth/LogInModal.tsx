import React, { useState } from "react"
import {z} from 'zod'
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from "../../api/apiSlice";

export default function LogInModal () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const loginSchema = z.object({
        email : z.email(),
        password : z.string().min(8)
    })
    
    const [login] = useLoginMutation();

    async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // const form = e.currentTarget;
        // const formData = new FormData(form);
        // console.log("Submitted values :", Object.fromEntries(formData.entries()))

        const schemaResponse = loginSchema.safeParse({
            email,
            password
        })

        if(!schemaResponse.success){
            return alert("enter details correctly")
        }

        const result = await login({email, password});
        console.log(result)
        if(!result.error){
            navigate('/board')
        }
    }

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-sm bg-white border border-gray-200 p-6 rounded-2xl shadow-lg">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <label className="block text-md font-medium text-gray-700" htmlFor="email">Email : </label>
                    <input className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        type="email" name="email" id="email"
                        value={email} autoComplete="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="enter mail ID" 
                    />
                    <label className="block text-md font-medium text-gray-700" htmlFor="password">Password : </label>
                    <input className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        type="password" name="password" id="password"
                        value={password} minLength={8} 
                        onChange={(e) => setPassword(e.target.value)} 
                        autoComplete="current-password" placeholder="enter password"
                    />
                    <p className="text-xs text-gray-500">At least 8 characters, include a number</p>
                    <Link className="text-sm text-blue-400 text-center md:text-right" to="/password/forgot">forgot password?</Link>
                    <button 
                        className="w-full bg-blue-600 rounded-lg px-3 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" 
                        type="submit" disabled = {!email || password.length < 8}
                    >
                        SignIn
                    </button>
                    <label className="text-sm text-gray-400">
                        Don't have an account?
                        <Link to="/register" className="text-blue-400"> Signup</Link>
                    </label>
                </form>
            </div>
        </div>
    )
}