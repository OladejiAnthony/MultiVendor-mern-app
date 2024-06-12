import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import uidata from "../constants/uidata";
import FoodComp from "./FoodComp";

const FastestNearYou = () => {
  //console.log(uidata.foods)
  const renderItem = ({ item }) => <FoodComp item={item} onPress={() => {}} />;

  return (
    <View style={{marginLeft: 12, marginBottom: 10}}>
        <FlatList
        data={uidata.foods}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5, rowGap: 10 }}
        scrollEnabled
        renderItem={renderItem}
        />
    </View>
  );
};

export default FastestNearYou;

