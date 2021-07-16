import axios from "axios"
import ordersAxios from "../../api/ordersAxios"
import { ActionTypes } from "../constants/action-types"
import { closeModal } from "./modalActions"

export const setOrders = orders => {
    return({
        type: ActionTypes.SET_ORDERS,
        payload: orders
    })
}

export const setOrdersStatus = status => {
    console.log(status);
    return({
        type: ActionTypes.SET_DELIVERY_STATUS,
        payload: status
    })
}

export const getOrders = () => async(dispatch, getState) => {
    const filter = getState().orders.ordersStatus
    const response = await ordersAxios.get(`?deliveryStatus=${filter}`)
    dispatch(setOrders(response.data))
}

export const changeDeliveryStatus = (id, data) => (dispatch, getState) => {
    ordersAxios.put(`/${id}`, data).then(res => {
        dispatch(getOrders())
        dispatch(closeModal())
    })

}