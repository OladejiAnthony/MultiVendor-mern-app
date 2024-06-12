import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import React, { useContext } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";
import GoogleMapView from "../../components/GoogleMapView";
import { COLORS, SIZES } from "../../constants/theme";

const Direction = () => {
  const { restaurantObj, setRestaurantObj } = useContext(RestaurantContext);
  //console.log(restaurantObj)

  const coords = restaurantObj.coords;
  //console.log(coords)

  //open a Link outside my app
  const onDirectionClick = () => {
    const url = Platform.select({
      ios: "maps:" + coords.latitude + "," + coords.longitude,
      android: "geo:" + coords.latitude + "," + coords.longitude + "?z=16",
    });
    Linking.openURL(url);
  };


  return (
    <View>
      <GoogleMapView placeList={[coords]} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 12,
        }}
      >
        <Text style={[styles.small, { width: SIZES.width / 1.6 }]}>
          {coords.address}
        </Text>
        <TouchableOpacity
          onPress={()=> onDirectionClick()}
          style={styles.ratingBtn}
        >
          <Text>Direction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Direction;

const styles = StyleSheet.create({
  small: {
    fontSize: 13,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  ratingBtn: {
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 9,
    padding: 6,
  },
  btnText: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.lightWhite,
  },
});


//The onDirectionClick is intended to open a maps application on the user's device and show directions to a specific location represented by the coordinates coords.latitude and coords.longitude.
//const url = Platform.select({ ... }): This is a conditional statement using Platform.select from React Native. It checks the platform the app is running on (iOS or Android) and constructs a URL accordingly.
//For iOS (ios platform), it constructs a URL starting with "maps:" followed by latitude and longitude.
//For Android (android platform), it constructs a URL starting with "geo:" followed by latitude and longitude, and a query parameter z=16 to set the zoom level to 16.
//Linking.openURL(url): This is a React Native function that opens the specified URL. It's used here to open the URL constructed based on the platform.

