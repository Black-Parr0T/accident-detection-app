import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import Button from './Button';

const AccidentDetectCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Accident Detected!</Text>
      <Feather name="alert-triangle" size={70} color="red" />
      <Text style={styles.info}>
        Emergency services will be notified in : {5}.
      </Text>
      <Button text="Cancel" click={() => {}} />
    </View>
  )
}

export default AccidentDetectCard

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 350,
        height: 500,
        elevation: 10,
        borderRadius: 10,
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 20,
        color: 'red',
    },
    info: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 20,
    },
})