import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewUser = () => {
  const [inputUserId, setInputUserId] = useState("");
  const [didSearch, setDidSearch] = useState("");
  const [tcNo, setTcNo] = useState("");
  const [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputUserId);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM patient_table where tcNo = ?",
        [tcNo],
        (tx, results) => {
          var len = results.rows.length;
          console.log("len", len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert("User not found !");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#F8E8EE" }}>
        <View style={{ flex: 1 }}>
          {didSearch ? (
            <View
              style={{
                border: "1px black solid",
                marginLeft: 35,
                marginRight: 35,
                marginTop: 10,
              }}
            >
              <Text>Tc kimlik no : {userData.tcNo}</Text>
              <Text>Adı Soyadı : {userData.name}</Text>
              <Text>Telefon : {userData.contact}</Text>
              <Text>Sorumlu hekim : {userData.doctor}</Text>
              <Text>Sorumlu hemsire : {userData.nurse}</Text>
              <Text>Tani : {userData.diagnosis}</Text>
              <Text>Adres : {userData.address}</Text>
            </View>
          ) : (
            <>
              <Mytext text="Hasta ara" />
              <Mytextinput
                placeholder="Tc kimlik no"
                onChangeText={(tcNo) => setTcNo(inputUserId)}
                style={{ padding: 10 }}
              />
              <Mybutton title="Hasta ara" customClick={searchUser} />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;