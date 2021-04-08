import {createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';
import {Platform} from "react-native";

const ProductNavigator = createStackNavigator({
    ProductOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary: 'white',
        },
        headerTintColor:Platform.OS === 'android' ? 'white': Colors.primary ,
    }
});

export default createAppContainer(ProductNavigator);