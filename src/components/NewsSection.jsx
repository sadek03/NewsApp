import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

const NewsSection = ({ item }) => {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("NewsTabs", item);
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "short", // Abbreviated day of the week
      month: "short", // Abbreviated month name
      day: "2-digit", // Day of the month with leading zero
      year: "numeric", // Full year
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const [bookMarkStatus, setBookMarkStatus] = useState([]);

  // Load saved bookmarks when the component mounts
  useEffect(() => {
    const loadSavedBookmarks = async () => {
      try {
        const savedArticlesJson = await AsyncStorage.getItem("savedArticles");
        let savedArticles = savedArticlesJson
          ? JSON.parse(savedArticlesJson)
          : [];

        // Initialize bookmark status for each item
        const initialBookmarkStatus = item.articles.map((article) =>
          savedArticles.some((savedArticle) => savedArticle.id === article.id)
        );
        setBookMarkStatus(initialBookmarkStatus);
      } catch (error) {
        console.error("Error loading saved bookmarks:", error);
      }
    };

    loadSavedBookmarks();
  }, [item]);

  // Toggle bookmark and update AsyncStorage
  const toogleBookMarkAndSave = async (article, index) => {
    try {
      const savedArticlesJson = await AsyncStorage.getItem("savedArticles");
      let savedArticles = savedArticlesJson
        ? JSON.parse(savedArticlesJson)
        : [];

      // Check if the article is already saved
      const articleIndex = savedArticles.findIndex(
        (savedArticle) => savedArticle.id === article.id
      );

      if (articleIndex > -1) {
        // Article is already saved, remove it
        savedArticles.splice(articleIndex, 1);
      } else {
        // Article is not saved, add it
        savedArticles.push(article);
      }

      // Save updated list to AsyncStorage
      await AsyncStorage.setItem(
        "savedArticles",
        JSON.stringify(savedArticles)
      );

      // Update bookmark status in state
      const updatedBookMarkStatus = [...bookMarkStatus];
      updatedBookMarkStatus[index] = !updatedBookMarkStatus[index]; // Toggle status
      setBookMarkStatus(updatedBookMarkStatus);

      console.log("Bookmark status updated successfully:", savedArticles);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleClick(item)}>
      <View style={styles.articleContainer}>
        <View style={styles.flexContainer}>
          {item.urlToImage ? (
            <Image
              source={{ uri: item.urlToImage }}
              style={styles.productImage}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text>No Image Available</Text>
            </View>
          )}
          <View style={styles.SecondDiv}>
            <Text>{item.author}</Text>
            <Text style={styles.titleText} numberOfLines={2}>
              {item.title}
            </Text>
            <Text>{formatDate(item.publishedAt)}</Text>
          </View>
          <View style={styles.bookmarkContainer}>
            <TouchableOpacity
              onPress={() => toogleBookMarkAndSave(item, index)}
            >
              <FontAwesome
                name={bookMarkStatus[index] ? "bookmark" : "bookmark-o"}
                color="green"
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ width: screenWidth - 20 }}>
      <FlatList
        data={item?.articles}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        nestedScrollEnabled={true}
        scrollEnabled={true}
      />
    </View>
  );
};

export default NewsSection;

const styles = StyleSheet.create({
  productImage: {
    height: 90,
    width: 90,
    resizeMode: "cover",
    borderRadius: 4,
  },
  placeholderImage: {
    height: 90,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  articleContainer: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
    flexWrap: "wrap",
    width: "100%",
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  SecondDiv: {
    width: "67%",
    flexDirection: "column",
    gap: 1.2,
  },
  bookmarkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto", // Moves bookmark to the right
  },
});
