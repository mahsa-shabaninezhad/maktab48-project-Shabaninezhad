import ordersAxios from "../../api/ordersAxios"
import { ActionTypes } from "../constants/action-types"
import { finishLoading, startLoading } from "./loadingActions"
import { closeModal } from "./modalActions"

export const setOrders = orders => {
    return({
        type: ActionTypes.SET_ORDERS,
        payload: orders
    })
}

export const setOrdersStatus = status => {
    return({
        type: ActionTypes.SET_DELIVERY_STATUS,
        payload: status
    })
}

export const getOrders = () => async(dispatch, getState) => {
    try{
        dispatch(startLoading())
        const filter = getState().orders.ordersStatus
        const response = await ordersAxios.get(`?deliveryStatus=${filter}`)
        dispatch(setOrders(response.data))
        dispatch(finishLoading())

    }catch(err) {
        dispatch(finishLoading())
    }
}

export const changeDeliveryStatus = (id, data) => (dispatch, getState) => {
    ordersAxios.put(`/${id}`, data).then(res => {
        dispatch(getOrders())
        dispatch(closeModal())
    })

}