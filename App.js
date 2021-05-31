import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  Text,
  View,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotLogged from "./Screens/NotLogged";
import Logged from "./Screens/Logged";

function App(props) {
  const [isLoading, setLoading] = useState("true");
  const [Token, setToken] = useState(null);
const [Ready, setReady] = useState(false)
 
  const get_token = (token) => {
    setToken(token);
  };

  const get_stored_token = async () => {
    const token_stored = await AsyncStorage.getItem("token");
    if(token_stored) setToken(token_stored);

  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("connected_id");
    setToken(null);
  };
 
  useEffect(() => {
    get_stored_token(); 
  }, []);

 

  const Render_log = () => {
    
      if (Token) {
        return (
       <Logged Token={Token} logout={logout} />
        );
      } else {
        return(
          <View style={{flex:1}}>
          <NotLogged parentCallback={get_token} />
           </View>
        )
       
       
      }
     
    
  };

  return (
 
      <ImageBackground
        source={require("./assets/mm.jpg")}
        style={styles.image}
      >
        <View style={styles.view}>
          <Render_log />
        </View>
      </ImageBackground>
  );
}

// STYLES

const MyTheme = {
  colors: {
    backgroundColor: "red",
  },
};

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

export default App;
