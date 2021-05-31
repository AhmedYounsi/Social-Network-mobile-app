

import React , {useRef, useEffect} from 'react'
import { ScrollView, Text, View ,StyleSheet } from 'react-native'
 
import io from "socket.io-client";
const socket = io("https://api-insta-memes.herokuapp.com");


function CommentSection(props) {

    const scrollViewRef = useRef();
  
    useEffect(() => {
        scrollViewRef.current.scrollToEnd({ animated: true })
    }, [props.height])


    
    return (
      <>
          <ScrollView style={{padding:10,backgroundColor:'#00000075',height:props.height}} 
    ref={scrollViewRef}
    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
       
        {
        props.comments.map((data) => {
            return (
            <View style={styles.comment} key={data._id}>
                 <Text style={styles.username}>{ data.user.username}</Text>  
             <Text style={styles.comment_text}>{data.comment}</Text> 
            </View>
            )
          })
        }     
      </ScrollView >

      </>
    )
}


const styles = StyleSheet.create({
    // comment:{
    //     paddingHorizontal:10,
    //     paddingVertical:3,
    //     borderRadius:10,
    //     backgroundColor:'#272727b5',
    //     marginBottom:7
    // },
    // username:{
    //     color:'white',
        
    //     width:'max-content',
     
    // },
    // comment_text:{
    //     color:'#afafaf',
    //     paddingLeft:10,
    //     paddingBottom:5,
    //     width:'max-content',
    // }
})

export default CommentSection
