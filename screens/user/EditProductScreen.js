import React, {useCallback, useEffect, useReducer} from "react";
import {View, Text, StyleSheet, ScrollView, TextInput, Platform, Alert} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import {useSelector, useDispatch} from "react-redux";
import {createProduct, updateProduct} from "../../store/actions/products";
import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedInputValues = {
            ...state.inputValues,
            [action.input]: action.value
        };

        const updatedInputValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for (const key in updatedInputValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
        }

        return {
            inputValues: updatedInputValues,
            inputValidities: updatedInputValidities,
            formIsValid: updatedFormIsValid
        };
    }
    return state;
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
            title: !!editedProduct,
            imageUrl: !!editedProduct,
            description: !!editedProduct,
            price: !!editedProduct,
        },
        formIsValid: !!editedProduct,
    });


    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please enter valid data', [{text: 'ok'}]);
            return
        }
        if (editedProduct) {
            dispatch(updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl))
        } else {
            dispatch(createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler]);

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        }

        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: inputIdentifier
        });
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    label='Title'
                    errorText='Please enter valid title'
                    autoCapitalize='sentences'
                    keyboardType='default'
                    autoCorrect
                    returnKeyType='next'
                />
                <Input
                    label='Image Url'
                    errorText='Please enter valid image url'
                    keyboardType='default'
                    returnKeyType='next'
                />

                {editedProduct ? null : <Input
                    label='Price'
                    errorText='Please enter valid price'
                    keyboardType='decimal'
                    returnKeyType='next'
                />}
                <Input
                    label='Description'
                    errorText='Please enter valid description'
                    keyboardType='default'
                    returnKeyType='next'
                    multiline
                    numberOfLines={3}
                />
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.description}
                        onChangeText={textChangeHandler.bind(this, 'description')}
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
