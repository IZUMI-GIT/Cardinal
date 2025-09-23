import { useState } from "react"

export default function UsernameModal () {
    const [username, setUsername] = useState("");


    return(
        <div>
            <label   htmlFor="username">
                Username: 
            </label>
            <input 
                type="text" name="username" id="username"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
            />
        </div>
    )
}