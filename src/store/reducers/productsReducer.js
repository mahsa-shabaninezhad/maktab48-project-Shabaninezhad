import { ActionTypes } from "../constants/action-types";
const initialState = {
    productsList: [],
    deletedProduct: false,
    editCellsList: [],
    editCellsListBuffer: null
}

export const productsReducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_ALL_PRODUCTS:
            return {...state, productsList: [...payload]};

        case ActionTypes.ADD_A_PRODUCT:
            return {...state, productsList: [...state.productsList, payload]};

        case ActionTypes.DELETE_A_PRODUCT:
            return {...state, productsList: state.productsList.filter(product => product.id !== payload), deletedProduct: false};
        
        case ActionTypes.SELECT_PRODUCT_TO_DELETE:
            return {...state, deletedProduct: payload}

        case ActionTypes.APPLY_CELL_EDITING_MODE:
            return {...state, editCellsListBuffer: {...state.editCellsListBuffer, [payload.id]: payload.newCell}}
            
        case ActionTypes.EDIT_A_CELL:
            return {...state, editCellsListBuffer: {...state.editCellsListBuffer, [payload.id]: payload.newCell}}
            
        case ActionTypes.CANCEL_EDIT_A_CELL:
            return {...state, editCellsListBuffer: {...state.editCellsListBuffer, [payload.id]: payload.prevCell}}
            
        case ActionTypes.ADD_A_CELL_TO_EDIT_LIST:
            return {...state, editCellsList: [...state.editCellsList, payload]}
            
        case ActionTypes.DELETE_A_CELL_FROM_EDIT_LIST:
            const cancelEditCellIndex = state.editCellsList.findIndex((id) => payload === id)
            let newEditCellList = [...state.editCellsList]
            newEditCellList.splice(cancelEditCellIndex, 1)
            return {...state, editCellsList: newEditCellList}

        case ActionTypes.EMPTY_EDIT_CELLS_LIST:
            return {...state, editCellsList: []}

        case ActionTypes.SET_EDIT_LIST_BUFFER:
            return {...state, editCellsListBuffer: payload}
                
        default:
            return state;
    }
}