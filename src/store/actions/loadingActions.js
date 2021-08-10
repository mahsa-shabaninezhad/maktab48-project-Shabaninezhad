import { ActionTypes } from "../constants/action-types";

export const startLoading = () => {
    return({
        type: ActionTypes.START_LOADING
    })
}

export const finishLoading = () => {
    return({
        type: ActionTypes.FINISH_LOADING
    })
}