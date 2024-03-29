import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ColorAssets } from "../../utils/app-assets";
import {
  CustomTextInput,
  CustomTextInput2,
} from "../../common/custom/custom-textInput";
import { ScrollView } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import SharedPreferences from "../../database/share_preferences_helper";
import { useEffect,useState } from "react";
import {
  launchImageLibraryAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeScreenWithOutTime,
  navigateWithoutClearingStack,
} from "../../utils/navigation-utils";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import i18n from "../../l10n/i18n";
import moment from "moment/moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AddHotelScreen = ({ navigation }) => {
  const phoneInput = React.useRef(null);
  const hotelData = useSelector((state) => state.addHotel.hotel);
  const dispatch = useDispatch();
  const handleInputChange = (fieldName, value) => {
    dispatch({ type: "UPDATE_HOTEL_FIELD", payload: { fieldName, value } });
  };

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        i18n.t("addHotel.insufficientPermission"),
        i18n.t("addHotel.grantCameraAccess")
      );
      return false;
    }
    return true;
  }

  const [openTime, setopenTime] = useState(false);
  const [dateOpenTime, setdateOpenTime] = useState(new Date());
  const [closeTime, setcloseTime] = useState(false);
  const [dateCloseTime, setdateCloseTime] = useState(new Date());
  const [focustime, setfocustime] = useState(false);
  const [validate, setvalidate] = useState(true)
  async function camerapressHandler(selectedKey) {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: false,
      aspect: [9, 16],
      quality: 1,
    });

    if (!image.canceled) {
      const updatedData = hotelData.image.map((item) => {
        if (item.key === selectedKey) {
          console.log("equals key " + item.key);
          return { ...item, uri: image.assets[0].uri };
        }
        return item;
      });
      dispatch({
        type: "UPDATE_IMAGE_DATA",
        payload: updatedData,
      });
    }
  }
  const getUserInfor = () => {
    SharedPreferences.GET_USER_INFOR()
      .then((userInfoString) => {
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          handleInputChange("id_owner", userInfo.id);
        } else {
          console.log("User information not found.");
        }
      })
      .catch((error) => {
        console.error("Error retrieving user information:", error);
      });
  };

  useEffect(() => {
    getUserInfor();
    
  }, []);

  useEffect(() => {
    if(hotelData.name && hotelData.description && hotelData.open_time && hotelData.close_time && hotelData.place){
      setvalidate(false)
    }else{
      setvalidate(true)
    }
  });


  const phoneNumberWithoutCountryCode =
    hotelData?.hotline.replace("+84", "") || hotelData.hotline;

  const addHotel = async () => {
    const selectedImageCount = hotelData.image.filter(
      (item) => item.uri !== " "
    ).length;
      if(!hotelData.address){
        Alert.alert(
          i18n.t("alert.warning"),
          i18n.t("alert.address_emty")
        );
        return;
      }

    if(!phoneInput.current.state.number){
      Alert.alert(
        i18n.t("alert.warning"),
        i18n.t("alert.numberPhone_emty")
      );
      return;
    }

    if (selectedImageCount < 6) {
      Alert.alert(
        i18n.t("addHotel.incompleteImages"),
        i18n.t("addHotel.selectAtLeast6Images")
      );
      return;
    }

    dispatch({
      type: "ADD_HOTEL",
      payload: {
        ...hotelData,
        name: hotelData.name,
        address: hotelData.address,
        id_owner: hotelData.id_owner,
        description: hotelData.description,
        open_time: hotelData.open_time,
        close_time: hotelData.close_time,
        hotline: hotelData.hotline,
        place: hotelData.place,
        image: hotelData.image,
      },
    });
    navigation.navigate("TypeOfRoom");
    // navigateWithoutClearingStack(navigation, "TypeOfRoom");
  };

  return (
    <View style={{ backgroundColor: ColorAssets.whiteColor }}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.boxModal}>
            <View style={styles.topModal}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleModal}>
                  {i18n.t("addHotel.addHotel")}
                </Text>
              </View>
              <View style={styles.hrModal}></View>
              <Text style={styles.text1Modal}>{i18n.t("addHotel.media")}</Text>
              <View
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <View style={styles.viewMedia}>
                  {hotelData.image.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          camerapressHandler(item.key);
                        }}
                      >
                        <View style={styles.item} key={item.key}>
                          <Image
                            source={{ uri: item.uri }}
                            style={styles.imageStyle}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
            <View style={styles.bodyModal}>
              <CustomTextInput
                title={i18n.t("addHotel.hotelName")}
                valueText={hotelData.name}
                placeholder={hotelData?.name || i18n.t("addHotel.hotelName")}
                isHaveTitle={true}
                fillText={hotelData.name ? true : false}
                onChangeText={(e) => handleInputChange("name", e)}
                errorText={i18n.t("alert.string_emty")}
              />
              <CustomTextInput
                onTouchStart={() => navigation.navigate("AddressScreen")}
                title={i18n.t("addHotel.hotelAddress")}
                placeholder={
                  hotelData?.address || i18n.t("addHotel.hotelAddress")
                }
                isHaveTitle={true}
                fillText={hotelData.address ? true : false}
                editable={false}
                valueText={hotelData.address}
                errorText={i18n.t("alert.string_emty")}
              />
              <CustomTextInput
                title={i18n.t("addHotel.hotelDescription")}
                isHaveTitle={true}
                valueText={hotelData.description}
                fillText={hotelData.description ? true : false}
                placeholder={
                  hotelData?.description || i18n.t("addHotel.hotelDescription")
                }
                onChangeText={(e) => handleInputChange("description", e)}
                errorText={i18n.t("alert.string_emty")}
              />
              <View style={styles.rowTime}>
                <CustomTextInput2
                  title={i18n.t("addHotel.openTime")}
                  onPress={()=>{setopenTime(true)}}
                  editable={false}
                  valueText={hotelData?.open_time}
                  textPlaceHolder={
                    hotelData?.open_time || i18n.t("addHotel.openTime")
                  }
                  onChangeText={(e) => handleInputChange("open_time", e)}
                  isSelect={focustime}
                />
                 <DateTimePickerModal
                  isVisible={openTime}
                  minuteInterval={30}
                  mode="time"
                  is24Hour
                  date={dateOpenTime}
                  onConfirm={(date) => {
                    handleInputChange("open_time", moment(date).format("HH:mm"));
                    setopenTime(false);
                    setdateOpenTime(date);
                    if(hotelData.close_time){
                      setfocustime(false);
                    }

                    //setdateOpenTime(date)
                  }}
                  onCancel={() => {
                    if(hotelData.open_time === ""){
                      setfocustime(true);
                    }
                    setopenTime(false)
                  }}
                  />
                <CustomTextInput2
                  title={i18n.t("addHotel.closeTime")}
                  onPress={()=>{setcloseTime(true)}}
                  editable={false}
                  valueText={hotelData?.close_time}
                  textPlaceHolder={
                    hotelData?.close_time || i18n.t("addHotel.closeTime")
                  }
                  onChangeText={(e) => handleInputChange("close_time", e)}
                  isSelect={focustime}
                />
                <DateTimePickerModal
                  isVisible={closeTime}
                  minuteInterval={30}
                  mode="time"
                  is24Hour
                  date={dateCloseTime}
                  onConfirm={(date) => {
                    handleInputChange("close_time", moment(date).format("HH:mm"))
                    setcloseTime(false)
                    setdateCloseTime(date);
                    if(hotelData.open_time){
                      setfocustime(false);
                    }
                    //setdateOpenTime(date)
                  }}
                  onCancel={() => {
                    if(hotelData.close_time === ""){
                      setfocustime(true);
                    }
                    setcloseTime(false)
                  }}
                  />
              </View>
              
              {focustime ? 
                  (
                     <Text style={styles.text_error}>{"Vui lòng nhập đầy đủ thời gian"}</Text> 
                  ) : null
              }
            
              <Text style={styles.text1Modal}>
                {i18n.t("addHotel.hotline")}
              </Text>
              <PhoneInput
                ref={phoneInput}
                disableArrowIcon={true}
                defaultValue={phoneNumberWithoutCountryCode}
                containerStyle={[styles.phoneContainer]}
                textContainerStyle={styles.textInput}
                onChangeFormattedText={(e) => {handleInputChange("hotline", e)}}
                defaultCode="VN"
                layout="first"
              />
              <CustomTextInput
                title={i18n.t("addHotel.place")}
                valueText={hotelData.place}
                placeholder={hotelData?.place || i18n.t("addHotel.place")}
                isHaveTitle={true}
                onChangeText={(e) => handleInputChange("place", e)}
                fillText={hotelData.place ? true : false}
                errorText={i18n.t("alert.string_emty")}
                
              />
            </View>
            <View style={styles.bottomModal}>
              <TouchableOpacity
                style={[styles.btnContinueModal,validate ? {opacity:0.5} : null]}
                onPress={addHotel}
                disabled={validate}
              >
                <Text style={styles.textContinueModal}>
                  {i18n.t("addHotel.continue")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnCancelModal}
                onPress={() => navigation.pop()}
              >
                <Text style={styles.textCancelModal}>
                  {i18n.t("addHotel.cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AddHotelScreen;
