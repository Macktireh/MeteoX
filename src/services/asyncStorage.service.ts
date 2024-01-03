import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageService {
  static async get(key: string) {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  }

  static async set(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
}
