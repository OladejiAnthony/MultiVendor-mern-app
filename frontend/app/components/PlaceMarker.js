import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

const PlaceMarker = ({ coordinates }) => {
  console.log({coordinates}); //Restaurants Address

  return (
    <Marker
      title={coordinates.title}
      coordinate={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005,
      }}
    />
  );
};

export default PlaceMarker;

