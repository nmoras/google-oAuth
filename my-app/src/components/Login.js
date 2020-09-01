import React from 'react'
import {Link} from 'react-router-dom'

function Login() {
    return (
        <div>
            <Link to='/google'>Login with Google</Link>
            <h2>Login with Facebook</h2>
            <h2>Login with Twitter</h2>
            
        </div>
    )
}

export default Login
