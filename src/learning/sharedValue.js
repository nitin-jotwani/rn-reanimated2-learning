// What is shared value & how to use
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const SharedValue = () => {
  const test = useSharedValue(0);
  return (
    <Animated.View>
      <TouchableOpacity
        onPress={() => {
          test.value = withTiming(200, { duration: 500 });
        }}
      >
        <View>
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
