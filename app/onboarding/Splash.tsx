import { router } from "expo-router";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding/Welcome");
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/splash-cocktail.jpg")}
      style={styles.background}
      imageStyle={styles.backgroundImage}
      blurRadius={2}
    >
      <View style={styles.overlay}>
        <View style={styles.brandCard}>
          <Text style={styles.logo}>🥃</Text>

          <Text style={styles.kicker}>UNIQUE SPIRITS</Text>
          <Text style={styles.ampersand}>&</Text>
          <Text style={styles.kicker}>PAIRINGS</Text>

          <Text style={styles.tagline}>Discover • Learn • Pair</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: "cover",
    transform: [{ scale: 1.04 }],
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 26,
    paddingBottom: 110,
  },
  brandCard: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 26,
    borderRadius: 30,
    backgroundColor: "rgba(8, 8, 8, 0.38)",
  },
  logo: {
    fontSize: 54,
    marginBottom: 18,
  },
  kicker: {
    color: "#F5F5F5",
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: 3,
    textAlign: "center",
  },
  ampersand: {
    color: "#C9A227",
    fontSize: 34,
    fontWeight: "800",
    marginVertical: 4,
  },
  tagline: {
    color: "#D0D0D0",
    fontSize: 15,
    letterSpacing: 2,
    marginTop: 24,
  },
});
