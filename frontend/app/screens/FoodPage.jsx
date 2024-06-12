import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState,  } from "react";
import { CartCountContext } from "../context/CartCountContext";
import { COLORS, SIZES } from "../constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BouncyCheckBox from "react-native-bouncy-checkbox";
import Counter from "../components/Counter";
import { AntDesign } from "@expo/vector-icons";


const FoodPage = ({ route, navigation }) => {
  //we received the "route" from FoodNavigator component and the "navigation" from NewFoodList component
  const item = route.params.item; // we use the route to extract the particular item on this page for identification
  //console.log(item);

  const [isChecked, setIsChecked] = useState(false);
  const [additives, setAdditives] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [restaurant, setRestaurant] = useState(1);
  const [count, setCount] = useState(1);
  const [preference, setPreference] = useState("");
  //const [cartCount, setCartCount] = useContext(CartCountContext);

  const handleAdditives = (newAdditive) => {
    setAdditives((prevAdditives) => {
      const exists = prevAdditives.some(
        (additive) => additive.id === newAdditive.id
      );
      if(exists) {
        return prevAdditives.filter((additive) => additive.id !== newAdditive.id)
      }else {
        return [...prevAdditives, newAdditive]
      }
    })
  }
  //console.log(additives)

  const handlePress = (item) => {
    const cartItem = {
      productId: item._id,
      additives: additives,
      quantity: count,
      totalPrice: (item.price + totalPrice) * count
    }
    addToCart(cartItem)
  }

  let sendToOrderPage;
  const id = item.restaurant;

  sendToOrderPage = {
    orderItem: {
      foodId: item._id,
      additives: additives,
      quantity: count,
      instructions: preference,
      price: (item.price + totalPrice) * count
    },
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl[0],
    restaurant: id
  }

  const addToCart = async(cartItem) => {}

  useEffect(() => {
    calculatePrice()
  }, [additives]);

  //additive price
  const calculatePrice = () => {
    const total = additives.reduce((sum, additive) => {
      return sum + parseFloat(additive.price)
    },0)
    //console.log(total)
    setTotalPrice(total)
  }

 

  return (
    <SafeAreaView style={{marginTop: 22}}>
      <View
        style={{ backgroundColor: COLORS.lightWhite, height: SIZES.height }}
      >
        <ScrollView>
          <View>
            <Image
              source={{ uri: item.imageUrl[0] }}
              style={{
                width: SIZES.width,
                height: SIZES.height / 4,
                borderBottomRightRadius: 30,
              }}
            />

            <TouchableOpacity
              onPress={() => navigation.goback()}
              style={styles.backbtn}
            >
              <Ionicons
                name="chevron-back-circle"
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}} style={styles.sharebtn}>
              <MaterialCommunityIcons
                name="share-circle"
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={{ position: "absolute", bottom: 20, right: 0 }}
            >
              <View style={styles.restBtn}>
                <Text
                  style={{
                    color: COLORS.lightWhite,
                    fontFamily: "bold",
                  }}
                >
                  Open the Store
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={[styles.title, { color: COLORS.primary }]}>
                ${(item.price + totalPrice) * count}
              </Text>
            </View>

            <Text style={styles.small}>{item.description}</Text>
            <FlatList
              data={item.foodTags}
              showsVerticalScrollIndicator={false}
              horizontal
              scrollEnabled
              style={{ marginTop: 10 }}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <View style={styles.tags}>
                  <Text
                    style={{ paddingHorizontal: 4, color: COLORS.lightWhite }}
                  >
                    {item}
                  </Text>
                </View>
              )}
            />

            <Text style={[styles.title, { marginBottom: 10, marginTop: 20 }]}>
              Additives and Toppings
            </Text>
            <FlatList
              data={item.additives}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              style={{ marginTop: 10 }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <BouncyCheckBox
                    size={20}
                    unfillColor="ffffff"
                    fillColor={COLORS.primary}
                    innerIconStyle={{ borderWidth: 1 }}
                    textStyle={styles.small}
                    text={item.title}
                    onPress={() => {
                      handleAdditives(item)
                    }}
                  />
                  <Text style={styles.small}>$ {item.price}</Text>
                </View>
              )}
            />

            <Text style={[styles.title, { marginBottom: 10, marginTop: 20 }]}>
              Preferences
            </Text>
            <View style={styles.input}>
              <TextInput
                placeholder="Add specific instructions"
                value={preference}
                onChangeText={(value) => setPreference(value)}
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1 }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Text style={[styles.title, { marginBottom: 10 }]}>Quantity</Text>
              <Counter count={count} setCount={setCount} />
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 40 }}>
            <View style={styles.suspended}>
              <View style={styles.cart}>
                <View style={styles.cartRow}>
                  <TouchableOpacity onPress={() => {}} style={styles.cartbtn}>
                    <AntDesign
                      name="pluscircleo"
                      size={24}
                      color={COLORS.lightWhite}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("order-page", sendToOrderPage)}
                    style={{
                      backgroundColor: COLORS.primary,
                      paddingHorizontal: 60,
                      borderRadius: 30,
                    }}
                  >
                    <Text
                      style={[
                        styles.title,
                        {
                          color: COLORS.lightWhite,
                          marginTop: 4,
                          alignItems: "center",
                        },
                      ]}
                    >
                      Order
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {}}
                    style={{
                      backgroundColor: COLORS.primary,
                      paddingHorizontal: 10,
                      borderRadius: 30,
                    }}
                  >
                    <Text
                      style={[
                        styles.title,
                        {
                          color: COLORS.lightWhite,
                          marginTop: 4,
                          alignItems: "center",
                        },
                      ]}
                    >
                      {0}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FoodPage;

const styles = StyleSheet.create({
  backbtn: {
    marginLeft: 12,
    alignItems: "center",
    zIndex: 999,
    position: "absolute",
    top: SIZES.xxLarge,
  },
  sharebtn: {
    marginRight: 12,
    alignItems: "center",
    zIndex: 999,
    right: 0,
    position: "absolute",
    top: SIZES.xxLarge + 3,
  },
  restBtn: {
    borderColor: COLORS.tertiary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    backgroundColor: COLORS.primary,
  },
  container: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "medium",
    color: COLORS.black,
  },
  small: {
    fontSize: 13,
    fontFamily: "regular",
    color: COLORS.gray,
    textAlign: "justify",
  },
  tags: {
    right: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  input: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    backgroundColor: COLORS.offwhite,
    height: 50,
    flexDirection: "row",
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  suspended: {
    //position: "relative",
    //zIndex: 999,
    //bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  cart: {
    width: SIZES.width - 24,
    height: 60,
    justifyContent: "center",
    backgroundColor: COLORS.primary1,
    borderRadius: 30,
  },
  cartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  cartbtn: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
});

//We successfully passed the item data from a component on the homepage into a stack navigator,then to be used on the screen/page in the navigator that we desire using route.params.

//3hrs,40mins



