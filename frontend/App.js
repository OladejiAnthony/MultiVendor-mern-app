//import { StatusBar } from "expo-status-bar";
//import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import BottomTab from "./app/navigation/BottomTab";
import { UserLocationContext } from "./app/context/UserLocationContext";
import { UserReversedGeoCode } from "./app/context/UserReversedGeoCode";

import { RestaurantContext } from "./app/context/RestaurantContext";
import { LoginContext } from "./app/context/LoginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FoodNavigator from "./app/navigation/FoodNavigator";
import RestaurantPage from "./app/navigation/RestaurantPage";
import Restaurant from "./app/screens/restaurant/Restaurant";
import AddRating from "./app/screens/AddRating";
import SignUp from "./app/screens/SignUp";
import { CartCountContext } from "./app/context/CartCountContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [location, setLocation] = useState(null); //console.log(location)
  const [address, setAddress] = useState(null); //console.log(address)
  const [errorMsg, setErrorMsg] = useState("");
  const [restaurantObj, setRestaurantObj] = useState(null);
  const [login, setLogin] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  
  const defaultAddresss = {
    city: "Shanghai",
    country: "China",
    district: "Pudong",
    isoCountryCode: "CN",
    name: "33 East Nanjing Rd",
    postalCode: "94108",
    region: "SH",
    street: "Stockton St",
    streetNumber: "1",
    subregion: "San Francisco County",
    timezone: "America/Los_Angeles",
  };


  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    //Inside this function, you check if the fonts are loaded, and if they are, you hide the SplashScreen.
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);



 
  //get current location
  useEffect(() => {
    (async () => {
      setAddress(defaultAddresss);
      //get permission from user
      let status = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      } //console.log(status)
      
      //get userLocation
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      //console.log(location)
      loginStatus();
    })();
  }, []);

  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading or app is initializing
    return;
    //A condition that checks if the fonts are not loaded. If they are not loaded yet, you return nothing, presumably to show a loading indicator or splash screen until the fonts are loaded.
  }

  const loginStatus = async () => {
    const userToken = await AsyncStorage.getItem("token");
    if (userToken !== null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    console.log({login})
  };


  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <UserReversedGeoCode.Provider value={{ address, setAddress }}>
        <RestaurantContext.Provider value={{ restaurantObj, setRestaurantObj }}>
          <LoginContext.Provider value={{ login, setLogin }}>
            <CartCountContext.Provider value={{ cartCount, setCartCount }}>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="bottom-navigation"
                    component={BottomTab}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="food-nav"
                    component={FoodNavigator}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="restaurant"
                    component={Restaurant}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="rating"
                    component={AddRating}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="restaurant-page"
                    component={RestaurantPage}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="signUp"
                    component={SignUp}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </CartCountContext.Provider>
          </LoginContext.Provider>
        </RestaurantContext.Provider>
      </UserReversedGeoCode.Provider>
    </UserLocationContext.Provider>
  );
}

{
  /* 
  console.log(location)
  {
    "coords": 
      {"accuracy": 100, "altitude": 326.79998779296875, "altitudeAccuracy": 100, "heading": 0, "latitude": 8.4816482, "longitude": 4.5378835, "speed": 0
      }, 
    "mocked": false, 
    "timestamp": 1713569081398
  }

*/
}


