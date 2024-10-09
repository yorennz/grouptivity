import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { radius } from "../../Constants/Math";

const Calculator = () => {
    const [display, setDisplay] = useState("");
    const [result, setResult] = useState("");

    const handleButtonPress = (value: string) => {
        if (value === "=") {
            try {
                setResult(eval(display).toString());
            } catch (error) {
                setResult("Erreur");
            }
        } else if (value === "C") {
            setDisplay("");
            setResult("");
        } else {
            setDisplay(display + value);
        }
    };

    const buttons = [
        "C", "-", "+", "/", "7",
        "8", "9", "*", "4",
        "5", "6", ".", "1",
        "2", "3", "=", "0"
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.display}>{!display.length ? '0' : display}</Text>
            <Text style={styles.result}>{!result.length ? '0' : result}</Text>
            <View style={styles.buttons}>
                {buttons.map((button, index) => (
                    <TouchableOpacity
                        key={index}
                        style={button == '-' || button == '+' || button == '/' || button == '*' || button == '.' || button == '=' ? styles.buttonOperator : button == 'C' ? styles.buttonReset : styles.button}
                        onPress={() => handleButtonPress(button)}
                    >
                        <Text style={styles.buttonDigit}>{button}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: radius,
        backgroundColor: 'black',
        padding: 15,
    },
    display: {
        fontSize: 24,
        marginBottom: 20,
        color: 'white'
    },
    result: {
        fontSize: 48,
        marginBottom: 10,
        color: 'white'
    },
    buttons: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    button: {
        width: "25%",
        padding: 20,
        backgroundColor: "#313131",
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },
    buttonOperator: {
        width: "25%",
        padding: 20,
        backgroundColor: "#F69806",
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },
    buttonReset: {
        width: "25%",
        padding: 20,
        backgroundColor: "#A0A0A0",
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },
    buttonDigit: {
        fontSize: 24,
        color: 'white'
    },
});

export default Calculator;
