// hooks/useAsyncStorage.tsx
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsyncStorage = (
  key: string,
  initialValue: any = null,
  expirationMinutes: number | null = null
) => {
  const [storedValue, setStoredValue] = useState(
    async () => {
      const item = await AsyncStorage.getItem(key);
      if (item) {
        const parsedItem = JSON.parse(item);
        if (expirationMinutes && isExpired(parsedItem.createdAt, expirationMinutes)) {
          // Expired, remove the item
          await AsyncStorage.removeItem(key);
          return initialValue;
        }
        return parsedItem.value;
      } else {
        return initialValue;
      }
    }
  );

  const setValue = useCallback(
    async (value: any, neverExpire: boolean = false) => {
      try {
        const now = new Date();
        const expirationDate = neverExpire ? null : addMinutes(now, expirationMinutes || 0);

        const valueToStore = {
          value,
          createdAt: now.getTime(), // Use getTime() to get the timestamp
          expirationDate,
        };

        setStoredValue(valueToStore.value);
        await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    },
    [key, expirationMinutes]
  );

  // Helper function to check if a date is expired
  const isExpired = (createdAt: number, expirationMinutes: number) => {
    const expirationDate = addMinutes(new Date(createdAt), expirationMinutes);
    const now = new Date();
    return now > expirationDate;
  };

  // Helper function to add minutes to a date
  const addMinutes = (date: Date, minutes: number) => {
    return new Date(date.getTime() + minutes * 60000);
  };

  return { storedValue, setStoredValue: setValue };
};
