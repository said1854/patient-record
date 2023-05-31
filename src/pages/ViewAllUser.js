import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM patient_table", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, []);

  let listItemView = (item) => {
    console.log(item);
    const patientName = item.name.split(" ");
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
      <View
        key={item.user_id}
        style={{
          backgroundColor: "#F2BED1",
          padding: 30,
          borderRadius: 10,
        }}
      >
        <Text style={styles.textheader}>Hasta kayit No</Text>
        <Text style={styles.textbottom}>{item.user_id}</Text>
        <Text style={styles.textheader}>Adı SOyadı</Text>
        <Text style={styles.textbottom}>
          {patientName.map((name) => capitalizeFirstLetter(name + " "))}
        </Text>
        <Text style={styles.textheader}>Telefon</Text>
        <Text style={styles.textbottom}>{item.contact}</Text>
        <Text style={styles.textheader}>Adres</Text>
        <Text style={styles.textbottom}>{item.address}</Text>
        <Text style={styles.textheader}>Tanı</Text>
        <Text style={styles.textbottom}>{item.diagnosis}</Text>
        <Text style={styles.textheader}>Hemşire</Text>
        <Text style={styles.textbottom}>{item.nurse}</Text>
        <Text style={styles.textheader}>Doktor</Text>
        <Text style={styles.textbottom}>{item.doctor}</Text>
        <Text style={styles.textheader}>Tc kimlik no</Text>
        <Text style={styles.textbottom}>{item.tcNo}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#F8E8EE" }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700',

  },
  textbottom: {
    color: '#111',
    fontSize: 18,
  },
});

export default ViewAllUser;