import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  // Name and background color passed in here
  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name })
  }, []);

  return (
   <View style={[styles.container, {backgroundColor: backgroundColor}]}>
     <Text style={{ color: '#FFF' }}>Hello Chat</Text>
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Chat;