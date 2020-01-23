import * as types from '../type'

const initialState = {
    products: [],
    loading: true,
    error: null,
    cartItems: [
    ],
    orderTotal: 0
}

const updateCartItems = (cartItems, item, idx) =>{

    if(item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx+1)
        ]
    }


    if(idx === -1) {
        return [
            ...cartItems,
            item
        ]
    }

    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx+1)
    ]
}


const updateOrder = (state, productId, productFilters ={}, quantity) => {

    const {cartItems, products} = state

    const itemIndex = cartItems.findIndex((item)=>{
                
        if(typeof(productId) === 'string'){
            return item.newId === productId
        }
        let result 
        if(productFilters.color === undefined){
            result =  products.find((item)=>{
                return item.id === productId
            })
            if(item.newId != `${productId}_${productFilters.color}`) {
                return  item.newId === `${productId}_${result.color[0]}`
            }
        }

        return item.newId === `${productId}_${productFilters.color}` 

    })


    const product = products.find((item)=> item.id === parseInt(productId))
    let newItem = Object.assign({},product)
    const item = cartItems[itemIndex]

 
    if(item) {
        newItem = {
            ...item,
            count: item.count + quantity,
            total: calcTotal(item.total, product.price, quantity),

        }
    } else {
        for(let key in productFilters) {
            if(key === 'price'){
                continue
            }
            newItem[key] = productFilters[key]                    
        }

        if(Object.keys(productFilters).length === 0 || productFilters.color === undefined){
            newItem.color = product.color[0]
        }

        newItem = {
            ...newItem,
            count : 1,
            total :  product.price,
            newId :  `${newItem.id}_${newItem.color}`,
            
        }
    }
  
    return{
        ...state,
        cartItems: updateCartItems(state.cartItems, newItem, itemIndex),
    }
}


const calcTotal = (a,b, quantity = 1) => {
    
    let newA = parseInt(a.toString().replace(/\s+/g,''))
    let newB = parseInt(b.toString().replace(/\s+/g,''))

    let result = `${((newA + (newB * quantity)).toString()).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} руб.`
    return result
}

const calcAllTotal = (state) =>{
    let total = 0
    
    state.cartItems.map((item)=>{
        total += parseInt(item.total.toString().replace(/\s+/g,''))
    })
    total = `${(total.toString()).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} руб.`
    return {
        ...state,
        orderTotal: total
    }
}


const reducer = (state = initialState, action) => {
    const {type, payload ={}} = action
    const {productId, productFilters = {}} = payload

    switch(type) {
        case types.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload,
                loading: false,
                error: null
            }
        case types.FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                products: [],
                loading: true,
                error: null
            }
        case types.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                books: [],
                loading: false,
                error: payload
            }
        case types.PRODUCT_ADDED_TO_CART:

            let resultStateOrderUp =  updateOrder(state, productId,productFilters, 1) 
            let resultAllStateUp = calcAllTotal(resultStateOrderUp)
            return resultAllStateUp

        case types.PRODUCT_REMOVED_TO_CART:
            let resultStateOrderDown =  updateOrder(state, productId,productFilters, -1)
            let resultAllStateDown = calcAllTotal(resultStateOrderDown)
            return resultAllStateDown

        case types.ALL_PRODUCTS_REMOVED_TO_CART:

            const item = state.cartItems.find((({newId})=> newId === productId))

            let resultStateOrderRem =  updateOrder(state, productId,productFilters, -item.count)
            let resultAllStateRem = calcAllTotal(resultStateOrderRem)
            return resultAllStateRem
        default: 
            return state
    }
    
}

export default reducer