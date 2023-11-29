import { Condition, Forecast, Forecastday, Hour } from "@/types";

type HourData = {
  time: string;
  hour: string;
  temp_c: number;
  condition: Condition;
};

type DayData = {
  day: string;
  maxtemp_c: number;
  mintemp_c: number;
  condition: Condition;
  hours: HourData[];
};

export default function organizeWeatherHourData(data: Hour[]): HourData[] {
  const organizedData: HourData[] = [];

  let nowAdded = false;
  // const currentHour = 7;
  const currentHour = new Date().getHours();

  for (const entry of data) {
    const hour = new Date(entry.time).getHours();

    if (hour >= currentHour) {
      if (!nowAdded) {
        organizedData.push({
          ...entry,
          hour: "Now",
        });
        nowAdded = true;
      } else {
        organizedData.push({
          ...entry,
          hour: `${hour < 10 ? `0${hour}` : hour}h`,
        });
      }
    }
  }

  return organizedData;
}

export function organizeWeatherAllHourData(data1: Hour[], data2: Hour[]): HourData[] {
  const hours = organizeWeatherHourData(data1);
  
  for (const entry of data2) {
    const hour = new Date(entry.time).getHours();
    hours.push({
      ...entry,
      hour: `${hour < 10 ? `0${hour}` : hour}h`,
    });
  }

  return hours;
}

export function getDayNameFromDate(dateString: string, locale: string = "en"): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  const dayName = date.toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", options);
  // console.log(dayName);
  if (locale === "en") {
    return dayName.split(',')[0];
  } else {
    return dayName.split(' ')[0];
  }
}

export const isFunction = (functionToCheck: any) => {
	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
