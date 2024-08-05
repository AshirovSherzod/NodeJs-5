import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowDown } from "react-icons/fa6";

import './home.scss'

const Home = () => {
    return (
        <main className='home container'>
            <h1>Home</h1>
            <p>click here <FaArrowDown /></p>
            <Link to={"/users"}>Users</Link>
        </main>
    )
}

export default Home