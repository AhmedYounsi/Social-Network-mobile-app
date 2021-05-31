import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home";
import Profile from "../Profiles/Profile";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewPost from "../NewPost";
import { AntDesign } from "@expo/vector-icons";
import AnotherProfile from "../Profiles/AnotherProfile";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

function Mytabs(props) {
  const logout = () => {
    props.logout();
  };

  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            ...tab_style,
          },
        }}
      >
        <Tab.Screen
          name="AnotherProfile"
            options={{
            tabBarLabel: "AnotherProfile",
            tabBarIcon: ({ focused }) => (
              <>
                <MaterialCommunityIcons
                  size={focused ? 45 : 40}
                  name="home-circle-outline"
                  color={focused ? "#ea8255" : "#b9b9b9"}
                />
              </>
            ),
          }}
        >
          {() => <AnotherProfile  />}
        </Tab.Screen>
       
      </Tab.Navigator>
    </>
  );
}

const tab_style = {
  shadowColor: "white",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 40,
  // bottom: 20,
  // left: 20,
  // right: 20,
  elevation: 0,
  backgroundColor: "#151515d1",
  // borderRadius: 15,
  // height: 60,
  border: "none",
};

const styles = StyleSheet.create({
  GradientPlus: {
    width: 50,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },
});

export default Mytabs;
