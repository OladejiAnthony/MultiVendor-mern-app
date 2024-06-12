import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AssetImage from "./reusable/AssetImage";
import { UserReversedGeoCode } from "../context/UserReversedGeoCode";
import { COLORS, SIZES } from "../constants/theme";
import { UserLocationContext } from "../context/UserLocationContext";
import * as Location from "expo-location";

const HomeHeader = () => {
    const {address, setAddress} = React.useContext(UserReversedGeoCode);
    //console.log(address);
    const {location, setLocation} = React.useContext(UserLocationContext);
    //console.log(location)
    const [time, setTime] = useState(null)

    //get users current location
    useEffect(() => {
        if(location !== null) {
            reverseGeoCode(location.coords.latitude, location.coords.longitude)
        }
    }, [location]);

    const reverseGeoCode = async (latitude, longitude) => {
        const reverseGeoCodedAddress = await Location.reverseGeocodeAsync({
            longitude: longitude,
            latitude: latitude
        });
        //console.log(reverseGeoCodedAddress)
        //setAddress(reverseGeoCodedAddress)
        setAddress(reverseGeoCodedAddress[0]);
        const greeting = getTimeOfTheDay();
        setTime(greeting);
    }

    //get time
    const getTimeOfTheDay = () => {
        const now = new Date();
        const hour = now.getHours();

        if (hour >= 0 && hour < 12) {
            return "🌞"
        }else if (hour >= 12 < 17 ) {
            return "⛅"
        }else {
            return "🌙"
        }
    }


  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={styles.outerStyle}>
        <AssetImage
          data={require("../../assets/images/profile.jpg")}
          width={50}
          height={55}
          radius={99}
          mode={"cover"}
        />

        <View style={styles.headerStyle}>
            <Text style={styles.heading}>Delivering to</Text>
            <Text style={styles.location}>{`${address.city} ${address.name}`}</Text>
        </View>
      </View>
      <View>
        <Text style={{fontSize: 36}}>{time}</Text>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  outerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  headerStyle: {
    marginLeft: 15,
    justifyContent: "center"
  },
  heading: {
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: COLORS.secondary
  },
  location: {
    fontFamily: "regular",
    fontSize: SIZES.small+2,
    color: COLORS.gray
  },

});
