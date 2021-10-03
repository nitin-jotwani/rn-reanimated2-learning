// Exploring worklet. Running on UI vs JS threads
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { runOnJS, runOnUI } from "react-native-reanimated";

export const Worklet = () => {
  const runOnUIThread = () => {
    "worklet";
    return "from runOnUIThread worklet";
  };
  const runOnJSThread = () => {
    return "from runOnJSThread";
  };
  const helloWorketFunc = (from) => {
    "worklet";
    console.log("from helloWorketFunc", from);
    const runOnUIResult = runOnUIThread();
    const runOnJSResult = runOnJSThread();
    /* 
      Above const will give err, as it's trying to execute on UI thread
      Since, hellowWorklet is running in UI thread, it is expected invoking other func will be exe in UI thread.
      So, if other func is not marked as 'worklet' will get err.
      Two options to resolve this:
      - Mark func as worklet
      - Inform reanimated that it is to be executed on JS thread by wrapping in runOnJS
        Eg. const runOnJSResult = runOnJS(runOnJSThread)();
     */
    console.log("Run On UI Result:", runOnUIResult);
    console.log("Run On JS Result:", runOnJSResult);
    /*
      runOnUIResult will be available as it's executed synchronously on UI thread
      runOnJSResult will be undefined as this will be executed on React Native JS thread. 
    */
  };
  return (
    <TouchableOpacity
      onPress={() => {
        runOnUI(helloWorketFunc)("using runOnUI");
      }}
    >
      <Text>Testing Worklet</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
