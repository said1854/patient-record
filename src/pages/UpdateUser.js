import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from "react-native";
import Mytext from "./components/Mytext";
import Mytextinput from "./components/Mytextinput";
import Mybutton from "./components/Mybutton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const UpdateUser = ({ navigation }) => {
  const [didSearch, setDidSearch] = useState(false);
  const [userData, setUserData] = useState({});
  const [inputUserId, setInputUserId] = useState("");
  const [nurse, setNurse] = useState("");
  const [doctor, setDoctor] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [name, setName] = useState("");
  const [tcNo, setTcNo] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  let updateAllStates = (
    name,
    contact,
    address,
    diagnosis,
    nurse,
    doctor,
    tcNo
  ) => {
    setName(name);
    setContact(contact);
    setAddress(address);
    setTcNo(tcNo);
    setDiagnosis(diagnosis);
    setNurse(nurse);
    setDoctor(doctor);
  };

  let searchUser = () => {
    console.log(inputUserId);
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM patient_table where tcNo = ?",
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            setDidSearch(true);
            let res = results.rows.item(0);
            // setUserData(res);
            updateAllStates(
              res.name,
              res.contact,
              res.address,
              res.diagnosis,
              res.nurse,
              res.doctor,
              res.tcNo
            );
          } else {
            alert("Kullanici bulunamadi!");
            updateAllStates("", "", "", "", "", "", "", "");
          }
        }
      );
    });
  };
  let updateUser = () => {
    console.log(
      inputUserId,
      name,
      contact,
      address,
      doctor,
      tcNo,
      nurse,
      diagnosis
    );

    if (!inputUserId) {
      alert("Kod!");
      return;
    }
    if (!name) {
      alert("Ad SOyad !");
      return;
    }
    if (!contact) {
      alert("Telefon !");
      return;
    }
    if (!address) {
      alert("Adres !");
      return;
    }
    if (!doctor) {
      alert("Sorumlu hekim!");
      return;
    }
    if (!tcNo) {
      alert("TC kimlik numarasi!");
      return;
    }
    if (!nurse) {
      alert("Sorumlu hemsire!");
      return;
    }
    if (!diagnosis) {
      alert("Tani giriniz!");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE patient_table set name=?, contact=? , address=?, tcNo=?, diagnosis=?, nurse=?, doctor=? where tcNo=?",
        [name, contact, address, tcNo, diagnosis, nurse, doctor, tcNo],
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
          } else alert("Hasta kayit sirasinda hata olustu");
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
              {didSearch ? (
                <>
                  <Mytextinput
                    placeholder="Sorumlu Hekim"
                    value={doctor}
                    onChangeText={(doctor) => setDoctor(doctor)}
                    style={{ padding: 10 }}
                  />
                  <Mytextinput
                    placeholder="Sorumlu hemşire"
                    value={nurse}
                    onChangeText={(nurse) => setNurse(nurse)}
                    style={{ padding: 10 }}
                  />
                  <Mytextinput
                    placeholder="Tanı"
                    value={diagnosis}
                    numberOfLines={2}
                    multiline={true}
                    onChangeText={(diagnosis) => setDiagnosis(diagnosis)}
                    style={{ padding: 10 }}
                  />
                  <Mytextinput
                    placeholder="Adı Soyadı"
                    value={name}
                    onChangeText={(name) => setName(name)}
                    style={{ padding: 10 }}
                  />
                  <Mytextinput
                    placeholder="Tc kimlik no"
                    value={tcNo}
                    onChangeText={(tcNo) => setTcNo(tcNo)}
                    keyboardType="numeric"
                    maxLength={11}
                    style={{ padding: 10 }}
                  />
                  <Mytextinput
                    placeholder="Telefon"
                    value={contact}
                    onChangeText={(contact) => setContact(contact)}
                    maxLength={10}
                    keyboardType="numeric"
                    style={{ padding: 10 }}
                  />
                  <Mytextinput
                    placeholder="Adres"
                    value={address}
                    onChangeText={(address) => setAddress(address)}
                    maxLength={225}
                    numberOfLines={5}
                    multiline={true}
                    style={{ textAlignVertical: "top", padding: 10 }}
                  />
                  <Mybutton
                    title="Hasta bilgilerini Güncelle"
                    customClick={updateUser}
                  />
                </>
              ) : (
                <>
                  <Mytext text="Hasta arama" />
                  <Mytextinput
                    placeholder="Tc kimlik no"
                    style={{ padding: 10 }}
                    onChangeText={(inputUserId) => setInputUserId(inputUserId)}
                  />
                  <Mybutton title="Hasta ara" customClick={searchUser} />
                </>
              )}
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;