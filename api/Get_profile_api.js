import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const get_connected_user_api = async () => {
  const token = await AsyncStorage.getItem("token");

  try {
    const res = await axios.get(
      "https://api-insta-memes.herokuapp.com/get_profile",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.data;
  } catch {}
};
export default get_connected_user_api;
