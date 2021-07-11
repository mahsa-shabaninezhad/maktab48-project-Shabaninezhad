import { ActionTypes } from "../constants/action-types";
const initialState = {
    productsList: [],
    needEditProduct: false,
    deletedProduct: false
}

export const productsReducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_ALL_PRODUCTS:
            return {...state, productsList: [...payload]};

        case ActionTypes.ADD_A_PRODUCT:
            return {...state, productsList: [...state.productsList, payload]};

        case ActionTypes.START_EDITING:
            return {...state, needEditProduct: payload};

        case ActionTypes.FINISH_EDITING:
            return {...state, needEditProduct: false};

        case ActionTypes.DELETE_A_PRODUCT:
            return {...state, productsList: state.productsList.filter(product => product.id !== payload), deletedProduct: false};
        
        case ActionTypes.SELECT_PRODUCT_TO_DELETE:
            return {...state, deletedProduct: payload}

        default:
            return state;
    }
}