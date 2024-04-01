import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const GetOrders = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState([]);
  const [noOrders, setNoOrders] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserLogin = await AsyncStorage.getItem("Clintlogin");
        if (storedUserLogin) {
          const userLoginData = JSON.parse(storedUserLogin);
          setUserId(userLoginData.userid);
          console.log("UserID is:", userLoginData.userid);
        }
      } catch (error) {
        console.error("Error fetching user login data:", error.message);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      getorder();
    }
  }, [userId]);

  const getorder = async () => {
    setIsLoading(true);

    try {
      const apiUrl = "https://billing.livesports99.com/includes/api.php";
      const requestData = {
        action: "GetOrders",
        username: "NgDtOIwKao8DoPNeNXa9dUBpthIWHBSZ",
        password: "FbRxCwNDGPVKOMrW5QRGruCCZrXtV8Yg",
        userid: 24555,
        responsetype: "json",
      };
      const response = await axios.post(
        apiUrl,
        new URLSearchParams(requestData).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.result === "success") {
        if (response.data.orders && response.data.orders.order) {
          setOrders(response.data.orders.order);
          // console.log(
          //   "API response order:",
          //   JSON.stringify(response.data, null, 2)
          // );
          setNoOrders(false);
        } else {
          setOrders([]);
          setNoOrders(true);
          console.log("No orders found");
        }
      } else {
        console.log("API request failed:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#005880" />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {noOrders ? (
          <Text>No orders found!</Text>
        ) : (
          <>
            <Text style={styles.title}>Orders Details</Text>
            {orders.map((order) => (
              <View key={order.id} style={styles.orderContainer}>
                <View style={styles.lineItemContainer}>
                  <Text style={styles.orderText}>Order ID: {order.id}</Text>
                  <Text style={styles.orderText}>userid: {order.userid}</Text>
                  <Text style={styles.orderText}>Amount: {order.amount}</Text>
                  <Text style={styles.orderText}>date: {order.date}</Text>
                  <Text style={styles.orderText}>
                    paymentmethod: {order.paymentmethod}
                  </Text>
                  <Text style={styles.orderText}>notes: {order.notes}</Text>
                  <Text style={styles.orderText}>
                    invoiceid: {order.invoiceid}
                  </Text>
                  <Text style={styles.orderText}>
                    paymentstatus: {order.paymentstatus}
                  </Text>
                  <Text style={styles.orderText}>
                    paymentmethodname: {order.paymentmethodname}
                  </Text>
                  <Text style={styles.orderText}>name: {order.name}</Text>
                  <Text style={styles.orderText}>Status: {order.status}</Text>
                </View>
                {order.lineitems &&
                  order.lineitems.lineitem.map((lineitem, index) => (
                    <View key={index} style={styles.lineItemContainer}>
                      <Text style={styles.lineItemText}>
                        Type: {lineitem.type}
                      </Text>
                      <Text style={styles.lineItemText}>
                        Product: {lineitem.product}
                      </Text>
                      <Text style={styles.lineItemText}>
                        Domain: {lineitem.domain}
                      </Text>
                      <Text style={styles.lineItemText}>
                        Billing Cycle: {lineitem.billingcycle}
                      </Text>
                      <Text style={styles.lineItemText}>
                        Amount: {lineitem.amount}
                      </Text>
                      <Text style={styles.lineItemText}>
                        Status: {lineitem.status}
                      </Text>
                    </View>
                  ))}
              </View>
            ))}
          </>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate("GetInvoices")}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GetOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  scrollContainer: {
    alignItems: "center",
  },
  orderContainer: {
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  orderText: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 5,
  },
  lineItemContainer: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  lineItemText: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 3,
  },
  continueButton: {
    width: wp(85),
    backgroundColor: "#005880",
    borderRadius: 6,
    padding: 15,
    marginTop: 25,
    marginBottom: 40,
  },
  continueButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
