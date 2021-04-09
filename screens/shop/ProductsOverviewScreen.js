import React from 'react';
import {FlatList, Text} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import {addToCard} from "../../store/actions/card";

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

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products',
}

export default ProductsOverviewScreen;