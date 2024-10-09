import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { radius } from "../../Constants/Math";

const ClockScreen = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000 * 60);
        return () => clearInterval(timer)
    })

    return (
        <View style={styles.container}>
            <Text style={styles.date}>{date.toDateString()}</Text>
            <Text style={styles.time}>{date.getHours()}:{date.getMinutes()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        // height: '100%',
        borderRadius: radius,
        backgroundColor: 'black',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
    date: {
        fontWeight: 'bold',
        color: 'white'
    },
    time: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 48,
    },
})

export default ClockScreen;