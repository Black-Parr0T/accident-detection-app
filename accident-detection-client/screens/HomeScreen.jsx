import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const HomeScreen = ({navigation}) => {
    const name = 'irfan';
    const [isMonitoring, setIsMonitoring] = useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Monitoring : {isMonitoring ? 'ON' : 'OFF'}</Text>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: isMonitoring ? 'red' : '#6EC531' }]}
                onPress={() => setIsMonitoring(prev => !prev)}
            >
                <Text style={styles.btnText}>
                    {isMonitoring ? 'Stop' : 'Start'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextScrn} onPress={()=>navigation.navigate('Config')}>
                <Text style={[styles.btnText,{color:'blue'}]}>Add/Edit Data</Text>
                <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    head: {
        fontWeight: '600',
        fontSize: 20,
    },
    button: {
        height: 120,
        width: 120,
        borderRadius: 60,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    nextScrn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        gap: 10,
    },
    });
