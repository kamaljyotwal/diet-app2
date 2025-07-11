import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
const { width, height } = Dimensions.get('window');
import { fileUploadFunction } from '../utils/utils';

// util
const handleWebViewMessage2 = async (event: any) => {
    const message = event.nativeEvent.data;
    console.log("message", message)
    try {
        const data = JSON.parse(message);

        // Core switch statement
        switch (data.type) {
            case 'file_upload':
                const file = await fileUploadFunction();
                break;
            case 'camera_open':
                // cameraOpenFunction()
                break;
            case 'custom_event':
                // customEventFunction()
                break;
        }
    } catch (error) {
        console.log('Error parsing message:', error);
    }
};

const Test2: React.FC = () => {
    const webViewRef = useRef<WebView>(null);
    const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

    // Handle messages from WebView
    // const handleWebViewMessage = (event: any) => {
    //     const message = event.nativeEvent.data;
    //     setReceivedMessages(prev => [...prev, `WebView clicked: ${message}`]);
    // };

    // Send message to WebView
    const sendToWebView = () => {
        const message = 'FROM_REACT_NATIVE';
        console.log('📱 React Native sending:', message);
        webViewRef.current?.postMessage(message);
        setReceivedMessages(prev => [...prev, `Sent: ${message}`]);
    };

    // JavaScript to inject - captures any click on the webview
    // const injectedJavaScript = `
    //     (function() {
    //         // Capture clicks on the entire document
    //         document.addEventListener('click', function(e) {
    //             const message = JSON.stringify({
    //                 type: 'file_upload',
    //                 element: e.target.tagName,
    //                 text: e.target.textContent?.substring(0, 30) || '',
    //                 timestamp: Date.now()
    //             });
    //             window.ReactNativeWebView.postMessage(message);
    //         });
    //         console.log('🌐 Click listener injected successfully');
    //     })();
    // `;
    const injectedJavaScript = `
    document.addEventListener('click', function(e) {
        const message = JSON.stringify({
            type: 'file_upload',  
            data: 'your_data'         
        });
        window.ReactNativeWebView.postMessage(message);
    });
`;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Internal Website Click Detection</Text>

            <TouchableOpacity style={styles.button} onPress={sendToWebView}>
                <Text style={styles.buttonText}>Send to WebView</Text>
            </TouchableOpacity>

            <View style={styles.messagesContainer}>
                <Text style={styles.messagesTitle}>Click Events:</Text>
                {receivedMessages.map((msg, index) => (
                    <Text key={index} style={styles.messageText}>{msg}</Text>
                ))}
            </View>

            <WebView
                ref={webViewRef}
                source={{ uri: 'https://www.google.com' }}
                style={styles.webview}
                javaScriptEnabled={true}
                onMessage={handleWebViewMessage2}
                injectedJavaScript={injectedJavaScript}
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
    messagesContainer: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        maxHeight: 150,
    },
    messagesTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    webview: {
        flex: 1,
        width: width,
    },
});

export default Test2;
