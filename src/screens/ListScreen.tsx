import { WrapperScreen } from "@/screens/WrapperScreen";
import { StyleSheet, Text, View, Platform } from "react-native";

export const ListScreen = () => {
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
          List Screen
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
