import React from 'react';
import {FlatList, Button, Platform, Alert} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import {addToCard} from "../../store/actions/card";
import {deleteProduct} from "../../store/actions/products";

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {text: 'No', style: 'default'},
            {
                text: 'Yes', style: 'default', onPress: () => {
                    dispatch(deleteProduct(id));
                }
            },
        ]);
    };

    const editProductHandler = id => {
        props.navigation.navigate('EditProduct', {productId: id});
    }

    return (
        <FlatList
            data={userProducts}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id);
                    }}
                >
                    <Button
                        color={Colors.primary}
                        title='Edit'
                        onPress={() => {
                            editProductHandler(itemData.item.id);
                        }}/>
                    <Button
                        color={Colors.primary}
                        title='Delete'
                        onPress={deleteHandler.bind(this, itemData.item.id)}/>
                </ProductItem>}
        />);
};

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title={'Menu'}
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer()
                }}
            />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title={'Add'}
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('EditProduct');
                }}
            />
        </HeaderButtons>,
    }

}

export default UserProductScreen;