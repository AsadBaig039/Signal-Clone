import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
function AddChatScreen({ navigation }) {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
    });
  }, [navigation]);

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <Input
        containerStyle={{ width: 350, alignSelf: "center", marginTop: 30 }}
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button
        disabled={!input}
        onPress={createChat}
        title="Create new chat"
        containerStyle={{
          width: 350,
          alignSelf: "center",
          marginTop: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AddChatScreen;
