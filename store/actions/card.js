export const ADD_TO_CARD = 'ADD_TO_CARD';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';

export const addToCard = product => {
    return {
        type: ADD_TO_CARD,
        product,
    }
};

export const removeCartItem = cartItemId => {
    return {
        type: REMOVE_CART_ITEM,
        cartItemId,
    }
};