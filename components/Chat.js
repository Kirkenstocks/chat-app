import { useEffect, useState } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const [messages, setMessages] = useState([]);

  // passing name, ID, and background props to chat screen
  const { userID, name, backgroundColor } = route.params;

  // retrieves messages from the db and updates message state
  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({ 
          id: doc.id, 
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })
    // clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, []);

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

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <GiftedChat 
        messages={messages}
        renderBubble={renderBubble}
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