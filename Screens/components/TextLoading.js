import React from 'react'
import { View,StyleSheet } from 'react-native'

function TextLoading({width,height,marginTop}) {
   
    return (
     <View style={{   
          
        width:width, height:height,
        backgroundColor:'#8888882e',
        borderRadius:25,
        marginTop:marginTop
        }}>

     </View>
    )
}


const styles = StyleSheet.create({
    TextLoading:{
        height:23,
        backgroundColor:'#8888882e',
        borderRadius:25
    }
})

export default TextLoading
