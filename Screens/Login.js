import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import axios from "axios";
import ErrorMessage from "./components/ErrorMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";

import { Entypo } from "@expo/vector-icons";

function Login(props) {
  const [Loading, setLoading] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Token, setToken] = useState(null);
  const [MessageError, setMessageError] = useState(null);

  // const navigation = useNavigation();

  useEffect(() => {
    setMessageError(null);
  }, []);

  const Login = async () => {
    setLoading(true);
    axios
      .post("https://api-insta-memes.herokuapp.com/login", {
        email: Email,
        password: Password,
      })
      .then(async (res) => {
        setLoading(false);
        Alert.alert("Logged in!");
        console.log(res.data);
        setToken(res.data.token);
        const token_stored = await AsyncStorage.setItem(
          "token",
          res.data.token
        );

        props.parentCallback(res.data.token);
      })
      .catch((err) => {
        setLoading(false);
        setPassword("");
        setEmail("");
        setMessageError(err.response.data);
      });
  };

  const emailInput = (text) => {
    setMessageError(null);
    setEmail(text);
  };
  const passwordInput = (text) => {
    setMessageError(null);
    setPassword(text);
  };

  const To_register = () => {
    return (
      <TouchableOpacity
        style={styles.btn_login}
        title="LOGIN"
        onPress={() => props.to_register_sreeen('register')}
      >
        <Text style={styles.btn_text}>Create an acount ?</Text>
      </TouchableOpacity>
    );
  };

  const Loading_spinner = () => {
    if (Loading)
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#b7521b" />
        </View>
      );
    else
      return (
        <View style={styles.submit}>
          <Button onPress={() => Login()} title="Login" color="#b7521b" />
        </View>
      );
  };

  return (

    <View style={{  paddingHorizontal:30,flex:1}}>
         
      <View style={styles.title_view} >
        <Entypo
          style={{ marginTop: 10 }}
          name="login"
          size={60}
          color="burlywood"
        />
        {/* <FontAwesome5 name="user" size={60} style={{marginTop:10}} color="burlywood" /> */}
        <View style={styles.title_flex}>
          <Text style={styles.title}>LOGIN</Text>
          <To_register />
        </View>
      </View>
      <ScrollView>
      <View style={styles.container}   >
        <ErrorMessage ErrorMessage={MessageError} />
        <Text style={styles.label}>Email or Username</Text>
        <TextInput
          value={Email}
          style={styles.input}
          onChangeText={(text) => emailInput(text)}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={Password}
          style={styles.input}
          onChangeText={(text) => passwordInput(text)}
        />
        <Loading_spinner style={styles.submit} />
      </View>
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  submit: {
    marginTop: 25,
  },
  title_flex: {
    marginLeft: 10,
  },
  title_view: {
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#c3c3c3",
    textAlign: "center",
    marginBottom: 10,
  },
  btn_text: {
    textAlign: "center",
    color: "burlywood",
    fontWeight: "500",
  },

  label: {
    color: "#c3c3c3",
    textAlign: "center",
    marginBottom: 10,
  },

  loading: {
    marginTop: 25,
    height: 35,
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
  },

  btn_login: {
    marginTop: 0,
  },
  container: {
    borderTopEndRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: "#0000005e",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 25,
    width: "100%",
    marginBottom: 10,
 

  },
  input: {
    color: "#c3c3c3",
    marginBottom: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
  },
  title: {
    color: "burlywood",
    fontWeight: "bold",

    fontSize: 40,
  },
});

export default Login;
