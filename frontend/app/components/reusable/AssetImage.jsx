import { StyleSheet, Image } from "react-native";
import React from "react";

const AssetImage = ({ data, width, height, radius, mode }) => {
  //passing props
  return (
    <Image source={data} style={styles.image(width, height, radius, mode)} />
  );
};

export default AssetImage;

const styles = StyleSheet.create({
  //the "image" style is created as a function that takes 4 arguments: width, height, radius, mode
  image: (width, height, radius, mode) => ({
    width: width,
    height: height,
    borderRadius: radius,
    resizeMode: mode,
  }),
});


