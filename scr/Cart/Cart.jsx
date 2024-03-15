import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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

  useEffect(() => {
    console.log("Package Cart:", packageCart);
    console.log("Domain Search Cart:", domainSearchCart);
    const packageItem = packageCart.find((item) => item);
    if (packageItem) {
      const pid = packageItem.pid;
      console.log("PID is:", pid);
      GetPackageFreeDomains(pid).then((response) => {
        setResponse(response);
      });
    }
    // Find domains in domainSearchCart
    const comDomains = domainSearchCart.filter((item) =>
      item.domainName.endsWith(".com")
    );
    console.log("Find .com domains:", comDomains);

    if (packageCart && packageCart.length !== 0) {
      let lastIndex = packageCart.length - 1;
      GetPackageFreeDomains(packageCart[lastIndex].pid).then((response) => {
        console.log("Response from GetPackageFreeDomains:", response);
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart Items:</Text>
      {packageCart.map((item) => (
        <View key={item.pid} style={styles.cartItem}>
          <View style={styles.itemContainer}>
            <View style={styles.itemNamePrice}>
              <Text
                style={{
                  marginBottom: 5,
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            {item?.freeDomain?.map((fre) => (
              <>
                <Text
                  style={{
                    marginBottom: 5,
                    fontSize: 16,
                    fontFamily: "OpenSans-Regular",
                  }}
                >
                  {fre?.domainName}
                </Text>
                <Text
                  style={{
                    marginBottom: 5,
                    fontSize: 16,
                    fontFamily: "OpenSans-Regular",
                  }}
                >
                  {parseInt(fre?.price)}
                </Text>
              </>
            ))}
          </View>
        </View>
      ))}

      {domainSearchCart.map((item) => (
        <View key={item.domainName} style={styles.cartItem}>
          <View style={styles.itemContainer}>
            <View style={styles.itemNamePrice}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "OpenSans-Regular",
                }}
              >
                {item.domainName}
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
        </View>
      ))}
    </View>
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
  },
  cartItem: {
    marginBottom: 30,
  },
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
});
