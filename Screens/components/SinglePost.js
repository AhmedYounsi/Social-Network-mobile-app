import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
// import Image from 'react-native-image-auto-height';
import Image from "react-native-scalable-image";
import { Col, Row, Grid } from "react-native-easy-grid";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import axios from "axios";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import CommentSection from "./CommentSection";
const socket = io("https://api-insta-memes.herokuapp.com");

function SinglePost(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const [LoadingImage, setLoadingImage] = useState(true);
  const [connected_id, setconnected_id] = useState(null);
  const [Comments, setComments] = useState([]);
  const [CommentText, setCommentText] = useState("");
  const [connected, setConnected] = useState(false);
  const [CommentSectionVisible, setCommentSectionVisible] = useState(false);

  const get_id = async () => {
    const connected_id = await AsyncStorage.getItem("connected_id");
    setconnected_id(connected_id);
  };

  useFocusEffect(
    React.useCallback(() => {
      get_id();
    }, [])
  );

  const comment = async (id) => {
    const connected_id = await AsyncStorage.getItem("connected_id");
    const data = {
      post_id: id,
      user_id: connected_id,
      CommentText,
    };
    setCommentText("");

    socket.emit("COMMENT", data);
  };

  const LikePost = async (id) => {
    const connected_id = await AsyncStorage.getItem("connected_id");
    const data = {
      post_id: id,
      user_id: connected_id,
    };
    props.UpdatePost(data);
  };

  return (
    <View style={styles.post}>
      {route.name == "Home" && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AnotherProfile", {
              UserID: props.post.posted_by_id,
            })
          }
        >
          <View style={styles.post_header}>
            <View style={styles.user_icon}>
              <FontAwesome name="user-circle-o" size={30} color="white" />
            </View>

            <Text style={styles.post_user}> {props.post.posted_by}</Text>
            <Text style={styles.post_date}> 23/05/2021</Text>
          </View>
        </TouchableOpacity>
      )}
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#2b2b2bb5",
          height: LoadingImage ? 300 : null,
        }}
      >
        <Image
          onLoadEnd={() => setLoadingImage(false)}
          resizeMode="contain"
          width={Dimensions.get("window").width * 0.8}
          source={{
            uri: props.post.images_url,
          }}
        />
      </View>

      <View style={styles.post_action}>
        <Grid style={{ height: "100%" }}>
          <TouchableOpacity onPress={() => LikePost(props.post._id)}>
            <Col
              style={
                props.post.likes.includes(connected_id)
                  ? styles.PostLiked
                  : styles.PostUnLiked
              }
              size={1}
            >
              <View style={styles.likes}>
                <AntDesign
                  name="like1"
                  size={25}
                  color={
                    props.post.likes.includes(connected_id)
                      ? "#e87f57"
                      : "#909090"
                  }
                  style={{  marginLeft:5,marginBottom: 2 }}
                />
                <Text
                  style={[
                    styles.count,
                    {
                      color: props.post.likes.includes(connected_id)
                        ? "#e87f57"
                        : "#909090",
                    },
                  ]}
                >
                  {props.post.likes.length}{" "}
                </Text>
              </View>
            </Col>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              !CommentSectionVisible
                ? setCommentSectionVisible(true)
                : setCommentSectionVisible(false)
            }
          >
            <Col
              style={
                props.post.comments.length > 0
                  ? styles.PostLiked
                  : styles.PostUnLiked
              }
              size={1}
            >
              <View style={{ paddingTop: 5 }} style={styles.comment}>
                <Ionicons
                  name="ios-chatbubble-ellipses-sharp"
                  size={25}
                  color={props.post.comments.length > 0 ? "#e87f57" : "#909090"}
                />

                <Text
                  style={[
                    styles.count,
                    {
                      color:
                        props.post.comments.length > 0 ? "#e87f57" : "#909090",
                    },
                  ]}
                >
                  {props.post.comments.length}
                </Text>
              </View>
            </Col>
          </TouchableOpacity>
          <Col
            style={{ alignItems: "flex-end", justifyContent: "center" }}
            size={3}
          >
            <View
              style={{ marginTop: -5, marginRight: 20 }}
              style={styles.downoald}
            >
              <MaterialIcons
                style={{ marginRight: 10 }}
                name="file-download"
                size={30}
                color="#909090"
              />
            </View>
          </Col>
        </Grid>
      </View>

      {CommentSectionVisible && (
        <CommentSection comments={props.post.comments} />
      )}

      <View style={styles.comment_input}>
        <TextInput
          style={styles.TextInput}
          multiline={true}
          placeholder="Comment..."
          placeholderTextColor={"#909090"}
          onChangeText={(text) => setCommentText(text)}
          value={CommentText}
        />
        <View style={{ width: "10%" }}>
          <TouchableOpacity onPress={() => comment(props.post._id)}>
            <MaterialCommunityIcons
              style={{ marginLeft: "auto" }}
              name="square-edit-outline"
              size={30}
              color="#909090"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SinglePost;

const styles = StyleSheet.create({
  PostUnLiked: {
    justifyContent: "center",
    paddingHorizontal:10,
    alignItems: "center",
  },
  PostLiked: {
    paddingHorizontal:10,
    alignItems: "center",
    borderBottomColor: "#e87f57",
    borderBottomWidth: 3,
    justifyContent: "center",
  },
  TextInput: {
    width: " 90%",
    height: 40,
    backgroundColor: "#7979792b",
    borderRadius: 16,
    color: "white",
    paddingHorizontal: 15,
  },
  comment_input: {
    backgroundColor: "#00000026",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 20,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
  likes: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    color: "#909090",
    fontSize: 17,
    marginLeft: 5,
    fontWeight: "700",
  },
  post: {
    marginTop: 50,
    width: "100%",
    backgroundColor: "#0000009c",
  },
  post_header: {
    height: 40,
    backgroundColor: "#131313",

    alignItems: "center",
    flexDirection: "row",
  },
  user_icon: {
    marginHorizontal: 10,
  },
  post_date: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: "auto",
    marginRight: 10,
  },
  post_user: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  image: {
    height: 400,
    flex: 1,
  },
  post_action: {
    height: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  downoald: {
    justifyContent: "flex-end",
  },
});
