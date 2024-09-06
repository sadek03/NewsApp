import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native"; // Import for color scheme

import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";

const DiscoverScreens = () => {
  const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)

  return (
    <>
      <Header />
      <SafeAreaView
        style={[
          styles.container,
          colorScheme === "dark" && styles.darkModeContainer, // Apply dark mode style if in dark mode
        ]}
      >
        {/* StatusBar with dynamic theme based on color scheme */}
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />

        <View>
          <View style={[styles.secondContainer]}>
            <Text
              style={[
                styles.Headingtext,
                colorScheme === "dark" && styles.darkText,
              ]}
            >
              Discover
            </Text>
            <Text
              style={[
                styles.titletext,
                colorScheme === "dark" && styles.darkText,
              ]}
            >
              News from all over the world
            </Text>
          </View>

          <View style={styles.searchBar}>
            <TouchableOpacity>
              <Icon name="search" size={25} color={"#9c9c9c"} />
            </TouchableOpacity>
            <TextInput
              placeholder="Search for news"
              placeholderTextColor={"#9c9c9c"}
              style={{ width: "95%", paddingHorizontal: 10 }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default DiscoverScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure SafeAreaView takes up the full screen height
    backgroundColor: "white", // Default background color for light mode
  },
  darkModeContainer: {
    backgroundColor: "#181818", // Background color for dark mode
  },
  Headingtext: {
    color: "#1b563a", // Default text color for light mode
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "SpaceGroteskMedium",
  },
  darkText: {
    color: "#ffff", // Text color for dark mode
  },
  titletext: {
    fontSize: 15,
  },
  secondContainer: {
    paddingHorizontal: 8,
  },
  searchBar: {
    marginHorizontal: 10,
    marginBottom: 8,
    flexDirection: "row",
    paddingVertical: 2.5,
    padding: 10,
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#c1c1c1",
  },
});
