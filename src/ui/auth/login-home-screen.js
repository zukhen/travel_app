import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  BackHandler,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Device from 'expo-device'
import React from "react";
import { ColorAssets, IconAssets, containScreenAssets } from "../../utils/app-assets";
import Sizebox from "../../common/custom/custom-sizebox";
import { CustomButton } from "../../common/custom/custom-button";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LoginHomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={containScreenAssets.safeAreaView}>
      <View style={containScreenAssets.container}>
        <ScrollView
          style={containScreenAssets.scrollView}
          contentContainerStyle={containScreenAssets.scrollViewContent}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Let's you in</Text>
            <TouchableOpacity
              style={styles.buttonLoginGoogle}
              onPress={() => { }}
            >
              <View style={styles.contentButton}>
                <Image
                  style={styles.imageIcon}
                  source={IconAssets.iconGoogle}
                />
                <Sizebox width={10} />
                <Text style={styles.titleGoogle}>Continue with Google</Text>
              </View>
            </TouchableOpacity>
            <Sizebox height={40} />
            <View style={{ flexDirection: 'row', width: '96%', alignItems: 'center', justifyContent: 'center' }}>
              <View style={styles.hr}></View>
              <Text style={{ marginHorizontal: 15 }}>or</Text>
              <View style={styles.hr}></View>
            </View>
            <Sizebox height={40} />
            <CustomButton
              style={styles.button}
              title="Sign in with Username"
              onPress={() => navigation.navigate("LoginEmailScreen")}
            />
          </View>
          <View style={styles.footer}>
            <Text style={styles.titleDontHaveAccount}>
              Dont have an account?
            </Text>
            <Sizebox width={5} />
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              <Text style={styles.titleSignUp}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginHomeScreen;

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  title: {
    marginVertical:
      Device.osName === 'iOS' ? windowHeight / 6.2 : windowHeight / 5,
    fontWeight: "600",
    letterSpacing: 1,
    fontSize: windowWidth / 9.5,
  },
  contentButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  imageIcon: {
    width: windowWidth / 15,
    height: windowWidth / 15,
  },
  buttonLoginGoogle: {
    paddingVertical: 14,
    width: "100%",
    borderRadius: 15,
    backgroundColor: ColorAssets.transparentColor,
    borderColor: ColorAssets.greyColor200,
    alignItems: "center",
    borderWidth: 1,
  },
  titleGoogle: {
    fontWeight: "bold",
    color: ColorAssets.blackolor,
    fontSize: windowWidth / 24,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  titleDontHaveAccount: {
    color: ColorAssets.greyColor,
  },
  titleSignUp: {
    color: ColorAssets.greenColor,
    fontWeight: "bold",
  },
  hr: {
    backgroundColor: ColorAssets.greyColor200, height: 1, width: '44%'
  }
});