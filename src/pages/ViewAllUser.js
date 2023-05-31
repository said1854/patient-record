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
    return (
      <View
        key={item.user_id}
        style={{
          // flex: 0,
          backgroundColor: "#F2BED1",
          marginTop: 20,
          padding: 30,
          borderRadius: 10,
        }}
      >
        [name, contact, address, diagnosis, nurse, doctor, tcNo],
        <Text style={styles.textheader}>Code</Text>
        <Text style={styles.textbottom}>{item.user_id}</Text>
        <Text style={styles.textheader}>Adı SOyadı</Text>
        <Text style={styles.textbottom}>{item.name}</Text>
        <Text style={styles.textheader}>Telefon</Text>
        <Text style={styles.textbottom}>{item.contact}</Text>
        <Text style={styles.textheader}>Adres</Text>
        <Text style={styles.textbottom}>{item.address}</Text>
        <Text style={styles.textheader}>Adres</Text>
        <Text style={styles.textbottom}>{item.diagnosis}</Text>
        <Text style={styles.textheader}>Adres</Text>
        <Text style={styles.textbottom}>{item.nurse}</Text>
        <Text style={styles.textheader}>Adres</Text>
        <Text style={styles.textbottom}>{item.doctor}</Text>
        <Text style={styles.textheader}>Adres</Text>
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