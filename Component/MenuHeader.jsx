import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const MenuHeader = () => {
  return (
    <View style={styles.logocontainer}>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 80, height: 60, resizeMode: "contain" }}
      />
      <TouchableOpacity>
        <MaterialIcons name="menu" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default MenuHeader;

const styles = StyleSheet.create({
  logocontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    marginHorizontal: 20,
  },
});
