import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import pages from "./page.style";
import uidata from "../constants/uidata";
import { UserReversedGeoCode } from "../context/UserReversedGeoCode";
import { UserLocationContext } from "../context/UserLocationContext";
import HomeHeader from "../components/HomeHeader";
import CategoryList from "../components/CategoryList";
import ChoicesList from "../components/ChoicesList";
import Heading from "../components/Heading";
import NearByRestaurants from "../components/NearByRestaurants";
import Divider from "../components/reusable/Divider";
import NewFoodList from "../components/NewFoodList";
import FastestNearYou from "../components/FastestNearYou";
import HomeCategories from "../components/HomeCategories";

const Home = () => {
  //destructure context data
  //const {address, setAddress} = useContext(UserReversedGeoCode);
  //console.log(address)
  //const {location, setLocation} = useContext(UserLocationContext);
  //console.log(location)

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  //console.log(selectedCategory)
  const [selectedChoice, setSelectedChoice] = useState(null);
  //console.log(selectedChoice)

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <HomeHeader />

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ borderBottomEndRadius: 30, borderBottomStartRadius: 30 }}
          >
            <CategoryList
              setSelectedCategory={setSelectedCategory}
              setSelectedSection={setSelectedSection}
              setSelectedValue={setSelectedValue}
            />

            <ChoicesList
              setSelectedChoice={setSelectedChoice}
              setSelectedSection={setSelectedSection}
            />

            {selectedCategory !== null && selectedSection !== null ? (
              <View>
                <Heading heading={`Browse ${selectedValue}`} onPress={() => {}} />
                <HomeCategories  

                />
              </View>
            ) : (
              <View>
                <Heading heading={"Nearby Restaurants"} onPress={() => {}} />
                <NearByRestaurants />
                <Divider />

                <Heading heading={"Try Something New"} onPress={() => {}} />
                <NewFoodList />
                <Divider />

                <Heading heading={"Fatest Near You"} onPress={() => {}} />
                <FastestNearYou />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
