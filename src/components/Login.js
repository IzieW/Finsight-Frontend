import {useState} from "react"
import {Link} from "react-router-dom"

const Login = ({username, setUsername, password, setPassword, handleLogin}) => {
    return (
            <div className = "loginPage">
                <h2> Sign in </h2>
            <form onSubmit={handleLogin}>
                <div>
                    <input 
                        value = {username}
                        onChange = {(event)=> setUsername(event.target.value)}
                        placeholder="username"
                        required />
                </div>
                <div>
                    <input 
                        value = {password}
                        type="password"
                        name="Password"
                        onChange = {(event) => setPassword(event.target.value)}
                        placeholder="password"
                        required
                        />
                </div>
                <button type="submit">login</button>
            </form>
            <div>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
           </div>
    )
}

export default Login