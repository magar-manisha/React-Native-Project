import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import "./global.css";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  return (
       <Stack screenOptions={{headerShown : false}} />
 
);
}
