import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function IntroScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>‹ Back</Text>
      </Pressable>
      <Text style={styles.kicker}>WELCOME</Text>

      <Text style={styles.title}>More Than Recipes.</Text>

      <Text style={styles.subtitle}>
        Learn why cocktails work, discover remarkable spirits, and create
        unforgettable food pairings.
      </Text>

      <View style={styles.card}>
        <Text style={styles.icon}>🥃</Text>
        <Text style={styles.cardTitle}>Discover</Text>
        <Text style={styles.cardText}>
          Explore timeless classics and modern creations from around the world.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.icon}>🍽️</Text>
        <Text style={styles.cardTitle}>Pair</Text>
        <Text style={styles.cardText}>
          Find appetizers, meals, cheeses and desserts that complement every
          cocktail.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.icon}>📖</Text>
        <Text style={styles.cardTitle}>Learn</Text>
        <Text style={styles.cardText}>
          Understand spirits, glassware, ice, garnishes and mixing techniques.
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/onboarding/AgeVerification")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </ScrollView>
  );
}

const GOLD = "#C9A227";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090909",
  },

  content: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 60,
  },

  kicker: {
    color: GOLD,
    letterSpacing: 3,
    fontWeight: "700",
    marginBottom: 10,
  },

  title: {
    color: "white",
    fontSize: 38,
    fontWeight: "800",
    marginBottom: 14,
  },

  subtitle: {
    color: "#CFCFCF",
    fontSize: 17,
    lineHeight: 27,
    marginBottom: 36,
  },

  card: {
    backgroundColor: "#151515",
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  icon: {
    fontSize: 34,
    marginBottom: 12,
  },

  cardTitle: {
    color: GOLD,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },

  cardText: {
    color: "#D8D8D8",
    fontSize: 16,
    lineHeight: 24,
  },

  button: {
    backgroundColor: GOLD,
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#111",
    fontWeight: "800",
    fontSize: 17,
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
