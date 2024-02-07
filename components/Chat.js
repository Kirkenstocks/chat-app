import { useEffect, useState } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, View } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);

  // passing name and background props to chat screen
  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name })
  }, []);

  // updates message state
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
      
        },
      },
      {
        _id: 2,
        text: "You have entered the chat",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  // handles message sending
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
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