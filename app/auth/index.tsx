import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "@/constants/colors";

export default function AccountWelcomeScreen() {
  function handleContinueAsGuest() {
    router.push("/onboarding/CreateProfile");
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
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="chevron-back" size={38} color={Colors.gold} />
            </Pressable>

            <View style={styles.content}>
              <View style={styles.brandMark}>
                <Ionicons name="wine-outline" size={34} color={Colors.gold} />
              </View>

              <Text style={styles.kicker}>YOUR EXPERIENCE</Text>

              <Text style={styles.title}>Welcome to</Text>

              <Text style={styles.titleAccent}>Unique Spirits & Pairings</Text>

              <Text style={styles.description}>
                Sign in to save your favorites and preferences across devices,
                or continue exploring without an account.
              </Text>

              <Pressable
                onPress={() => router.push("/auth/sign-in")}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons name="log-in-outline" size={21} color="#0B0B0B" />

                <Text style={styles.primaryButtonText}>Sign In</Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/auth/create-account")}
                style={({ pressed }) => [
                  styles.outlineButton,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons
                  name="person-add-outline"
                  size={21}
                  color={Colors.gold}
                />

                <Text style={styles.outlineButtonText}>Create Account</Text>
              </Pressable>

              <View style={styles.dividerRow}>
                <View style={styles.divider} />

                <Text style={styles.dividerText}>OR</Text>

                <View style={styles.divider} />
              </View>

              <Pressable
                onPress={handleContinueAsGuest}
                style={({ pressed }) => [
                  styles.guestButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.guestButtonText}>Continue as Guest</Text>

                <Ionicons name="arrow-forward" size={19} color="#D7D7D7" />
              </Pressable>

              <Text style={styles.guestNote}>
                Your profile and preferences will be saved on this device only.
              </Text>
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
    backgroundColor: Colors.background,
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

  backButton: {
    position: "absolute",
    top: 20,
    left: 14,
    zIndex: 10,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 26,
    paddingVertical: 38,
    backgroundColor: "rgba(8, 8, 8, 0.68)",
  },

  brandMark: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(217, 164, 65, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(217, 164, 65, 0.55)",
    marginBottom: 28,
  },

  kicker: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 14,
  },

  title: {
    color: Colors.text,
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
  },

  titleAccent: {
    color: Colors.gold,
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
    marginBottom: 22,
  },

  description: {
    color: "#CCCCCC",
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 34,
  },

  primaryButton: {
    width: "100%",
    maxWidth: 460,
    minHeight: 56,
    alignSelf: "center",
    borderRadius: 999,
    backgroundColor: Colors.gold,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginBottom: 18,
    shadowColor: Colors.gold,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
  },

  primaryButtonText: {
    color: "#0B0B0B",
    fontSize: 16,
    fontWeight: "900",
  },

  outlineButton: {
    width: "100%",
    maxWidth: 460,
    minHeight: 56,
    alignSelf: "center",
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: Colors.gold,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginBottom: 32,
    backgroundColor: "rgba(217, 164, 65, 0.05)",
  },

  outlineButtonText: {
    color: Colors.gold,
    fontSize: 16,
    fontWeight: "800",
  },

  dividerRow: {
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#383838",
  },

  dividerText: {
    color: "#888888",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginHorizontal: 14,
  },

  guestButton: {
    width: "100%",
    maxWidth: 460,
    minHeight: 52,
    alignSelf: "center",
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "#555555",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  guestButtonText: {
    color: "#E5E5E5",
    fontSize: 15,
    fontWeight: "700",
  },

  guestNote: {
    color: "#999999",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 16,
  },

  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
});
