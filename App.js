import React from 'react';
import {Text, View} from 'react-native';
import {combineReducers, createStore} from 'redux';
import {Provider} from "react-redux";
import productReducer from './store/reducers/products';
import ShopNavigator from "./navigation/ShopNavigator";

const rootReducer = combineReducers({
    products: productReducer,
})
const store = createStore(rootReducer);

export default function App() {
    return (
        <Provider store={store}>
            <ShopNavigator/>
        </Provider>
    );
}

