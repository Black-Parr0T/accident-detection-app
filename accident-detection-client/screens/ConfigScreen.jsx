import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputField from '../components/inputField'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfigScreen = () => {

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data) {
                    const userData = JSON.parse(data);
                    setForm(userData.form);
                    setContact1(userData.emergencyContacts[0]);
                    setContact2(userData.emergencyContacts[1]);
                }
            } catch (error) {
                console.error('Failed to get data', error);
            }
        };
        getData();
    }, []);


    const [form, setForm] = useState({});
    const [contact1, setContact1] = useState({});
    const [contact2, setContact2] = useState({});

    const saveData = async () => {
        try {
            const data = {
                form,
                emergencyContacts: [contact1, contact2],
            };
            await AsyncStorage.setItem('userData', JSON.stringify(data));
            ToastAndroid.show('Data saved successfully!', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Failed to save data', error);
        }
    };

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
            <TouchableOpacity style={styles.add} onPress={()=>saveData()}>
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
        marginTop: 20,
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