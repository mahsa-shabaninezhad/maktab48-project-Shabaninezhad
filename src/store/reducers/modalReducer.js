import { ActionTypes } from "../constants/action-types";
const initialState = {
    isModalShowing: false,
    modalContent: null,
    modalHeader: ''
}

export const modalReducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.OPEN_MODAL:
            return {isModalShowing: true, modalContent: payload.content, modalHeader: payload.header};

        case ActionTypes.CLOSE_MODAL:
            return {isModalShowing: false, modalContent: null, modalHeader: ''};

        case ActionTypes.ADD_A_PRODUCT:
            return {isModalShowing: false, modalContent: null, modalHeader: ''};
        
        case ActionTypes.DELETE_A_PRODUCT:
            return {isModalShowing: false, modalContent: null, modalHeader: null};
        
        case ActionTypes.FINISH_EDITING:
            return {isModalShowing: false, modalContent: null, modalHeader: ''};
        
    
        default:
            return state;
    }
}