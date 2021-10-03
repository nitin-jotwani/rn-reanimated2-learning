// Exploring worklet. Running on UI vs JS threads
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { runOnJS, runOnUI } from "react-native-reanimated";

export const Worklet = () => {
  const runOnUIThread = () => {
    "worklet";
    console.log("Inside runOnUIThread");
    return "from runOnUIThread worklet";
  };

  const runOnJSThread = () => {
    console.log("Inside runOnJSThread");
    return "from runOnJSThread";
  };

  const helloWorketFunc = (from) => {
    "worklet";
    console.log("from helloWorketFunc", from);
    const runOnUIResult = runOnUIThread();
    const runOnJSResult = runOnJSThread(); // will give err, as trying to exe on js on UI
    // const runOnJSResult = runOnJS(runOnJSThread)(); // will go inside js func but won't return result. As js exe is async & we're in UI thread which sync
    /* 
      Above const will give err, as it's trying to execute on UI thread
      Since, hellowWorklet is running in UI thread, it is expected invoking other func will be exe in UI thread. (in docs refer point 3 in information section)
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
