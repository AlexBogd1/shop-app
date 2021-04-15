import React, {useCallback, useEffect, useReducer} from "react";
import {View, Text, StyleSheet, ScrollView, TextInput, Platform, Alert} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import {useSelector, useDispatch} from "react-redux";
import {createProduct, updateProduct} from "../../store/actions/products";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {

    }
}

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(
        state => state.products.userProducts.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: '',
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false,
    },);


    const submitHandler = useCallback(() => {
        if (!titleIsValid) {
            Alert.alert('Wrong input!', 'Please enter valid data', [{text: 'ok'}]);
            return
        }
        if (editedProduct) {
            dispatch(updateProduct(prodId, title, description, imageUrl))
        } else {
            dispatch(createProduct(title, description, imageUrl, +price));
        }
    }, [dispatch, title, description, imageUrl, price,titleIsValid]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler]);

    const titleChangeHandler = text => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        }

        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: 'title'
        })
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={titleChangeHandler}
                        autoCapitalize='sentences'
                        keyboardType='default'
                        autoCorrect
                        returnKeyType='next'
                        onEndEditing={() => console.log('onEndEditing')}
                        onSubmitEditing={() => console.log('onSubmitEditing')}
                    />
                    {!titleIsValid && <Text>Please enter data</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image Url</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={(url) => setImageUrl(url)}
                    />
                </View>
                {editedProduct ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={(price) => setPrice(price)}
                    />
                </View>}

                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={(description) => setDescription(description)}
                    />
                </View>
            </View>
        </ScrollView>
    )
};

EditProductScreen.navigationOptions = navData => {
    const submit = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title={'Save'}
                iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                onPress={submit}
            />
        </HeaderButtons>,
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20,

    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    }

});

export default EditProductScreen;
