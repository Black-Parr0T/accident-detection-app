import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({ click, text }) => {
    return (
        <TouchableOpacity style={styles.add} onPress={() => click()}>
            <Text style={styles.addText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    add: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        gap: 10,
        width: 120,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 'auto',
        backgroundColor: 'tomato',
    },
    addText: {
        fontSize: 20,
        fontWeight: '500',
    },
})