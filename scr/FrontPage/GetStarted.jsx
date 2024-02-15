import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";

const GetStarted = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <View style={styles.container}>
        <Text>GetStarted</Text>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
