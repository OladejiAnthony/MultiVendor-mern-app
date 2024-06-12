import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { RestaurantContext } from "../../context/RestaurantContext";
import uidata from "../../constants/uidata";
import CategoryFoodComp from "../../components/reusable/CategoryFoodComp";

const Menu = () => {
  const { restaurantObj, setRestaurantObj } = useContext(RestaurantContext);
  //console.log(restaurantObj)

  //console.log(uidata.foods)
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 5 }}>
      <FlatList
        data={uidata.foods}
        showsVerticalScrollIndicator={true}
        style={{ marginTop: 5 }}
        keyExtractor={(item) => item._id}
        // numColumns={2}
        scrollEnabled
        renderItem={({ item }) => (
          <View style={{left: 10}}>
            <CategoryFoodComp
              item={item}
              onPress={() => navigation.navigate("food-nav", item)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Menu;
