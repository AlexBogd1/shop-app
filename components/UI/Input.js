import React from 'react';
import {Text, TextInput, StyleSheet, View} from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';

const inputReducer = (state, action) => {
    switch(action.type){
        case INPUT_CHANGE:

        default:
            return state;
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false,
    })
    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let isValid = true;
        if(props.required && text.trim().length === 0){
            isValid = false;
        }
        if(props.email && !emailRegex.test(text.toLowerCase())){
            isValid = false;
        }
        if(props.min != null && +text < props.min){
            isValid = false;
        }
        if(props.max != null && +text > props.max){
            isValid = false;
        }
        dispatch({type: INPUT_CHANGE, value: text, isValid: isValid });
    };

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={formState.inputValues.title}
                onChangeText={textChangeHandler.bind(this, 'title')}
            />
            {!formState.inputValues.title && <Text>{props.errorText}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
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

export default Input;
