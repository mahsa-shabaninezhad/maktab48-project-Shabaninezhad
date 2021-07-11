import { ActionTypes } from "../constants/action-types";

export const openModal = (content, header) => {
    return({
        type: ActionTypes.OPEN_MODAL,
        payload: {content, header}
    })
}

export const closeModal = () => {
    return({
        type: ActionTypes.CLOSE_MODAL
    })
}