import React from 'react'
import { useGetUserQuery } from '../../context/api/productApi'
import { GoArrowUpLeft } from "react-icons/go";

import './users.scss'
import { Link } from 'react-router-dom'

const Users = () => {

    const { data } = useGetUserQuery()

    let users = data?.payload?.map(el => (
        <div className="users-card">
            <div className="users-card__img">
                <img src="https://www.freeiconspng.com/thumbs/male-icon/male-icon-4.jpg" alt="" />
            </div>
            <div className="users-card__title">
                <h3>{el.fname} {el.lname}</h3>
                <h5>{el.username}</h5>
                <p>age: {el.age}</p>
            </div>
            <div className="users-card__btns">
                <button>Delete</button>
                <button>Edit</button>
            </div>
        </div>
    ))

    return (
        <main className='users container'>
            <div className="users__top">
                <h1>Users</h1>
                <Link to={"/"}>Back to Home <GoArrowUpLeft /></Link>
            </div>
            <div className="users-cards">
                {users}
            </div>
        </main>


    )
}

export default Users