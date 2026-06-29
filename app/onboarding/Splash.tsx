import { router } from "expo-router";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding/Welcome");
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/splash-cocktail.jpg")}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.logo}>🥃</Text>

        <Text style={styles.title}>UNIQUE SPIRITS</Text>
        <Text style={styles.ampersand}>&</Text>
        <Text style={styles.title}>PAIRINGS</Text>

        <Text style={styles.tagline}>Discover • Learn • Pair</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.62)",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  logo: {
    fontSize: 54,
    marginBottom: 18,
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  title: {
    color: "#F5F5F5",
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 3,
    textAlign: "center",
  },
  ampersand: {
    color: "#C9A227",
    fontSize: 34,
    fontWeight: "700",
    marginVertical: 4,
  },
  tagline: {
    color: "#B5B5B5",
    fontSize: 15,
    letterSpacing: 2,
    marginTop: 24,
  },
});
