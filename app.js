document.addEventListener('DOMContentLoaded', function() {
    const enableNotificationsButton = document.getElementById('enable-notifications');
    const statusDiv = document.getElementById('status');

    // Check if notifications are supported
    if (!('Notification' in window)) {
        statusDiv.textContent = 'This browser does not support notifications';
        enableNotificationsButton.disabled = true;
        return;
    }

    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
        statusDiv.textContent = 'This browser does not support service workers';
        enableNotificationsButton.disabled = true;
        return;
    }

    // Register service worker
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
            statusDiv.textContent = 'Failed to register service worker: ' + error.message;
        });

    // Handle enable notifications button click
    enableNotificationsButton.addEventListener('click', async () => {
        try {
            // Request permission
            const permission = await Notification.requestPermission();
            
            if (permission === 'granted') {
                statusDiv.textContent = 'Notifications enabled!';
                
                // Get token
                const token = await messaging.getToken();
                console.log('FCM Token:', token);
                
                // You would typically send this token to your server
                saveTokenToServer(token);
                
                // Show a test notification
                showTestNotification();
            } else {
                statusDiv.textContent = 'Notification permission denied';
            }
        } catch (error) {
            console.error('Error enabling notifications:', error);
            statusDiv.textContent = 'Error enabling notifications: ' + error.message;
        }
    });

    // Handle incoming messages when the app is in the foreground
    messaging.onMessage((payload) => {
        console.log('Message received:', payload);
        
        // Create and display a notification
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon || '/notification-icon.png'
        };
        
        new Notification(notificationTitle, notificationOptions);
    });
});

// Function to save token to server (you would implement this to send to your backend)
function saveTokenToServer(token) {
    // In a real app, you would send this token to your server
    console.log('Saving token to server:', token);
    // Example: fetch('/api/save-token', { method: 'POST', body: JSON.stringify({ token }) });
}

// Function to show a test notification
function showTestNotification() {
    const title = 'Test Notification';
    const options = {
        body: 'This is a test notification from our website!',
        icon: '/notification-icon.png'
    };
    
    new Notification(title, options);
} 