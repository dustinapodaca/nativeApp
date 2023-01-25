// import * as React from "react";
// import { StyleSheet, View, Text, Button } from "react-native";
// import { NavigationContainer, useNavigation } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/stack";

// import LocationFinder from "./src/Components/LocationFinder";
// import ContactList from "./src/Components/ContactList";

// const SignIn = () => {
//   const nav = useNavigation();
//   return (
//     <View>
//       <Button title="Sign In" onPress={() => nav.navigate("Sign Up")} />
//     </View>
//   );
// };

// const SignUp = () => {
//   const nav = useNavigation();
//   return (
//     <View>
//       <Button title="Sign Up" onPress={() => nav.navigate("Main")} />
//     </View>
//   );
// };

// const HomeScreen = () => (
//   <View style={styles.layout}>
//     <Text style={styles.title}>Home</Text>
//   </View>
// );

// // const LocationScreen = () => (
// //   <View style={styles.layout}>
// //     <Text style={styles.title}>Location</Text>
// //   </View>
// // );
// // const ContactScreen = () => (
// //   <View style={styles.layout}>
// //     <Text style={styles.title}>Contact</Text>
// //   </View>
// // );

// const AccountScreen = () => {
//   const nav = useNavigation();
//   return (
//     <View style={styles.layout}>
//       <Text style={styles.title}>Account</Text>
//       <Button title="Sign Out" onPress={() => nav.navigate("Sign In")} />
//     </View>
//   );
// };

// const Tab = createBottomTabNavigator();
// const MainNavigator = () => (
//   <Tab.Navigator>
//     <Tab.Screen name="Home" component={HomeScreen} />
//     <Tab.Screen name="Location" component={LocationFinder} />
//     <Tab.Screen name="Contacts" component={ContactList} />
//     <Tab.Screen name="Account" component={AccountScreen} />
//   </Tab.Navigator>
// );

// const Stack = createStackNavigator();
// const StackNav = () => (
//   <Stack.Navigator headerMode="none">
//     <Stack.Screen name="Sign In" component={SignIn} />
//     <Stack.Screen name="Sign Up" component={SignUp} />
//     <Stack.Screen name="Main" component={MainNavigator} />
//   </Stack.Navigator>
// );

// const App = () => (
//   <NavigationContainer>
//     <StackNav />
//   </NavigationContainer>
// );

// export default App;

// const styles = StyleSheet.create({
//   layout: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 8,
//   },
//   title: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });
