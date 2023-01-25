import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
// import { useNavigation } from "@react-navigation/native";
// import Sms from "react-native-sms";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, Linking } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Contacts from "expo-contacts";

export default function ContactList({ route }) {
  // const nav = useNavigation();
  const { location, mapSnapshotUri } = route.params;
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState([
    `My location is: \nLatitude: ${location.coords.latitude} \nLongitude: ${location.coords.longitude}\nI've attached a map snapshot of my location.${mapSnapshotUri}`,
  ]);

  useEffect(() => {
    const getContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      const { data } = await Contacts.getContactsAsync();
      setContacts(data);
    };
    getContacts();
  }, []);

  const textLocationAndMapUri = (contact) => {
    let phoneNumber = contact.phoneNumbers[0].number;

    const link = `sms:${phoneNumber}?body=${message}&attachment=${mapSnapshotUri}`;
    Linking.canOpenURL(link).then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + link);
      } else {
        return Linking.openURL(link);
      }
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          title={item.name}
          style={styles.button}
          onPress={() => textLocationAndMapUri(item)}
        >
          <MaterialCommunityIcons name="account-box" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}> 
      <SafeAreaView>
        <View>
          <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#ced8f7",
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 10,
    maxWidth: 300,
  },
  button: {
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: "#283769",
  },
  text: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

