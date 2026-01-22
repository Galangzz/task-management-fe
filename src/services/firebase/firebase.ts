import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { addNotificationToken } from '../notificationService.js';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const getTokenNotification = async () => {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications!');
        return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        try {
            const token = await getToken(messaging, {
                vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
            });
            console.log('Token:', token);
            console.log("Adding Token")
            await addNotificationToken(token);
            console.log("Token Added")
        } catch (err) {
            console.log(err);
        }
    }
};
export { getTokenNotification };
