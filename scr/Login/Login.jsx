import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password2, setPassword] = useState("");

  const handleEmailChange = (text) => {
    const trimmedEmail = text.trim();
    setEmail(trimmedEmail.toLowerCase());
  };
  const handleLogin = async () => {
    setIsLoading(true);

    const handleVerificationError = (errorMessage) => {
      console.error(errorMessage);
      Alert.alert("Validation Error", errorMessage);
    };
    try {
      if (!email) {
        handleVerificationError("Please enter your email.");
        return;
      }
      if (!password2) {
        handleVerificationError("Please enter your password.");
        return;
      }

      const apiUrl = "https://billing.livesports99.com/includes/api.php";
      const requestData = {
        action: "ValidateLogin",
        username: "NgDtOIwKao8DoPNeNXa9dUBpthIWHBSZ",
        password: "FbRxCwNDGPVKOMrW5QRGruCCZrXtV8Yg",
        email,
        password2,
        responsetype: "json",
      };

      const response = await axios.post(apiUrl, null, {
        params: requestData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("API Response:", response.data);

      if (response.data.result === "success") {
        navigation.navigate("GetOrders");
        const Clintlogin = response.data;
        if (Clintlogin) {
          console.log(" userdata:", Clintlogin);
          AsyncStorage.setItem("Clintlogin", JSON.stringify(Clintlogin));
        }
      } else {
        handleVerificationError("Email or Password Invalid. Please try again");
      }
    } catch (error) {
      console.error("Error:", error);
      handleVerificationError(
        "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView>
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
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#005880"
              style={{ marginTop: hp(48), marginBottom: 10 }}
            />
          ) : (
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>LogIn</Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              paddingTop: 15,
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
              Don’t have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserRegistration")}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#346AFE",
                }}
              >
                {" "}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: "#D0D0D0",
    width: wp(85),
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
    width: wp(85),
    fontSize: 16,
  },
  registerButton: {
    width: wp(85),
    backgroundColor: "#005880",
    borderRadius: 6,
    padding: 15,
    marginTop: hp(50),
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
