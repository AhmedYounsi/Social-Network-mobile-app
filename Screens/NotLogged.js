import React, { useEffect, useState } from "react";
import {
  StyleSheet,
} from "react-native";
import Register from "../Screens/register";
import Login from "../Screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import Logo from "../Screens/components/Logo";
// const Stack = createStackNavigator();



function NotLogged(props) {
  const [isLoading, setLoading] = useState("true");
  const [Token, setToken] = useState(null);
  const [LoginRegister, setLoginRegister] = useState('login')

  const parentCallback = (token) => {
    props.parentCallback(token);
  };

  const get_stored_token = async () => {
    const token_stored = await AsyncStorage.getItem("token");
    setToken(token_stored);
  };

   const to_register_sreeen = (data) =>{
    setLoginRegister(data)
   }

   const to_login_screen = (data) =>{
    setLoginRegister(data)
  }
  
  useEffect(() => {
    get_stored_token();
  }, []);

    return(
        
        <>
          <Logo />

      
      {
      LoginRegister == 'login' ?  <Login parentCallback={parentCallback} to_register_sreeen={to_register_sreeen} /> :
      <Register parentCallback={parentCallback}  to_login_screen={to_login_screen} />
      }
      

          {/* <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
              screenOptions={{
                cardStyleInterpolator: ({
                  index,
                  current,
                  next,
                  layouts: { screen },
                }) => {
                  const translateX = current.progress.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [screen.width, 0, 0],
                  });

                  const opacity = next?.progress.interpolate({
                    inputRange: [0, 1, 1],
                    outputRange: [1, 0, 0],
                  });

                  return {
                    cardStyle: { opacity, transform: [{ translateX }] },
                  };
                },
                headerShown: false,
              }}
            >
 
              <Stack.Screen name="Login">
                
                {() => <Login parentCallback={parentCallback} />}
              </Stack.Screen>
              <Stack.Screen name="Register">
                {() => <Register parentCallback={parentCallback} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer> */}
        </>
    )
 
 
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

export default NotLogged;
