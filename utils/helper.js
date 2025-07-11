import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

// Flag to prevent multiple simultaneous document picker calls
let isPickerActive = false;

export async function fileUploadFunction() {
    // Prevent multiple simultaneous calls
    if (isPickerActive) {
        console.log('Document picker already active, ignoring call');
        return null;
    }

    try {
        isPickerActive = true;
        console.log('📁 Opening document picker...');
        const result = await DocumentPicker.getDocumentAsync({
            type: '*/*',
            copyToCacheDirectory: true,
            multiple: false,
        });

        console.log('📁 Document picker result:', result);

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const file = result.assets[0]; // Get the first (and only) file

            console.log('✅ File picked successfully!');
            console.log('📄 File name:', file.name);
            console.log('📄 File size:', file.size, 'bytes');
            console.log('📄 File type:', file.mimeType);
            console.log('📄 File URI:', file.uri);

            // Check if it's an image
            if (file.mimeType && file.mimeType.startsWith('image/')) {
                console.log('🖼️ This is an image file!');
                console.log('🖼️ Image format:', file.mimeType.split('/')[1]);
            }

            return {
                success: true,
                file: file,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.mimeType,
                fileUri: file.uri
            };
        } else {
            // User cancelled
            console.log('❌ User cancelled file picker');
            return {
                success: false,
                reason: 'cancelled'
            };
        }

    } catch (error) {
        console.error('❌ File picking error:', error);
        return {
            success: false,
            reason: 'error',
            error: error.message
        };
    } finally {
        // Always reset the flag when done
        console.log('🔄 Resetting picker flag');
        isPickerActive = false;

        // Small delay to ensure picker is fully closed
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

export async function cameraAccessFunction() {
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        console.log('Photo captured:', image.uri);
        return { success: true, uri: image.uri };
    } else {
        console.log('Camera cancelled');
        return { success: false };
    }
}


export const testHTML = `
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