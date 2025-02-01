// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase config (replace with your actual values)
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "daily-sewa-app.firebaseapp.com",
  projectId: "daily-sewa-app",
  storageBucket: "daily-sewa-app.appspot.com",
  messagingSenderId: "725551731833",
  appId: "1:725551731833:android:2bd30a3b4acbcd9d90b0a8",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication (if needed)
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { firebaseApp, auth };
