import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("PKR");
  const packageCartItemCount = useSelector(
    (state) => state.packageCart.packageCart.length
  );
  const domainSearchCartItemCount = useSelector(
    (state) => state.domainSearchCart.domainSearchCart.length
  );

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const selectCurrency = (currency) => {
    setSelectedCurrency(currency);
    toggleOptions();
  };

  const closeModal = () => {
    setShowOptions(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#414042" }}>
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.leftContent}>
            <TouchableOpacity onPress={toggleOptions}>
              <Entypo name="globe" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.text} onPress={toggleOptions}>
              {selectedCurrency}
            </Text>
            <TouchableOpacity onPress={toggleOptions}>
              <FontAwesome name="caret-down" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="none"
            transparent={true}
            visible={showOptions}
            onRequestClose={toggleOptions}
          >
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={{ flex: 1 }}>
                <View style={styles.modalView}>
                  <TouchableOpacity onPress={() => selectCurrency("PKR")}>
                    <View style={{ paddingTop: 30 }}>
                      <View style={styles.optionItem}>
                        <Image
                          source={require("../assets/pkr.png")}
                          style={{ resizeMode: "cover" }}
                        />
                        <Text style={styles.optionText}>PKR (Rs)</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.divider}></View>
                  <TouchableOpacity onPress={() => selectCurrency("USD")}>
                    <View style={{ paddingTop: 10 }}>
                      <View style={styles.optionItem}>
                        <Image
                          source={require("../assets/usd.png")}
                          style={{ resizeMode: "cover" }}
                        />
                        <Text style={styles.optionText}>USD ($)</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.divider}></View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        <View style={styles.right}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              fontSize: 16,
              fontFamily: "OpenSans-Regular",
              paddingRight: 13,
            }}
          >
            +923214776995
          </Text>
          <TouchableOpacity>
            <FontAwesome name="shopping-cart" size={24} color="#fff" />
            {packageCartItemCount + domainSearchCartItemCount > 0 && (
              <View style={styles.cartCount}>
                <Text style={styles.cartCountText}>
                  {packageCartItemCount + domainSearchCartItemCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 14,
    backgroundColor: "#414042",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginHorizontal: 5,
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    fontFamily: "OpenSans-Regular",
  },

  modalView: {
    backgroundColor: "#f9f9f9",
    position: "absolute",
    top: 54,
    left: 20,
    width: wp(45),
    height: hp(19),
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  optionText: {
    color: "#000000",
    fontSize: 16,
    marginLeft: 15,
    fontWeight: "600",
    fontFamily: "OpenSans-Regular",
  },
  divider: {
    height: 1,
    backgroundColor: "#e1e1e1",
    marginVertical: 15,
  },
  cartCount: {
    position: "absolute",
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    right: -5,
    top: -5,
  },
  cartCountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
