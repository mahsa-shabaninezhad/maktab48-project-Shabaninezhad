import productAxios from "../../api/productAxios";
import { ActionTypes } from "../constants/action-types";
import { finishLoading, startLoading } from "./loadingActions";
import { closeModal } from "./modalActions";

export const setProducts = (products) => {
    return({
        type: ActionTypes.SET_ALL_PRODUCTS,
        payload: products
    })
}

export const selectedProduct = (product) => {
    return({
        type: ActionTypes.SELECTED_PRODUCT,
        payload: product
    })
}

export const addAProductToState = (data) => {
    return({
        type: ActionTypes.ADD_A_PRODUCT,
        payload: data
    })
}

export const deleteAProductFromState = (id) => {
    return({
        type: ActionTypes.DELETE_A_PRODUCT,
        payload: id
    })
}

export const selectProductToDelete = (product) => {
    return ({
        type: ActionTypes.SELECT_PRODUCT_TO_DELETE,
        payload: product
    })
}

export const addACellToEditList = (id) => {
    return ({
        type: ActionTypes.ADD_A_CELL_TO_EDIT_LIST,
        payload: id
    })
}

export const deleteACellFromEditList = (id) => {
    return ({
        type: ActionTypes.DELETE_A_CELL_FROM_EDIT_LIST,
        payload: id
    })
}

export const emptyEditList = () => {
    return ({
        type: ActionTypes.EMPTY_EDIT_CELLS_LIST,
    })
}

export const setBufferList = (object) => {
    return ({
        type: ActionTypes.SET_EDIT_LIST_BUFFER,
        payload: object
    })
}

export const applyCellEditingMode = (id, newCell) => {
    return ({
        type: ActionTypes.APPLY_CELL_EDITING_MODE,
        payload: {id, newCell}
    })
}
export const editACell = (id, newCell) => {
    return ({
        type: ActionTypes.EDIT_A_CELL,
        payload: {id, newCell}
    })
}

export const cancelEditACell = (id, prevCell) => {
    return ({
        type: ActionTypes.CANCEL_EDIT_A_CELL,
        payload: {id, prevCell}
    })
}

//-------------------------ASYNC ACTIONS---------------------------
export const getAllProducts = () => async (dispatch, getState) => {
    try{
        dispatch(startLoading())
        const response = await productAxios.get()
        dispatch(finishLoading())
        dispatch(setProducts(response.data))

    }catch(err) {
        dispatch(finishLoading())
    }

}

export const addAProduct = (data) => async (dispatch, getState) => {
    const newProduct = await productAxios.post('', data)
    dispatch(addAProductToState(newProduct.data))
}

export const deleteAProduct = (product) => async (dispatch, getState) => {
    productAxios.delete(`/${product.id}`)
    dispatch(deleteAProductFromState(product.id))
}

export const editAProduct = (id, data) =>  (dispatch, getState) => {
    productAxios.put(`/${id}`, data).then(res => {
        dispatch(getAllProducts())
        dispatch(closeModal())
    })
}

export const toggleFavorite = (product) =>  (dispatch, getState) => {
    productAxios.put(`/${product.id}`, product).then(res => {
        dispatch(getAllProducts())
    })
}



