import { combineReducers } from "redux";
import { adminReducer } from './adminReducer'
import { modalReducer } from "./modalReducer";
import { productsReducer } from "./productsReducer";

export const rootReducer = combineReducers({
    admin: adminReducer,
    products: productsReducer,
    modal: modalReducer
})