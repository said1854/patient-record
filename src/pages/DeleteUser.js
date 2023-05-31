import React, { useState } from "react";
import { View, Alert, SafeAreaView } from "react-native";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const DeleteUser = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState("");

  let deleteUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM  patient_table where tcNo=?",
        [inputUserId],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "Hasta başarıyla silindi !",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
            alert(`${inputUserId} tc kimlik nolu hasta silindi!`);
          } else {
            alert(`${inputUserId} tc kimlik no ile hasta bulunamadi!`);
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#F8E8EE" }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Tc kimlik no"
            onChangeText={(inputUserId) => setInputUserId(inputUserId)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Hasta sil" customClick={deleteUser} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;
