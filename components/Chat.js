import { useEffect, useState } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, View } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, isConnected, db, storage }) => {
  const [messages, setMessages] = useState([]);

  // passing name, ID, and background props to chat screen
  const { userID, name, backgroundColor } = route.params;

  // retrieves messages from the db, updates message state and cache
  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });
    
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({ 
          id: doc.id, 
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      });
      cacheMessages(newMessages)
      setMessages(newMessages);
    });
    } else loadCachedMessages();
    
    // clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  // caches messages after loaded from db in the onSnapshot function
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('cached_messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }
  
  // loads cached messages from AsyncStorage
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('cached_messages') || [];
    setMessages(JSON.parse(cachedMessages));
  }

  // adds messages to the db
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  }

  //renders and customizes message bubbles
  const renderBubble = (props) => {
    return <Bubble 
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#1e7335'
        },
        left: {
          backgroundColor: '#FFF'
        }
      }}
    />
  }

  // renders text input if active connection, hides input if no connection
  const renderInputToolbar = (props) => {
    if (isConnected === true) {
      return <InputToolbar {...props} />;
    } else return null;
  }

  const renderCustomActions = (props) => {
    return <CustomActions 
      storage={storage}
      userID={userID} 
      {...props} />;
  }

  // renders location in MapView when shared by user
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView 
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      );
    } else return null;
  }

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <GiftedChat 
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={newMessage => onSend(newMessage)}
        user={{
          _id: userID,
          name: name
        }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Chat;