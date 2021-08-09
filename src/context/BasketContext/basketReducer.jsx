import { actionType } from "./basketConstants";

export const basketReducer = (state, {type, payload}) => {
    switch (type) {
        case actionType.ADD_TO_CART:
            const isProductExist = state.items.findIndex(item => item.productId === payload.id);
            const newItems = [...state.items]
            if(isProductExist > -1){
                const updatedItem = {...state.items[isProductExist], number: state.items[isProductExist].number + 1} 
                newItems.splice(isProductExist,1,updatedItem)
            }else{
                newItems.push({
                    productId: payload.id,
                    product: payload.product,
                    inventory: payload.product.inventory,
                    number: 1
                })
            }
            
            return {...state, items: newItems, numberOfProducts: state.numberOfProducts + 1}
            
        case actionType.DELETE_FROM_CART:
            const productIndex = state.items.findIndex(item => item.productId === payload.id);
            const updatedItem = {...state.items[productIndex], number: state.items[productIndex].number - 1} 
            const newList = [...state.items]
            newList.splice(productIndex,1,updatedItem)

            return {...state, items: newList, numberOfProducts: state.numberOfProducts - 1}
            
        case actionType.DELETE_ALL_PRODUCT_OF_ONE_TYPE_FROM_CART:
            const deletedProductIndex = state.items.findIndex(item => item.productId === payload.id);
            const numOfDeletedItems = state.items[deletedProductIndex].number
            const newCart = [...state.items]
            newCart.splice(deletedProductIndex,1)

            return {...state, items: [...newCart], numberOfProducts: state.numberOfProducts - numOfDeletedItems}
        
        case actionType.EMPTY_BASKET:
            return {...state, items: [], numberOfProducts: 0}    
        
        case actionType.CHANGE_NUMBER_OF_PRODUCT_BASE_ON_INVENTORY: 
            const changinProductIndex = state.items.findIndex(item => item.productId === payload.id)
            const update = {...state.items[changinProductIndex], number: payload.number} 
            const updatedList = [...state.items]
            updatedList.splice(changinProductIndex,1,update)
            return {...state, items: updatedList, numberOfProducts: state.numberOfProducts - payload.difference}

        default:
            return state
    }
}