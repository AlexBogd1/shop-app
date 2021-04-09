import {ADD_TO_CARD, REMOVE_CART_ITEM} from "../actions/card";
import CardItem from "../../models/card-item";

const initialState = {
    items: {},
    totalAmount: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CARD:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            let updatedNewCardItem;

            if (state.items[addedProduct.id]) {
                updatedNewCardItem = new CardItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice);

            } else {
                updatedNewCardItem = new CardItem(1, prodPrice, prodTitle, prodPrice);
            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: updatedNewCardItem
                },
                totalAmount: state.totalAmount + prodPrice
            }
        case REMOVE_CART_ITEM:
            const selectedItem = state.items[action.cartItemId];
            const currentQte = selectedItem.quantity;
            let updatedCartItems;
            if(currentQte > 1){
                const updatedCartItem = new CardItem(
                    selectedItem.quantity - 1,
                    selectedItem.productPrice,
                    selectedItem.productTitle,
                    selectedItem.sum - selectedItem.productPrice,
                );
                updatedCartItems = {...state.items, [action.cartItemId]:updatedCartItem }
            } else {
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.cartItemId];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedItem.productPrice
            }

    }
    return state;
};