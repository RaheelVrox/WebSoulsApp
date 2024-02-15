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
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MenuHeader from "../../Component/MenuHeader";
import { useDispatch, useSelector } from "react-redux";

const SearchDomain = ({ route }) => {
  const { datadomain } = route.params || {};
  const navigation = useNavigation();
  const { domainSearchCart } = useSelector((state) => state.domainSearchCart);
  const [domain, setDomain] = useState(datadomain || "");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("domainSearchCart : ", domainSearchCart);

  useEffect(() => {
    if (domain) {
      searchDomain();
    }
  }, [domain]);

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
              Find the perfect domain name …
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
              defaultValue={datadomain}
              placeholder="Search your domain here..."
              placeholderTextColor="#a0a0a0"
              onChangeText={(text) => setDomain(text)}
            />
            <TouchableOpacity onPress={searchDomain}>
              <View style={styles.searchButton}>
                <FontAwesome name="search" size={25} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 30 }}>
            {loading ? (
              <ActivityIndicator
                size={50}
                color="#0175a3"
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : response && response.available === 5 ? (
              <Text style={styles.errorText}>
                Please search valid domain name/tld.
              </Text>
            ) : response && response.available === 2 ? (
              <Text style={styles.errorText}>
                Sorry domain must have valid TLD
              </Text>
            ) : (
              <>
                {response && response.available === 1 ? (
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
                ) : (
                  <Text
                    style={{
                      color: "#414042",
                      fontFamily: "OpenSans-Regular",
                      fontWeight: "700",
                      marginHorizontal: 22,
                      fontSize: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        color: "red",
                        fontFamily: "OpenSans-Regular",
                      }}
                    >
                      Oops! Looks like
                    </Text>{" "}
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        fontFamily: "OpenSans-Regular",
                        fontSize: 16,
                      }}
                    >
                      "{domain}"
                    </Text>{" "}
                    <Text style={{ fontWeight: "700", color: "#414042" }}>
                      is already registered.
                    </Text>
                  </Text>
                )}
                <Text
                  style={{
                    color: "#414042",
                    fontSize: 16,
                    fontFamily: "OpenSans-Regular",
                    fontWeight: "bold",
                    paddingTop: 40,
                    paddingHorizontal: 20,
                  }}
                >
                  MORE SUGGESTION
                </Text>

                {/* Render suggestions */}
                <View style={styles.suggestionContainer}>
                  {response &&
                    response.suggestions &&
                    response.suggestions.map((suggestion, index) => (
                      <View key={index}>
                        <View style={styles.suggestionItem}>
                          <Text style={styles.suggestionText}>
                            {suggestion.domainName}
                          </Text>
                          {suggestion.prices &&
                            suggestion.prices.length > 0 && (
                              <Text style={styles.priceText}>
                                Rs {suggestion.prices[0].annually}
                              </Text>
                            )}
                          <TouchableOpacity
                            onPress={() =>
                              addToCart(
                                suggestion.domainName,
                                suggestion.prices[0].annually
                              )
                            }
                          >
                            <FontAwesome
                              name="cart-plus"
                              size={24}
                              color="#005880"
                            />
                          </TouchableOpacity>
                        </View>
                        {index < response.suggestions.length - 1 && (
                          <View style={styles.divider} />
                        )}
                      </View>
                    ))}
                </View>

                <TouchableOpacity
                  style={{ marginHorizontal: 20, width: "28%" }}
                >
                  <View style={styles.getbutton}>
                    <Text style={styles.buttonText}>Get Domain</Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={29}
                      color="#fff"
                      style={{ marginLeft: 10 }}
                    />
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SearchDomain;

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
