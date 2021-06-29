import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  AntDesign,
  SimpleLineIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function ImageInput({ onChangeImage, cloudUri }) {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const handlePress = () => {
    if (!imageUri) pickImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image", [
        {
          text: "Yes",
          onPress: () => {
            onChangeImage(null);
            setImageUri(null);
          },
        },
        { text: "No" },
      ]);
  };

  const cloudinaryUpload = async (photo) => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "signal-clone");
    data.append("cloud_name", "dzcdsqxkb");
    await fetch("http://api.cloudinary.com/v1_1/dzcdsqxkb/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        cloudUri(data.url);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("An Error Occured While Uploading");
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImageUri(result.uri);

      let base64Img = `data:image/jpg;base64,${result.base64}`;

      //Add your cloud name
      let apiUrl = "http://api.cloudinary.com/v1_1/dzcdsqxkb/image/upload";

      let data = {
        file: base64Img,
        upload_preset: "signal-clone",
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then(async (r) => {
          let data = await r.json();
          cloudUri(data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#f8f8f8",
          borderRadius: 15,
          height: 100,
          justifyContent: "center",
          overflow: "hidden",
          width: 100,
          alignSelf: "center",
          marginVertical: 20,
        }}
      >
        {!imageUri && <MaterialCommunityIcons name="camera" size={40} />}
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ height: "100%", width: "100%" }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
