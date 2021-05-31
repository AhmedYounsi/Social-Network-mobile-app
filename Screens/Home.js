import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  FlatList,
  Text,
  View,
  Image,
  Button,
  StatusBar,
  ScrollView,
  SafeAreaView,
  ListView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
  useRoute,
  useScrollToTop,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AnotherProfile from "./Profiles/AnotherProfile";
import SinglePost from "./components/SinglePost";
import Header from "./components/Header";
import SavedPostAlert from "./components/SavedPostAlert";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";

import io from "socket.io-client";
const socket = io("https://api-insta-memes.herokuapp.com/");


function Home(props) {
  const navigation = useNavigation();
  const Stack = createStackNavigator();
  const flatListRef = React.useRef();
  const route = useRoute();

  const [data, setData] = useState([]);
  const [Token, setToken] = useState(null);
  const [Posts, setPosts] = useState([]);
  const [SavedPost, setSavedPost] = useState(false);
  const [UserData, setUserData] = useState([]);

  

  
   

  useEffect(() => {
   
    if (route.params) {
      console.log(route.params?.posted);
      setSavedPost(route.params?.posted);
    }
  }, [route.params]);

  const get_connected_user = async () => {
    const token_stored = await AsyncStorage.getItem("token");
    axios
      .get("https://api-insta-memes.herokuapp.com/get_profile", {
        headers: {
          Authorization: token_stored,
        },
      })
      .then(async (res) => {
        const connected_id = await AsyncStorage.setItem(
          "connected_id",
          res.data._id
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const get_posts = async () => {
    const token_stored = await AsyncStorage.getItem("token");
    setToken(token_stored);
    axios
      .get("https://api-insta-memes.herokuapp.com/Get_Posts", {
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
  const get_token = (token) => {
    setToken(token);
  };

  const logout = async () => {
    setData([]);
    props.logout();
  };

  useFocusEffect(
    React.useCallback(() => {
     
      get_connected_user();
      get_posts();
     
       
          
    }, [])
  );

  const to_top = () => {
    get_posts();
    setSavedPost(false);
    flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
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

  return (
    <>
      <Header logout={logout} />

      {/* <SinglePost /> */}
      {SavedPost && <SavedPostAlert scroll_to_top={() => to_top()} />}

      <FlatList
        data={Posts}
        ListFooterComponent={<View style={{ height: 100 }}></View>}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <SinglePost
            UpdatePost={(data) => UpdatePost(data)}
            post={item}
          />
        )}
        ref={flatListRef}
      />
    </>
  );
}

// STYLES

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  view: {
    backgroundColor: "#2b2b2be3",

    flex: 1,
    justifyContent: "center",
  },
  container_auth: {
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
    flex: 1,
  },
  container: {
    marginTop: 10,
  },
  button: {},
});

export default Home;

{
  /*           
          <Button title='Single Post'
              onPress={() => navigation.navigate('AnotherProfile'  , {
                itemId: 86,
                otherParam: 'anything you want here',
              } )}
          />
         
          <Button
            style={styles.button}
            onPress={() => logout()}
            title="Logout"
          />
       
          <View style={styles.container}>
            <Button
              style={styles.button}
              onPress={() => get_users()}
              title="Fetch users iDs"
            />
           
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Text>{item._id} </Text>}
          />  */
}
