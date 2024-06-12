import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, SHADOWS } from "../constants/theme";
import NetworkImage from "./reusable/NetworkImage";
import { RatingInput } from "react-native-stock-star-rating";

const FoodTile = ({ item, onPress, showDetails }) => {
  //console.log(item)
  return (
    <TouchableOpacity style={styles.wrapper} onPress={showDetails}>
      <View style={{ backgroundColor: COLORS.lightWhite, borderRadius: 12 }}>
        <View style={{ flexDirection: "row" }}>
          <NetworkImage
            data={item.imageUrl[0]}
            height={75}
            width={100}
            radius={15}
          />

          <View
            style={{
              position: "absolute",
              right: 5,
              top: 5,
              backgroundColor: COLORS.primary1,
              borderRadius: 12,
            }}
          >
            <Text
              style={[
                styles.title,
                { color: COLORS.black, marginHorizontal: 5 },
              ]}
            >
              $ {item.price}
            </Text>
          </View>

          <View style={{ marginLeft: 10, marginTop: 5 }}>
            <Text style={styles.title}>{item.title}</Text>
            <RatingInput
              rating={Number(item.rating)}
              size={20}
              color={COLORS.primary}
            />

            <FlatList
              data={item.foodTags.slice(0, 3)}
              showsVerticalScrollIndicator={false}
              horizontal
              scrollEnabled
              style={{ marginTop: 5, marginBottom: 5 }}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <View style={styles.tags}>
                  <Text style={{ paddingHorizontal: 4, color: COLORS.black }}>
                    {item}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodTile;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.primary1,
    borderRadius: 12,
    shadowColor: SHADOWS.medium,
    padding: 12,
    marginBottom: 15,
    marginRight: 5,
    paddingRight: 7,
    ...SHADOWS.small
  },
  title: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.gray,
  },
  tags: {
    right: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
});
