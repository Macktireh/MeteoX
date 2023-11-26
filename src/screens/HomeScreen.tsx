import { StyleSheet, View, Text, Platform } from "react-native";

import { WrapperScreen } from "@/screens/WrapperScreen";

export const HomeScreen = () => {
  return (
    <WrapperScreen>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 48,
            fontWeight: "bold",
            textAlign: "center",
            color: "red",
          }}
        >
          Home Screen
        </Text>
      </View>
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: Platform.OS === "android" ? 50 : 20,
    marginHorizontal: 8,
  },
});
