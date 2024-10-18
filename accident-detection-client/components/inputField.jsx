import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputField = ({ label, form, setForm, type }) => {
    const handleChange = (value) => {
        setForm({ ...form, [label]: value });
    };

    return (
        <View style={[styles.container, type === 'em' ? { width: '50%' } : null]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={form[label]}
                onChangeText={handleChange}
                keyboardType={label === 'Phone' ? 'phone-pad' : 'default'}
                maxLength={label === 'Phone' ? 10 : 100}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#fff',
    },
});

export default InputField;