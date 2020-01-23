import * as types from '../type'

const productsLoaded = (newProduct)  =>{
    return {
        type: types.FETCH_PRODUCTS_SUCCESS,
        payload: newProduct
    }
}
const productsRequested = ()  =>{
    return {
        type: types.FETCH_PRODUCTS_REQUEST,
    }
}
const productsError = (error)  =>{
    return {
        type: types.FETCH_PRODUCTS_FAILURE,
        payload: error
    }
}

const productAddedToCart = (productId, productFilters) =>{
    return {
        type: types.PRODUCT_ADDED_TO_CART,
        payload: {
            productId,
            productFilters
        }
    }
}

const productRemovedToCart = (productId, productFilters ) =>{
    return {
        type: types.PRODUCT_REMOVED_TO_CART,
        payload: {
            productId,
            productFilters
        }
    }
}
const allProductsRemovedToCart = (productId, productFilters ) =>{
    return {
        type: types.ALL_PRODUCTS_REMOVED_TO_CART,
        payload: {
            productId,
            productFilters
        }
    }
}



export default {
    productsLoaded,
    productsRequested,
    productsError,
    productAddedToCart,
    productRemovedToCart,
    allProductsRemovedToCart
}
