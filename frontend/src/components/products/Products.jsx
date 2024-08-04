import React from 'react'
import { useGetUserQuery } from '../../context/api/productApi'

const Products = () => {

    const { data } = useGetUserQuery()
    console.log(data);
    return (
        <div>Products</div>
    )
}

export default Products