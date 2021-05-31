import React from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

// ICONS
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

 
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import Text_upload from "./Text_upload";
import {
  useFonts,
  Bangers_400Regular ,
} from '@expo-google-fonts/bangers';
function Header(props) {
  const navigation = useNavigation()
 

  let [fontsLoaded] = useFonts({
    Bangers_400Regular,
  });
  const logout =  () => {
    props.logout();
  };
  return (
    <LinearGradient
      start={[0, 0]}
      end={[1, 0]}
      style={[styles.header,styles.shadow3]}
      colors={["#ec8552", "#de6f68", "#d05981"]}
    >  
    
      {/* <Text style={styles.insta_title}>INSTA-MEMES</Text> */}
      <View style={{ marginLeft: "auto", flexDirection: "row"}}>
        
        <TouchableOpacity onPress={()=> navigation.navigate('Search')} style={styles.icons}>
          <FontAwesome  name="search" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Notifications", {
              itemId: 86,
              otherParam: "anything you want here",
            })
          }
          style={styles.icons}
        >
          <Ionicons name="notifications" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Messages")}
          style={styles.icons}
        >
        <FontAwesome name="comments" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> logout()} style={styles.icons}>
          
          <FontAwesome5 name="sign-out-alt" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default Header;

const elevationShadowStyle = (elevation) => {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 1,
    shadowRadius: 0.8 * elevation
  }
}



const styles = StyleSheet.create({
  insta_title:{
    fontFamily: 'Bangers_400Regular',
    fontSize:30,
    height:40,
    marginTop:-10
  },
  shadow3: elevationShadowStyle(20),
    Title:{
        fontSize: 22,
        marginLeft: 15,
        fontWeight: '600',
        color: "white"
    },
  header: {
    height: 40,
    alignItems:'center',
    flexDirection:'row',
    zIndex:10,
    
  },
  icons: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
