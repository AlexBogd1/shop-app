import React from 'react';
import {FlatList, Text, Platform} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import {addToCard} from "../../store/actions/card";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return (
        <FlatList data={products}
                  keyExtractor={item => item.id}
                  renderItem={itemData => <ProductItem
                      image={itemData.item.imageUrl}
                      title={itemData.item.title}
                      price={itemData.item.price}
                      onDetail={() => {
                          props.navigation.navigate('ProductDetails', {
                              productId: itemData.item.id,
                              title: itemData.item.title,
                          })
                      }}
                      onAddToCard={() => {
                          dispatch(addToCard(itemData.item))
                      }}
                  />}/>
    );
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title={'Menu'}
                iconName={Platform.OS === 'android' ? 'md-menu': 'ios-menu'}
                onPress={() => {navData.navigation.toggleDrawer()}}
            />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title={'Cart'}
                iconName={Platform.OS === 'android' ? 'md-cart': 'ios-cart'}
                onPress={() => {navData.navigation.navigate('Cart')}}
            />
        </HeaderButtons>
    }

}

export default ProductsOverviewScreen;