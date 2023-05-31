import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  const [nurse, setNurse] = useState("");
  const [doctor, setDoctor] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [name, setName] = useState("");
  const [tcNo, setTcNo] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  let register_user = () => {
    console.log(name, contact, address, diagnosis, nurse, doctor, tcNo);

    if (!doctor) {
      alert("Sorumlu hekim giriniz!");
      return;
    }
    if (!nurse) {
      alert("Sorumlu hemsire giriniz!");
      return;
    }
    if (!diagnosis) {
      alert("Tani giriniz!");
      return;
    }
    if (!name) {
      alert("Ad Soyad giriniz!");
      return;
    }
    if (!tcNo) {
      alert("Tc kimlik numarasi giriniz!");
      return;
    }
    if (!contact) {
      alert("Iletisim numarasi giriniz!");
      return;
    }
    if (!address) {
      alert("Adres giriniz!");
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO patient_table (name, contact, address,  diagnosis, nurse, doctor, tcNo) VALUES (?,?,?,?,?,?,?)",
        [name, contact, address, diagnosis, nurse, doctor, tcNo],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "Hasta başarıyla kaydedildi !!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Hasta kayit sirasinda hata olustu !!!");
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#F8E8EE" }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: "space-between" }}
            >
              <Mytextinput
                placeholder="Sorumlu Hekim"
                onChangeText={(doctor) => setDoctor(doctor)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Sorumlu hemşire"
                onChangeText={(nurse) => setNurse(nurse)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Tanı"
                numberOfLines={2}
                multiline={true}
                onChangeText={(diagnosis) => setDiagnosis(diagnosis)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Adı Soyadı"
                onChangeText={(name) => setName(name)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Tc kimlik no"
                onChangeText={(tcNo) => setTcNo(tcNo)}
                keyboardType="numeric"
                maxLength={11}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Telefon"
                onChangeText={(contact) => setContact(contact)}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />

              <Mytextinput
                placeholder="Adres"
                onChangeText={(address) => setAddress(address)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: "top", padding: 10 }}
              />
              {/* <Mybutton title="Fotograf yukle" /> */}
              <Mybutton title="Kaydet" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
