import { combineReducers } from 'redux'

import products from './reducer-product'
import filters from './reducer-filters'


const reducer = combineReducers({
    products,
    filters,

})

export default reducer