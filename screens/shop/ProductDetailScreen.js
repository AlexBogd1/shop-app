import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {useSelector} from "react-redux";

const ProductDetailScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const products = useSelector(state => state.products.availableProducts);
    const product = products.find(prod => prod.id === prodId);

    return (
        <View>
            <Text>{product.title}</Text>
        </View>
    );
};

ProductDetailScreen.navigationOptions = navigationData => {
    const title = navigationData.navigation.getParam('title');
    return {
        headerTitle: title,
    }
}

const styles = StyleSheet.create({});


export default ProductDetailScreen;