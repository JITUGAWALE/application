import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
// getReactNativePersistence exists in firebase/auth's React Native build (the one Metro
// resolves for iOS/Android at runtime) but is missing from the package's published root types.
// @ts-expect-error
import { getReactNativePersistence } from 'firebase/auth';
import { Platform } from 'react-native';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCoQhKLYj3t7_UoYXWT8-G66-r0puoMnR4',
  authDomain: 'massage-876ed.firebaseapp.com',
  projectId: 'massage-876ed',
  storageBucket: 'massage-876ed.firebasestorage.app',
  messagingSenderId: '420706813385',
  appId: '1:420706813385:web:ff4f63e044c639f94f9418',
  measurementId: 'G-2CYD3N8W4K',
};

export const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth =
  Platform.OS === 'web'
    ? getAuth(firebaseApp)
    : initializeAuth(firebaseApp, { persistence: getReactNativePersistence(AsyncStorage) });
