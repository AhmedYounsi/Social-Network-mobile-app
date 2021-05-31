import React, { useEffect, useState , useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Button,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native";
import HeaderBack from "./HeaderBack";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import { database, messageRef } from "../api/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from '@expo/vector-icons'; 

function Notifications() {
  // const [messageRef, setmessageRef] = useState(null);
  const [data, setdata] = useState([]);
  const [ChatMessage, setChatMessage] = useState('')
  const [connected_id, setconnected_id] = useState(null)
  const [up_msg, setup_msg] = useState([])

  const get_id = async () => {
    const connected_id = await AsyncStorage.getItem("connected_id");
    setconnected_id(connected_id);
  };
   
  const flatList = useRef();
const offset = useRef()
  const arr = [];

  useEffect(() => {}, []);
get_id()
 

  useFocusEffect(
    React.useCallback(() => {
      messageRef.on("child_added", () => {
        get_all();
      });
     

    }, [])
  );

  function add_firebase() {
   
    let snap = []
    let id = null
    messageRef.on("value", function(snapshot) {
      snapshot.forEach(function (keysSnapshot) {
      if(keysSnapshot.val().id == 123)
   
        id = keysSnapshot.key
        snap = keysSnapshot.val().msg
     
      snap.push({ username : connected_id,  message : ChatMessage}) 
  
   return
      });
 
    
     
  });
   const data = [
    { username : connected_id,  message : ChatMessage}
   ]
  if(!id)
  {
    messageRef.push({id : 123 ,msg: data,last_sender:connected_id})
    setChatMessage('')
    return
  }
else{
  messageRef.child(id).update({msg: snap,last_sender:connected_id})
  setChatMessage('')
}

    // let snap = []
    // messageRef.child("-MaQnKIzeONWh8BmBSLs").on("value", function (snapshot) {
     
    //     snap = snapshot.val().msg
    //   snap.push({ username : connected_id,  message : ChatMessage})   
    
    // });
    // messageRef.child("-MaQnKIzeONWh8BmBSLs").update({msg: snap})
    
    // flatlistRef.current.scrollToOffset({ animated: false, offset: offset })
  }

  // const get_by = () =>{
  //   messageRef.child('-MaQnKIzeONWh8BmBSLs/msg')
  //   .orderByChild('message').equalTo('tttttt')
  //   .on("value", function(snapshot) {
  //     console.log(snapshot.val());
     
  // });
  // }
  
  const get_all = () => {
    let array = [];
    messageRef.on("value", function(snapshot) {
      snapshot.forEach(function (keysSnapshot) {
      if(keysSnapshot.val().id == 123)
      console.log(keysSnapshot.val().msg)
      array = keysSnapshot.val().msg
      
      setdata(array);
       return
      });
 
     
  });
  };

  const route = useRoute();
  const [isInView, setIsInView] = useState(false);

  const windowHeight = Dimensions.get("window").height;
  return (
    <>
      <HeaderBack HeaderName="Notifications" />

      {/* <Text> {arr[0].id} </Text> */}

      <FlatList
        style={{
         
          paddingVertical:10,
          paddingHorizontal:15,
          maxHeight: windowHeight - 90,
          position: "absolute",
          top: 40,
          bottom: 0,
          width:"100%"
        }}
        
        ListFooterComponent={() => <View   ref={offset} style={{height:50}}></View> }
        ref={flatList}
        onContentSizeChange={() => flatList.current.scrollToEnd({animated: true})}
        onLayout={() => flatList.current.scrollToEnd({animated: true})}
        
  
        data={data}
        keyExtractor={(item,i) => item?.message.toString()}
        
        renderItem={({ item,index }) => 
        <View style={ data[index - 1] && (data[index].username != data[index - 1].username) ? styles.padd : '' }>
        <View style={ item.username == connected_id ? styles.msg_text_send : styles.msg_text_recieve} >
        <Text  style={{color:'white'}} >{item?.message}</Text>
     </View>
   
    
     </View>
      }
      />
      <View style={styles.chat}>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Meesage..."
          placeholderTextColor={"#909090"}
          value={ChatMessage}
          onChangeText={(text) => setChatMessage(text)  }
        />
       
       <TouchableOpacity  style={styles.btn_send} onPress={() => add_firebase()}>
       <FontAwesome name="send" size={24} color="black" />
       </TouchableOpacity>
      </View>

      {/* <Button title="get all" onPress={() => get_all()} /> */}
    </>
  );
}

export default Notifications;

const styles = StyleSheet.create({
  btn_send:{
width:"15%",backgroundColor:'#da697075',height:50,justifyContent:'center',alignItems:'center',
  },
  padd:{
   marginTop:15
  },
  msg_text_send:{
     backgroundColor:'#0808088a',
     marginRight:'auto',
     borderRadius:20,
     alignSelf: 'center', padding: 12,
     marginBottom:5,
     maxWidth:'80%'
     
  },
  msg_text_recieve:{
    backgroundColor:'#ffffff26',
    marginLeft:'auto',
    borderRadius:20,
    alignSelf: 'center', padding: 12,
    marginBottom:5,
    maxWidth:'80%'

 },
  input: {
    height:50,
    width: "100%",
    backgroundColor: "#000000ab",
    color: "white",
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chat: {
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    bottom: 0,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    height: 150,
  },
  header: {
    height: 50,
  },
  icons: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
