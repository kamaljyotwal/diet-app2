import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

const Test2: React.FC = () => {
    const webViewRef = useRef<WebView>(null);

    // Handle messages from WebView
    const handleWebViewMessage = (event: any) => {
        const message = event.nativeEvent.data;
        console.log('📱 React Native received:', message);
    };

    // Send message to WebView
    const sendToWebView = () => {
        const message = 'outside webview';
        console.log(message);
        webViewRef.current?.postMessage(message);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>WebView Dummy</Text>

            <TouchableOpacity style={styles.button} onPress={sendToWebView}>
                <Text style={styles.buttonText}>Button</Text>
            </TouchableOpacity>

            <WebView
                ref={webViewRef}
                source={{ uri: 'https://www.google.com' }}
                style={styles.webview}
                javaScriptEnabled={true}
                onMessage={handleWebViewMessage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    webview: {
        flex: 1,
        width: width,
    },
});

export default Test2;
