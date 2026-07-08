import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ONBOARDING_COMPLETE_KEY = "onboardingComplete";

export default function WelcomeScreen() {
  async function handleSkip() {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Unable to save onboarding status:", error);
    }
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
            <View style={styles.content}>
              <Text style={styles.kicker}>WELCOME TO</Text>

              <Text style={styles.title}>Unique Spirits</Text>
              <Text style={styles.titleAccent}>& Pairings</Text>

              <Text style={styles.description}>
                Discover unforgettable cocktails, learn what makes them special,
                and pair them with food that actually belongs beside them.
              </Text>

              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => router.push("/onboarding/Intro")}
              >
                <Text style={styles.primaryButtonText}>Start Exploring</Text>
              </Pressable>

              <Pressable style={styles.secondaryButton} onPress={handleSkip}>
                <Text style={styles.secondaryButtonText}>Skip for Now</Text>
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
    backgroundColor: "#000",
    overflow: "hidden",
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
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    paddingTop: 110,
  },

  safeArea: {
    flex: 1,
    justifyContent: "flex-end",
  },

  content: {
    paddingHorizontal: 26,
    paddingBottom: 45,
    paddingTop: 28,
    backgroundColor: "rgba(8, 8, 8, 0.38)",
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    transform: [{ translateY: -145 }],
  },

  kicker: {
    color: "#C9A227",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 10,
  },

  title: {
    color: "#F5F5F5",
    fontSize: 42,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  titleAccent: {
    color: "#C9A227",
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 44,
    marginTop: -4,
    marginBottom: 18,
  },

  description: {
    color: "#D0D0D0",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 30,
  },

  primaryButton: {
    backgroundColor: "#C9A227",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
    shadowColor: "#C9A227",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    width: "90%",
    alignSelf: "center",
  },

  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.88,
  },

  primaryButtonText: {
    color: "#0B0B0B",
    fontSize: 16,
    fontWeight: "800",
  },

  secondaryButton: {
    paddingVertical: 16,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#D0D0D0",
    fontSize: 15,
    fontWeight: "600",
  },
});
