import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Todo } from '../types/Index';
// import { theme } from '../styles/Theme';
// import { styles } from '../styles/Index';
// import { DrawerNavigationProp } from '@react-navigation/drawer';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    todosContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    inputWrapper: {
        backgroundColor: "white",
        paddingBottom: 30, // Add padding for bottom safe area
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    inputContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        gap: 10,
    },
    headerContainer: {
        backgroundColor: "#016969",
        paddingTop: 50,
        paddingBottom: 15,
        width: "100%",
        alignItems: "flex-start",
        paddingLeft: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,

    },

    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginLeft: 7,
        // borderWidth: 1,
        // borderColor: "blue",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: "#008080",
        padding: 10,
        borderRadius: 5,
        justifyContent: "center",
        width: 80,
    },
    addButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    todoItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        justifyContent: "space-between",
        // paddingVertical: 10,
    },
    todoContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        padding: 5,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#008080",
        marginRight: 15,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    checked: {
        backgroundColor: "#008080",
    },
    todoText: {
        fontSize: 19,
        flex: 1,
        textDecorationLine: "none",
    },
    completedText: {
        textDecorationLine: "line-through",
        color: "#008080",
        opacity: 0.6,
    },
    editInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#008080",
        borderRadius: 4,
        padding: 4,
        marginRight: 10,
        fontSize: 16,
    },
    editButton: {
        padding: 8,
    },
    actionButtonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        opacity: 0.9,
    },
    deleteButton: {
        padding: 8,
    },
    editButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    clearButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#008080",
        marginLeft: 10,
        marginRight: 10,
    },
    clearButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    horizontalLine: {
        height: 1,
        backgroundColor: "#ccc",
        marginHorizontal: 20,
    },
    headerButtons: {
        flexDirection: "row",
        alignItems: "center",
    },
    modeButton: {
        padding: 10,
        marginRight: 2,
    },
    headerLeft: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    dayText: {
        color: "white",
        fontSize: 16,
        opacity: 0.9,
        marginTop: 4,
    },
});
const theme = {
    light: {
        background: "white",
        text: "black",
        primary: "#008080",
        headerBg: "#016969",
        borderColor: "#ccc",
        completedText: "#008080",
    },
    dark: {
        background: "#2b2b2b",
        text: "#e2e2e2",
        primary: "#028181",
        headerBg: "#004444",
        borderColor: "#333",
        completedText: "#00a0a0",
    },
};

const generateId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomStr}-${randomStr.split('').reverse().join('')}`;
};


type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

const Main: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState<string>('');
    // Add mode state
    const [mode, setMode] = useState<'light' | 'dark'>('dark');
    const [currentDay, setCurrentDay] = useState<string>('');

    // Add toggle mode function
    const toggleMode = () => {
        setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
    };

    // Load todos from AsyncStorage when component mounts
    useEffect(() => {
        loadTodos();
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        setCurrentDay(today);

        // Add Sunday-specific tasks
        if (today === 'Sunday') {
            const sundayTasks = [
                {
                    id: generateId(),
                    text: "Take D3",
                    completed: false
                },
                {
                    id: generateId(),
                    text: "Folitrax",
                    completed: false
                },
            ];

            // Check if these tasks don't already exist before adding
            const addSundayTasks = async () => {
                const existingTodos = await AsyncStorage.getItem('todos');
                let currentTodos = existingTodos ? JSON.parse(existingTodos) : [];

                // Only add tasks if they don't already exist
                const newTasks = sundayTasks.filter(task =>
                    !currentTodos.some((todo: Todo) => todo.text === task.text)
                );

                if (newTasks.length > 0) {
                    const updatedTodos = [...currentTodos, ...newTasks];
                    setTodos(updatedTodos);
                    await saveTodos(updatedTodos);
                }
            };

            addSundayTasks();
        }
    }, []);



    const loadTodos = async () => {
        try {
            const storedTodos = await AsyncStorage.getItem('todos');
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            }
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    };

    const saveTodos = async (updatedTodos: Todo[]) => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
        } catch (error) {
            console.error('Error saving todos:', error);
        }
    };

    const addTodo = async () => {
        if (newTodo.trim()) {
            const newTask: Todo = {
                id: generateId(),
                text: newTodo.trim(),
                completed: false,
            };
            const updatedTodos = [...todos, newTask];
            setTodos(updatedTodos);
            await saveTodos(updatedTodos);
            setNewTodo('');
        }
    };

    const toggleTodo = async (id: string) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        await saveTodos(updatedTodos);
    };

    const startEditing = (id: string, text: string) => {
        setEditingId(id);
        setEditText(text);
    };

    const saveEdit = async (id: string) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, text: editText } : todo
        );
        setTodos(updatedTodos);
        await saveTodos(updatedTodos);
        setEditingId(null);
    };

    const clearAll = async () => {
        const updatedTodos = todos.map(todo => ({ ...todo, completed: false }));
        setTodos(updatedTodos);
        await saveTodos(updatedTodos);
    };

    const deleteTodo = async (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        await saveTodos(updatedTodos);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme[mode].background }]}>
            <View style={[styles.headerContainer, { backgroundColor: theme[mode].headerBg }]}>
                <View style={styles.headerLeft}>

                    <Text style={styles.header}>Diet Tracker</Text>
                </View>
                <View style={styles.headerButtons}>
                    <TouchableOpacity style={styles.modeButton} onPress={toggleMode}>
                        <MaterialCommunityIcons
                            name={mode === 'light' ? 'weather-night' : 'weather-sunny'}
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.clearButton, { backgroundColor: theme[mode].primary }]}
                        onPress={clearAll}
                    >
                        <Text style={styles.clearButtonText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.todosContainer}>
                {todos.map((todo) => (
                    <View key={todo.id} style={styles.todoItem}>
                        <TouchableOpacity
                            style={styles.todoContent}
                            onPress={() => toggleTodo(todo.id)}
                        >
                            <View style={[
                                styles.checkbox,
                                { borderColor: theme[mode].primary },
                                todo.completed && { backgroundColor: theme[mode].primary }
                            ]}>
                                {todo.completed && (
                                    <MaterialCommunityIcons
                                        name="check"
                                        size={20}
                                        color={theme[mode].background}
                                    />
                                )}
                            </View>
                            {editingId === todo.id ? (
                                <TextInput
                                    style={[
                                        styles.editInput,
                                        {
                                            borderColor: theme[mode].primary,
                                            color: theme[mode].text,
                                            backgroundColor: theme[mode].background
                                        }
                                    ]}
                                    value={editText}
                                    onChangeText={setEditText}
                                    onSubmitEditing={() => saveEdit(todo.id)}
                                    autoFocus
                                />
                            ) : (
                                <Text style={[
                                    styles.todoText,
                                    { color: theme[mode].text },
                                    todo.completed && {
                                        color: theme[mode].completedText,
                                        textDecorationLine: 'line-through'
                                    }
                                ]}>
                                    {todo.text}
                                </Text>
                            )}
                        </TouchableOpacity>
                        <View style={styles.actionButtonsContainer}>
                            {!todo.completed && (
                                <>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (editingId === todo.id) {
                                                saveEdit(todo.id);
                                            } else {
                                                startEditing(todo.id, todo.text);
                                            }
                                        }}
                                        style={styles.editButton}
                                    >
                                        <MaterialCommunityIcons
                                            name={editingId === todo.id ? "check-circle" : "pencil"}
                                            size={editingId === todo.id ? 24 : 20}
                                            color={theme[mode].primary}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => deleteTodo(todo.id)}
                                        style={styles.deleteButton}
                                    >
                                        <MaterialCommunityIcons
                                            name="close"
                                            size={20}
                                            color="#ff4444"
                                        />
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={[styles.horizontalLine, { backgroundColor: theme[mode].borderColor }]} />

            <View style={[styles.inputWrapper, {
                backgroundColor: theme[mode].background,
                borderTopColor: theme[mode].borderColor
            }]}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, {
                            borderColor: theme[mode].borderColor,
                            color: theme[mode].text,
                            backgroundColor: theme[mode].background
                        }]}
                        value={newTodo}
                        onChangeText={setNewTodo}
                        placeholder="Add new item..."
                        placeholderTextColor={mode === 'dark' ? '#ffffff80' : theme[mode].borderColor}
                    />
                    <TouchableOpacity
                        style={[styles.addButton, { backgroundColor: theme[mode].primary }]}
                        onPress={addTodo}
                    >
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};



export default Main;