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
                accessibilityRole="button"
                accessibilityLabel="Start exploring"
                onPress={() => router.push("/onboarding/AgeVerification")}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.primaryButtonText}>Start Exploring</Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Skip onboarding"
                onPress={handleSkip}
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.buttonPressed,
                ]}
              >
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
    backgroundColor: "#000000",
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
    backgroundColor: "rgba(0, 0, 0, 0.58)",
  },

  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    width: "100%",
    maxWidth: 560,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 26,
    paddingVertical: 36,
    backgroundColor: "rgba(8, 8, 8, 0.58)",
  },

  kicker: {
    color: "#C9A227",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 3,
    textAlign: "center",
    marginBottom: 10,
  },

  title: {
    color: "#F5F5F5",
    fontSize: 42,
    fontWeight: "800",
    letterSpacing: 0.5,
    lineHeight: 48,
    textAlign: "center",
  },

  titleAccent: {
    color: "#C9A227",
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 46,
    textAlign: "center",
    marginTop: -4,
    marginBottom: 18,
  },

  description: {
    width: "100%",
    maxWidth: 480,
    color: "#D0D0D0",
    fontSize: 17,
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 30,
  },

  primaryButton: {
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
    backgroundColor: "#C9A227",
    paddingVertical: 17,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#C9A227",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 6,
  },

  primaryButtonText: {
    color: "#0B0B0B",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },

  secondaryButton: {
    minWidth: 180,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: "#D0D0D0",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },

  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.88,
  },
});
