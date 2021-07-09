import { combineReducers } from "redux";
import { adminReducer } from './adminReducer'

export const rootReducer = combineReducers({
    admin: adminReducer
})