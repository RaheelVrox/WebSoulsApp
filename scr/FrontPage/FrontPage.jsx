import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MenuHeader from "../../Component/MenuHeader";

const FrontPage = () => {
  const navigation = useNavigation();
  const [datadomain, setDomain] = useState("");
  const handleSearch = () => {
    console.log("search domain:", datadomain);
    if (!datadomain.trim()) {
      Alert.alert("Validation", "Please enter a perfect domain name.");
    } else {
      navigation.navigate("SearchDomain", { datadomain: datadomain });
    }
  };

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
                  height: hp(6.5),
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
          <View
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
                fontFamily: "OpenSans-Regular",
              }}
            >
              CORPORATE
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
              MAXIMIZED
            </Text>
            <View
              style={{
                backgroundColor: "#005880",
                padding: 15,
                marginTop: 15,
              }}
            >
              <Text style={styles.strikeThrough}>Normal Price: 33232.52</Text>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "bold",
                  fontFamily: "OpenSans-Regular",
                  marginBottom: 5,
                }}
              >
                Rs21601/Yr<Text style={{ color: "red" }}>*</Text>
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "700",
                  fontFamily: "OpenSans-Regular",
                }}
              >
                Rs33232.52/Yr when you renew
              </Text>
              <View
                style={{
                  backgroundColor: "#004e71",
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: "#fff",
                    fontWeight: "700",
                    fontFamily: "OpenSans-Regular",
                  }}
                >
                  On Sale - {""}
                </Text>
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#6fce32",
                    justifyContent: "center",
                    alignItems: "center",
                    height: hp(3.5),
                    width: wp(25),
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
                    Save 30%
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.packagestext}>100GB SSD Disk Space </Text>
              <View style={styles.dividerr}></View>
              <View style={styles.rowContainer}>
                <Text style={styles.packagestext}>Resource Allocated</Text>
                <FontAwesome
                  name="info-circle"
                  size={18}
                  color="#005880"
                  style={{ marginLeft: 10 }}
                />
              </View>
              <View style={styles.dividerr}></View>
              <Text style={styles.packagestext}>
                Advanced Malware Scanning Included
              </Text>
              <View style={styles.dividerr}></View>
              <View style={styles.rowContainer}>
                <Text style={styles.packagestext}> FREE Domain Included </Text>
                <FontAwesome
                  name="info-circle"
                  size={18}
                  color="#005880"
                  style={{ marginLeft: 10 }}
                />
              </View>
              <View style={styles.dividerr}></View>
              <Text style={styles.packagestext}> Unlimited Bandwidth </Text>
              <View style={styles.dividerr}></View>
              <Text style={styles.packagestext}> Unlimited Email Accounts</Text>
              <View style={styles.dividerr}></View>
              <Text style={styles.packagestext}> Unlimited Databases </Text>
              <View style={styles.dividerr}></View>
              <Text style={styles.packagestext}>
                1 Click Install of Free Applications
              </Text>
              <View style={styles.dividerr}></View>
            </View>
            <TouchableOpacity style={{ alignSelf: "center" }}>
              <View style={styles.startbutton}>
                <Text style={styles.buttonText}>Get Started</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.ArrowsRow}>
            {/* <TouchableOpacity>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={32}
                color="black"
              />
            </TouchableOpacity>
            <View style={{ width: 40 }} />
            <TouchableOpacity>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={32}
                color="black"
              />
            </TouchableOpacity> */}
          </View>
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
    height: hp(6.5),
    width: wp(30),
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
    marginTop: 10,
  },
  startbutton: {
    borderRadius: 5,
    backgroundColor: "#6fce32",
    justifyContent: "center",
    alignItems: "center",
    height: hp(6.5),
    width: wp(38),
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
