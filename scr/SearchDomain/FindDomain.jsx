import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import MenuHeader from "../../Component/MenuHeader";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FindDomain = () => {
  const navigation = useNavigation();
  const [datadomain, setDomain] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Popular");
  const [popularDomains, setPopularDomains] = useState(null);
  const [tldDomains, setTldDomains] = useState(null);
  const [otherDomains, setOtherDomains] = useState(null);
  const [selectedTLD, setSelectedTLD] = useState(null);

  const toggleTLDVisibility = (tld) => {
    setSelectedTLD(selectedTLD === tld ? null : tld);
  };
  const handleTLDPress = (index) => {
    setSelectedTLD(selectedTLD === index ? null : index);
  };
  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  const handleSearch = () => {
    console.log("search domain:", datadomain);
    if (!datadomain.trim()) {
      Alert.alert("Validation", "Please enter a perfect domain name.");
    } else {
      navigation.navigate("SearchDomain", { datadomain: datadomain });
    }
  };

  // searchDomain
  const searchDomain = async () => {
    setLoading(true);
    try {
      const url = `https://backend.websouls.com/api/currencies/getSpotlightTldswithPrice`;
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
    searchDomain();
  }, []);

  // PopularDomain
  const popularDomain = async () => {
    setLoading(true);
    try {
      const url = `https://backend.websouls.com/api/currencies/tldPricenew?tld[]=com&tld[]=net&tld[]=org&tld[]=info&tld[]=us&tld[]=biz&tld[]=pk&tld[]=com.pk&tld[]=edu.pk&tld[]=uk&tld[]=co.uk&tld[]=com.au&tld[]=ca&tld[]=online&tld[]=ae&tld[]=co&typ=domainregister`;
      const response = await axios.post(url);
      setPopularDomains(response.data);
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
    popularDomain();
  }, []);
  // ccTldDomain
  const fetchCcTLDDomains = async () => {
    setLoading(true);
    try {
      const url = `https://backend.websouls.com/api/currencies/tldPricenew?tld[]=pk&tld[]=com.pk&tld[]=edu.pk&tld[]=net.pk&tld[]=org.pk&tld[]=uk&tld[]=co.uk&tld[]=com.au&tld[]=ca&tld[]=ae&tld[]=de&tld[]=in&tld[]=org.ae&tld[]=co.ae&typ=domainregister`;
      const response = await axios.post(url);
      setTldDomains(response.data);
    } catch (error) {
      console.error("Error fetching ccTLD data: ", error);
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
    if (activeTab === "ccTLD") {
      fetchCcTLDDomains();
    }
  }, [activeTab]);
  // otherDomain
  const fetchOtherDomains = async () => {
    setLoading(true);
    try {
      const url = `https://backend.websouls.com/api/currencies/alltlds?page=0&limit=20&typ=domainregister`;
      const response = await axios.post(url);
      setOtherDomains(response.data);
    } catch (error) {
      console.error("Error fetching ccTLD data: ", error);
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
    if (activeTab === "Other") {
      fetchOtherDomains();
    }
  }, [activeTab]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={styles.container}>
            <MenuHeader />
            <View style={styles.domainsearch}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontFamily: "OpenSans-Regular",
                  fontSize: 20,
                  fontWeight: "700",
                  paddingTop: 10,
                  marginBottom: 30,
                }}
              >
                Explore Affordable Domain Pricing
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontFamily: "OpenSans-Regular",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Find and Claim the Perfect Domain Name at Unbeatable Pricing!
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 30,
                  marginBottom: 30,
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Find your perfect domain name..."
                  placeholderTextColor="#a0a0a0"
                  onChangeText={(text) => {
                    setDomain(text);
                  }}
                />
                <TouchableOpacity onPress={handleSearch}>
                  <View style={styles.searchButton}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#504e4f",
                        fontFamily: "OpenSans-Regular",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      Search
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {loading ? (
              <ActivityIndicator
                size={50}
                color="#0175a3"
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  marginTop: 30,
                }}
              />
            ) : (
              <>
                <View style={{ paddingTop: 60 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#005a7e",
                      fontFamily: "OpenSans-Regular",
                      fontSize: 20,
                      fontWeight: "700",
                      marginBottom: 10,
                    }}
                  >
                    Domain Extensions that Stand Out
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#434343",
                      fontFamily: "OpenSans-Regular",
                      fontSize: 17,
                      fontWeight: "600",
                      marginHorizontal: 20,
                    }}
                  >
                    Domain TLDs That Can Become Your Brandable Web Identity
                  </Text>
                </View>
                <View style={styles.divider}></View>
                <>
                  {response &&
                    response.map((item, index) => (
                      <View key={index} style={{ paddingTop: 40 }}>
                        <TouchableOpacity onPress={() => handleTLDPress(index)}>
                          <View style={styles.tldPriceContainer}>
                            {selectedTLD !== index && (
                              <>
                                <Text
                                  style={{
                                    textAlign: "center",
                                    color: "#434343",
                                    fontFamily: "OpenSans-Regular",
                                    fontSize: 20,
                                    fontWeight: "700",
                                    marginBottom: 10,
                                    padding: 30,
                                  }}
                                >
                                  .{item.name}
                                </Text>
                                <View
                                  style={{
                                    backgroundColor: "#005a7e",
                                    padding: 15,
                                  }}
                                >
                                  <Text
                                    style={{
                                      textAlign: "center",
                                      color: "#fff",
                                      fontFamily: "OpenSans-Regular",
                                      fontSize: 20,
                                      fontWeight: "700",
                                    }}
                                  >
                                    {item.name && item.name.endsWith("pk")
                                      ? `Rs${item.curency[0].biennially}/2yrs`
                                      : `Rs${item.curency[0].annually}/yr`}
                                  </Text>
                                </View>
                              </>
                            )}
                            {selectedTLD === index && (
                              <TouchableOpacity
                                style={{
                                  backgroundColor: "#6fcd32",
                                  borderRadius: 5,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  alignSelf: "center",
                                  textAlign: "center",
                                  height: hp(6),
                                  width: wp(39),
                                  margin: 42,
                                }}
                              >
                                <Text
                                  style={{
                                    textAlign: "center",
                                    color: "#fff",
                                    fontFamily: "OpenSans-Regular",
                                    fontSize: 18,
                                    fontWeight: "700",
                                  }}
                                >
                                  Register
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </TouchableOpacity>
                      </View>
                    ))}
                </>
                <View style={{ paddingTop: 60 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#005a7e",
                      fontFamily: "OpenSans-Regular",
                      fontSize: 20,
                      fontWeight: "700",
                      marginBottom: 10,
                    }}
                  >
                    We’ve Got More!
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#434343",
                      fontFamily: "OpenSans-Regular",
                      fontSize: 17,
                      fontWeight: "600",
                      marginHorizontal: 20,
                    }}
                  >
                    Bringing you Domain Extensions That Can Tell Your Story
                  </Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.tabBar}>
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === "Popular" && styles.activeTab,
                    ]}
                    onPress={() => handleTabPress("Popular")}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === "Popular" && styles.selectedTabText,
                      ]}
                    >
                      Popular
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === "ccTLD" && styles.activeTab,
                    ]}
                    onPress={() => handleTabPress("ccTLD")}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === "ccTLD" && styles.selectedTabText,
                      ]}
                    >
                      ccTLD
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === "Other" && styles.activeTab,
                    ]}
                    onPress={() => handleTabPress("Other")}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === "Other" && styles.selectedTabText,
                      ]}
                    >
                      Other
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginBottom: 35 }}>
                  {activeTab === "Popular" &&
                    popularDomains &&
                    popularDomains.map((item, index) => (
                      <View key={index} style={{ paddingTop: 40 }}>
                        <View>
                          <View style={styles.dividerr}></View>
                          <TouchableWithoutFeedback
                            onPress={() => toggleTLDVisibility(item.name)}
                          >
                            <View>
                              {selectedTLD !== item.name ? (
                                <>
                                  <Text
                                    style={{
                                      textAlign: "center",
                                      color: "#005a7e",
                                      fontFamily: "OpenSans-Regular",
                                      fontSize: 20,
                                      fontWeight: "700",
                                      marginBottom: 10,
                                    }}
                                  >
                                    .{item.name}
                                  </Text>
                                  <Text
                                    style={{
                                      textAlign: "center",
                                      color: "#414042",
                                      fontFamily: "OpenSans-Regular",
                                      fontSize: 20,
                                      fontWeight: "700",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#414042",
                                        fontSize: 18,
                                        fontWeight: "600",
                                        fontFamily: "OpenSans-Regular",
                                      }}
                                    >
                                      Rs
                                    </Text>
                                    {item.name && item.name.endsWith("pk")
                                      ? `${item.curency[0].biennially}/2yrs`
                                      : `${item.curency[0].annually}/yr`}
                                    <Text
                                      style={{
                                        color: "red",
                                        fontSize: 20,
                                        fontWeight: "700",
                                        fontFamily: "OpenSans-Regular",
                                      }}
                                    >
                                      *
                                    </Text>
                                  </Text>
                                </>
                              ) : (
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: "#6fcd32",
                                    borderRadius: 5,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignSelf: "center",
                                    textAlign: "center",
                                    height: hp(6),
                                    width: wp(39),
                                  }}
                                >
                                  <Text
                                    style={{
                                      textAlign: "center",
                                      color: "#fff",
                                      fontFamily: "OpenSans-Regular",
                                      fontSize: 18,
                                      fontWeight: "700",
                                    }}
                                  >
                                    Register
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                    ))}

                  {activeTab === "ccTLD" &&
                    tldDomains &&
                    tldDomains.map((item, index) => (
                      <View key={index} style={{ paddingTop: 40 }}>
                        <View style={styles.dividerr}></View>
                        <TouchableWithoutFeedback
                          onPress={() => toggleTLDVisibility(item.name)}
                        >
                          <View>
                            {selectedTLD !== item.name ? (
                              <>
                                <Text
                                  style={{
                                    textAlign: "center",
                                    color: "#005a7e",
                                    fontFamily: "OpenSans-Regular",
                                    fontSize: 20,
                                    fontWeight: "700",
                                    marginBottom: 10,
                                  }}
                                >
                                  .{item.name}
                                </Text>
                                <Text
                                  style={{
                                    textAlign: "center",
                                    color: "#414042",
                                    fontFamily: "OpenSans-Regular",
                                    fontSize: 20,
                                    fontWeight: "700",
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#414042",
                                      fontSize: 18,
                                      fontWeight: "600",
                                      fontFamily: "OpenSans-Regular",
                                    }}
                                  >
                                    Rs
                                  </Text>
                                  {item.name && item.name.endsWith("pk")
                                    ? `${item.curency[0].biennially}/2yrs`
                                    : `${item.curency[0].annually}/yr`}
                                  <Text
                                    style={{
                                      color: "red",
                                      fontSize: 20,
                                      fontWeight: "700",
                                      fontFamily: "OpenSans-Regular",
                                    }}
                                  >
                                    *
                                  </Text>
                                </Text>
                              </>
                            ) : (
                              <TouchableOpacity
                                style={{
                                  backgroundColor: "#6fcd32",
                                  borderRadius: 5,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  alignSelf: "center",
                                  textAlign: "center",
                                  height: hp(6),
                                  width: wp(39),
                                }}
                              >
                                <Text
                                  style={{
                                    textAlign: "center",
                                    color: "#fff",
                                    fontFamily: "OpenSans-Regular",
                                    fontSize: 18,
                                    fontWeight: "700",
                                  }}
                                >
                                  Register
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    ))}

                  {activeTab === "Other" &&
                    otherDomains &&
                    otherDomains.map((item, index) => (
                      <View key={index} style={{ paddingTop: 40 }}>
                        <View style={styles.dividerr}></View>
                        <TouchableWithoutFeedback
                          onPress={() => toggleTLDVisibility(item.name)}
                        >
                          <View>
                            {selectedTLD !== item.name ? (
                              <>
                                <Text
                                  style={{
                                    textAlign: "center",
                                    color: "#005a7e",
                                    fontFamily: "OpenSans-Regular",
                                    fontSize: 20,
                                    fontWeight: "700",
                                    marginBottom: 10,
                                  }}
                                >
                                  .{item.name}
                                </Text>
                                <Text
                                  style={{
                                    textAlign: "center",
                                    color: "#414042",
                                    fontFamily: "OpenSans-Regular",
                                    fontSize: 20,
                                    fontWeight: "700",
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#414042",
                                      fontSize: 18,
                                      fontWeight: "600",
                                      fontFamily: "OpenSans-Regular",
                                    }}
                                  >
                                    Rs
                                  </Text>
                                  {item.name && item.name.endsWith("pk")
                                    ? `${item.curency[0].biennially}/2yrs`
                                    : `${item.curency[0].annually}/yr`}
                                  <Text
                                    style={{
                                      color: "red",
                                      fontSize: 20,
                                      fontWeight: "700",
                                      fontFamily: "OpenSans-Regular",
                                    }}
                                  >
                                    *
                                  </Text>
                                </Text>
                              </>
                            ) : (
                              <TouchableOpacity
                                style={{
                                  backgroundColor: "#6fcd32",
                                  borderRadius: 5,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  alignSelf: "center",
                                  textAlign: "center",
                                  height: hp(6),
                                  width: wp(39),
                                }}
                              >
                                <Text
                                  style={{
                                    textAlign: "center",
                                    color: "#fff",
                                    fontFamily: "OpenSans-Regular",
                                    fontSize: 18,
                                    fontWeight: "700",
                                  }}
                                >
                                  Register
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </TouchableWithoutFeedback>
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

export default FindDomain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  domainsearch: {
    backgroundColor: "#317797",
    padding: 20,
    borderTopWidth: 1,
    marginTop: 15,
  },
  input: {
    height: hp(7),
    borderColor: "#fff",
    borderWidth: 1,
    paddingLeft: 18,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    fontWeight: "600",
    color: "#a0a0a0",
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  searchButton: {
    backgroundColor: "#6fce32",
    width: wp(25),
    borderColor: "#000000",
    borderWidth: 1,
    height: hp(7.1),
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  divider: {
    height: 2,
    backgroundColor: "#4d4e4f",
    marginTop: 30,
    marginHorizontal: wp(38),
  },
  tldPriceContainer: {
    borderColor: "#e0e0e0",
    borderWidth: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginHorizontal: 20,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#ededed",
    marginRight: wp(25),
    marginLeft: 20,
    marginTop: 33,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  activeTab: {
    backgroundColor: "#049bd8",
  },
  tabText: {
    color: "#414042",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "OpenSans-Regular",
  },
  selectedTabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "OpenSans-Regular",
  },
  dividerr: {
    height: 1,
    backgroundColor: "#ededed",
    marginBottom: 30,
  },
  
});