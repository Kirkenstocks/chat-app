# Chat App

### Description:
The Chat App is a mobile chat app built in React Native that allows users to send messages in a group chat room and share images or their location. 

### How to use:
- Clone the repository onto your computer.
- Install [Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) on your device. Once installed, open your terminal and run the command `nvm use 16.19.0` to set the Node version to be compatible with Expo.
- Setup Expo Go
  - Install the Expo CLI globally on your device by running the command `npm install -g expo-cli` in your terminal.
  - Download the [Expo Go](https://expo.dev/expo-go) app on the mobile device where you plan to run the app.
  - Log in to Expo Go or sign up if you don't have an account.
- Setup a database on Google Firebase and connect to the locally hosted app
  - Go to [Google Firebase](https://firebase.google.com/) and log in with your Google account.
  - Create a new project in whatever region you choose.
  - Open the project and select "Firestore Database" from the Build tab on the left of the menu, then select "Create Database". Select the "Start in production mode" option.
  - Go to the "Rules" tab and change `allow read, write: if false;` to `allow read, write: if true;`, then publish the change. This will allow the app to read from and write to the database.
  - Navigate to the "Project Overview" and register the app as a web app.
  - Navigate to "Project Settings" by clicking the gear icon next to "Project Overview". In the section titled "SDK setup and configuration" copy the text in `const firebaseConfig = {...};`.
  - Open the Chat App repository you cloned earlier in your IDE, open App.js, and replace the code found in the firebaseConfig variable with your own.
- Run the terminal command `npx expo start` in the root directory of the project and open Expo Go on your mobile device. Log in to Expo Go if you haven't already, and select the server you just started.


### Technologies used:
- React Native
- Expo
- React-navigation
- Gifted Chat
- Google Firebase/Firestore
- React Native/AsyncStorage
- Note: see the package.json file for a full list of dependencies

### Credits:
This project was built for the CareerFoundry Full-Stack Web Development program, with their instruction essential to its completion.
