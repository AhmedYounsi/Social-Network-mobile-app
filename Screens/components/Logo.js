import React from 'react'
import {
    StyleSheet,
    Image,
 
    Text,
    View,
  } from "react-native";
function Logo() {
    return (
        <View  style={styles.content_logo}>
       
        <Image
          style={styles.tinyLogo}
       source={require("../../assets/icon-app.png")}
      />
         {/* <Text style={styles.text_logo}>InstaMEMES</Text> */}
        </View>
    )


    
}

const styles = StyleSheet.create({
    text_logo:{
     color:'orange',
     fontSize:20,
     fontFamily:'fantasy'
    },
    content_logo:{
      marginTop:40,
      marginBottom:10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tinyLogo: {
    
      width: 50,
      height: 50,
 
    },
})
export default Logo
