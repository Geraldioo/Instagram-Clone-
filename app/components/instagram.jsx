import React from "react";
import { View, Image, StyleSheet } from "react-native";
import images from "../res/images";

const LogoTitle = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}

        source={images.logoBlack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 55,
    resizeMode: "contain",
  },
});

export default LogoTitle;
