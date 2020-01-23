import * as types from '../type'

const initialState = {
    filters: {},
    isSearch: false
}

const reducer = (state = initialState, action) => {
    const {type, payload} = action


    switch(type) {
        case types.ADD_FILTERS:
            return {
                ...state,
                filters: payload
            }
        case types.ADD_SEARCH:
            return {
                ...state,
                isSearch: !state.isSearch
            }
        default: 
            return state
    }
    
}

export default reducer