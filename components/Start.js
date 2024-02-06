import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';

const backgroundImage = require('../assets/background-image.png');

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');

  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.backgroundImage}
        source={backgroundImage} 
        resizeMode='cover'
      >
        <Text style={[styles.title]}>
            Chat App
        </Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
            placeholderTextColor={'#757083'}
          />
          <View>
            <Text style={styles.colorText}>
              Choose Background Color:
            </Text>
            <View style={styles.colorContainer}>
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.colorButtons, { backgroundColor: color }, color === backgroundColor ? styles.selectedColor : null ]}
                  onPress={() => setBackgroundColor(color)}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Chat', { name: name, backgroundColor: backgroundColor })}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    height: '44%',
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    justifyContent:'space-between',
    marginTop: '60%',
    marginBottom: '6%'
  },
  colorContainer: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFF',
    marginTop: 100,
    marginBottom: 50
  },
  nameInput: {
    width: "88%",
    height: 60,
    padding: 15,
    borderWidth: 2,
    borderColor: '#757083',
    marginTop: 15,
    fontSize: 16,
    fontWeight: '300',
    opacity: 0.5
  },
  button: {
    backgroundColor: '#757083',
    padding: 20,
    width: '88%',
    alignItems: 'center',
    marginBottom: 15
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600'
  },
  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1
  },
  colorButtons: {
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 10
  },
  selectedColor: {
    borderColor: '#000',
    borderWidth: 2,
    opacity: 0.7
}
 });

export default Start;