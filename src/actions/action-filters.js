import * as types from '../type'

const addFilters = (newFilters)  =>{
    return {
        type: types.ADD_FILTERS,
        payload: newFilters
    }
}
const addFilterSearch = () =>{
    return {
        type: types.ADD_SEARCH,
    }
}

export default {
    addFilters,
    addFilterSearch
}
