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

  const newSearch = () => {
    setDidSearch(false);
  };

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
          console.log(results);
          if (len > 0) {
            console.log(results.rows.item(0));
            setUserData(results.rows.item(0));
            setDidSearch(true);
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
            <>
              <View
                style={{
                  backgroundColor: "#F2BED1",
                  margin: 20,
                  padding: 30,
                  borderRadius: 10,
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
              <View>
                <Mybutton title="yeni hasta arama" customClick={newSearch} />
              </View>
            </>
          ) : (
            <>
              <Mytextinput
                placeholder="Tc kimlik no"
                onChangeText={(tcNo) => setTcNo(tcNo)}
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