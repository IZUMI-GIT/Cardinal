import React, { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {z} from 'zod';
import { useSignupMutation } from "../../api/apiSlice";
import { useAppDispatch } from "../../app/hooks";
import { setAuthUser } from "./authSlice";
import axios from "axios";

type Debounced<Args extends unknown[]> = {
  (...args: Args): void;
  cancel: () => void;
};

const RegisterModal = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [usernameExist, setUsernameExist] = useState(false);


    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const signUpSchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(8)
    })

    const [signup] = useSignupMutation();

    const checkRef = useRef<((value: string) => void) | null>(null);

    useEffect(() => {
        function debounce<Args extends unknown[], R = unknown>(
            cb: (...args: Args) => R,
            delay = 1000
            ): Debounced<Args> {
                let timeout: ReturnType<typeof setTimeout> | null = null;
                const run = (...args: Args): void => {
                if (timeout) clearTimeout(timeout);
                timeout = setTimeout(() => {
                void cb(...args); // ignore Promise or return value
                timeout = null;
            }, delay);
        };

        run.cancel = () => {
            if (timeout) {
            clearTimeout(timeout);
            timeout = null;
            }
        };

        return run as Debounced<Args>;
        }

        checkRef.current = debounce(async (value : string) => {
            if(!value){
                setUsernameExist(false);
                return;
            }

            try{
                if (!value || !value.trim()) return;
                const u = encodeURIComponent(value.trim());
                const res = await axios.get(`http://localhost:3000/v1/username/${u}`);
                setUsernameExist(Boolean(res.data.exists));
            }catch(err){
                console.error(err);
            }
        }, 700);    
    }, [])

    function handleUsername(e: React.ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        const val = e.target.value;
        setUsername(val);
        checkRef.current && checkRef.current(val);
        if (username) checkRef.current?.(username);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const schemaResponse = signUpSchema.safeParse({
            name,
            email,
            password
        })

        if(!schemaResponse.success){

            return alert("enter details correctly")
        }

        try{
            const result = await signup({
                name,
                email,
                password,
                username

            })
        
            if(result.data){
                dispatch(setAuthUser(result.data))
                navigate('/boards')
            }
        }catch{
            console.error("User registration not successful")

        }
    }


    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">    
            <div className="w-full max-w-sm bg-white border border-gray-200 p-6 rounded-2xl shadow-lg">
                <form className="space-y-2" onSubmit={handleSubmit}>
                    <label className="block text-md font-medium text-gray-700" htmlFor="email">
                        Name: 
                    </label>
                    <input className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        type="text" name="name" id="name"
                        value={name} 
                        onChange={(e) => {setName(e.target.value)}}
                        placeholder="enter your name"                    
                    />
                    <label className="block text-md font-medium text-gray-700" htmlFor="email">
                        Username: 
                    </label>
                    <input className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        type="text" name="username" id="username"
                        value={username}
                        onChange={handleUsername}
                        placeholder="enter username"                    
                    />
                    {username ? (usernameExist ? <div>*username exists</div> : <div>username available</div>) : null}
                    <label className="block text-md font-medium text-gray-700" htmlFor="email">
                        Email: 
                    </label>
                    <input className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-gray-500"
                        type="email" name="email" id="email"
                        value={email} 
                        onChange={(e) => {setEmail(e.target.value)}}
                        placeholder="enter your email ID"
                    />
                    <label className="block text-md font-medium text-gray-700" htmlFor="password">
                        Password: 
                    </label>
                    <input className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-gray-400"
                        type="password" name="password" id="password"
                        value={password}
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
                        type="submit" disabled = {!email || password.length < 8 || password !== confirmPassword || usernameExist}>
                        SignUp
                    </button>
                    <label className="text-sm  text-gray-400">
                        Already have an account?
                        <Link to="/login" className="text-blue-400"> SignIn</Link>
                    </label>
                </form>
            </div>
        </div>
    )
}


export default RegisterModal;