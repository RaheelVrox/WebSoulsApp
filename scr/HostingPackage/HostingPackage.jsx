import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import MenuHeader from "../../Component/MenuHeader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const HostingPackage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const { packageCart } = useSelector((state) => state.packageCart);
  console.log("packageCart : ", packageCart);
  const [error, setError] = useState("");

  const Corporate = async () => {
    try {
      const url = `https://backend.websouls.com/api/currencies/dump_test?p_id=184,107,324,280`;
      const response = await axios.get(url);
      setResponse(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      if (error.response && error.response.status === 502) {
        setError("Please search valid domain name/tld.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    Corporate();
  }, []);

  const fetchActivePromotions = async () => {
    try {
      const url = `https://backend.websouls.com/api/currencies/getActivePromotions`;
      const response = await axios.get(url);
      setDiscounts(response.data);
    } catch (error) {
      console.error("Error fetching active promotions: ", error);
    }
  };
  useEffect(() => {
    fetchActivePromotions();
  }, []);

  const dispatch = useDispatch();
  const addToCart = (pid, price, name) => {
    const discount = discounts.find((discount) =>
      discount.appliesto.includes(pid)
    );

    const finalPrice = discount ? price * (1 - discount.value / 100) : price;
    dispatch({
      type: "packageCart",
      payload: {
        pid,
        price: finalPrice,
        name,
        discount: discount ? discount.value : 0,
        freeDomain: [],
        addons: [],
      },
    });
    navigation.navigate("Cart");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#005880" />
          </View>
        ) : (
          <View style={styles.container}>
            <MenuHeader />
            <View style={styles.dividerr}></View>
            <View style={{ paddingTop: wp(8), marginBottom: 25 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#046289",
                  fontWeight: "700",
                  fontSize: 20,
                  fontFamily: "OpenSans-Regular",
                }}
              >
                Keeping You Up and Running
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: "#4d4e4f",
                  fontWeight: "600",
                  fontSize: 17,
                  fontFamily: "OpenSans-Regular",
                }}
              >
                Secure, Reliable, and Blazing-Fast
              </Text>
            </View>

            {response.map((item) => (
              <View
                key={item.id}
                style={{
                  backgroundColor: "#f8f8f8",
                  padding: 20,
                  marginHorizontal: 15,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#4d4e4f",
                    fontWeight: "bold",
                    fontSize: 20,
                    marginBottom: 5,
                    fontFamily: "OpenSans-Regular",
                    textTransform: "uppercase",
                  }}
                >
                  {item.name.toUpperCase()}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#4d4e4f",
                    fontWeight: "600",
                    fontSize: 17,
                    fontFamily: "OpenSans-Regular",
                  }}
                >
                  {item.fname}
                </Text>
                <View
                  style={{
                    backgroundColor: "#005880",
                    padding: 15,
                    marginTop: 15,
                  }}
                >
                  {!discounts.some((discount) =>
                    discount.appliesto.includes(item.pid)
                  ) && (
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        color: "#fff",
                        fontWeight: "bold",
                        fontFamily: "OpenSans-Regular",
                        marginBottom: 5,
                      }}
                    >
                      Normal Price: {item.currency[0].annually}/Yr
                      <Text style={{ color: "red" }}>*</Text>
                    </Text>
                  )}
                  {discounts
                    .filter((discount) => discount.appliesto.includes(item.pid))
                    .map((discount) => {
                      // Calculate discounted price
                      const discountedPrice =
                        item.currency[0].annually * (1 - discount.value / 100);
                      return (
                        <View key={discount.id}>
                          <Text
                            style={{
                              fontSize: 18,
                              textAlign: "center",
                              color: "#fff",
                              fontWeight: "bold",
                              fontFamily: "OpenSans-Regular",
                              marginBottom: 5,
                              textDecorationLine: "line-through",
                            }}
                          >
                            Normal Price:{item.currency[0].annually}/Yr
                          </Text>
                          <Text
                            style={{
                              fontSize: 22,
                              textAlign: "center",
                              color: "#fff",
                              fontWeight: "bold",
                              fontFamily: "OpenSans-Regular",
                              marginBottom: 5,
                            }}
                          >
                            Rs{discountedPrice.toFixed(0)}/Yr
                            <Text style={{ color: "red" }}>*</Text>
                          </Text>
                        </View>
                      );
                    })}
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      color: "#fff",
                      fontWeight: "700",
                      fontFamily: "OpenSans-Regular",
                    }}
                  >
                    Rs{item.currency[0].annually}/Yr when you renew
                  </Text>
                  {discounts.some((discount) =>
                    discount.appliesto.includes(item.pid)
                  ) && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                        backgroundColor: "#004e71",
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 16,
                          fontFamily: "OpenSans-Regular",
                        }}
                      >
                        On Sale - {""}
                      </Text>
                      {discounts
                        .filter((discount) =>
                          discount.appliesto.includes(item.pid)
                        )
                        .map((discount) => {
                          if (discount.value > 0) {
                            return (
                              <View
                                key={discount.id}
                                style={{
                                  borderRadius: 5,
                                  backgroundColor: "#6fce32",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: hp(3.2),
                                  width: wp(22),
                                  marginBottom: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#fff",
                                    fontWeight: "700",
                                    fontSize: 16,
                                    fontFamily: "OpenSans-Regular",
                                  }}
                                >
                                  Save {discount.value}%
                                </Text>
                              </View>
                            );
                          }
                        })}
                    </View>
                  )}
                </View>
                <View style={{ marginTop: 25 }}>
                  {item.packageFeatures[0].features.map((feature, index) => {
                    // Use regular expression to match the "Resource Allocated" part
                    const match = feature.match(/^(.*?)_/);
                    // Extract the matched part or use the whole feature if not matche
                    const resourceAllocated = match ? match[1] : feature;
                    return (
                      <View key={index}>
                        <Text style={styles.packagestext}>
                          {resourceAllocated}
                        </Text>
                        <View style={styles.dividerr}></View>
                      </View>
                    );
                  })}
                </View>
                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={
                    () =>
                      addToCart(item.pid, item.currency[0].annually, item.name) // Pass the name here
                  }
                >
                  <View style={styles.startbutton}>
                    <Text style={styles.buttonText}>Order Now</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  dividerr: {
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
    marginTop: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
  },
  strikeThrough: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontFamily: "OpenSans-Regular",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    marginBottom: 5,
  },
  packagestext: {
    color: "#4d4e4f",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    textAlign: "center",
    alignSelf: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  startbutton: {
    borderRadius: 5,
    backgroundColor: "#6fce32",
    justifyContent: "center",
    alignItems: "center",
    height: hp(6),
    width: wp(39),
    marginTop: 20,
  },
  ArrowsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp(35),
  },
});

export default HostingPackage;
