import { Link } from "expo-router";
import { Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";

export default function Index() {
  
  async function requestUserPermission() {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== "granted") {
      throw new Error(
        "Permission not granted to get push token for push notification!"
      );
    }
    // Get FCM token
    const token = await messaging().getToken();
    console.log("FCM Token:", token);
  }

  useEffect(() => {
    requestUserPermission();

    // Handle notification when the app is in the background and user taps the notification
    const unsubscribeOnOpen = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        console.log("Notification opened from background:", remoteMessage.notification);
      }
    });

    // Handle notification when the app is in the foreground
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      Alert.alert("New Notification", JSON.stringify(remoteMessage.notification));
    });

    // Handle notification when the app was opened from a quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log("App opened from quit state by notification:", remoteMessage.notification);
        }
      });

    return () => {
      unsubscribeOnOpen();
      unsubscribeOnMessage();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-400 bg-black">Hello Daily Sewa App.</Text>
      <Link href="/(auth)/sign-in"><Text>SignIn</Text></Link>
      <Link href="/explore"><Text>Explore</Text></Link>
      <Link href="/profile"><Text>Profile</Text></Link>
      <Link href="/properties/1"><Text>Property</Text></Link>
    </SafeAreaView>
  );
}
