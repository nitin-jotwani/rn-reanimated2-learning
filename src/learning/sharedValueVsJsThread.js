// Demonstrating Shared Value vs JS thread. How it works in UI thread
import React from "react";
import {
  Text,
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
  const testWorklet = () => {
    "worklet";
    test.value = withTiming(200, { duration: 5000 });
  };
  const testJS = () => {
    RNAnimated.timing(boxColorAnimationValue, {
      toValue: 200,
      duration: 5000,
    }).start();
  };
  const RNAnimatedStyle = {
    transform: [{ translateX: boxColorAnimationValue }],
  };
  return (
    <Animated.View>
      <TouchableOpacity
        onPress={() => {
          testWorklet();
          testJS();
        }}
      >
        <View>
          <RNAnimated.Text style={RNAnimatedStyle}>State Value</RNAnimated.Text>
          <Animated.Text
            style={useAnimatedStyle(() => ({
              transform: [
                {
                  translateX: test.value,
                },
              ],
            }))}
          >
            Shared Value
          </Animated.Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
