import { ScrollView, Dimensions } from "react-native";

import { colors } from "@/constants/colors";
import { DayWeatherCard } from "@/components/DayWeatherCard";
import { Weather } from "@/types";
import { getDayNameFromDate } from "@/utils";

type Props = {
  weather: Weather;
};

export const ListDays: React.FC<Props> = ({ weather }: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: "space-around",
      }}
      style={{
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 12,
        backgroundColor: colors.gray(0.5),
        borderRadius: 20,
        width: Dimensions.get("window").width - 30,
        height: 210,
        marginTop: 16,
        padding: 10,
      }}
    >
      {weather.forecast.forecastday.map((day, index) => (
        <DayWeatherCard
          key={day.date}
          day={index === 0 ? "Today" : getDayNameFromDate(day.date, "fr")}
          maxtemp_c={Math.round(day.day.maxtemp_c)}
          mintemp_c={Math.round(day.day.mintemp_c)}
          condition={day.day.condition}
          style={{
            // marginTop: index !== 0 ? 5 : 0,
          }}
        />
      ))}
    </ScrollView>
  );
};
