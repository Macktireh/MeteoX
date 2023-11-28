import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type props = {
  width: number;
  height: number;
  style?: any;
};

export const Skeleton = ({ width = 8, height = 8, style }: props) => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: width,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -width,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  })
  
  return (
    <View
      style={StyleSheet.flatten([
        { width, height, backgroundColor: "rgba(0,0,0,0.12)", overflow: "hidden" },
        style,
      ])}
    >
      <Animated.View style={{ width: "100%", height: "100%", transform: [{ translateX }] }}>
        <LinearGradient
          style={{ width: "100%", height: "100%" }}
          colors={["transparent", "rgba(0,0,0,0.06)", "transparent"]}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
};
