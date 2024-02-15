import { StyleSheet } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./scr/store/Store.js";

export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "OpenSans-Regular": require("./assets/font/OpenSans-Regular.ttf"),
      });

      setFontLoaded(true);
      await SplashScreen.hideAsync();
    };

    loadFont();
  }, []);

  if (!isFontLoaded) {
    return null;
  }
  return (
    <>
      <Provider store={store}>
        <StackNavigator />
        <StatusBar style="auto" backgroundColor="#fff" />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
