import {ADD_TO_CARD} from "../actions/card";
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
    }
    return state;
};