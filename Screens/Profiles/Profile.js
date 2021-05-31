import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute, useFocusEffect } from "@react-navigation/native";

import SinglePost from "../components/SinglePost";
import HeaderProfile from "./HeaderProfile";

import io from "socket.io-client";
const socket = io("https://api-insta-memes.herokuapp.com/");

import get_connected_user_api from "../../api/Get_profile_api";

function Profile(props) {
  const [Token, setToken] = useState(null);
  const [UserData, setUserData] = useState([]);
  const [Posts, setPosts] = useState([]);

  const [ProfileImage, setProfileImage] = useState("");
  const route = useRoute();

  const get_connected_user = async () => {
    console.log(await get_connected_user_api());
    setUserData(await get_connected_user_api());
  };

  const get_posts = async () => {
    const token_stored = await AsyncStorage.getItem("token");
    setToken(token_stored);
    axios
      .get("https://api-insta-memes.herokuapp.com/PostUser", {
        headers: {
          Authorization: token_stored,
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const { itemId, otherParam } = route.params;
  const logout = () => {
    props.logout();
  };
  useEffect(() => {
    get_posts();
  }, [UserData]);
  useFocusEffect(
    React.useCallback(() => {
      get_connected_user();

      // return () => {

      // };
    }, [])
  );

  const UpdatePost = async (data) => {
    socket.emit("LIKE_POST", data);
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
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      socket.once("LIKE_POST", async (data) => {
        
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
 

  return (
    <View style={styles.container}>
      <Header logout={logout} />

      <ScrollView>
        <HeaderProfile UserData={UserData} Posts_length={Posts.length} />

        {Posts.map((post) => {
          return (
            <SinglePost
              UpdatePost={(data) => UpdatePost(data)}
              userID={UserData._id}
              key={post._id}
              post={post}
            />
          );
        })}
        <View style={{ height: 100 }}></View>
      </ScrollView>
      {/* <FlatList
      ListHeaderComponent={
        <Header_Profile />
      }
        data={Posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <SinglePost post={item} />}
      /> */}
    </View>
  );
}

const shadowStyle = {
  shawdowOpacity: 0.5,
  shadowRadius: 20,
  shadowColor: "red",
};

const styles = StyleSheet.create({
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

export default Profile;
