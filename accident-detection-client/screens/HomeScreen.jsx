import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import AntDesign from '@expo/vector-icons/AntDesign';
import AccidentDetectCard from '../components/AccidentDetectCard';

const THRESHOLD = 1.0;
const ROLLOVER_THRESHOLD = 2.5;

const HomeScreen = ({ navigation }) => {
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
    const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
    const [prevAccelerometerData, setPrevAccelerometerData] = useState(null);
    const [prevGyroscopeData, setPrevGyroscopeData] = useState(null);
    const [suddenMovement, setSuddenMovement] = useState(false);
    const [rolloverDetected, setRolloverDetected] = useState(false);

    useEffect(() => {
        if (isMonitoring) {
            subscribeSensors();
        } else {
            unsubscribeSensors();
        }
        return () => unsubscribeSensors();
    }, [isMonitoring]);

    const subscribeSensors = () => {
        Accelerometer.addListener(accelerometerData => {
            detectSuddenChange(accelerometerData, 'accelerometer');
            setAccelerometerData(accelerometerData);
        });
        Accelerometer.setUpdateInterval(500);

        Gyroscope.addListener(gyroscopeData => {
            detectSuddenChange(gyroscopeData, 'gyroscope');
            detectRollover(gyroscopeData);
            setGyroscopeData(gyroscopeData);
        });
        Gyroscope.setUpdateInterval(500);
    };

    const unsubscribeSensors = () => {
        Accelerometer.removeAllListeners();
        Gyroscope.removeAllListeners();
    };

    const detectSuddenChange = (data, type) => {
        const prevData = type === 'accelerometer' ? prevAccelerometerData : prevGyroscopeData;
        if (prevData) {
            const diffX = Math.abs(data.x - prevData.x);
            const diffY = Math.abs(data.y - prevData.y);
            const diffZ = Math.abs(data.z - prevData.z);

            if (diffX > THRESHOLD || diffY > THRESHOLD || diffZ > THRESHOLD) {
                setSuddenMovement(true);
                console.log(`Sudden ${type} movement detected!`);
            } else {
                setSuddenMovement(false);
            }
        }

        if (type === 'accelerometer') {
            setPrevAccelerometerData(data);
        } else {
            setPrevGyroscopeData(data);
        }
    };

    const detectRollover = (data) => {
        const { x, y, z } = data;
        if (Math.abs(x) > ROLLOVER_THRESHOLD || Math.abs(y) > ROLLOVER_THRESHOLD || Math.abs(z) > ROLLOVER_THRESHOLD) {
            setRolloverDetected(true);
            console.log('Rollover detected!');
        } else {
            setRolloverDetected(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.head}>Monitoring: {isMonitoring ? 'ON' : 'OFF'}</Text>
            <Text style={styles.sensorData}>
                Accelerometer: x: {accelerometerData.x.toFixed(2)}, y: {accelerometerData.y.toFixed(2)}, z: {accelerometerData.z.toFixed(2)}
            </Text>
            <Text style={styles.sensorData}>
                Gyroscope: x: {gyroscopeData.x.toFixed(2)}, y: {gyroscopeData.y.toFixed(2)}, z: {gyroscopeData.z.toFixed(2)}
            </Text>
            <Text style={styles.alert}>
                {suddenMovement ? 'Sudden movement detected!' : 'No sudden movement'}
            </Text>
            <Text style={styles.alert}>
                {rolloverDetected ? 'Rollover detected!' : 'No rollover'}
            </Text>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: isMonitoring ? 'red' : '#6EC531' }]}
                onPress={() => setIsMonitoring(prev => !prev)}
            >
                <Text style={styles.btnText}>
                    {isMonitoring ? 'Stop' : 'Start'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextScrn} onPress={() => navigation.navigate('Config')}>
                <Text style={[styles.btnText, { color: 'blue' }]}>Add/Edit Data</Text>
                <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>

            {
                suddenMovement || rolloverDetected && <AccidentDetectCard />
            }
        </View>
    );
};

export default HomeScreen;

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
    sensorData: {
        marginTop: 20,
        fontSize: 18,
    },
    alert: {
        marginTop: 10,
        fontSize: 16,
        color: 'red',
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
