import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const GetInvoices = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [invoices, setInvoices] = useState([]);

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
      fetchInvoices();
    }
  }, [userId]);

  const fetchInvoices = async () => {
    setIsLoading(true);

    try {
      const apiUrl = "https://billing.livesports99.com/includes/api.php";
      const requestData = {
        action: "GetInvoices",
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
        setInvoices(response.data.invoices?.invoice || []);
        // console.log(
        //   "API response order:",
        //   JSON.stringify(response.data, null, 2)
        // );
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>Order Invoices</Text>
          {invoices.length === 0 ? (
            <Text style={{ alignSelf: "center" }}>No Invoices found!</Text>
          ) : (
            invoices.map((invoice) => (
              <View key={invoice.id} style={styles.invoice}>
                <Text>{`ID: ${invoice.id}`}</Text>
                <Text>{`User ID: ${invoice.userid}`}</Text>
                <Text>{`Name: ${invoice.firstname} ${invoice.lastname}`}</Text>
                <Text>{`Company Name: ${invoice.companyname}`}</Text>
                <Text>{`Invoice Number: ${invoice.invoicenum}`}</Text>
                <Text>{`Date: ${invoice.date}`}</Text>
                <Text>{`Due Date: ${invoice.duedate}`}</Text>
                <Text>{`Subtotal: ${invoice.subtotal}`}</Text>
                <Text>{`Credit: ${invoice.credit}`}</Text>
                <Text>{`Tax: ${invoice.tax}`}</Text>
                <Text>{`Tax 2: ${invoice.tax2}`}</Text>
                <Text>{`Total: ${invoice.total}`}</Text>
                <Text>{`Tax Rate: ${invoice.taxrate}`}</Text>
                <Text>{`Tax Rate 2: ${invoice.taxrate2}`}</Text>
                <Text>{`Status: ${invoice.status}`}</Text>
                <Text>{`Payment Method: ${invoice.paymentmethod}`}</Text>
                <Text>{`Notes: ${invoice.notes}`}</Text>
                <Text>{`Created At: ${invoice.created_at}`}</Text>
                <Text>{`Updated At: ${invoice.updated_at}`}</Text>
                <Text>{`Currency Code: ${invoice.currencycode}`}</Text>
                <Text>{`Currency Prefix: ${invoice.currencyprefix}`}</Text>
                <Text>{`Currency Suffix: ${invoice.currencysuffix}`}</Text>
              </View>
            ))
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("PaymentMethod")}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default GetInvoices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
    paddingTop: 30,
  },
  invoice: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
  },
  continueButton: {
    width: wp(85),
    backgroundColor: "#005880",
    borderRadius: 6,
    padding: 15,
    marginTop: hp(20),
    marginBottom: 30,
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
