import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  useFonts,
  Bangers_400Regular ,
} from '@expo-google-fonts/bangers';
import AppLoading from 'expo-app-loading';

export default function Text_upload() {
//   const [loaded] = useFonts({
//     Montserrat: require('../../assets/Bangers-Regular.ttf'),
//   });

let [fontsLoaded] = useFonts({
  Bangers_400Regular,
});

  return (
    
      fontsLoaded &&
      <Text
      style={{
        fontSize:60,
        // fontFamily: "fantasy",
        fontFamily: 'Bangers_400Regular',
        textAlign: "center",
        margin: 15,
        marginTop:0,
        color: "wheat",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
      }}
    >
      UPLOAD OR CREATE NEW MEMES !
    </Text>
   
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
