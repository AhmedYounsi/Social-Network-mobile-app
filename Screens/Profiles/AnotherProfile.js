import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import HeaderBack from "../HeaderBack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import HeaderProfile from "./HeaderProfile";
import SinglePost from "../components/SinglePost";

import io from "socket.io-client";
const socket = io("https://api-insta-memes.herokuapp.com/");
// const socket = io("http://localhost:5000/");


function AnotherProfile() {
  const windowHeight = Dimensions.get("window").height;

  const [UserID, setUserID] = useState(null);
  const [UserData, setUserData] = useState([]);
  const [Posts, setPosts] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    setUserID(route.params.UserID);
    GetUserById(route.params.UserID);
  }, [route]);

  const GetUserById = async (id) => {
    const token_stored = await AsyncStorage.getItem("token");
    const data = {
      id,
    };
    const options = {
      headers: {
        Authorization: token_stored,
      },
    };
    axios
      .post("https://api-insta-memes.herokuapp.com/UserById", data, options)
      .then((res) => {
        setUserData(res.data.user);
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      socket.on("LIKE_POST", async (data) => {
        
        const index = Posts.findIndex((el) => el._id == data._id);
        const newarr = [...Posts];
        if (newarr[index]) {
          newarr[index].likes = data.likes;
          setPosts(newarr);
        }
      });

      socket.once("COMMENT", (data) => {
      
        const index = Posts.findIndex((el) => el._id == data._id);
        const newarr = [...Posts];
        if (newarr[index]) {
          newarr[index].comments = data.comments;
          setPosts(newarr);
        }
      });
       
          
    }, [Posts])
  );
 

  const UpdatePost = async (data) => {
    //
    const index = Posts.findIndex((el) => el._id == data.post_id);
    const newarr = [...Posts];
    if (newarr[index]) {
      const i = newarr[index].likes.indexOf(data.user_id);
      if (i > -1) {
        newarr[index].likes.splice(i, 1);
      } else {
        newarr[index].likes.push(data.user_id);
      }
      setPosts(newarr);
      socket.emit("LIKE_POST", data);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack HeaderName={UserData.username} />
      <ScrollView style={styles.ScrollView}>
        <HeaderProfile UserData={UserData} Posts_length={Posts.length} />

        {Posts.map((post) => {
          return (
            <SinglePost
              UpdatePost={(data) => UpdatePost(data)}
              key={post._id}
              userID={UserData._id}
              post={post}
            />
          );
        })}
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );
}
const MyTheme = {
  colors: {
    backgroundColor: "transparent",
  },
};

const styles = StyleSheet.create({
  ScrollView: {
    height: 500,
    position: "absolute",
    top: 40,
    bottom: 0,
    width: "100%",
    height: Dimensions.get("window").height - 40,
  },
  mini_div: {
    alignItems: "center",
    backgroundColor: "#8888882e",
    padding: 10,
    borderRadius: 10,
  },
  friends_memes: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  user_info_2: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 10,
    borderColor: "#80808036",
  },
  container: {
    flex: 1,
  },
  user_info: {
    height: 215,
    borderRadius: 10,
    backgroundColor: "#00000057",
    margin: 20,
    alignItems: "center",
    marginTop: 100,
  },
  email: {
    color: "burlywood",
    fontSize: 15,
    fontWeight: "700",
  },
  username: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
  },
});

export default AnotherProfile;
