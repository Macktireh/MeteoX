import { Image, Text, View } from "react-native";

import { Weather } from "@/types";

type Props = {
  weather: Weather;
};

export const WeatherInfo: React.FC<Props> = ({ weather }) => {
  return (
    <>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
        }}
      >
        {weather.location.name}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
        }}
      >
        {weather.location.country}
      </Text>
      <Image
        source={{ uri: "https:" + weather.current.condition.icon }}
        style={{ width: 80, height: 80, marginVertical: 8 }}
      />
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
        }}
      >
        {Math.round(weather.current.temp_c)}&#176;
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginVertical: 12,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          Max. {Math.round(weather.forecast.forecastday[0].day.maxtemp_c)}
          &#176;
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          Min. {Math.round(weather.forecast.forecastday[0].day.mintemp_c)}
          &#176;
        </Text>
      </View>
    </>
  );
};
