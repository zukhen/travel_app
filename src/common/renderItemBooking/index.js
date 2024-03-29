import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { ColorAssets } from "../../utils/app-assets";
import Icon from "react-native-vector-icons/FontAwesome";
import i18n from "../../l10n/i18n";
const ItemOngoing = ({ item, showModal }) => {
  return (
    <View>
      <View style={styles.boxItem}>
        <View>
          <View style={styles.boxTop}>
            <Image source={{ uri: item.uri }} style={styles.img} />
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.hotelName}>{item.name}</Text>
              <Text style={styles.hotelAddress}>{item.address}</Text>
              <View style={styles.borderStatusOngoing}>
                <Text style={styles.hotelStatus}>{item.status}</Text>
              </View>
            </View>
          </View>
          <View style={styles.hr}></View>
          <View style={styles.boxBottom}>
            <TouchableOpacity style={styles.btnCancel} onPress={showModal}>
              <Text style={styles.textCancel}>{i18n.t("booking.cancelBooking")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnView}>
              <Text style={styles.textView}>{i18n.t("booking.viewTicket")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const ItemCompleted = ({ item }) => {
  return (
    <View>
      <View style={styles.boxItem}>
        <View>
          <View style={styles.boxTop}>
            <Image source={{ uri: item.uri }} style={styles.img} />
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.hotelName}>{item.name}</Text>
              <Text style={styles.hotelAddress}>{item.address}</Text>
              <View style={styles.borderStatusCompleted}>
                <Text style={styles.hotelStatusCompleted}>{item.status}</Text>
              </View>
            </View>
          </View>
          <View style={styles.hr}></View>
          <View style={styles.boxBottomCompleted}>
            <Icon
              name="check-square"
              size={21}
              color={ColorAssets.greenColor}
              style={{ margin: 8 }}
            />
            <Text style={styles.textBottomCompleted}>{i18n.t("booking.completionMessage")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ItemCanceled = ({ item }) => {
  return (
    <View>
      <View style={styles.boxItem}>
        <View>
          <View style={styles.boxTop}>
            <Image source={{ uri: item.uri }} style={styles.img} />
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.hotelName}>{item.name}</Text>
              <Text style={styles.hotelAddress}>{item.address}</Text>
              <View style={styles.borderStatusCanceled}>
                <Text style={styles.hotelStatusCanceled}>{item.status}</Text>
              </View>
            </View>
          </View>
          <View style={styles.hr}></View>
          <View style={styles.boxBottomCanceled}>
            <Icon
              name="exclamation-circle"
              size={21}
              color={"#F75555"}
              style={{ margin: 8 }}
            />
            <Text style={styles.textBottomCanceled}>{i18n.t("booking.cancellationMessage")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export { ItemOngoing, ItemCompleted, ItemCanceled };
