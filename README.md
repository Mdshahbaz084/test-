# Firebase Web Push Notification Demo

This is a simple demo of Firebase Web Push Notifications.

## Setup

1. Place these files on a web server (not just a file:// URL)
2. Replace `notification-icon.png` with an actual PNG file
3. Access the website and click "Enable Notifications"

## How it works

1. The user clicks "Enable Notifications" and gives permission
2. The browser registers with Firebase Cloud Messaging (FCM) and gets a token
3. This token should be sent to your server to store in a database
4. Your server can then send push notifications to specific users or all users

## Sending notifications

To send notifications, you can use:

1. Firebase Console (for testing)
2. Firebase Admin SDK on your server
3. Firebase REST API

Example with Firebase Admin SDK (Node.js):

```javascript
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://<your-project>.firebaseio.com"
});

const message = {
  notification: {
    title: 'New Notification',
    body: 'This is a notification from your server!'
  },
  token: 'user-device-token-here'
};

admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
```

## Sending to all users

To send to all users, you would:
1. Store all user tokens in your database
2. Loop through tokens and send messages or use FCM topics 