import React from "react";
import { StyleSheet, Text, View } from "react-native";


const Title = props => {
  return (<View style={styles.container}>
    <Text style={styles.title}> Clean Checks App </Text>
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Cochin",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Title