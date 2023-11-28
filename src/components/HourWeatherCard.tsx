import { Image, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { Condition } from "@/types";

type Props = {
  hour: string;
  temp_c: number;
  condition: Condition;
  style?: any;
};

export const HourWeatherCard = ({ hour, temp_c, condition, style }: Props) => {
  return (
    <View
      style={StyleSheet.flatten([{ flex: 1, alignItems: "center", }, style])}
    >
      <Text style={styles.text}>{hour}</Text>
      <Image
        source={{ uri: "https:" + condition.icon }}
        style={{ width: 60, height: 60, marginVertical: 4 }}
      />
      <Text style={styles.text}>{temp_c}&#176;</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white(0.8),
  },
});
