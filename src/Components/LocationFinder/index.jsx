import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
// import { Card, CardItem, Body, Button, Icon } from 'native-base';
// import { NativeBaseProvider } from 'native-base';

// import messaging from '@react-native-firebase/messaging';
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from '@react-navigation/native';
import { captureRef } from "react-native-view-shot";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

export default function LocationFinder() {
  const nav = useNavigation();
  const map = useRef(null);
  const [location, setLocation] = useState(null);
  const [mapSnapshotUri, setMapSnapshotUri] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log(errorMsg);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  
  const sendLocation = () => {
    captureRef(map, {
      width: 300,
      height: 300,
      format: "jpg",
      quality: 1,
      result: "tmpfile",
      fileName: "locationSnapshot",
    }).then(uri => {
      setMapSnapshotUri(uri);
      nav.setParams({ location, mapSnapshotUri })
      nav.navigate('Contacts', { location, mapSnapshotUri });
    })
  }
  
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          {location && (
            <View style={styles.cardContainer}>
              <MapView
                ref={map}
                style={styles.map}
                region={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                showsPointsOfInterest={true}
              >
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                />
              </MapView>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardText}>Latitude: {location.coords.latitude}</Text>
                <Text style={styles.cardText}>Longitude: {location.coords.longitude}</Text>
                <TouchableOpacity style={styles.button} onPress={sendLocation}>
                  <Text style={styles.buttonText}>Send Location</Text>
                </TouchableOpacity>
            </View>
          </View>
          )}
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  cardContainer: {
    alignItems: "center",
    backgroundColor: "#ced8f7",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  map: {
    width: 300,
    height: 300,
    marginBottom: 5,
    borderRadius: 10,
  },
  cardTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
    // marginVertical: 8,
    marginHorizontal: 16,
  },
  cardText: {
    fontSize: 16,
    color: "#283769",
    textTransform: "uppercase",
    // marginBottom: 6,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#283769",
    padding: 10,
    width: "100%",
    marginTop: 18,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textTransform: "uppercase",
  },
});