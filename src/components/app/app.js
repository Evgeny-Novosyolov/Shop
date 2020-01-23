import React, {useEffect, useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import {HomePage, CartPage} from '../pages'
import ShopHeader from '../shop-header'
import { connect } from 'react-redux'
import './app.scss'



const App = ({orderTotal,cartItems}) =>{
    

    const [itemLength, setItemLength] = useState(0)
    useEffect(() => {
        let count = 0
        cartItems.map((item) => {
            count += item.count
        })
        setItemLength(count)

    }, [cartItems])

    return(
        <main role="main" className="container">
            <ShopHeader numItems={itemLength} total={orderTotal}/>
            <Switch>
                <Route 
                path='/'
                component={HomePage}
                exact
                />
                <Route 
                path='/cart'
                component={CartPage}
                />
            </Switch>
        </main>

    )
}

const mapStateToProps = (state) =>({
    orderTotal: state.products.orderTotal,
    cartItems: state.products.cartItems,
})

export default connect(mapStateToProps,null)(App)