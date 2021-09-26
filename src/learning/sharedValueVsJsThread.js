// Demonstrating Shared Value vs JS thread. How it works in UI thread
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated as RNAnimated,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { jsThreadBusy } from "../utils/jsThreadBusy";

export const SharedValueVsJsThread = () => {
  const test = useSharedValue(0);
  const boxColorAnimationValue = new RNAnimated.Value(0);
  jsThreadBusy(true);
  const boxAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: test.value,
      },
    ],
  }));
  const RNAnimatedStyle = {
    transform: [{ translateX: boxColorAnimationValue }],
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          test.value = withTiming(300, { duration: 5000 });
          RNAnimated.timing(boxColorAnimationValue, {
            toValue: 300,
            duration: 5000,
          }).start();
        }}
      >
        <View>
          <Animated.View style={[styles.box1, boxAnimatedStyle]} />
          <RNAnimated.View style={[styles.box2, RNAnimatedStyle]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  box1: {
    width: 100,
    height: 100,
    borderRadius: 6,
    backgroundColor: "red",
  },
  box2: {
    width: 100,
    height: 100,
    borderRadius: 6,
    backgroundColor: "blue",
  },
});
