import { StyleSheet } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// initializing stack navigation
const Stack = createNativeStackNavigator();

export default function App() {
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
          {(props) => <Chat {...props} db={db} />}
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
