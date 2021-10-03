// Demonstrating Derived value. How it updates with change in shared value.
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const DerivedValue = () => {
  const box1SharedValue = useSharedValue(0);
  const box2DerivedValue = useDerivedValue(() => {
    return box1SharedValue.value * 2;
  });
  const box1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: box1SharedValue.value,
      },
    ],
  }));
  const box2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: box2DerivedValue.value,
      },
    ],
  }));
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          box1SharedValue.value = withTiming(300, { duration: 5000 });
        }}
      >
        <View>
          <Animated.View style={[styles.box1, box1AnimatedStyle]} />
          <Animated.View style={[styles.box2, box2AnimatedStyle]} />
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
