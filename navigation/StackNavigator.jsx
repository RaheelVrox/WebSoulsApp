import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../Component/Header";
import SearchDomain from "../scr/SearchDomain/SearchDomain";
import FrontPage from "../scr/FrontPage/FrontPage";
import FindDomain from "../scr/SearchDomain/FindDomain";
import GetStarted from "../scr/FrontPage/GetStarted";
import Cart from "../scr/Cart/Cart";
import PackageFree from "../scr/SearchDomain/PackageFree";
import HostingPackage from "../scr/HostingPackage/HostingPackage";
import UserRegistration from "../scr/UserRegistration/UserRegistration";
import Login from "../scr/Login/Login";
import GetOrders from "../scr/GetOrder/GetOrders";
import GetInvoices from "../scr/GetOrder/GetInvoices";
import PaymentMethod from "../scr/PaymentMethods/PaymentMethod";
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
          name="SearchDomain"
          component={SearchDomain}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="FindDomain"
          component={FindDomain}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="PackageFree"
          component={PackageFree}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="HostingPackage"
          component={HostingPackage}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="UserRegistration"
          component={UserRegistration}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="GetOrders"
          component={GetOrders}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="GetInvoices"
          component={GetInvoices}
          options={{
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
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
