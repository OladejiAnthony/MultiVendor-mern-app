import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Home from "../screens/Home";
import Search from "../screens/Search";
import { COLORS } from "../constants/theme";
import Profile from "../screens/Profile";
import Cart from "../screens/Cart";
import LoginPage from "../screens/LoginPage";

import { CartCountContext } from "../context/CartCountContext";
import { LoginContext } from "../context/LoginContext";

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  backgroundColor: COLORS.primary,
  borderTopWidth: 0,
  elevation: 0, // This will remove the shadow on Android
  shadowOpacity: 0, // This will remove the shadow on iOS
};

const BottomTab = () => {
  // const {count, isCartLoading, error, refetch} = fetchCartCount();

  const { cartCount, setCartCount } = useContext(CartCountContext);
  //console.log(cartCount);
  const {login, setLogin} = useContext(LoginContext)
  //console.log(login)

  // if(isCartLoading){
  //   setCartCount(count)
  // }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={COLORS.secondary}
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor="#3e2465"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              color={focused ? COLORS.secondary : COLORS.secondary1}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "search" : "search"}
              color={focused ? COLORS.secondary : COLORS.secondary1}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ width: 26, height: 26, position: "relative" }}>
              <FontAwesome
                name={focused ? "opencart" : "opencart"}
                color={focused ? COLORS.secondary : COLORS.secondary1}
                size={26}
              />

              <View
                style={{
                  position: "absolute",
                  right: -6,
                  top: -3,
                  backgroundColor: "red",
                  borderRadius: 7,
                  width: 14,
                  height: 14,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 10 }}>{cartCount}</Text>
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={login ? Profile : LoginPage}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={focused ? COLORS.secondary : COLORS.secondary1}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

//In React Navigation, Tab.Navigator is used to define a tab-based navigation system
//where each tab represents a different screen or view.
//initialRouteName="Home": This prop specifies the initial route/screen that should be displayed when the tab navigator is rendered.
//tabBarHideKeyBoard={true}: This prop controls whether the keyboard should be automatically dismissed when the user interacts with the tab bar. Setting it to true means that the keyboard will be hidden when the user switches between tabs.
//headerShown={false}: This prop determines whether the header (typically containing a title or navigation buttons) should be displayed at the top of the screen. Setting it to false hides the header.
