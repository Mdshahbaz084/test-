// Import and configure the Firebase SDK
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyBfqQkLMdirE1s3QDAU-k8kZJDSJ-AHfxI",
  authDomain: "madrsa-sikariya.firebaseapp.com",
  projectId: "madrsa-sikariya",
  storageBucket: "madrsa-sikariya.firebasestorage.app",
  messagingSenderId: "1066102927865",
  appId: "1:1066102927865:web:d5e649be4178d363408d28",
  measurementId: "G-3S96TVYFJC"
});

// Initialize Firebase Cloud Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/notification-icon.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
}); 