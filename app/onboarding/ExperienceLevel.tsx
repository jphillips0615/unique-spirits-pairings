import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const GOLD = "#C9A227";

const OPTIONS = [
  "I&apos;m to Cocktails",
  "I Enjoy Cocktails",
  "I&apos;m an Enthusiast",
  "Bartender / Professional",
];

export default function ExperienceLevel() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>‹ Back</Text>
      </Pressable>
      <Text style={styles.kicker}>PERSONALIZE</Text>

      <Text style={styles.title}>What&apos;s your experience level?</Text>

      <Text style={styles.subtitle}>
        We&apos;ll tailor recommendations and explanations based on your
        experience.
      </Text>

      {OPTIONS.map((option) => (
        <Pressable
          key={option}
          style={styles.option}
          onPress={() => router.push("/onboarding/FavoriteSpirits")}
        >
          <Text style={styles.optionText}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
}

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
    marginBottom: 10,
  },

  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 16,
  },

  subtitle: {
    color: "#CFCFCF",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 40,
  },

  option: {
    backgroundColor: "#151515",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    padding: 20,
    marginBottom: 16,
  },

  optionText: {
    color: "#F5F5F5",
    fontSize: 18,
    fontWeight: "700",
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 24,
    zIndex: 10,
  },

  backButtonText: {
    color: "#C9A227",
    fontSize: 17,
    fontWeight: "700",
  },
});
