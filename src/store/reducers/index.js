import { combineReducers } from "redux";
import { adminReducer } from './adminReducer'
import { modalReducer } from "./modalReducer";
import { productsReducer } from "./productsReducer";
import { loadingReducer } from "./loadingReducer";
import { ordersReducer } from "./ordersReducer";

export const rootReducer = combineReducers({
    admin: adminReducer,
    products: productsReducer,
    modal: modalReducer,
    orders: ordersReducer,
    
})