import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import uidata from "../constants/uidata";
import StoreComp from "./StoreComp";
import { useNavigation } from "@react-navigation/native";
import { RestaurantContext } from "../context/RestaurantContext";

const NearByRestaurants = () => {
  //console.log(uidata.restaurants)
  const navigation = useNavigation();
  const { restaurantObj, setRestaurantObj } = useContext(RestaurantContext);

  return (
    <View style={{ marginLeft: 12 }}>
      <FlatList
        data={uidata.restaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5, rowGap: 10 }}
        scrollEnabled
        renderItem={({ item }) => (
          <StoreComp
            item={item}
            onPress={() => {
              navigation.navigate("restaurant", item), setRestaurantObj(item);
            }}
          />
        )}
      />
    </View>
  );
};

export default NearByRestaurants;

const styles = StyleSheet.create({});
