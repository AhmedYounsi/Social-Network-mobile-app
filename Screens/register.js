import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ScrollView,
  TextInput,
  StatusBar,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ErrorMessage from "./components/ErrorMessage";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { getStatusBarHeight } from 'react-native-status-bar-height';
 
 

function register(props) {
  // STATE
  const [Loading, setLoading] = useState(false);
  const [MessageError, setMessageError] = useState(null);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [Token, setToken] = useState(null);
  const [Shift, setShift] = useState(false)
  // const navigation = useNavigation();

  useEffect(() => {
    setMessageError(null);
    console.log(getStatusBarHeight(true));
  }, []);

  const Register = async () => {
    setLoading(true);
    axios
      .post("https://api-insta-memes.herokuapp.com/signup", {
        email: Email,
        password: Password,
        username: Username
      })
      .then(async (res) => {
        setLoading(false);

        console.log(res.data.token);
        setToken(res.data.token);
        const token_stored = await AsyncStorage.setItem(
          "token",
          res.data.token
        );
        props.parentCallback(res.data.token);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
        setPassword("");
        setEmail("");
        setUsername("");
        setMessageError(err.response.data);
      });
  };

  const bindEmail = (text) => {
    setEmail(text);
    setMessageError(null);
  };
  const bindPassword = (text) => {
    setPassword(text);
    setMessageError(null);
  };
  const bindUsername = (text) => {
    setUsername(text);
    setMessageError(null);
  };

  const To_login = () => {
    return (
      <TouchableOpacity
        style={styles.btn_login}
        title="LOGIN"
        onPress={() => props.to_login_screen('login')}
      >
        <Text style={styles.btn_text}>you have an acount ?</Text>
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
          <Button onPress={() => Register()} title="Register" color="#b7521b" />
        </View>
      );
  };

  return (
     
     
    <View style={{ paddingHorizontal: 30, flex: 1 }}>
      <SafeAreaView style={styles.containe}>
        <View style={styles.title_view}>
          <FontAwesome5
            name="user"
            size={60}
            style={{ marginTop: 10 }}
            color="burlywood"
          />
          <View style={styles.title_flex}>
            <Text style={styles.title}>SIGN UP</Text>
            <To_login />
          </View>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <ErrorMessage ErrorMessage={MessageError} />

            <Text style={styles.label}>Username</Text>
            <TextInput
              value={Username}
              style={styles.input}
              onChangeText={(text) => bindUsername(text)}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              value={Email}
              style={styles.input}
              
              onChangeText={(text) => bindEmail(text)}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry={true}
              value={Password}
              style={styles.input}
              onFocus={()=>setShift(true)}
              onChangeText={(text) => bindPassword(text)}
            />
            <Loading_spinner style={styles.submit} />
          </View>
      </ScrollView>
      </SafeAreaView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  containe: {
    flex: 1,
  },

  text: {
    fontSize: 42,
  },
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
    marginBottom: 5,
  },
  btn_text: {
    textAlign: "center",
    color: "burlywood",
    fontWeight: "500",
  },
  btn_login: {
    marginTop: 0,
  },
  loading: {
    marginTop: 25,
    height: 35,
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
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

export default register;
