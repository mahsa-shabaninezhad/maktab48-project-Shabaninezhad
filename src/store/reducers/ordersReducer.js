import { ActionTypes } from "../constants/action-types";
const initialState = {
    ordersStatus: 'delivered',
    ordersList: []
}

export const ordersReducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_DELIVERY_STATUS:
            return {...state, ordersStatus: payload};
        
        case ActionTypes.SET_ORDERS:
            return {...state, ordersList: payload};

        
    
        default:
            return state;
    }
}