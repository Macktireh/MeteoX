import { ScrollView, Dimensions } from "react-native";

import { colors } from "@/constants/colors";
import { organizeWeatherAllHourData } from "@/utils";
import { Weather } from "@/types";
import { HourWeatherCard } from "@/components/HourWeatherCard";

type Props = {
  weather: Weather;
};

export const ListHours: React.FC<Props> = ({ weather }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
      style={{
        flexDirection: "row",
        paddingHorizontal: 12,
        backgroundColor: colors.gray(0.5),
        borderRadius: 16,
        width: Dimensions.get("window").width - 30,
        height: 150,
      }}
    >
      {organizeWeatherAllHourData(
        weather.forecast.forecastday[0].hour,
        weather.forecast.forecastday[1].hour,
        weather.current.last_updated
      )
        .slice(0, 25)
        .map((hour, index) => (
          <HourWeatherCard
            key={hour.time}
            hour={hour.hour}
            temp_c={Math.round(hour.temp_c)}
            condition={hour.condition}
            style={{
              marginLeft: index !== 0 ? 8 : 0,
              marginRight: index !== 0 ? 8 : 0,
            }}
          />
        ))}
    </ScrollView>
  );
};
