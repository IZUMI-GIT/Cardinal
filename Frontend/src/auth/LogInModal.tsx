import { useState } from "react"
import z from 'zod';

export function LogInModal () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const loginSchema = z.object({
        email : z.email(),
        password : z.string().min(5)
    })

    function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        console.log("Submitted values :", Object.fromEntries(formData.entries()))

        const schemaResponse = loginSchema.safeParse({
            email,
            password
        })

        if(!schemaResponse.success){
            return alert("enter details correctly")
        }


    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="border-4 border-black-500 p-4 rounded-md leading-6 shadow-lg">
                <form onSubmit={handleSubmit}>
                    <label className="font-semibold">Email : </label>
                    <br />
                    <input className="border-2 border-black-2 rounded-md mb-2" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter mail ID"/>
                    <br />
                    <label className="font-semibold">Password : </label>
                    <br />
                    <input className="border-2 border-black-2 rounded-md mb-2" type="password" name="password" value={password} min='8' onChange={(e) => setPassword(e.target.value)} placeholder="enter password" />
                    <br />
                    <button className="mx-auto border px-2 rounded-md bg-blue-300 hover:bg-blue-500" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}