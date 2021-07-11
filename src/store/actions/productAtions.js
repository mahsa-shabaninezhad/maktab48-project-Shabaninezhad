import productAxios from "../../api/productAxios";
import { ActionTypes } from "../constants/action-types";
import axios from "axios";

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

export const startEditAProduct = (data) => {
    return({
        type: ActionTypes.START_EDITING,
        payload: data
    })
}

export const finishEditAProduct = () => {
    return({
        type: ActionTypes.FINISH_EDITING,
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


//-------------------------ASYNC ACTIONS---------------------------
export const getAllProducts = () => async (dispatch, getState) => {
    const response = await productAxios.get()
    dispatch(setProducts(response.data))
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
    productAxios.put(`/${id}`, data).then(res => dispatch(getAllProducts()))
    dispatch(finishEditAProduct())
}


