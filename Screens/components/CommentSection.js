import React ,{useEffect,useRef} from 'react'
import { ScrollView, Text, View,StyleSheet, TouchableWithoutFeedback } from 'react-native'

export default function CommentSection(props) {


    const scrollViewRef = useRef();
  
    useEffect(() => {
      
       
        
    }, [props.height]) 


    return (
        <ScrollView style={{padding:10,backgroundColor:'#00000075',maxHeight:200}} 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef?.current.scrollToEnd({ animated: true })}
        nestedScrollEnabled
        >
            {
            props.comments.map((data) => {
                return (
                    <TouchableWithoutFeedback key={data._id}>
                    <View style={styles.comment} >
                    <Text style={styles.username}>{ data.user.username}</Text>  
                <Text style={styles.comment_text}>{data.comment}</Text> 
               </View>
               </TouchableWithoutFeedback>
                )
              })
            }     
         
          </ScrollView >
    )
}



const styles = StyleSheet.create({
    comment:{
        paddingHorizontal:10,
        paddingVertical:3,
        borderRadius:10,
        backgroundColor:'#272727b5',
        marginBottom:7
    },
    username:{
        color:'white',    
    },
    comment_text:{
        color:'#afafaf',
        paddingLeft:10,
        paddingBottom:5,
    }
})
