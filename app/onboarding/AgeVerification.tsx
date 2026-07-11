import { router } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const GOLD = "#C9A227";

export default function AgeVerificationScreen() {
  const [isUnderage, setIsUnderage] = useState(false);

  if (isUnderage) {
    return (
      <View style={styles.screen}>
        <ImageBackground
          source={require("../../assets/images/splash-cocktail.jpg")}
          style={styles.background}
          imageStyle={styles.backgroundImage}
          resizeMode="cover"
          blurRadius={2}
        >
          <View style={styles.overlay}>
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.content}>
                <Text style={styles.kicker}>AGE REQUIREMENT</Text>

                <Text style={styles.title}>
                  Sorry, you must be 21 or older.
                </Text>

                <Text style={styles.description}>
                  Unique Spirits & Pairings contains information about alcoholic
                  beverages and is intended only for users of legal drinking
                  age.
                </Text>

                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => router.replace("/onboarding/Welcome")}
                >
                  <Text style={styles.primaryButtonText}>
                    Return to Welcome
                  </Text>
                </Pressable>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../../assets/images/splash-cocktail.jpg")}
        style={styles.background}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
        blurRadius={2}
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.back()}
            >
              <Text style={styles.backButtonText}>‹</Text>
            </Pressable>
            <View style={styles.content}>
              <Text style={styles.kicker}>BEFORE WE BEGIN</Text>

              <Text style={styles.title}>Are you at least 21 years old?</Text>

              <Text style={styles.description}>
                Unique Spirits & Pairings is designed for users of legal
                drinking age.
              </Text>

              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => router.push("/auth")}
              >
                <Text style={styles.primaryButtonText}>Yes, Continue</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => setIsUnderage(true)}
              >
                <Text style={styles.secondaryButtonText}>No</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000000",
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  backgroundImage: {
    resizeMode: "cover",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.58)",
  },

  safeArea: {
    flex: 1,
    justifyContent: "center",
  },

  content: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    paddingHorizontal: 26,
    paddingVertical: 38,
    backgroundColor: "rgba(8, 8, 8, 0.58)",
  },

  kicker: {
    color: GOLD,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 14,
  },

  title: {
    color: "#F5F5F5",
    fontSize: 38,
    fontWeight: "800",
    lineHeight: 44,
    marginBottom: 18,
  },

  description: {
    color: "#CFCFCF",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 34,
  },

  primaryButton: {
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
    backgroundColor: GOLD,
    paddingVertical: 17,
    borderRadius: 999,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: GOLD,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 6,
  },

  primaryButtonText: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "800",
  },

  secondaryButton: {
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
    paddingVertical: 16,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#D0D0D0",
    fontSize: 16,
    fontWeight: "700",
  },

  backButton: {
    position: "absolute",
    top: 26,
    left: 18,
    zIndex: 10,
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonText: {
    color: GOLD,
    fontSize: 46,
    fontWeight: "300",
    lineHeight: 48,
  },

  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
