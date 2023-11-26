import { StyleSheet, View, Platform, Text } from "react-native";
import { NavigationProp } from "@react-navigation/native";

import { WrapperScreen } from "@/screens/WrapperScreen";

type Props = {
  route: any;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
};

export const SearchScreen = ({ route, navigation }: Props) => {
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
          Search Screen
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
