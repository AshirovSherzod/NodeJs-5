import React, { useEffect, useState } from 'react'
import { useSigninUserMutation } from '../../context/api/productApi'
import { useDispatch } from 'react-redux'
import { setToken } from '../../context/slices/authSlice'
import { useNavigate } from 'react-router-dom'

import './login.scss'

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [username, setUsername] = useState("Sherzod3104")
    const [password, setPassword] = useState("12345678")
    const [signIn, { data, isSuccess }] = useSigninUserMutation()

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data?.payload?.token))
            navigate("/users")
        }
    }, [isSuccess])

    const handleChange = (e) => {
        e.preventDefault()
        let signUser = {
            username,
            password
        }

        signIn(signUser)
    }

    return (
        <main className='login container'>
            <form onSubmit={handleChange} action="">
                <h3>Log-in</h3>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' />
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='password' />
                <button>Log in</button>
            </form>
        </main>
    )
}

export default Login