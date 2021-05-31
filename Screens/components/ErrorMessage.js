import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ErrorMessage(props) {
  const Error = () => {
    if (props.ErrorMessage) {
      return <Text style={styles.errorMSG}>{props.ErrorMessage}</Text>;
    } else {
      return <Text></Text>;
    }
  };

  return <Error />;
}

const styles = StyleSheet.create({
  errorMSG: {
    backgroundColor: "#ef7575",
    textAlign: "center",
    color: "white",
    marginBottom: 10,
  },
});
