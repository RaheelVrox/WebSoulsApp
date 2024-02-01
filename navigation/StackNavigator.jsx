import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../Component/Header";
import DomainName from "../scr/DomainName/DomainName";
import FrontPage from "../scr/FrontPage/FrontPage";
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FrontPage"
          component={FrontPage}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="DomainName"
          component={DomainName}
          options={{
            header: () => <Header />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
