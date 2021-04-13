import React from 'react';
import {createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from "react-navigation-drawer";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import UserProductScreen from "../screens/user/UserProductScreen";
import Colors from '../constants/Colors';
import {Platform} from "react-native";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import {Ionicons} from "@expo/vector-icons";

const defaultNavigationsOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary: 'white',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor:Platform.OS === 'android' ? 'white': Colors.primary ,
};


const ProductNavigator = createStackNavigator({
    ProductOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailScreen,
    Cart: CartScreen,
}, {
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart': 'ios-cart'} size ={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavigationsOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,
}, {
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list': 'ios-list'} size ={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultNavigationsOptions,
});

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
}, {
    navigationOptions:{
        drawerIcon: drawerConfig =>
            <Ionicons
                name={Platform.OS === 'android' ? 'md-create': 'ios-create'}
                size ={23}
                color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultNavigationsOptions,
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductNavigator,
    Orders: OrdersNavigator,
    UserProducts: AdminNavigator,
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});



export default createAppContainer(ShopNavigator);