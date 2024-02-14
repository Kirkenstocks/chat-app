import { StyleSheet, Alert, LogBox } from 'react-native';
import { useEffect } from 'react';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { useNetInfo }from '@react-native-community/netinfo';

// initializing stack navigation
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

export default function App() {
  // determines if there is an active internet connection
  const connectionStatus = useNetInfo();

  // alerts user and enables/disables db based on internet connection
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // firebase config info
  const firebaseConfig = {
    apiKey: "AIzaSyCo5gTBg4xJH7aDNxmBGnXdFYYvfpvlx4g",
    authDomain: "chat-app-e6020.firebaseapp.com",
    projectId: "chat-app-e6020",
    storageBucket: "chat-app-e6020.appspot.com",
    messagingSenderId: "962463149554",
    appId: "1:962463149554:web:c43658d5ae6f49eefb0f6b"
  };

  // initializing firebase and firestore db
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen 
          name='Start'
          component={Start}
        />
        <Stack.Screen name='Chat'>
          {(props) => <Chat 
            isConnected={connectionStatus.isConnected} 
            db={db}
            storage={storage}
            {...props} 
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  }
});
