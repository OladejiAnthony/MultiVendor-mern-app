import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import uidata from "../constants/uidata";
import FoodComp from "./FoodComp";
import { useNavigation } from "@react-navigation/native";

const NewFoodList = () => {
  //console.log(uidata.foods)
  const navigation = useNavigation();
  
  const renderItem = ({ item }) => (
    <FoodComp
      item={item}
      onPress={() => navigation.navigate("food-nav", item)}
    />
  );
  //from this component, whenever we navigate to "food-nav" route we pass the item prop along, first into the FoodNavigator screen as initialParameter, then to be used on the embedded FoodPage/Screen in the naviagtor.

  return (
    <View style={{ marginLeft: 12, marginBottom: 10 }}>
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

export default NewFoodList;

const styles = StyleSheet.create({});
