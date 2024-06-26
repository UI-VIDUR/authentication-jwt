import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <ul>
            <Link to="/register">Register</Link>
            <strong>OR</strong>
            <Link to="/login">Login</Link>
        </ul>
    )
}

export default Home