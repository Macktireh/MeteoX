import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { colors } from "@/constants/colors";

export const ButtonBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
          onPress={() => navigation.navigate("Root")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            marginBottom: 8,
            backgroundColor: colors.white(0.2),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome name="arrow-left" size={20} color={colors.white(0.8)} />
        </TouchableOpacity>
  );
};