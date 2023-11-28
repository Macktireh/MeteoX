import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { colors } from "@/constants/colors";

export const SearchBarIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Search")}
      style={{
        width: 40,
        height: 40,
        borderRadius: 50,
        marginLeft: "auto",
        backgroundColor: colors.white(0.2),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesome name="search" size={20} color={colors.white(0.8)} />
    </TouchableOpacity>
  );
};
