import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MenuHeader from "../../Component/MenuHeader";
import axios from "axios";

const FrontPage = () => {
  const navigation = useNavigation();
  const [datadomain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  const [error, setError] = useState("");
  const handleSearch = () => {
    console.log("search domain:", datadomain);
    if (!datadomain.trim()) {
      Alert.alert("Validation", "Please enter a perfect domain name.");
    } else {
      navigation.navigate("SearchDomain", { datadomain: datadomain });
    }
  };

  const Corporate = async () => {
    setLoading(true);
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
  //ActivePromotions
  const fetchActivePromotions = async () => {
    setLoading(true);
    try {
      const url = `https://backend.websouls.com/api/currencies/getActivePromotions`;
      const response = await axios.get(url);
      setDiscounts(response.data);
    } catch (error) {
      console.error("Error fetching active promotions: ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchActivePromotions();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MenuHeader />
          <ImageBackground
            source={require("../../assets/backimage.jpg")}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={{ margin: 20 }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "OpenSans-Regular",
                }}
              >
                Get a
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 30,
                  fontWeight: "700",
                  fontFamily: "OpenSans-Regular",
                }}
              >
                Hosting Plan
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "OpenSans-Regular",
                }}
              >
                That's Worth it
              </Text>
            </View>
            <TouchableOpacity style={{ width: "28%" }}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
              </View>
            </TouchableOpacity>
            <View style={{ margin: 20 }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "OpenSans-Regular",
                }}
              >
                Ideal
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 30,
                  fontWeight: "700",
                  fontFamily: "OpenSans-Regular",
                }}
              >
                Domain Name
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "OpenSans-Regular",
                }}
              >
                Means Ideal Traffic
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("FindDomain")}
              style={{ width: "28%" }}
            >
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor: "#6fce32",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  height: hp(6),
                  width: wp(45),
                  margin: 20,
                }}
              >
                <Text style={styles.buttonText}> Find Your Domain</Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
          <View
            style={{
              backgroundColor: "#F9F9F9",
              marginHorizontal: 35,
              padding: 18,
              width: wp(38),
              marginTop: 50,
            }}
          >
            <Text
              style={{
                color: "#4d4e4f",
                fontWeight: "600",
                fontSize: 15,
                fontFamily: "OpenSans-Regular",
              }}
            >
              Let's get started!
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#F9F9F9",
              padding: 20,
              marginHorizontal: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Search your domain here..."
              placeholderTextColor="#a0a0a0"
              onChangeText={(text) => {
                setDomain(text);
              }}
            />
            <TouchableOpacity onPress={handleSearch}>
              <View style={styles.searchButton}>
                <FontAwesome name="search" size={25} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: wp(25), marginBottom: 30 }}>
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
          <View style={styles.divider}></View>
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
                  // Extract the matched part or use the whole feature if not matched
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
              <TouchableOpacity style={{ alignSelf: "center" }}>
                <View style={styles.startbutton}>
                  <Text style={styles.buttonText}>Get Started</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.ArrowsRow}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FrontPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    borderTopWidth: 1,
    borderBottomWidth: 5,
    width: wp(180),
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
    backgroundColor: "#6fce32",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: hp(6),
    width: wp(39),
    margin: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
  },
  input: {
    height: hp(7),
    borderColor: "#383838",
    borderWidth: 1,
    paddingLeft: 18,
    fontSize: 19,
    fontFamily: "OpenSans-Regular",
    fontWeight: "600",
    color: "#a0a0a0",
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  searchButton: {
    backgroundColor: "#383838",
    padding: 15,
    borderColor: "#383838",
    borderWidth: 1.5,
    height: hp(7.1),
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  divider: {
    height: 2,
    backgroundColor: "#4d4e4f",
    margin: 20,
    marginHorizontal: wp(38),
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
  dividerr: {
    height: 1,
    backgroundColor: "#e1e1e1",
    marginBottom: 10,
    marginTop: 15,
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
});
