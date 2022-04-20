import { PRODUCT_LOADING, GET_PRODUCTS, GET_PRODUCT } from '../Actions/types';

const initialState = {
    product: null,
    products: null,
    loading: false
}

/**
 * exported funciton, with intial state and action as params
 * @param {*} state initial state
 * @param {*} action action dipatched by the action function
 */
export default function(state = initialState, action) {
    switch (action.type) {
        case PRODUCT_LOADING:
            return {
            ...state,
            loading: true
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            };
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
        }
        default:
            return state;
    }
}  