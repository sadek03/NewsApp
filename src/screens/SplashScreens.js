import React, { useEffect, useState } from "react"; // CHANGED: Added useState
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const SplashScreen = () => {
  const navigation = useNavigation();
  const [showText, setShowText] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowText(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1500);

    const navigationTimer = setTimeout(() => {
      navigation.navigate("WelcomeTabs");
    }, 3500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigation, fadeAnim]);

  return (
    <ImageBackground
      style={styles.imageContainer}
      source={require("../../assets/images/welcome/reporter.jpg")}
    >
      <LinearGradient
        colors={["rgba(0,85,0,0.35)", "rgba(0,85,0,0.75)"]}
        style={styles.linearGradient}
      >
        <View style={styles.contentContainer}>
          {showText && (
            <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
              Stack News
            </Animated.Text>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
