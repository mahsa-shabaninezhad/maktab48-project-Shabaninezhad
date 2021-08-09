import React, { useReducer, useEffect, useState } from 'react'
import { actionType } from './basketConstants'
import { basketReducer } from './basketReducer'
import productAxios from '../../api/productAxios'
import { toast } from 'react-toastify'

const initialState = JSON.parse(localStorage.getItem('cart')) || {items: [], numberOfProducts: 0}

export const BasketContext = React.createContext({
    state: initialState, 
    addToCart: () => {},
    deleteAProductFromCart: () => {},
    deleteAllProductOfOneTypeFromCart: () => {},
})

export const BasketProvider = ({children}) => {
    const [state, dispatch] = useReducer(basketReducer, initialState)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.log('state', state);
        const cart = JSON.stringify(state)
        localStorage.setItem('cart', cart)
    }, [state])

    const addToCart = async(id) => {
        setIsLoading(true)
        const product = await productAxios.get(`/${id}`)
        if(state.items.find(item => item.productId === id)?.number >= product.data.inventory){
            console.log('number > inventory');
            toast.error('تعداد سفارش شما از موجودی انبار بیشتر است.')
            setIsLoading(false)
            return false
        }
        setIsLoading(false)
        dispatch({
            type: actionType.ADD_TO_CART,
            payload: {id, product: product.data}
        })
        return true
    }

    const deleteAProductFromCart = (id) => {
        dispatch({
            type: actionType.DELETE_FROM_CART,
            payload: {id}
        })
    }

    const deleteAllProductOfOneTypeFromCart = (id) => {
        dispatch({
            type: actionType.DELETE_ALL_PRODUCT_OF_ONE_TYPE_FROM_CART,
            payload: {id}
        })
    }

    const changeNumberOfOrder = (id, number, difference) => {
        console.log('id: ', id, 'number: ', number)
        dispatch({
            type: actionType.CHANGE_NUMBER_OF_PRODUCT_BASE_ON_INVENTORY,
            payload:{id, number, difference}
        })
    }

    const emptyBasket = () => {
        dispatch({
            type: actionType.EMPTY_BASKET
        })
    }

    return (
        <BasketContext.Provider value={{
            state,
            isLoading,
            addToCart,
            deleteAProductFromCart,
            deleteAllProductOfOneTypeFromCart,
            changeNumberOfOrder,
            emptyBasket
        }}>
            {children}
        </BasketContext.Provider>
    )
}


