import React, { useState } from 'react';
import { imagePicker, launchImageLibrary } from "react-native-image-picker";
// import * as ImagePicker from "react-native-image-picker";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Image,
  PermissionsAndroid,
} from "react-native";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  const [imageUri, setImageUri] = useState("");
  let [userName, setUserName] = useState("");
  let [userContact, setUserContact] = useState("");
  let [userAddress, setUserAddress] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  // const options = {};

  // const checkCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.CAMERA
  //     );
  //     if (granted) {
  //       console.log("Camera permission granted");
  //     } else {
  //       console.log("Camera permission not granted");
  //     }
  //   } catch (error) {
  //     console.log("Error checking camera permission:", error);
  //   }
  // };
  // checkCameraPermission();
  // const selectImage = () => {
  //   console.log("Upload Image");
  //   const options = {
  //     storageOption: {
  //       path: "images",
  //       mediaType: "photo",
  //     },
  //     includeBase64: true,
  //   };
  //   imagePicker.launchImageLibrary(options, (response) => {
  //     console.log("Response = ", response);
  //     if (response.didCancel) {
  //       console.log("User cancelled image picker");
  //     } else if (response.error) {
  //       console.log("Image picker error:", response.error);
  //     } else if (response.customButton) {
  //       console.log("User tapped custom button", response.customButton);
  //     } else {
  //       const source = { uri: "data:image/jpeg;base64," + response.base64 };
  //       setImageUri(source);
  //     }
  //   });
  // };

  // const onImageLibraryPress = useCallback(() => {
  //   const options = {
  //     selectionLimit: 1,
  //     mediaType: "photo",
  //     includeBase64: false,
  //   };
  //   ImagePicker.launchImageLibrary(options, setPickerResponse);
  // }, []);

  // const onCameraPress = useCallback(() => {
  //   const options = {
  //     saveToPhotos: true,
  //     mediaType: "photo",
  //     includeBase64: false,
  //   };
  //   ImagePicker.launchCamera(options, setPickerResponse);
  // }, []);

  let register_user = () => {
    console.log(userName, userContact, userAddress);

    if (!userName) {
      alert("Please fill in the name !");
      return;
    }
    if (!userContact) {
      alert("Please fill in the contact");
      return;
    }
    if (!userAddress) {
      alert("Please fill in the address !");
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)",
        [userName, userContact, userAddress],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "Successfully Registered User !!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Error trying to register User !!!");
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "F8E8EE" }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: "space-between" }}
            >
              <Mytextinput
                placeholder="Adı Soyadı"
                onChangeText={(userName) => setUserName(userName)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Telefon"
                onChangeText={(userContact) => setUserContact(userContact)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Adres"
                onChangeText={(userAddress) => setUserAddress(userAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: "top", padding: 10 }}
              />
              <Mybutton title="Save" customClick={register_user} />
              <Mybutton
                title="Upload Image"
                // customClick={onImageLibraryPress}
              />
              {/* <Image source={imageUri} /> */}
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;