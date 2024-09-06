import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Loading from "../components/Loading/Loading";
import BreakingNews from "../components/BreakingNews";
import { newsApiKey } from "../../utils/Apikey";
import NewsSection from "../components/NewsSection";

const API_KEY = newsApiKey;
const API_BASE_URL = "https://newsapi.org/v2";

const HomeScreen = () => {
  const colorScheme = useColorScheme();

  const [breakingNews, setBreakingNews] = useState(null);
  const [recommendedNews, setRecommendedNews] = useState(null);

  const fetchBreakingNews = async () => {
    const response = await fetch(
      `${API_BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const fetchRecommendedNews = async () => {
    const response = await fetch(
      `${API_BASE_URL}/top-headlines?country=us&category=business&apiKey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBreakingNews(null);
        const breakingData = await fetchBreakingNews();
        setBreakingNews(breakingData);
        // console.log("Breaking News Data", breakingData);
      } catch (error) {
        console.error("Error fetching breaking news:", error);
        setBreakingNews([]);
      }
    };

    const fetchDataForRecommended = async () => {
      try {
        setRecommendedNews(null);
        const recommendedData = await fetchRecommendedNews();
        setRecommendedNews(recommendedData);
        // console.log("Recommended News Data", recommendedData);
      } catch (error) {
        console.error("Error fetching recommended news:", error);
        setRecommendedNews([]);
      }
    };

    fetchData();
    fetchDataForRecommended();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Header />
      <ScrollView style={styles.content}>
        <Text style={styles.text}>Breaking News</Text>
        {breakingNews?.articles ? (
          <BreakingNews label="Breaking News" item={breakingNews} />
        ) : (
          <Text>No breaking news available</Text>
        )}

        <Text style={styles.text}>Recommended News</Text>

        <View>
          <NewsSection item={recommendedNews} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    // padding: 16,
    // paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  recommendedItem: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default HomeScreen;
