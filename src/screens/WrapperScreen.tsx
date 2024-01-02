import React, { PropsWithChildren } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

type PropsType = PropsWithChildren<{
  children: React.ReactNode;
}>;

export const WrapperScreen: React.FC<PropsType> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/bg.png")}
        style={[styles.image]}
        blurRadius={80}
      />
      <StatusBar style="light" />
      <SafeAreaView style={{ display: "flex", flex: 1 }}>
        {children}
      </SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
