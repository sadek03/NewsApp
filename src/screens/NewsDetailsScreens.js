import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
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
  const openUrl = (url) => {
    Linking.openURL(url);
  };
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
        {/* <Text style={{ color: "red" }}>
          {item.source.id || "Unknown Author"}
        </Text> */}

        <Text style={{ color: "red" }}>{item.title || "Unknown Author"}</Text>
        <View style={styles.readMoreButton}>
          <TouchableOpacity onPress={() => openUrl(item.url)}>
            <Text style={styles.readMoreButtonText}>{item.url}</Text>
          </TouchableOpacity>
        </View>

        <Image source={{ uri: item.url }} style={styles.image} />

        {item.content && <Text style={styles.content}>{item.content}</Text>}
        <Text style={styles.publishedDate}>
          Published at: {new Date(item.publishedAt).toLocaleString()}
        </Text>
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
    padding: 5,
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
  content2: {
    fontSize: 16,
    lineHeight: 22,
  },
  publishedDate: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
  },
  readMoreButton: {
    alignSelf: "flex-start",
    marginTop: 5,
  },
  readMoreButtonText: {
    color: "#007AFF",
    fontSize: 12,
    textDecorationLine: "underline",
  },
});

export default NewsDetailsScreens;
