import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

// freeDomain
const GetPackageFreeDomains = async (pid) => {
  try {
    const url = `https://billing.websouls.com/adM_iN_Dir/custom/package_free_domains.php?pid=${pid}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching package free domains: ", error);
    throw error;
  }
};

const Cart = () => {
  const dispatch = useDispatch();
  const { packageCart } = useSelector((state) => state.packageCart);
  const { domainSearchCart } = useSelector((state) => state.domainSearchCart);
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [addAddone, setAddone] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const navigation = useNavigation();

  // Add Addones
  const showAddons = async () => {
    setLoading(true);
    try {
      const url = `https://billing.websouls.com/adM_iN_Dir/custom/package_addon_node_new.php?package_id=11,2,25,33`;
      const addAddone = await axios.get(url);
      setAddone(addAddone.data);
      if (addAddone.data.length > 0) {
        const firstAddon = addAddone.data[0];
        addToCartAddones(firstAddon.name, firstAddon.pricing[3].annually);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showAddons();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Clear package cart and domain search cart when navigating back
        dispatch({ type: "uppackageCart", payload: [] });
        dispatch({ type: "updomainSearchCart", payload: [] });
      };
    }, [dispatch])
  );

  //  remove a package from the packagecart
  const removePackage = (pid) => {
    const updatedPackageCart = packageCart.filter((item) => item.pid !== pid);
    dispatch({
      type: "uppackageCart",
      payload: updatedPackageCart,
    });
  };

  // remove an addon from the packageCart
  const removeAddon = (pid, addonIndex) => {
    const updatedPackageCart = packageCart.map((item) => {
      if (item.pid === pid) {
        const updatedAddons = item.addons.filter(
          (_, index) => index !== addonIndex
        );
        return { ...item, addons: updatedAddons };
      }
      return item;
    });

    dispatch({
      type: "uppackageCart",
      payload: updatedPackageCart,
    });

    // Remove the addon from the addedItems state
    const addonToRemove = packageCart.find((item) => item.pid === pid)?.addons[
      addonIndex
    ]?.name;
    setAddedItems(addedItems.filter((item) => item !== addonToRemove));
  };
  const addToCartAddones = (name, Priceing) => {
    const lastItemIndex = packageCart.length - 1;
    const lastItem = packageCart[lastItemIndex];
    const addon = { name: name, price: Priceing };
    // Check if lastItem exists before accessing addons
    if (lastItem && lastItem.addons) {
      // Check if the addon already exists in the packageCart
      const existingAddonIndex = lastItem.addons.findIndex(
        (item) => item.name === name
      );
      if (existingAddonIndex === -1) {
        const updatedLastItem = {
          ...lastItem,
          addons: [...lastItem.addons, addon],
        };
        const updatedPackageCart = packageCart.map((item, index) =>
          index === lastItemIndex ? updatedLastItem : item
        );
        setAddedItems([...addedItems, name]);

        dispatch({
          type: "addonespackagecart",
          payload: updatedPackageCart,
        });
      } else {
        console.log("Addon already exists in the packageCart.");
      }
    }
  };

  // console.log("Package Cart update adones:", JSON.stringify(packageCart, null, 2));

  // remove a domain from the domain search cart
  const removeDomain = (domainName) => {
    const updatedDomainSearchCart = domainSearchCart.filter(
      (item) => item.domainName !== domainName
    );
    dispatch({
      type: "updomainSearchCart",
      payload: updatedDomainSearchCart,
    });
  };
  useEffect(() => {
    console.log("Package Cart:", packageCart);
    console.log("Domain Search Cart:", domainSearchCart);
    const packageItem = packageCart.find((item) => item);
    if (packageItem) {
      const pid = packageItem.pid;
      // console.log("PID is:", pid);
      GetPackageFreeDomains(pid).then((response) => {
        setResponse(response);
      });
    }
    // Find domains in domainSearchCart
    const comDomains = domainSearchCart.filter((item) =>
      item.domainName.endsWith(".com")
    );
    // console.log("Find .com domains:", comDomains);
    if (packageCart && packageCart.length !== 0) {
      let lastIndex = packageCart.length - 1;
      GetPackageFreeDomains(packageCart[lastIndex].pid).then((response) => {
        // console.log("Response from GetPackageFreeDomains:", response);
        for (let i = 0; i < packageCart?.length; i++) {
          if (packageCart[i]?.freeDomain?.length === 0) {
            for (let k = 0; k < domainSearchCart?.length; k++) {
              const isSplit = domainSearchCart[k]?.domainName.split(".");
              let domainTLD = "";
              if (isSplit.length === 2) {
                domainTLD = "." + isSplit[1];
              } else {
                domainTLD = "." + isSplit[1] + "." + isSplit[2];
              }
              const segments = response[0].split(",");
              const isSecondStringInsideFirst = segments.some(
                (segment) =>
                  segment === domainTLD || segment.endsWith(`.${domainTLD}`)
              );
              console.log(isSecondStringInsideFirst);
              if (isSecondStringInsideFirst) {
                const domainObject = {
                  domainName: domainSearchCart[k].domainName,
                  price: domainSearchCart[k].price,
                };
                const updatedPackageCart = packageCart.map(
                  (cartItem, index) => {
                    if (index === i) {
                      return {
                        ...cartItem,
                        freeDomain: [...cartItem.freeDomain, domainObject],
                      };
                    }
                    return cartItem;
                  }
                );
                const updatedDomainSearchCart = [];
                for (let index = 0; index < domainSearchCart.length; index++) {
                  if (index !== k) {
                    updatedDomainSearchCart.push(domainSearchCart[index]);
                  }
                }
                dispatch({
                  type: "updomainSearchCart",
                  payload: updatedDomainSearchCart,
                });
                dispatch({
                  type: "uppackageCart",
                  payload: updatedPackageCart,
                });

                console.log(
                  "Updated Package Cart:",
                  JSON.stringify(updatedPackageCart)
                );
                console.log(
                  "Updated Domain Search Cart:",
                  updatedDomainSearchCart
                );
                break;
              }
            }
          }
        }
      });
    }
  }, [packageCart, domainSearchCart]);

  // Calculate subtotal
  const calculateSubtotal = () => {
    let subtotal = 0;
    packageCart.forEach((item) => {
      subtotal += parseInt(item.price);
      item.addons.forEach((addon) => {
        subtotal += parseInt(addon.price);
      });
    });
    domainSearchCart.forEach((domain) => {
      subtotal += parseInt(domain.price);
    });
    return subtotal;
  };
  //  calculate GST/VAT at 5%
  const calculateGSTVAT = (subtotal) => {
    const GSTVATPercentage = 5; // 5% GST/VAT
    const GSTVAT = (subtotal * GSTVATPercentage) / 100;
    return GSTVAT;
  };
  //  calculate total price including GST/VAT
  const calculateTotalPrice = () => {
    const subtotal = calculateSubtotal();
    const GSTVAT = calculateGSTVAT(subtotal);
    const totalPrice = subtotal + GSTVAT;
    return totalPrice;
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View>
          {packageCart.length > 0 && (
            <>
              <Text style={styles.Bundle}>Our Bundle Boosters</Text>
              {addAddone.map((item) => (
                <View
                  key={item.id}
                  style={{
                    backgroundColor: "#f8f8f8",
                    padding: 20,
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
                      color: "black",
                      fontWeight: "700",
                      fontSize: 15,
                      marginBottom: 5,
                      fontFamily: "OpenSans-Regular",
                    }}
                  >
                    {item.customAddonField}
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "400",
                      fontSize: 14,
                      marginBottom: 5,
                      fontFamily: "OpenSans-Regular",
                    }}
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: "center",
                      color: "black",
                      fontWeight: "bold",
                      fontFamily: "OpenSans-Regular",
                    }}
                  >
                    {item.pricing[3].annually}/Yr
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.startbutton,
                      {
                        backgroundColor: addedItems.includes(item.name)
                          ? "#d3d3d3"
                          : "#005880",
                      },
                    ]}
                    onPress={() =>
                      addToCartAddones(item.name, item.pricing[3].annually)
                    }
                    disabled={addedItems.includes(item.name)}
                  >
                    <Text style={styles.buttonText}>Add to cart</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </View>
        <Text style={styles.header}>Order Summary</Text>
        {packageCart.map((item) => (
          <View key={item.pid} style={styles.cartItem}>
            <View style={styles.itemContainer}>
              <View style={styles.itemNamePrice}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    fontFamily: "OpenSans-Regular",
                  }}
                >
                  {item.name.toUpperCase()}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    fontFamily: "OpenSans-Regular",
                  }}
                >
                  Rs: {parseInt(item.price)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text> Business Hosting</Text>
              {item.discount === 0 ? null : (
                <Text style={styles.discountText}>{item.discount}%Off</Text>
              )}
            </View>
            {item?.freeDomain?.map((fre, index) => (
              <View key={index}>
                <View style={styles.freeDomain}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "OpenSans-Regular",
                      fontWeight: "700",
                    }}
                  >
                    DOMAIN REGISTRATION
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "OpenSans-Regular",
                      color: "#1d94d0",
                      fontWeight: "bold",
                    }}
                  >
                    Free
                  </Text>
                </View>
                <View style={styles.freeDomain}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "OpenSans-Regular",
                    }}
                  >
                    {fre?.domainName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "OpenSans-Regular",
                      textDecorationLine: "line-through",
                    }}
                  >
                    Rs:{parseInt(fre?.price)}
                  </Text>
                </View>
                {item.addons.map((addon, index) => (
                  <View key={index}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ fontSize: 15, fontFamily: "OpenSans-Regular" }}
                      >
                        {addon.name}
                      </Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: "OpenSans-Regular",
                          }}
                        >
                          Rs: {parseInt(addon.price)}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeAddon(item.pid, index)}
                        >
                          <Entypo name="cross" size={28} color="black" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ))}
            <AntDesign
              name="delete"
              size={24}
              color="black"
              style={{ alignSelf: "flex-end", paddingTop: 10 }}
              onPress={() => removePackage(item.pid)}
            />
            <View style={styles.divider} />
          </View>
        ))}

        {domainSearchCart.map((item) => (
          <View key={item.domainName} style={styles.cartItem}>
            <View style={styles.itemContainer}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "OpenSans-Regular",
                }}
              >
                DOMAIN REGISTRATION
              </Text>
              <View style={styles.itemNamePrice}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "OpenSans-Regular",
                  }}
                >
                  {item.domainName}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "OpenSans-Regular",
                  }}
                >
                  Rs: {parseInt(item.price)}
                </Text>
              </View>
              <AntDesign
                name="delete"
                size={24}
                color="black"
                style={{ alignSelf: "flex-end", paddingTop: 10 }}
                onPress={() => removeDomain(item.domainName)}
              />
            </View>
            <View style={styles.divider} />
          </View>
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 15,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "OpenSans-Regular",
            }}
          >
            Subtotal:
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "OpenSans-Regular",
            }}
          >
            Rs: {calculateSubtotal()}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "OpenSans-Regular",
            }}
          >
            GST / VAT @ 5%:
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "OpenSans-Regular",
            }}
          >
            Rs: {parseInt(calculateGSTVAT(calculateSubtotal()))}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 15,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "OpenSans-Regular",
              fontWeight: "700",
            }}
          >
            Total Price:
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "OpenSans-Regular",
              fontWeight: "700",
            }}
          >
            Rs: {parseInt(calculateTotalPrice())}
          </Text>
        </View>
        <View style={styles.divider} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingTop: 30,
            marginBottom: 30,
          }}
        >
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate("FrontPage")}
              style={{
                height: hp(6),
                width: wp(46),
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#4A5F71",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#000000",
                }}
              >
                Continue shopping
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserRegistration")}
              style={{
                height: hp(6),
                width: wp(32),
                backgroundColor: "#005880",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#4A5F71",
              }}
            >
              <Text style={styles.buttonText}>CheckOut</Text>
            </TouchableOpacity>
          </>
        </View>
      </View>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: 70,
  },
  Bundle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  cartItem: {},
  itemContainer: {
    justifyContent: "space-between",
  },
  itemNamePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  discountText: {
    color: "#1d94d0",
    fontWeight: "bold",
  },
  freeDomain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    height: 1,
    backgroundColor: "#dcdcdc",
    marginTop: 15,
    marginBottom: 15,
  },
  startbutton: {
    borderRadius: 5,
    backgroundColor: "#005880",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: hp(6),
    width: wp(39),
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
  },
});
