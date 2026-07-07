import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AgeVerificationScreen() {
  const [isUnderage, setIsUnderage] = useState(false);

  if (isUnderage) {
    return (
      <View style={styles.container}>
        <Text style={styles.kicker}>AGE REQUIREMENT</Text>

        <Text style={styles.title}>Sorry, you must be 21 or older.</Text>

        <Text style={styles.description}>
          Unique Spirits & Pairings contains information about alcoholic
          beverages and is intended only for users of legal drinking age.
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.replace("/onboarding/Welcome")}
        >
          <Text style={styles.primaryButtonText}>Return to Welcome</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>‹ Back</Text>
      </Pressable>

      <Text style={styles.kicker}>BEFORE WE BEGIN</Text>

      <Text style={styles.title}>Are you at least 21 years old?</Text>

      <Text style={styles.description}>
        Unique Spirits & Pairings is designed for users of legal drinking age.
      </Text>

      <Pressable
        style={styles.primaryButton}
        onPress={() => router.push("/onboarding/ExperienceLevel")}
      >
        <Text style={styles.primaryButtonText}>Yes, Continue</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => setIsUnderage(true)}
      >
        <Text style={styles.secondaryButtonText}>No</Text>
      </Pressable>
    </View>
  );
}

const GOLD = "#C9A227";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090909",
    padding: 24,
    justifyContent: "center",
  },

  kicker: {
    color: GOLD,
    letterSpacing: 3,
    fontWeight: "700",
    marginBottom: 12,
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
    marginBottom: 38,
  },

  primaryButton: {
    backgroundColor: GOLD,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: "center",
    marginBottom: 14,
  },

  primaryButtonText: {
    color: "#111",
    fontWeight: "800",
    fontSize: 17,
  },

  secondaryButton: {
    paddingVertical: 16,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#B5B5B5",
    fontWeight: "700",
    fontSize: 16,
  },

  backButton: {
    position: "absolute",
    top: 55,
    left: 24,
    zIndex: 10,
  },

  backButtonText: {
    color: GOLD,
    fontSize: 17,
    fontWeight: "700",
  },
});
