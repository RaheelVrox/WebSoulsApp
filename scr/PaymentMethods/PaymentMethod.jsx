import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

const PaymentMethod = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientid, setClientID] = useState(null);
  const { packageCart } = useSelector((state) => state.packageCart);
  const { domainSearchCart } = useSelector((state) => state.domainSearchCart);

  const fetchPaymentMethod = async () => {
    setIsLoading(true);

    try {
      const apiUrl = "https://billing.livesports99.com/includes/api.php";
      const requestData = {
        action: "GetPaymentMethods",
        username: "NgDtOIwKao8DoPNeNXa9dUBpthIWHBSZ",
        password: "FbRxCwNDGPVKOMrW5QRGruCCZrXtV8Yg",
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
        // console.log(
        //   "API Response Data:",
        //   JSON.stringify(response.data, null, 2)
        // );

        setPaymentMethods(response.data.paymentmethods.paymentmethod);
      } else {
        console.log("API request failed:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethod();
  }, []);

  useEffect(() => {
    const creditCardMethod = paymentMethods.find(
      (method) => method.displayname === "Credit Card"
    );
    if (creditCardMethod && !selectedMethod) {
      setSelectedMethod(creditCardMethod);
      console.log(" Auto Selected method:", creditCardMethod);
    }
  }, [paymentMethods]);

  useEffect(() => {
    const fetchClientID = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("RegisterClint");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setClientID(parsedUserData.clientid);
          console.log("clientid is ", parsedUserData.clientid);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchClientID();
  }, []);

  const handleAddOrder = async () => {
    try {
      setLoading(true);

      const apiUrl = "https://billing.livesports99.com/includes/api.php";

      const paymentMethodMap = {
        "Credit Card": "stripe",
        "Bank Transfer": "banktransfer",
        Cash: "cash",
        PayPal: "paypalcheckout",
        "By Cheque": "cheque",
        JazzCash: "jazzcashgateway",
      };

      const selectedGateway = paymentMethodMap[selectedMethod.displayname];

      // Map packageCart and domainSearchCart
      const pid = packageCart.map((item) => item.pid);
      console.log("pid:", pid);
      const domains = domainSearchCart.map((domain) => domain.domainName);
      console.log("domainName:", domains);
      const addonIds = packageCart.flatMap((item) =>
        item.addons.map((addon) => addon.id)
      );
      console.log("addonIds:", addonIds);

      const requestData = {
        action: "AddOrder",
        username: "NgDtOIwKao8DoPNeNXa9dUBpthIWHBSZ",
        password: "FbRxCwNDGPVKOMrW5QRGruCCZrXtV8Yg",
        clientid: clientid,
        paymentmethod: selectedGateway,
        pid: pid,
        domain: domains,
        addons: addonIds,
        responsetype: "json",
      };

      const response = await axios.post(apiUrl, null, {
        params: requestData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("AddOrder API Response:", response.data);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    console.log("Selected method:", method);
  };

  const renderPaymentMethodRows = () => {
    const rows = [];
    for (let i = 0; i < paymentMethods.length; i += 2) {
      const firstMethod = paymentMethods[i];
      const secondMethod = paymentMethods[i + 1];
      rows.push(
        <View key={i} style={styles.rowContainer}>
          <PaymentMethodItem
            method={firstMethod}
            handleSelectMethod={handleSelectMethod}
            selectedMethod={selectedMethod}
          />
          {secondMethod && (
            <PaymentMethodItem
              method={secondMethod}
              handleSelectMethod={handleSelectMethod}
              selectedMethod={selectedMethod}
            />
          )}
        </View>
      );
    }
    return rows;
  };

  return isLoading ? (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#005880" />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.header}> Select Payment Methods:</Text>
      {renderPaymentMethodRows()}
      {selectedMethod && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>
            Selected Payment Method: {selectedMethod.displayname}
          </Text>
        </View>
      )}
      <TouchableOpacity style={styles.Button} onPress={handleAddOrder}>
        <Text style={styles.ButtonText}>Add Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const PaymentMethodItem = ({ method, handleSelectMethod, selectedMethod }) => {
  const isSelected = selectedMethod === method;

  return (
    <TouchableOpacity
      style={[
        styles.methodContainer,
        isSelected ? styles.selectedMethod : null,
      ]}
      onPress={() => handleSelectMethod(method)}
    >
      <View style={styles.checkbox}>
        {isSelected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </View>
      <Text style={styles.methodText}>{method.displayname}</Text>
      {isSelected && <View style={styles.dotContainer}></View>}
    </TouchableOpacity>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingLeft: 20,
  },
  methodContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "50%",
    alignSelf: "center",
  },
  selectedContainer: {
    marginTop: 30,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#005880",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#005880",
    backgroundColor: "#fff",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#005880",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "#fff",
    fontSize: 12,
  },
  methodText: {
    fontSize: 16,
    marginLeft: 10,
  },
  dotContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
  },
  Button: {
    width: wp(85),
    backgroundColor: "#005880",
    borderRadius: 6,
    padding: 15,
    marginTop: hp(20),
    marginBottom: 30,
  },
  ButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
