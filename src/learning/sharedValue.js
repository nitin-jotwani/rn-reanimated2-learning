// What is shared value & how to use
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const SharedValue = () => {
  const test = useSharedValue(0);
  const boxAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: test.value,
      },
    ],
  }));
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          test.value = withTiming(300, { duration: 500 });
        }}
      >
        <Animated.View style={[styles.box, boxAnimatedStyle]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 6,
    backgroundColor: "red",
  },
});
