import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  FlatList,
  Text,
  View,
  Button,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Profile from "./Profiles/Profile";
import Home from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./components/Mytabs";
import AnotherProfile from "./Profiles/AnotherProfile";
import Notifications from "./Notifications";
import Messages from "./Messages";
import Header from "./components/Header";
import Search from "./Search";

const Stack = createStackNavigator();

function Logged(props) {
  const logout = async () => {
    props.logout();
  };
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
     
      <View style={{ flex: 1 }}>
     
        <NavigationContainer theme={MyTheme}>
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
            <Stack.Screen name="Home">
              {() => <MyTabs Token={props.Token} logout={logout} />}
            </Stack.Screen>
            <Stack.Screen name="AnotherProfile" >
            {() => 
            
              <AnotherProfile />
        
            }
              </Stack.Screen>
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Messages" component={Messages} />
            <Stack.Screen name="Search" component={Search} />
     
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}

// STYLES
const MyTheme = {
  colors: {
    backgroundColor: "transparent",
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

export default Logged;
