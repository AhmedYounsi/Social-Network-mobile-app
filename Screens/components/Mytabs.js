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
          name="Home"
            options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <>
                <MaterialCommunityIcons
                  size={focused ? 42 : 38}
                  name="home-circle-outline"
                  color={focused ? "#ea8255" : "#b9b9b9"}
                />
              </>
            ),
          }}
        >
          {() => <Home logout={logout} />}
        </Tab.Screen>
        <Tab.Screen
          name="NewPost"
          options={{
            tabBarLabel: "NewPost",
            tabBarIcon: ({ focused }) => (
              <LinearGradient
                start={[0, 0]}
                end={[1, 0]}
                style={styles.GradientPlus}
                colors={["#ec8552", "#de6f68", "#d05981"]}
              >
                <MaterialIcons
                style={{marginLeft:3}}
                  name="add-photo-alternate"
                  size={30}
                  color={ "white"  }
                  
                />
              </LinearGradient>
            ),
          }}
        >
          {() => <NewPost />}
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="user-circle-o"
                size={focused ? 33 : 27}
                color={focused ? "#ea8255" : "#b9b9b9"}
              />
            ),
          }}
        >
          {() => <Profile logout={logout} Token={props.Token} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

const tab_style = {
  // shadowColor: "white",
  // shadowOffset: { width: 0, height: 2 },
  // shadowOpacity: 0.8,
  // shadowRadius: 40,
  // elevation: 0,
  backgroundColor: "#151515d1",
  borderColor: '#636363',
 
};

const styles = StyleSheet.create({
  GradientPlus: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
 
  },
});

export default Mytabs;
