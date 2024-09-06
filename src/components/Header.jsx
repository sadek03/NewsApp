import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const Header = () => {
  const navigation = useNavigation();
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");

  useEffect(() => {
    setIsDarkMode(systemColorScheme === "dark");
  }, [systemColorScheme]);

  const toggleColorScheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <View style={styles.headerContent}>
        <Text
          style={[
            styles.headingText,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          SLAYER NEWS
        </Text>
        <View style={styles.sideContainer}>
          <Switch
            value={isDarkMode}
            onValueChange={toggleColorScheme}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          />
          <Pressable
            onPress={() => {
              navigation.navigate("Search");
            }}
            style={({ pressed }) => [
              styles.iconContainer,
              isDarkMode ? styles.darkIconContainer : styles.lightIconContainer,
              pressed && styles.pressed,
            ]}
          >
            <Icon
              name="search"
              size={20}
              color={isDarkMode ? "#ffffff" : "#000000"}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lightContainer: {
    backgroundColor: "#f0f0f0",
  },
  darkContainer: {
    backgroundColor: "#2c3e50",
  },
  sideContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  lightText: {
    color: "#274d3f",
  },
  darkText: {
    color: "#ecf0f1",
  },
  iconContainer: {
    padding: 8,
    borderRadius: 20,
  },
  lightIconContainer: {
    backgroundColor: "#dcdcdc",
  },
  darkIconContainer: {
    backgroundColor: "#34495e",
  },
  pressed: {
    opacity: 0.7,
  },
});
