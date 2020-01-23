import React, {useEffect, useState} from 'react'
import ProductListItem from '../product-list-item'
import {connect} from 'react-redux'
import {withProductService} from '../hoc'
import actions from '../../actions'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import NotificationItem from '../notification'
import "./product-list.scss"




const ProductList = ({products, isLoading, isError,productstoreService, productsLoaded, productsRequested, productsError, filters, isSearch, productAddedToCart }) =>{

   


    useEffect(() => {
        productsRequested()
        productstoreService.getProducts()
        .then((data)=>{
            productsLoaded(data)
        })
        .catch((err)=>{
            productsError(err)
        })

        
    }, [isSearch])


    
    const hasKeyProduct = (item, filter) =>{
        let result = false;
        if(typeof(item) != 'object'){
            item = [item]
        }
        

        if(item.toString().indexOf('руб') != -1){
            item = parseInt(item.toString().replace(/\s+/g,''))
            filter = filter.flat()
            const max = (Math.max(...filter))
            const min = (Math.min(...filter))

            if(min < item && item < max) {
                result = true
            } else {
                result = false
            }
        } else {
            item.find((key)=>{
                if(filter.indexOf(key) !== -1){
                    return result = true
                } else {
                    return result = false
                }
            })
        }
        return result 
    }

    const searchProduct = (product, filters) => {
        let result = []
        for(let key in filters){
            const filter = filters[key]
            const item = product[key]
            result.push(hasKeyProduct(item,filter) === true ? product.id : "no")
        }
        const newResult = new Set(result)
        const id = Number([...newResult])
        if(typeof(id) === "number" && !isNaN(id)){
            return id
        }
    }
    


    const RenderAll = () => {
        return(
            <>
                {
                    products.map((product) =>{
                        return(
                            <ProductListItem product={product}
                            key={product.id}
                            onAddedToCart={productAddedToCart}
                            isSearch={isSearch}
                            />
                        )
                        })
                }
            </>
        )
    }

    const RenderWithFilters = () =>{
        let items = products.filter((product)=>{ 
            const id = searchProduct(product, filters)
            return product.id === id ? product : null
        })
       
        const NewProducts = () => {
            return(
                <>
                    {
                        items.map((product) =>{
                            return(
                                <ProductListItem product={product}
                                key={product.id}
                                filters={filters}
                                onAddedToCart={productAddedToCart}
                                isSearch={isSearch}
                                />
                            )
                            })
                    }
                </>
            )
        }
        if(items.length === 0 ){
            return <NotificationItem/>
        }
        return  <NewProducts/>
        
    }


    const RenderItems =  isError ? <ErrorIndicator/>  : isLoading ? <Spinner/> : Object.values(filters).length === 0 ?  <RenderAll/> : <RenderWithFilters/>


    return  (
        <div className="product__wrapper">
            <div className="product__block">
                {RenderItems}
            </div>
        </div>

    )

}

const mapStateToProps = (state) =>({
    products: state.products.products,
    isError: state.products.error,
    isLoading: state.products.loading,
    filters: state.filters.filters,
    isSearch: state.filters.isSearch,
})


export default withProductService()(connect(mapStateToProps, actions)(ProductList))