import React, { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import MyImageButton from "./components/MyImageButton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='patient_table'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS patient_table", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS patient_table(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(25), contact INT(10), address VARCHAR(150), diagnosis VARCHAR(100), nurse VARCHAR(25), doctor VARCHAR(25), tcNo INT(11) UNIQUE)",
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#F8E8EE" }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <MyImageButton
              title="Hasta Kayıt"
              btnColor="#2992C4"
              btnIcon="user-plus"
              customClick={() => navigation.navigate("Register")}
            />

            <MyImageButton
              title="Hasta güncelle"
              btnColor="#A45BB9"
              btnIcon="user-circle"
              customClick={() => navigation.navigate("Update")}
            />

            <MyImageButton
              title="Hasta arama"
              btnColor="#F9AD29"
              btnIcon="user"
              customClick={() => navigation.navigate("View")}
            />
            <MyImageButton
              title="Hastaları listele"
              btnColor="#384F62"
              btnIcon="users"
              customClick={() => navigation.navigate("ViewAll")}
            />
            <MyImageButton
              title="Hasta sil"
              btnColor="#D1503A"
              btnIcon="user-times"
              customClick={() => navigation.navigate("Delete")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
