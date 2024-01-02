import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Condition } from "@/types";
import { colors } from "@/constants/colors";

type Props = {
  day: string;
  maxtemp_c: number;
  mintemp_c: number;
  condition: Condition;
  style?: any;
};

export const DayWeatherCard = ({
  day,
  maxtemp_c,
  mintemp_c,
  condition,
  style,
}: Props) => {
  return (
    <View
      style={StyleSheet.flatten([
        {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: Dimensions.get("window").width - 54,
          padding: 10,
          borderRadius: 14,
          // backgroundColor: colors.red(0.5),
        },
        style,
      ])}
    >
      <Text style={[styles.text, { width: 95 }]}>{day}</Text>
      <Image
        source={{ uri: "https:" + condition.icon }}
        style={{ width: 50, height: 50, marginRight: 10 }}
      />
      <Text style={[styles.text, { textAlign: "center", width: 75 }]}>Max. {maxtemp_c}&#176;</Text>
      <Text style={[styles.text, { textAlign: "center", width: 75 }]}>Min. {mintemp_c}&#176;</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white(0.8),
    // backgroundColor: colors.yellow(0.5),
  },
});
