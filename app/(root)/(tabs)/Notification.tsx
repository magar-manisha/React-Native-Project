import messaging from "@react-native-firebase/messaging";
import { registerRootComponent } from "expo";
import Index from "./index"; 

// Handle background notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message handled in the background:", remoteMessage);
});

registerRootComponent(Index);
