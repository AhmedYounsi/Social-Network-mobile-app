import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import TextLoading from "../components/TextLoading";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

function HeaderProfile({ UserData, Posts_length }) {
  return (
    <>
      <View style={styles.user_info}>
        <View>
          {!UserData.username ? (
            <FontAwesome
              name="user-circle-o"
              size={130}
              color="burlywood"
              style={{ marginTop: -70 }}
            />
          ) : (
            <Image
              style={{
                width: 130,
                height: 130,
                marginTop: -70,
                borderRadius: 25,
              }}
              source={{
                uri: "https://res.cloudinary.com/dk27fusnr/image/upload/v1621596924/cyw4qzxnsfkdsie8d5be.jpg",
              }}
            />
          )}
        </View>

        {!UserData.username ? (
          <TextLoading height={23} width={180} marginTop={15} />
        ) : (
          <Text style={styles.username}> {UserData.username} </Text>
        )}

        {UserData?.email ? (
          <Text style={styles.email}> @{UserData._id} </Text>
        ) : (
          <TextLoading height={15} width={100} marginTop={5} />
        )}
        <View style={styles.user_info_2}>
          <View style={styles.mini_div}>
            <View style={styles.friends_memes}>
              <FontAwesome5
                name="user-friends"
                size={20}
                color="#d0d0d0"
                style={{ marginRight: 7 }}
              />
              <Text style={{ color: "#d0d0d0", fontWeight: "500" }}>
                Freinds
              </Text>
            </View>
            <Text style={{ color: "#d0d0d0", fontWeight: "500", fontSize: 20 }}>
              0
            </Text>
          </View>
          <View style={styles.mini_div}>
            <View style={styles.friends_memes}>
              <Entypo
                name="images"
                size={20}
                color="#d0d0d0"
                style={{ marginRight: 7 }}
              />
              <Text style={{ color: "#d0d0d0", fontWeight: "500" }}>Memes</Text>
            </View>
            <Text style={{ color: "#d0d0d0", fontWeight: "500", fontSize: 20 }}>
              {Posts_length ? Posts_length : 0}
            </Text>
          </View>
         
        </View>
      </View>
      {/* <Button style={{ shadowStyle }} title="Logout" onPress={() => logout()} />
     <Text>{UserData._id}</Text>
     <Text>{UserData.email}</Text> */}
    </>
  );
}

export default HeaderProfile;
const styles = StyleSheet.create({
  setting:{
    alignItems: "center",
  
    padding: 10,
    borderRadius: 10,
  },
  mini_div: {
    alignItems: "center",
    backgroundColor: "#8888882e",
    padding: 10,
    borderRadius: 10,
  },
  friends_memes: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  user_info_2: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 10,
    borderColor: "#80808036",
  },
  container: {
    flex: 1,
  },
  user_info: {
    height: 215,
    borderRadius: 10,
    backgroundColor: "#00000057",
    margin: 20,
    alignItems: "center",
    marginTop: 100,
  },
  email: {
    color: "burlywood",
    fontSize: 15,
    fontWeight: "700",
  },
  username: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
  },
});
