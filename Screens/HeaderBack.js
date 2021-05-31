import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

function HeaderBack(props) {
  const navigation = useNavigation();
  const [RouteName, setRouteName] = useState(null);
  const [SearchText, setSearchText] = useState("");
  useEffect(() => {
    setRouteName(props.route_name);
  }, []);
 
  const Change = (text) => {
    props.change(text);
    setSearchText(text);
  };

  return (
    <LinearGradient
      start={[0, 0]}
      end={[1, 0]}
      style={styles.header}
      colors={["#ec8552", "#de6f68", "#d05981"]}
    >
      <TouchableOpacity
        onPress={() => navigation.popToTop()}
        style={styles.icons}
      >
        <Ionicons name="chevron-back" size={30} color="white" />
      </TouchableOpacity>
     
      
     {/* SEARCH INPUT */}
      {RouteName == "Search" ? (
        <View style={styles.search}>
          {/* {SearchText.length == 0 && <Text style={styles.search_label}> Search ...</Text>} */}
          <TextInput
            placeholder="Search..."
            placeholderTextColor={'white'}
            value={SearchText}
            onChangeText={(text) => Change(text)}
            style={styles.input}
          />
        </View>
      ) :
       <View style={{ justifyContent: 'center', //Centered vertically
       alignItems: 'center', // Centered horizontally
       flex:1}}>

         <Text  style={{marginLeft:-50,color:'white',fontSize:18,fontWeight:'700'}}>{props.HeaderName}</Text>
       </View>
      }
        {/* SEARCH INPUT */}
      
    </LinearGradient>
  );
}

export default HeaderBack;
const styles = StyleSheet.create({
  header: {
    height: 40,
    flexDirection: "row",
  },
  icons: {
    height: 40,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: "white",
    height: "100%",
    borderRadius:15,
    borderColor: "white",
    paddingLeft: 10,
    fontSize: 15,
    backgroundColor:'#ffffff52'
  },
  search: {
    marginVertical: 7,
    width: "80%",
    fontWeight:'600'
  },
  search_label:{
    position:'absolute',
    bottom:6,
    color:'white',
    left:10,
    fontSize: 15,
    fontWeight:'600',
    zIndex:-3
   
  }
});
