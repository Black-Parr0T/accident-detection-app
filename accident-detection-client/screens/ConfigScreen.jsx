import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import InputField from '../components/inputField'

const ConfigScreen = () => {
    const [form, setForm] = useState({});
    const [contact1, setContact1] = useState({});
    const [contact2, setContact2] = useState({});
    console.log(form, contact1, contact2);
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Personal Details :</Text>
            <InputField label="Name" form={form} setForm={setForm} />
            <InputField label="Email" form={form} setForm={setForm} />
            <InputField label="Phone" form={form} setForm={setForm} />
            <Text style={styles.heading}>Emergency Contacts :</Text>
            <View style={styles.emCont}>
                <InputField
                    label="Phone"
                    form={contact1}
                    setForm={setContact1}
                    type={'em'}
                />
                <InputField
                    label="Phone"
                    form={contact2}
                    setForm={setContact2}
                    type={'em'}
                />
            </View>
            <TouchableOpacity style={styles.add} >
                <Text style={styles.addText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ConfigScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    heading: {
        fontWeight: '600',
        fontSize: 20,
        marginHorizontal: 'auto',

    },
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
    emCont: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        justifyContent: 'space-between',
    },
})