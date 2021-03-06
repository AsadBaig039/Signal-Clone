import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";
import { Permissions, Notifications } from "expo";

const Stack = createStackNavigator();
// const globalScreenOptions = {
//   headerStyle: { backgroundColor: "#2C6BED" },
//   headerTitleStyle: {
//     color: "white",
//     alignSelf: "center",
//   },
//   headerTintColor: "white",
// };

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",
            headerStyle: {
              backgroundColor: "#2C6BED",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              alignSelf: "center",
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: "Register",
            headerStyle: {
              backgroundColor: "#2C6BED",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              marginLeft: 100,
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#2C6BED",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              alignSelf: "center",
            },
          }}
        />
        <Stack.Screen
          name="AddChat"
          component={AddChatScreen}
          options={{
            title: "Add Chat",
            headerStyle: {
              backgroundColor: "#2C6BED",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              marginLeft: 80,
            },
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            title: "Chat",
            headerStyle: {
              backgroundColor: "#2C6BED",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              marginLeft: 100,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
