import React from "react";
import { StyleSheet, View } from "react-native";
import { SharedValue } from "./src/learning/sharedValue";
import { SharedValueVsJsThread } from "./src/learning/sharedValueVsJsThread";

export default function App() {
  return (
    <View style={styles.container}>
      <SharedValue />
      {/* <SharedValueVsJsThread /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
