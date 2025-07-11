import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { fileUploadFunction, cameraAccessFunction } from '../utils/utils';

// Conditional Event Handler
const handleWebViewMessage2 = async (event: any) => {
    const message = event.nativeEvent.data;

    try {
        const data = JSON.parse(message);

        switch (data.type) {
            case 'file_upload':
                const file = await fileUploadFunction();
                break;

            case 'camera_open':
                console.log(" Camera access requested");
                await cameraAccessFunction();
                break;

            case 'custom_event':
                // customEventFunction()
                break;
            default:
                console.log("unknown type", data.type);
        }
    } catch (error) {
        console.log("Error", error);
    }
};

const Test2: React.FC = () => {
    const webViewRef = useRef<WebView>(null);

    // Send message to WebView
    const sendToWebView = () => {
        const message = 'FROM_REACT_NATIVE';
        console.log('📱 React Native sending:', message);
        webViewRef.current?.postMessage(message);
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
    //             console.log('🌐 Click listener injected successfully');
    //         });
    //     })();
    // `;
    // const injectedJavaScript = `
    //     (function() {
    //         // Create a test button
    //         const testButton = document.createElement('button');
    //         testButton.textContent = '📁 Test File Upload';
    //         testButton.style.cssText = 'position: fixed; top: 20px; left: 20px; z-index: 10000; padding: 10px; background: #007AFF; color: white; border: none; border-radius: 5px; font-size: 16px;';

    //         testButton.onclick = function() {
    //             const message = JSON.stringify({
    //                 type: 'file_upload',
    //                 data: 'test_file_upload',
    //                 timestamp: Date.now()
    //             });
    //             window.ReactNativeWebView.postMessage(message);
    //             console.log('🌐 Test button clicked, sending message:', message);
    //         };

    //         document.body.appendChild(testButton);
    //         console.log('🌐 Test button added to page');
    //     })();
    // `;

    // Simple test HTML
    const testHTML = `
        <!DOCTYPE html>
        <html>
        <body>
             <h1>File Upload Test</h1>
            
            <button class="test-button" onclick="testFileUpload()">
             Test File Upload
            </button>
            
             <button class="test-button" onclick="testCameraAccess()">
             Test Camera Access
            </button>
            <script>
                function testFileUpload() {
                    const message = JSON.stringify({
                        type: 'file_upload',
                        data: 'test_file_upload',
                        timestamp: Date.now()
                    });
                    window.ReactNativeWebView.postMessage(message);
                    console.log(' Test button clicked, sending message:', message);
                }

                function testCameraAccess() {
                    const message = JSON.stringify({
                        type: 'camera_open',
                        data: 'test_camera_access',
                        timestamp: Date.now()
                    });
                    window.ReactNativeWebView.postMessage(message);
                    console.log(' Test button clicked, sending message:', message);
                }
            </script>
        </body>
        </html>
    `;

    return (

        <View style={styles.container}>

            <WebView
                ref={webViewRef}
                source={{ html: testHTML }}
                style={styles.webview}
                javaScriptEnabled={true}
                onMessage={handleWebViewMessage2}
            // injectedJavaScript={injectedJavaScript}
            />

            <Text style={styles.header}>Internal Website Click Detection</Text>
            <TouchableOpacity style={styles.button} onPress={sendToWebView}>
                <Text style={styles.buttonText}>Send to WebView</Text>
            </TouchableOpacity>

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
        width: '100%',
        marginTop: 50,
        borderWidth: 1,
        borderColor: 'red',
    },
});

export default Test2;
