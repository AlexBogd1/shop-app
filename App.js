import React, {useState} from 'react';
import {combineReducers, createStore} from 'redux';
import {Provider} from "react-redux";
import productReducer from './store/reducers/products';
import cardReducer from './store/reducers/card';
import ordersReducer from './store/reducers/orders'
import ShopNavigator from "./navigation/ShopNavigator";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cardReducer,
    orders: ordersReducer,
})
const store = createStore(rootReducer,composeWithDevTools());

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })
}

export default function App() {
    let [fontLoaded, setFontLoaded] = useState(false);

    if(!fontLoaded) {
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setFontLoaded(true)}
            onError = {(err) => console.log(err)}
        />
    }

    return (
        <Provider store={store}>
            <ShopNavigator/>
        </Provider>
    );
}

