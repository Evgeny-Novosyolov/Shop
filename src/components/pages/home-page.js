import React from 'react'
import ProductList from '../product-list'
import Filter from '../filter'
import './page.scss'

const HomePage = () =>{


    return (
        <div className="home__page">
            <Filter/>
            <ProductList />
        </div>
    )
}

export default HomePage