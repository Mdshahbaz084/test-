// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfqQkLMdirE1s3QDAU-k8kZJDSJ-AHfxI",
  authDomain: "madrsa-sikariya.firebaseapp.com",
  projectId: "madrsa-sikariya",
  storageBucket: "madrsa-sikariya.firebasestorage.app",
  messagingSenderId: "1066102927865",
  appId: "1:1066102927865:web:d5e649be4178d363408d28",
  measurementId: "G-3S96TVYFJC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = firebase.messaging();

// Vapid key for web push notifications
messaging.getToken({ vapidKey: 'BClpcTQygEYX1ueX4n8GTMN0UmSsaeM1JwpbRoI81WxOaHGB4gQHJl-bNiyBJmp_c5CryDL0NGiWAd2a7z3CpB4' }); 