import { ActionTypes } from "../constants/action-types";

export const adminLogin = token => {
    return {
        type: ActionTypes.ADMIN_LOGEDIN,
        payload: token
    }
}

export const adminLogOut = () => {
    return {
        type: ActionTypes.ADMIN_LOGEDOUT,
    }
}