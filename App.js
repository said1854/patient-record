import "react-native-gesture-handler";

import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/pages/HomeScreen";
import RegisterUser from "./src/pages/RegisterUser";
import UpdateUser from "./src/pages/UpdateUser";
import ViewUser from "./src/pages/ViewUser";
import ViewAllUser from "./src/pages/ViewAllUser";
import DeleteUser from "./src/pages/DeleteUser";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Hasta Kayıt Uygulaması",
            headerStyle: {
              backgroundColor: "#F2BED1",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              paddingLeft: "70px",
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterUser}
          options={{
            title: "Hasta Kayıt",
            headerStyle: {
              backgroundColor: "#F2BED1",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateUser}
          options={{
            title: "Hasta Güncelle",
            headerStyle: {
              backgroundColor: "#F2BED1",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewUser}
          options={{
            title: "Hasta Bul",
            headerStyle: {
              backgroundColor: "#F2BED1",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllUser}
          options={{
            title: "Tüm Hastalar",
            headerStyle: {
              backgroundColor: "#F2BED1",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteUser}
          options={{
            title: "Silme",
            headerStyle: {
              backgroundColor: "#F2BED1",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
