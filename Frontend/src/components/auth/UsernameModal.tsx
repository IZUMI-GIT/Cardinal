import { useState } from "react"
import z from "zod";
import { useUsernameMutation } from "../../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { userData } from "./authSlice";

export default function UsernameModal () {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const [usernameValue] = useUsernameMutation();
    

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const usernameSchema = z.string();

        const schemaResponse = usernameSchema.safeParse(username);

        if(!schemaResponse.success){
            alert("This username is not valid!");
        }

        try{
            const result = await usernameValue({
                email,
                username
            })
            if(!result.error){
                navigate('/boards')
            }
        }catch{

        }
        
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full rounded-2xl p-6 max-w-sm bg-white border border-gray-200 shadow-lg">
                <form className="space-y-2" onSubmit={handleSubmit}>
                    <label className="block text-md font-medium text-gray-700" htmlFor="username">
                        Enter Username: 
                    </label>
                    <input className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text" name="username" id="username"
                        value={username} placeholder="type username"
                        onChange={(e) => {setUsername(e.target.value)}}
                    />
                </form>
            </div>
        </div>
    )
}