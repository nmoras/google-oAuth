import React from 'react'
import {Link} from 'react-router-dom'

function Login() {
    return (
        <div>
            <a href="/auth/google">Login with Google</a>
            <h2>Login with Facebook</h2>
            <h2>Login with Twitter</h2>
            
        </div>
    )
}

export default Login
