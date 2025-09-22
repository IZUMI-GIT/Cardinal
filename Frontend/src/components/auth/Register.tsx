

const Register = () => {

    
    return(
        <div>
            <form>
                <label htmlFor="email">
                    Name: 
                </label>
                <input 
                    type="text" name="name" id="name"/>
                <label htmlFor="email">
                    Email: 
                </label>
                <input 
                    type="email" name="email" id="email"/>
                <label>
                    Password: 
                </label>
                <input 
                    type="password" name="password" id="password"/>
                <p>
                    Atleast 8 characters, include a number & symbol
                </p>
                <label>
                    Confirm Password:
                </label>
                <input type="password" name="confirm" id="confirm" />
            </form>
        </div>
    )
}


export default Register;