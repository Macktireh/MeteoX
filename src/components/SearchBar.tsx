import { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { colors } from "@/constants/colors";

export const SearchBarIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Search")}
      style={{
        width: 40,
        height: 40,
        borderRadius: 50,
        marginLeft: 'auto',
        backgroundColor: colors.white(0.2),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesome name="search" size={20} color={colors.white(0.8)} />
    </TouchableOpacity>
  )
}

export const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([
    "London",
    "New York",
    "Paris",
    "Berlin",
  ]);
  const inputRef = useRef<TextInput | null>(null);

  const toggleSearch = () => {
    setShowSearch((prev) => {
      if (!prev) {
        inputRef.current?.focus();
      }
      return !prev;
    });
    setSearchText("");
    setTimeout(() => {
      if (showSearch && inputRef.current) {
        inputRef.current.focus();
      }
    }, 2000);
  };

  return (
    <>
      <View style={{ zIndex: 1, elevation: 1 }}>
        <View
          style={[
            styles.container,
            { backgroundColor: showSearch ? colors.white(0.2) : "transparent" },
          ]}
        >
          {showSearch && (
            <TextInput
              placeholder="Search"
              style={styles.input}
              placeholderTextColor={colors.white(0.8)}
              ref={inputRef}
              value={searchText}
              onChangeText={setSearchText}
            />
          )}
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
          <TouchableOpacity onPress={toggleSearch} style={styles.button}>
            <FontAwesome name="search" size={24} color={colors.black(0.6)} />
          </TouchableOpacity>
        </View>
        {searchText && (
          <View style={styles.autoComplete}>
            {searchResults.map((result, index) => (
              <TouchableOpacity
                key={result}
                style={[
                  styles.autoCompleteItem,
                  {
                    borderBottomWidth:
                      index === searchResults.length - 1 ? 0 : 1,
                  },
                ]}
              >
                <FontAwesome name="map-marker" size={12} color="black" />
                <Text style={styles.autoCompleteText}>{result}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    padding: 4,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: 48,
    borderRadius: 8,
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
    width: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white(0.5),
    borderRadius: 8,
  },
  autoComplete: {
    position: "absolute",
    zIndex: 100,
    top: 50,
    backgroundColor: colors.white(),
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 4,
    padding: 8,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
  },
  autoCompleteItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderBottomColor: colors.black(0.2),
  },
  autoCompleteText: {
    fontSize: 16,
    color: colors.black(),
  },
});
