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
  apiKey: 'AIzaSyCfSTl5pGDxM1oDwslB73rLnxQwf5IDtXs',
  authDomain: 'foodie-c79df.firebaseapp.com',
  projectId: 'foodie-c79df',
  storageBucket: 'foodie-c79df.firebasestorage.app',
  messagingSenderId: '226927163168',
  appId: '1:226927163168:web:ead0e8cdf21d6ef8bf8945',
  measurementId: 'G-RMSQGXTDXP',
};

export const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth =
  Platform.OS === 'web'
    ? getAuth(firebaseApp)
    : initializeAuth(firebaseApp, { persistence: getReactNativePersistence(AsyncStorage) });
