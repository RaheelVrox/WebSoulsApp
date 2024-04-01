import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  Feather,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const UserRegistration = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password2, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address1, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [clientIP, setClientIP] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (text) => {
    const trimmedEmail = text.trim();
    // Update the state with the trimmed email
    setEmail(trimmedEmail.toLowerCase());
  };
  const handleSignUp = async () => {
    if (
      !firstname ||
      !lastname ||
      !email ||
      !address1 ||
      !city ||
      !state ||
      !postcode ||
      !country ||
      !phonenumber ||
      !password2 ||
      !clientIP
    ) {
      Alert.alert("Validation Error", "Please enter all required details");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = "https://billing.livesports99.com/includes/api.php";
      const requestData = {
        action: "AddClient",
        username: "NgDtOIwKao8DoPNeNXa9dUBpthIWHBSZ",
        password: "FbRxCwNDGPVKOMrW5QRGruCCZrXtV8Yg",
        customfields: "YToxOntpOjM7czo2OiJHb29nbGUiO30=",
        email,
        password2,
        firstname,
        lastname,
        address1,
        postcode,
        country,
        phonenumber,
        clientIP,
        state,
        city,
        responsetype: "json",
      };

      const response = await axios.post(apiUrl, null, {
        params: requestData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (
        response.data.result === "error" &&
        response.data.message ===
          "A user already exists with that email address"
      ) {
        Alert.alert(
          "Registration Error",
          "A user already exists with that email address"
        );
      } else if (response.data.message === "Valid country required") {
        Alert.alert("Validation Error", "Valid country required");
      } else if (response.data.clientid && response.data.owner_id) {
        const userData = {
          clientid: response.data.clientid,
          owner_id: response.data.owner_id,
        };
        // Save user data to AsyncStorage
        await AsyncStorage.setItem("RegisterClint", JSON.stringify(userData));
        console.log("RegisterClintstore", userData);
        // Log client ID
        console.log("Client ID:", response.data.clientid);
        console.log("owner_id:", response.data.owner_id);

        // Navigate to the login screen
        navigation.navigate("PaymentMethod");
        console.log("Registration successful", requestData);
      } else {
        console.error("Registration failed with result:", response.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error API request:", error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                value={firstname}
                onChangeText={(text) => setFirstName(text)}
                style={styles.input}
                placeholder="First Name"
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                value={lastname}
                onChangeText={(text) => setLastName(text)}
                style={styles.input}
                placeholder="Last Name"
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="email"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                value={email}
                onChangeText={handleEmailChange}
                style={styles.input}
                placeholder="email"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
              />
            </View>
            <View style={styles.inputContainer}>
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                value={password2}
                onChangeText={(text) => setPassword(text.replace(/\s/g, ""))}
                style={styles.input}
                placeholder="Password"
              />
            </View>
            <View style={styles.inputContainer}>
              <Feather
                name="phone"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                value={phonenumber}
                onChangeText={(text) => setPhoneNumber(text)}
                style={styles.input}
                placeholder="Phone Number"
              />
            </View>
            <View style={styles.inputContainer}>
              <Entypo
                name="address"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                value={address1}
                onChangeText={(text) => setAddress(text)}
                style={styles.input}
                placeholder="Address"
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="home-city-outline"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                value={city}
                onChangeText={(text) => setCity(text)}
                style={styles.input}
                placeholder="City"
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="home-city-outline"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                value={state}
                onChangeText={(text) => setState(text)}
                style={styles.input}
                placeholder="State"
              />
            </View>
            <View style={styles.inputContainer}>
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                value={postcode}
                onChangeText={(text) => setPostcode(text)}
                style={styles.input}
                placeholder="Postcode"
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="home-city-outline"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                value={country}
                onChangeText={(text) => {
                  const cleanedText = text.trim();
                  if (cleanedText.toLowerCase() !== "enter") {
                    const capitalizedText = cleanedText.toUpperCase();
                    setCountry(capitalizedText);
                  }
                }}
                style={styles.input}
                placeholder="Country"
                autoCorrect={false}
                autoCompleteType="off"
                spellCheck={false}
                autoCapitalize="none"
                keyboardType="url"
              />
            </View>

            <View style={styles.inputContainer}>
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                value={clientIP}
                onChangeText={(text) => setClientIP(text)}
                style={styles.input}
                placeholder="Client IP"
              />
            </View>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color="#005880"
                style={{ marginTop: 40, marginBottom: 25 }}
              />
            ) : (
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleSignUp}
              >
                <Text style={styles.buttonText}>SignUp</Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 25,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#3D3D3D",
                }}
              >
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("PaymentMethod")}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#346AFE",
                  }}
                >
                  {" "}
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};
export default UserRegistration;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: "#D0D0D0",
    // width: wp(85),
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: wp(75),
    fontSize: 16,
  },
  registerButton: {
    width: wp(85),
    backgroundColor: "#005880",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    marginTop: 40,
    marginBottom: 15,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
