// GoogleMapView.js
import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserLocationContext } from "../context/UserLocationContext";
import { COLORS, SIZES } from "../constants/theme";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import { fetchDirections } from "../hook/DirectionGoogleAPI";
import PlaceMarker from "./PlaceMarker";

const GoogleMapView = ({ placeList }) => {
  console.log({ placeList }); // Restaurant address
  const { location } = useContext(UserLocationContext); // My Location coords
  const [coordinates, setCoordinates] = useState([]);
  console.log({ coordinates });

  // To Zoom Map
  const mapRef = useRef(null);

  useEffect(() => {
    if (!location || !placeList) return;
    // Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(["location", "placeList"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [location, placeList]);

  // Initial states
  const [mapRegion, setMapRegion] = useState({
    latitude: 35.6855,
    longitude: 139.68884,
    latitudeDelta: 0.0005,
    longitudeDelta: 0.0005,
  });

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude, // My Location Latitude
        longitude: location.coords.longitude, // My Location Longitude
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      // Destructure Restaurant's placeList variable
      const { latitude, longitude } = placeList[0];
      fetchDirections(
        location.coords.latitude, // My Location Latitude
        location.coords.longitude, // My Location Longitude
        latitude, // Restaurant Address Latitude
        longitude // Restaurant Address Longitude
      )
        .then(setCoordinates)
        .catch((error) => console.error("Failed to fetch directions:", error));
    }
  }, [location, placeList]);

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef} // useRef hook To Zoom Map
        mapType="mutedStandard"
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}
        style={styles.map}
      >
        <Marker
          title="My Location"
          coordinate={mapRegion}
          description={location?.description}
          identifier="location"
        />
        {/* Restaurants Data */}
        {placeList.map((item) => (
          <PlaceMarker key={item.id} coordinates={item} />
        ))}
        <Polyline
          coordinates={coordinates}
          strokeColor={"red"}
          strokeWidth={5}
        />
      </MapView>
    </View>
  );
};

export default GoogleMapView;

const styles = StyleSheet.create({
  mapContainer: {
    width: SIZES.width - 5,
    height: SIZES.height / 3,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
