import { router } from "expo-router";
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function WelcomeScreen() {
  return (
    <ImageBackground
      source={require("../../assets/images/splash-cocktail.jpg")}
      style={styles.background}
      blurRadius={4}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.kicker}>WELCOME TO</Text>

          <Text style={styles.title}>Unique Spirits</Text>
          <Text style={styles.titleAccent}>& Pairings</Text>

          <Text style={styles.description}>
            Discover unforgettable cocktails, learn what makes them special, and
            pair them with food that actually belongs beside them.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push("/onboarding/Intro")}
          >
            <Text style={styles.primaryButtonText}>Start Exploring</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.secondaryButtonText}>Skip for Now</Text>
          </Pressable>
        </View>
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
    backgroundColor: "rgba(0,0,0,0.68)",
    justifyContent: "flex-end",
  },
  content: {
    paddingHorizontal: 26,
    paddingBottom: 58,
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
    marginBottom: 18,
  },
  description: {
    color: "#B5B5B5",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: "#C9A227",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
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
    color: "#B5B5B5",
    fontSize: 15,
    fontWeight: "600",
  },
});
