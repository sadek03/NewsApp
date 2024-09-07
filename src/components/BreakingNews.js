import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const BreakingNews = ({ item }) => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef(null);

  const handleClick = (item) => {
    navigation.navigate("NewsTabs", item);
  };

  const images = [
    ...(item.articles || [])
      .map((article) => ({
        url: article.urlToImage,
        title: article.title || "Breaking News",
        author: article.author || "Unknown Author",
      }))
      .filter((image) => image.url),
    // Include static images only if there are fewer than 4 valid images from the API
    ...(item.articles?.length < 4
      ? [
          {
            url: "https://api.growhub.shop/uploads/banners/2024090223755.png",
            title: "Breaking News 3",
            author: "Breaking News 3",
          },
          {
            url: "https://api.growhub.shop/uploads/banners/2024090223755.png",
            title: "Breaking News 4",
            author: "Breaking News 4",
          },
        ]
      : []),
  ];

  const onViewRef = useRef((viewableItems) => {
    if (viewableItems.viewableItems.length > 0) {
      setActiveSlide(viewableItems.viewableItems[0].index);
    }
  });

  // Auto-scroll functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (activeSlide === images.length - 1) {
        flatListRef.current?.scrollToIndex?.({ index: 0 });
      } else {
        flatListRef.current?.scrollToIndex?.({ index: activeSlide + 1 });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [activeSlide, images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View style={styles.productImageWrapper}>
              <Image source={{ uri: item.url }} style={styles.productImage} />
              <View style={styles.textOverlay}>
                <Text style={styles.titleText}>
                  {item.title.length > 60
                    ? item.title.slice(0, 60) + "..."
                    : item.title}
                </Text>
              </View>
              <View style={styles.authorOverlay}>
                <Text style={styles.authorText}>
                  {item.author.length > 20
                    ? item.author.slice(0, 20) + "..."
                    : item.author}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={screenWidth}
        decelerationRate={"fast"}
        nestedScrollEnabled
      />
    </>
  );
};

const styles = StyleSheet.create({
  productImageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth - 7,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  productImage: {
    height: 230,
    width: screenWidth - 10,
    resizeMode: "cover",
    borderRadius: 10,
  },
  textOverlay: {
    position: "absolute",
    bottom: 20,
    left: 5,
    right: 5,
    padding: 10,
  },
  titleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  authorOverlay: {
    position: "absolute",
    bottom: 5,
    left: 10,
    right: 5,
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  authorText: {
    color: "white",
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default BreakingNews;
