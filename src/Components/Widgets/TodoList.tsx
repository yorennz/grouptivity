import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { radius } from "../../Constants/Math";

const TodoList = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState<string[]>([]);

    const addTask = async () => {
        if (task.trim() !== "") {
            const updatedTasks = [...tasks, task]
            setTasks(tasks);
            setTask("");
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }
    };

    const removeTask = async (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const fetchTasks = async () => {
        const tasks = await AsyncStorage.getItem('tasks');
        if (tasks !== null) {
            setTasks(JSON.parse(tasks));
        }
    }

    useEffect(() => {
        fetchTasks();
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todo List</Text>
            <TextInput
                placeholder="Nouvelle tâche"
                style={styles.input}
                value={task}
                onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={addTask}
            >
                <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
            <View style={styles.taskList}>
                {tasks.map((task, index) => (
                    <View key={index} style={styles.taskItem}>
                        <Text>{task}</Text>
                        <TouchableOpacity onPress={() => removeTask(index)}>
                            <Text style={styles.removeButton}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        borderRadius: radius,
        backgroundColor: '#EFEB82',
        padding: 16,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        height: 30,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    taskList: {
        display: 'flex',
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    removeButton: {
        color: 'red',
    },
});

export default TodoList;
