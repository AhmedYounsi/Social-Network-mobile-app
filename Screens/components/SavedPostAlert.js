import React from 'react'
import { Text, View,StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 

function SavedPostAlert(props) {
    return (
        <View style={styles.alert}>
   <View style={styles.alert_content}>
           <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={props.scroll_to_top}>
           <Ionicons name="ios-cloud-done" size={30} color="white" />
           <Text  style={styles.alert_text}>
               Memes uploaded successfully 
           </Text>
           </TouchableOpacity>
       </View>
        </View>
    
    )
}

export default SavedPostAlert
 

const styles = StyleSheet.create({
    alert:{
       flex:1,
       justifyContent:'center',
       alignItems:'center',
       position:'absolute',
       width:"100%",
       height:'100%',
       backgroundColor:"#000000cc",
       zIndex:1,
    },   
    alert_content:{
       width:"100%",
       justifyContent:'center',
       alignItems:'center',
       height:40,
       backgroundColor:'#dd6d6a'
    },
    alert_text:{
        color:'white',
        fontSize:15,
        marginLeft:15
    }
})