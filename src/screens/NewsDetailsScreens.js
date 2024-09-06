import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const NewsDetailsScreens = ({ route }) => {
  const item = route.params;

  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: News item not found</Text>
      </View>
    );
  }
  console.log("Full item object:", item);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle={useColorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Image
        source={{ uri: item.urlToImage || item.url }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author || "Unknown Author"}</Text>

        {item.content && <Text style={styles.content}>{item.content}</Text>}
        {/* {console.log("ddsdsds", item.content)} */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 15,
    lineHeight: 24,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default NewsDetailsScreens;
