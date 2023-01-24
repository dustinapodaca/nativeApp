// import React, { useState, useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Alert } from 'react-native';

// import * as Contacts from 'expo-contacts';
// import * as Location from 'expo-location';
// import messaging from '@react-native-firebase/messaging';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// export default function App() {
//   const navigation = useNavigation();
//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [pushToken, setPushToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [initialRoute, setInitialRoute] = useState('Home');

//   const requestUserPermission = async () => {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log("🚀 ~ file: App.jsx:25 ~ requestUserPermission ~ authStatus", authStatus)
//     }
//   }

//   useEffect(() => {
//     if (requestUserPermission()) {
//       console.log('Permission granted!');
//       messaging().getToken().then(token => {
//         console.log("🚀 ~ file: App.jsx:32 ~ messaging ~ token", token)
//         setPushToken(token);
//       });
//     }

//     messaging()
//       .getInitialNotification()
//       .then(async (remoteMessage) => {
//         if (remoteMessage) {
//           console.log(
//             'Notification caused app to open from quit state:',
//             remoteMessage.notification,
//           );
//         } 
//         setLoading(false);
//       });

//     messaging().onNotificationOpenedApp(remoteMessage => {
//       console.log(
//         'Notification caused app to open from background state:',
//         remoteMessage.notification,
//       );
//     });

//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//       console.log('Message handled in the background!', remoteMessage);
//     });

//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//     });

//     return unsubscribe;

//   }, []);

//   if (loading) {
//     return null;
//   }

//   useEffect(() => {
//     (async () => {
//       const { status } = await Contacts.requestPermissionsAsync();
//       if (status === 'granted') {
//         const { data } = await Contacts.getContactsAsync({
//           fields: [Contacts.Fields.PhoneNumbers],
//         });
//         if (data.length > 0) {
//           setContacts(data);
//         }
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     if (selectedContact) {
//       sendLocation(location);
//     }
//   }, [selectedContact]);
  

//   const sendLocation = async (location) => {
//     const message = {
//       to: pushToken,
//       sound: 'default',
//       title: 'Location',
//       // body: `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`,
//       data: { location },
//     };
//     const response = await firebase.messaging().send(message);
//     console.log(response);
//   };

//   const selectContact = (contact) => {
//     setSelectedContact(contact);
//   };

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={initialRoute}>
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Contacts" component={Contacts} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
