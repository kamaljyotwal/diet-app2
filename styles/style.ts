import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
