import React from "react";
import { View, StyleSheet,Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ColorAssets } from "../../utils/app-assets";
import { useState } from "react";
import BottomSheet from "../../ui/home/components/app-bottom-sheet";

export default MyFloatingActionButton = ({ onPress }) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fab} onPress={toggleBottomSheet}>
        <Icon name="plus" size={18} color={ColorAssets.whiteColor} />
      </TouchableOpacity>
      {bottomSheetVisible && (
        <BottomSheet
          isVisible={bottomSheetVisible}
          onCancel={toggleBottomSheet}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: ColorAssets.greenColor,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
 
});