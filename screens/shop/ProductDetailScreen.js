import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet, Button} from "react-native";
import {useSelector} from "react-redux";
import Colors from "../../constants/Colors";

const ProductDetailScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const product = useSelector(state => state.products.availableProducts.find(prod => prod.id === prodId));


    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: product.imageUrl}}/>
            <View style={styles.actions}>
                <Button color={Colors.primary} title='Add to Card' onPress={() => {
                    console.log(product.imageUrl)
                }}/>
            </View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navigationData => {
    const title = navigationData.navigation.getParam('title');
    return {
        headerTitle: title,
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    }
});


export default ProductDetailScreen;