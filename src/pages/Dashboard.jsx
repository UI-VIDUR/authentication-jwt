import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {

    const [username, setUserName] = useState('')
    const [error, setError] = useState('')

    let history = useNavigate();

    const verifyToken = async () => {
        let token = localStorage.getItem('userToken');
        if(!token){
            history('/login');
        }
        try {
            // console.log(token)
            const res = await axios.get('http://localhost:3001/api/v1/verify', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            console.log(res)

            if(res.status == 200){
                setUserName(res.data.data.user.fullname);
            }else{
                history('/login');
            }

        } catch (error) {
            console.log(error.response.data.error)
            if(error.response.status == 400){
                localStorage.removeItem('userToken');
                history('/login');
            }
        }
        

    }

    useEffect(() => {
        verifyToken()
    }, [])

    return (
        <>
            <div>Welcome, {username}</div>
            {
                error && <h1>{error}</h1>
            }
            <Link to="/">
                Logout
            </Link>
        </>
    )
}
