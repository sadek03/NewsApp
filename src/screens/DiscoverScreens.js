// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable quotes */
// /* eslint-disable react/no-unstable-nested-components */
// import React, { useEffect, useState, useCallback } from "react";
// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   FlatList,
//   ActivityIndicator,
//   ScrollView,
//   Image,
// } from "react-native";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useColorScheme } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import Header from "../components/Header";
// import { categories } from "../constants";
// import { newsApiKey } from "../../utils/Apikey";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const DiscoverScreens = () => {
//   const colorScheme = useColorScheme();
//   const [activeCategory, setActiveCategory] = useState(categories[0].title);
//   const [discoverNews, setDiscoverNews] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [bookMarkStatus, setBookMarkStatus] = useState([]);

//   const fetchDiscoverNews = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setDiscoverNews(null);
//       const response = await fetch(
//         `https://newsapi.org/v2/top-headlines/sources?country=us&category=${activeCategory.toLowerCase()}&apiKey=${newsApiKey}`
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setDiscoverNews(data.sources);
//     } catch (error) {
//       console.error("Error fetching discover news:", error);
//       setDiscoverNews([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [activeCategory]);

//   useEffect(() => {
//     fetchDiscoverNews();
//     console.log("discoverNewsdiscoverNews", discoverNews);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [fetchDiscoverNews]);

//   const handleCategoryChange = (category) => {
//     setActiveCategory(category);
//   };

//   const toogleBookMarkAndSave = async (article, index) => {
//     try {
//       const savedArticlesJson = await AsyncStorage.getItem("savedArticles");
//       let savedArticles = savedArticlesJson
//         ? JSON.parse(savedArticlesJson)
//         : [];

//       // Check if the article is already saved
//       const articleIndex = savedArticles.findIndex(
//         (savedArticle) => savedArticle.id === article.id
//       );

//       if (articleIndex > -1) {
//         // Article is already saved, remove it
//         savedArticles.splice(articleIndex, 1);
//       } else {
//         // Article is not saved, add it
//         savedArticles.push(article);
//       }

//       // Save updated list to AsyncStorage
//       await AsyncStorage.setItem(
//         "savedArticles",
//         JSON.stringify(savedArticles)
//       );

//       // Update bookmark status in state
//       const updatedBookMarkStatus = [...bookMarkStatus];
//       updatedBookMarkStatus[index] = !updatedBookMarkStatus[index]; // Toggle status
//       setBookMarkStatus(updatedBookMarkStatus);

//       console.log("Bookmark status updated successfully:", savedArticles);
//     } catch (error) {
//       console.log("Error toggling bookmark:", error);
//     }
//   };

//   const renderCategoryItem = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.categoryItem,
//         activeCategory === item.title && styles.activeCategoryItem,
//       ]}
//       onPress={() => handleCategoryChange(item.title)}
//     >
//       <Text
//         style={[
//           styles.categoryText,
//           activeCategory === item.title && styles.activeCategoryText,
//         ]}
//       >
//         {item.title}
//       </Text>
//     </TouchableOpacity>
//   );

//   const renderNewsItem = ({ item }) => (
//     <TouchableOpacity style={styles.newsItem}>
//       <View>
//         <Image source={{ uri: item.url }} style={styles.productImage} />
//       </View>
//       <View style={styles.newsContent}>
//         <Text style={styles.newsTitle}>{item.name}</Text>
//         <Text style={styles.newsDescription} numberOfLines={2}>
//           {item.description}
//         </Text>
//       </View>
//       <View style={styles.bookmarkContainer}>
//         <TouchableOpacity onPress={() => toogleBookMarkAndSave(item, index)}>
//           <FontAwesome
//             name={bookMarkStatus[index] ? "bookmark" : "bookmark-o"}
//             color="green"
//             size={24}
//           />
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );

//   const ListHeader = () => (
//     <>
//       <FlatList
//         data={categories}
//         renderItem={renderCategoryItem}
//         keyExtractor={(item) => item.id.toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.categoriesList}
//       />
//       <View style={{ paddingVertical: 15 }}>
//         <View style={[styles.discoverHeader]}>
//           <Text style={styles.discoverText}>Discover</Text>
//           <TouchableOpacity>
//             <Text
//               style={[
//                 styles.viewAllText,
//                 colorScheme === "dark" && styles.darkText,
//               ]}
//             >
//               View All
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </>
//   );

//   return (
//     <>
//       <Header />
//       <SafeAreaView
//         style={[
//           styles.container,
//           colorScheme === "dark" && styles.darkModeContainer,
//         ]}
//       >
//         <StatusBar
//           barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
//         />

//         <View style={styles.staticContent}>
//           <View style={styles.secondContainer}>
//             <Text
//               style={[
//                 styles.headingtext,
//                 colorScheme === "dark" && styles.darkText,
//               ]}
//             >
//               Discover
//             </Text>
//             <Text
//               style={[
//                 styles.titletext,
//                 colorScheme === "dark" && styles.darkText,
//               ]}
//             >
//               News from all over the world
//             </Text>
//           </View>

//           <View style={styles.searchBar}>
//             <TouchableOpacity>
//               <Icon name="search" size={25} color={"#9c9c9c"} />
//             </TouchableOpacity>
//             <TextInput
//               placeholder="Search for news"
//               placeholderTextColor={"#9c9c9c"}
//               style={{ flex: 1, paddingHorizontal: 10 }}
//             />
//           </View>
//         </View>

//         <FlatList
//           ListHeaderComponent={ListHeader}
//           data={discoverNews}
//           renderItem={renderNewsItem}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={styles.contentContainer}
//           ListEmptyComponent={
//             isLoading ? (
//               <ActivityIndicator
//                 size="large"
//                 color="#1b563a"
//                 style={styles.loader}
//               />
//             ) : (
//               <Text style={styles.statusText}>No news sources available</Text>
//             )
//           }
//         />
//       </SafeAreaView>
//     </>
//   );
// };

// export default DiscoverScreens;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   darkModeContainer: {
//     backgroundColor: "#181818",
//   },
//   staticContent: {
//     paddingHorizontal: 10,
//   },
//   scrollableContent: {
//     flex: 1,
//   },
//   contentContainer: {
//     paddingHorizontal: 10,
//     paddingBottom: 20,
//   },
//   headingtext: {
//     color: "#1b563a",
//     fontSize: 30,
//     fontWeight: "bold",
//     fontFamily: "SpaceGroteskMedium",
//   },
//   darkText: {
//     color: "#ffff",
//   },
//   titletext: {
//     fontSize: 15,
//   },
//   secondContainer: {
//     paddingHorizontal: 8,
//     marginBottom: 20,
//   },
//   searchBar: {
//     marginBottom: 20,
//     flexDirection: "row",
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     alignItems: "center",
//     borderRadius: 100,
//     backgroundColor: "#f4f4f4",
//   },
//   categoriesList: {
//     marginBottom: 20,
//   },
//   categoryItem: {
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: "#f0f0f0",
//   },
//   activeCategoryItem: {
//     backgroundColor: "#1b563a",
//   },
//   categoryText: {
//     color: "#333",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   activeCategoryText: {
//     color: "#ffffff",
//   },
//   loader: {
//     marginTop: 20,
//   },
//   statusText: {
//     textAlign: "center",
//     marginTop: 20,
//     fontSize: 16,
//   },
//   newsItem: {
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     marginBottom: 15,
//     overflow: "hidden",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 5, height: 5 },
//     shadowOpacity: 0.8,
//     shadowRadius: 4,
//     paddingVertical: 10,
//     flexDirection: "row",
//     gap: 5,
//     alignItems: "flex-start",
//   },
//   newsContent: {
//     flex: 1,
//     padding: 12,
//   },
//   newsTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 6,
//     color: "#333",
//   },
//   newsDescription: {
//     fontSize: 14,
//     color: "#666",
//   },
//   discoverHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 10,
//   },
//   viewAllText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1b563a",
//   },
//   discoverText: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#1b563a",
//   },
//   productImage: {
//     height: 90,
//     width: 90,
//     resizeMode: "cover",
//     borderRadius: 4,
//     backgroundColor: "red",
//     marginLeft: 10,
//   },
// });

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState, useCallback } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { categories } from "../constants";
import { newsApiKey } from "../../utils/Apikey";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DiscoverScreens = () => {
  const colorScheme = useColorScheme();
  const [activeCategory, setActiveCategory] = useState(categories[0].title);
  const [discoverNews, setDiscoverNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedArticles, setBookmarkedArticles] = useState({});

  const fetchDiscoverNews = useCallback(async () => {
    try {
      setIsLoading(true);
      setDiscoverNews(null);
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines/sources?country=us&category=${activeCategory.toLowerCase()}&apiKey=${newsApiKey}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDiscoverNews(data.sources);
    } catch (error) {
      console.error("Error fetching discover news:", error);
      setDiscoverNews([]);
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchDiscoverNews();
    loadBookmarkedArticles();
  }, [fetchDiscoverNews]);

  const loadBookmarkedArticles = async () => {
    try {
      const savedArticlesJson = await AsyncStorage.getItem("savedArticles");
      if (savedArticlesJson) {
        const savedArticles = JSON.parse(savedArticlesJson);
        const bookmarkedMap = {};
        savedArticles.forEach((article) => {
          bookmarkedMap[article.id] = true;
        });
        setBookmarkedArticles(bookmarkedMap);
      }
    } catch (error) {
      console.log("Error loading bookmarked articles:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const toggleBookmarkAndSave = async (article) => {
    try {
      const savedArticlesJson = await AsyncStorage.getItem("savedArticles");
      let savedArticles = savedArticlesJson
        ? JSON.parse(savedArticlesJson)
        : [];

      const isBookmarked = bookmarkedArticles[article.id];

      if (isBookmarked) {
        // Remove from bookmarks
        savedArticles = savedArticles.filter(
          (savedArticle) => savedArticle.id !== article.id
        );
        setBookmarkedArticles((prev) => {
          const updated = { ...prev };
          delete updated[article.id];
          return updated;
        });
      } else {
        // Add to bookmarks
        savedArticles.push(article);
        setBookmarkedArticles((prev) => ({ ...prev, [article.id]: true }));
      }

      await AsyncStorage.setItem(
        "savedArticles",
        JSON.stringify(savedArticles)
      );
      console.log("Bookmark status updated successfully");
    } catch (error) {
      console.log("Error toggling bookmark:", error);
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        activeCategory === item.title && styles.activeCategoryItem,
      ]}
      onPress={() => handleCategoryChange(item.title)}
    >
      <Text
        style={[
          styles.categoryText,
          activeCategory === item.title && styles.activeCategoryText,
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity style={styles.newsItem}>
      <View>
        <Image source={{ uri: item.url }} style={styles.productImage} />
      </View>
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.name}</Text>
        <Text style={styles.newsDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <View style={styles.bookmarkContainer}>
        <TouchableOpacity onPress={() => toggleBookmarkAndSave(item)}>
          <FontAwesome
            name={bookmarkedArticles[item.id] ? "bookmark" : "bookmark-o"}
            color="green"
            size={24}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
      />
      <View style={{ paddingVertical: 15 }}>
        <View style={[styles.discoverHeader]}>
          <Text style={styles.discoverText}>Discover</Text>
          <TouchableOpacity>
            <Text
              style={[
                styles.viewAllText,
                colorScheme === "dark" && styles.darkText,
              ]}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        const savedArticlesJson = await AsyncStorage.getItem("savedArticles");
        console.log("savedArticlesJson", savedArticlesJson);
      } catch (error) {
        console.error("Failed to fetch saved articles", error);
      }
    };

    fetchSavedArticles();
  }, []);

  return (
    <>
      <Header />
      <SafeAreaView
        style={[
          styles.container,
          colorScheme === "dark" && styles.darkModeContainer,
        ]}
      >
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />

        <View style={styles.staticContent}>
          <View style={styles.secondContainer}>
            <Text
              style={[
                styles.headingtext,
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
              style={{ flex: 1, paddingHorizontal: 10 }}
            />
          </View>
        </View>

        <FlatList
          ListHeaderComponent={ListHeader}
          data={discoverNews}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator
                size="large"
                color="#1b563a"
                style={styles.loader}
              />
            ) : (
              <Text style={styles.statusText}>No news sources available</Text>
            )
          }
        />
      </SafeAreaView>
    </>
  );
};

export default DiscoverScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  darkModeContainer: {
    backgroundColor: "#181818",
  },
  staticContent: {
    paddingHorizontal: 10,
  },
  scrollableContent: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  headingtext: {
    color: "#1b563a",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "SpaceGroteskMedium",
  },
  darkText: {
    color: "#ffff",
  },
  titletext: {
    fontSize: 15,
  },
  secondContainer: {
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  searchBar: {
    marginBottom: 20,
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#f4f4f4",
  },
  categoriesList: {
    marginBottom: 20,
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeCategoryItem: {
    backgroundColor: "#1b563a",
  },
  categoryText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "#ffffff",
  },
  loader: {
    marginTop: 20,
  },
  statusText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  newsItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 5,
    alignItems: "flex-start",
  },
  newsContent: {
    flex: 1,
    padding: 12,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  newsDescription: {
    fontSize: 14,
    color: "#666",
  },
  discoverHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1b563a",
  },
  discoverText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1b563a",
  },
  productImage: {
    height: 90,
    width: 90,
    resizeMode: "cover",
    borderRadius: 4,
    backgroundColor: "red",
    marginLeft: 10,
  },
  bookmarkContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
