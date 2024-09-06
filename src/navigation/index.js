/* eslint-disable react/no-unstable-nested-components */
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreens from "../screens/HomeScreens";
import DiscoverScreens from "../screens/DiscoverScreens";
import SavedScreens from "../screens/SavedScreens";
import SearchScreens from "../screens/SearchScreens";
import SplashScreens from "../screens/SplashScreens";
import WelcomeScreens from "../screens/WelcomeScreens";
import NewsDetailsScreens from "../screens/NewsDetailsScreens";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Index = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Discover") {
              iconName = "compass-outline";
            } else if (route.name === "Saved") {
              iconName = "bookmark-outline";
            } else if (route.name === "Search") {
              iconName = "search-outline";
            }

            const customSize = 25;

            return (
              <Ionicons
                name={iconName}
                size={customSize}
                color={focused ? "green" : "gray"}
              />
            );
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "SpaceGroteskMedium",
          },
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "black" : "white",
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreens} />
        <Tab.Screen name="Discover" component={DiscoverScreens} />
        <Tab.Screen name="Saved" component={SavedScreens} />
        {/* <Tab.Screen name="Welcome" component={WelcomeScreens} /> */}
        <Tab.Screen name="Search" component={SearchScreens} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeTabs"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashTabs" component={SplashScreens} />
        <Stack.Screen name="WelcomeTabs" component={WelcomeScreens} />
        <Stack.Screen name="SearchTabs" component={SearchScreens} />
        <Stack.Screen name="NewsTabs" component={NewsDetailsScreens} />

        <Stack.Screen name="HomeTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;

const styles = StyleSheet.create({});
