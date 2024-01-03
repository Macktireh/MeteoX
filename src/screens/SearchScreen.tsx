import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { WrapperScreen } from "@/screens/WrapperScreen";
import { WeatherService } from "@/services/weather.service";
import { SearchLocation } from "@/types";

export const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<SearchLocation[]>([]);
  const inputRef = useRef<TextInput | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigation = useNavigation();

  const handleClickSearch = async (payload: SearchLocation) => {
    const pushAction = StackActions.push("SearchResult", { payload });
    const popAction = StackActions.pop(1);
    navigation.dispatch(popAction);
    navigation.dispatch(pushAction);
  };

  useEffect(() => {
    if (searchText) {
      (async () => {
        try {
          const data = await WeatherService.fetchLocationByCity(searchText);
          setSearchResults(data);
        } catch (error) {}
      })();
    }
  }, [searchText]);

  useEffect(() => {
    if (inputRef.current) {
      timerRef.current = setTimeout(() => inputRef.current?.focus(), 500);
    }

    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <WrapperScreen>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            marginBottom: 8,
            backgroundColor: colors.white(0.2),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome name="arrow-left" size={20} color={colors.white(0.8)} />
        </TouchableOpacity>
        <View style={{ zIndex: 1, elevation: 1 }}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search"
              style={styles.input}
              placeholderTextColor={colors.white(0.8)}
              ref={inputRef}
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText && (
              <TouchableOpacity
                style={{ marginRight: 4 }}
                onPress={() => {
                  setSearchText("");
                }}
              >
                <FontAwesome name="times" size={16} color={colors.white(0.6)} />
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity onPress={handleSearch} style={styles.button}>
              <FontAwesome name="search" size={24} color={colors.black(0.6)} />
            </TouchableOpacity> */}
          </View>
          {searchText && (
            <ScrollView style={styles.autoComplete}>
              {searchResults.map((result, index) => (
                <TouchableOpacity
                  key={result.id}
                  onPress={() => handleClickSearch(result)}
                  style={[
                    styles.autoCompleteItem,
                    {
                      borderBottomWidth:
                        index === searchResults.length - 1 ? 0 : 1,
                    },
                  ]}
                >
                  <FontAwesome name="map-marker" size={12} color="black" />
                  <Text style={styles.autoCompleteText}>{result.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: Platform.OS === "android" ? 50 : 20,
    marginHorizontal: 8,
  },
  searchContainer: {
    position: "relative",
    flexDirection: "row",
    padding: 4,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: 58,
    backgroundColor: colors.white(0.2),
    borderRadius: 50,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
    color: colors.white(),
    borderRadius: 8,
  },
  button: {
    padding: 3,
    marginLeft: 4,
    height: "100%",
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white(0.5),
    borderRadius: 50,
  },
  autoComplete: {
    position: "absolute",
    zIndex: 100,
    top: 62,
    backgroundColor: colors.white(),
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 4,
    padding: 8,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
    minHeight: 40,
  },
  autoCompleteItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderBottomColor: colors.black(0.2),
  },
  autoCompleteText: {
    fontSize: 16,
    color: colors.black(),
  },
});
