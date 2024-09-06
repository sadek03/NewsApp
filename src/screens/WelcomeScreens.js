import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={styles.imageContainer}
      source={require("../../assets/images/welcome/reporter.jpg")}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={styles.container}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Stay Informed From Day One</Text>
          <Text style={styles.Secondtext}>
            Discover the latest News with our Seamless Onboarding Experience
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeTabs")}
            style={styles.TButton}
          >
            <Text style={styles.gettingText}>Getting Started</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4,
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  Secondtext: {
    color: "white",
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 20,
    letterSpacing: 0.5,
    fontSize: 15,
    marginVertical: 10,
  },
  gettingText: {
    color: "white",
    letterSpacing: 1,
  },
  TButton: {
    backgroundColor: "#0f4b2b",
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 40,
    marginVertical: 15,
  },
});
