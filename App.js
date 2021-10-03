import React from "react";
import { StyleSheet, View } from "react-native";
import { SharedValue } from "./src/learning/sharedValue";
import { SharedValueVsJsThread } from "./src/learning/sharedValueVsJsThread";
import { DerivedValue } from "./src/learning/useDerivedValue";
import { Worklet } from "./src/learning/worklet";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <SharedValue /> */}
      {/* <SharedValueVsJsThread /> */}
      {/* <Worklet /> */}
      <DerivedValue />
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
