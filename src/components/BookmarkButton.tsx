import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { colors } from "@/constants/colors";

type Props = {
  isBookmarked: boolean;
  onSave: () => void;
};

export const BookmarkButton: React.FC<Props> = ({ isBookmarked, onSave }) => {
  return (
    <TouchableOpacity
          onPress={onSave}
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            // marginBottom: 8,
            backgroundColor: colors.white(0.2),
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 'auto',
            position: 'absolute',
            right: 0,
            top: 0
          }}
        >
          <FontAwesome name={isBookmarked ? "bookmark" : "bookmark-o"} size={20} color={colors.white(0.8)} />
        </TouchableOpacity>
  );
};