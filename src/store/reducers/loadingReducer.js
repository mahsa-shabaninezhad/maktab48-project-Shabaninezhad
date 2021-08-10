import { ActionTypes } from "../constants/action-types";
const initialState = {
    isLoading: false
}

export const loadingReducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.START_LOADING:
            return {isLoading: true};

        case ActionTypes.FINISH_LOADING:
            return {isLoading:  false};
    
        default:
            return state;
    }
}