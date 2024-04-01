import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MenuHeader from "../../Component/MenuHeader";
import { useDispatch, useSelector } from "react-redux";

const PackageFree = () => {
  const navigation = useNavigation();
  const { domainSearchCart } = useSelector((state) => state.domainSearchCart);
  const [domain, setDomain] = useState();
  const [response, setResponse] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addedDomains, setAddedDomains] = useState([]);

  console.log("domainSearchCart : ", domainSearchCart);

  const searchDomain = async () => {
    if (!domain.trim()) {
      setError("Please enter a domain name.");
      return;
    }

    setLoading(true);
    try {
      const url = `https://backend.websouls.com/api/currencies/serachDomain?domain=${domain}&suggestedTlds=net,com&domianTyp=domainregister`;
      const response = await axios.post(url);
      // console.log("Response:", response.data);
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

  const dispatch = useDispatch();
  const addToCart = (domainName, price) => {
    dispatch({
      type: "domainSearchCart",
      payload: { domainName, price },
    });
    console.log("Item added to cart:", { domainName, price });
    setAddedDomains([...addedDomains, domainName]);
    navigation.navigate("Cart");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <MenuHeader />
          <View style={styles.divider}></View>
          <View style={{ paddingTop: 50 }}>
            <Text
              style={{
                color: "#414042",
                fontSize: 22,
                fontFamily: "OpenSans-Regular",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Find the perfect domain name…
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              marginHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 35,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Search your domain here..."
              placeholderTextColor="#a0a0a0"
              onChangeText={(text) => {
                const trimmedText = text.replace(/\. +/g, ".");
                const lowercaseText = trimmedText.replace(
                  /\.([A-Z])/g,
                  (match, p1) => `.${p1.toLowerCase()}`
                );
                setDomain(lowercaseText);
              }}
            />
            <TouchableOpacity onPress={searchDomain}>
              <View style={styles.searchButton}>
                <FontAwesome name="search" size={25} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          <View style={{ paddingTop: 30 }}>
            {error && <Text style={styles.errorText}>{error}</Text>}

            {!error && response && response.available !== 1 && (
              <Text style={styles.errorText}>
                <Text style={{ fontWeight: "700", color: "red" }}>
                  Oops! Looks like
                </Text>{" "}
                <Text
                  style={{ fontWeight: "bold", color: "red", fontSize: 16 }}
                >
                  "{domain}"
                </Text>{" "}
                <Text style={{ fontWeight: "700", color: "#414042" }}>
                  is already registered.
                </Text>
              </Text>
            )}

            {!error && response && response.available === 1 && (
              <Text
                style={{
                  color: "#414042",
                  fontSize: 15,
                  fontFamily: "OpenSans-Regular",
                  fontWeight: "700",
                  lineHeight: 28,
                  paddingLeft: 20,
                  paddingRight: 10,
                }}
              >
                <Text style={{ fontWeight: "700", color: "#414042" }}>
                  Congratulations! Your domain
                </Text>{" "}
                <Text
                  style={{
                    fontWeight: "600",
                    color: "#6fcd31",
                    fontSize: 16,
                  }}
                >
                  "{domain}"
                </Text>{" "}
                is available
              </Text>
            )}
            {!error && response && response.available === 1 && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  paddingTop: 15,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    color: "#414042",
                    fontSize: 16,
                    fontFamily: "OpenSans-Regular",
                  }}
                >
                  {domain}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    !addedDomains.includes(domain) &&
                    addToCart(domain, response.price[0].annually)
                  }
                >
                  <FontAwesome
                    name="cart-plus"
                    size={24}
                    color={
                      addedDomains.includes(domain) ? "#d3d3d3" : "#005880"
                    }
                  />
                </TouchableOpacity>
              </View>
            )}

            {!error && response && response.suggestions && (
              <>
                <Text
                  style={{
                    color: "#414042",
                    fontSize: 16,
                    fontFamily: "OpenSans-Regular",
                    fontWeight: "bold",
                    paddingTop: 20,
                    paddingHorizontal: 20,
                  }}
                >
                  MORE SUGGESTION
                </Text>
                <View style={styles.suggestionContainer}>
                  {response.suggestions.map((suggestion, index) => (
                    <View key={index}>
                      <View style={styles.suggestionItem}>
                        <Text style={styles.suggestionText}>
                          {suggestion.domainName}
                        </Text>
                        {suggestion.prices && suggestion.prices.length > 0 && (
                          <Text style={styles.priceText}>
                            Rs {suggestion.prices[0].annually}
                          </Text>
                        )}
                        <TouchableOpacity
                          onPress={() =>
                            !addedDomains.includes(suggestion.domainName) &&
                            addToCart(
                              suggestion.domainName,
                              suggestion.prices[0].annually
                            )
                          }
                        >
                          <FontAwesome
                            name="cart-plus"
                            size={24}
                            color={
                              addedDomains.includes(suggestion.domainName)
                                ? "#d3d3d3"
                                : "#005880"
                            }
                          />
                        </TouchableOpacity>
                      </View>
                      {index < response.suggestions.length - 1 && (
                        <View style={styles.divider} />
                      )}
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PackageFree;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  divider: {
    height: 1.5,
    backgroundColor: "#414042",
    marginVertical: 15,
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  getbutton: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#6fce32",
    justifyContent: "center",
    alignItems: "center",
    height: hp(6),
    width: wp(39),
    marginTop: 30,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    alignSelf: "center",
  },
  suggestionContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  suggestionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  suggestionText: {
    color: "#414042",
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    fontWeight: "600",
  },
  priceText: {
    color: "#414042",
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    fontWeight: "600",
    position: "absolute",
    alignSelf: "center",
    right: 55,
  },
  divider: {
    height: 1,
    backgroundColor: "#dcdcdc",
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    fontFamily: "OpenSans-Regular",
    fontSize: 15,
    fontWeight: "700",
    marginHorizontal: 22,
  },
});
