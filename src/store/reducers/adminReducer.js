import { ActionTypes } from "../constants/action-types";
const initialState = {
    isLogedIn: localStorage.getItem('token')? true : false
}

export const adminReducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.ADMIN_LOGEDIN:
            return {isLogedIn: true};

        case ActionTypes.ADMIN_LOGEDOUT:
            localStorage.clear()
            return {isLogedIn: false};
    
        default:
            return state;
    }
}