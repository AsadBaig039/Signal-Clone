import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image, Text } from "react-native-elements";
import { auth } from "../firebase";
import ImagePicker from "../components/ImagePicker";
function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cloudinaryUri, setCloudinaryUri] = useState("");

  console.log("Cloud Uri", cloudinaryUri);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            cloudinaryUri ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Text
        h3
        style={{
          marginBottom: 50,
          color: "#696969",
        }}
      >
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <ImagePicker
          cloudUri={(uri) => setCloudinaryUri(uri)}
          onChangeImage={(uri) => setImageUrl(uri)}
        />
        <Input
          placeholder="Full Name"
          type="text"
          autoFocus
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button
        raised
        title="Register"
        onPress={register}
        containerStyle={{ width: 200, marginTop: 10 }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    marginTop: 30,
  },
  inputContainer: {
    width: 300,
  },
});

export default RegisterScreen;
