import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Platform,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
// // const imageToBase64 = require('image-to-base64');
// var ImagePicker = require('react-native-image-picker');
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import Image from "react-native-scalable-image";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 
import Text_upload from "./components/Text_upload";
 
function NewPost() {

 
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [UserData, setUserData] = useState([]);
  const [Token, setToken] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [font, setfont] = useState(null)
 

  

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

  useFocusEffect(
    React.useCallback(() => {
      Get_User_Info();

      return () => {
        setImage(null);
      };
    }, [])
  );

  const Get_User_Info = async () => {
    const token_stored = await AsyncStorage.getItem("token");

    setToken(token_stored);
    axios
      .get("https://api-insta-memes.herokuapp.com/get_profile", {
        headers: {
          Authorization: token_stored,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const upload = async () => {
    let base64Img = `data:image/jpg;base64,${image.base64}`;
    const token_stored = await AsyncStorage.getItem("token");

    const data = {
      data: image.uri,
      user: UserData.username,
      user_id: UserData._id,
    };

    const options = {
      headers: {
        Authorization: token_stored,
      },
    };

    axios
      .post("https://api-insta-memes.herokuapp.com/post", data, options)
      .then((res) => {
        console.log("post saved !");
        navigation.navigate("Home", {
          posted: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
     { !image && <Text_upload text_2="UPLOAD OR CREATE NEW MEMES !" />}
      <TouchableOpacity style={styles.upload_btn}   
        onPress={pickImage}
      >
        <MaterialIcons name="perm-media" size={27} color="white" />
        <Text style={styles.upload_btn_text} >
        {image ? "PICK ANOTHER IMAGE" : "PICK AN IMAGE FROM GALLERY"}
        </Text>
      </TouchableOpacity>
      {image && (
        <Image
          style={{ marginVertical: 20 }}
          resizeMode="contain"
          width={Dimensions.get("window").width * 0.8}
          source={{ uri: image.uri }}
        />
      )}
      {image && (
        <TouchableOpacity style={styles.upload_btn} onPress={upload}>
          <FontAwesome name="cloud-upload" size={27} color="white" />
          <Text style={styles.upload_btn_text}>UPLOAD MEMES</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default NewPost;

const styles = StyleSheet.create({
  upload_btn: {
    borderRadius: 5,
    backgroundColor: "#dd6d6a",
    paddingHorizontal: 15,
    marginHorizontal: 15,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 10,
},
shadowOpacity: 0.51,
shadowRadius: 13.16,

elevation: 20,
  },
  upload_btn_text: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 10,
  },
});
