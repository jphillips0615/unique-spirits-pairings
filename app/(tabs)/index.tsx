import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const drinks = [
    "Old Fashioned",
    "Negroni",
    "Manhattan",
    "Margarita",
    "Whiskey Sour",
  ];

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.hero}>
        <Text style={styles.logo}>Unique</Text>
        <Text style={styles.subtitle}>SPIRITS & PAIRINGS</Text>
        <Text style={styles.tagline}>
          Exceptional spirits. Perfect pairings.
        </Text>

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Explore Drinks</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>50 Must-Try Drinks</Text>

        {drinks.map((drink, index) => (
          <View key={drink} style={styles.card}>
            <Text style={styles.number}>
              {String(index + 1).padStart(2, "0")}
            </Text>
            <View>
              <Text style={styles.cardTitle}>{drink}</Text>
              <Text style={styles.cardSubtitle}>
                Tap to view recipe and pairings
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505" },
  hero: {
    paddingTop: 90,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  logo: {
    fontSize: 48,
    color: "#D9A441",
    fontWeight: "300",
    fontStyle: "italic",
  },
  subtitle: {
    color: "#F5E7C8",
    letterSpacing: 5,
    fontSize: 15,
    marginTop: 8,
  },
  tagline: {
    color: "#D8D8D8",
    fontSize: 18,
    textAlign: "center",
    marginTop: 28,
    marginBottom: 28,
  },
  primaryButton: {
    backgroundColor: "#D9A441",
    paddingVertical: 14,
    paddingHorizontal: 42,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: "#050505",
    fontWeight: "700",
    letterSpacing: 1,
  },
  section: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionTitle: { color: "#F5E7C8", fontSize: 24, marginBottom: 18 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101010",
    borderColor: "#6F4E1F",
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
  },
  number: { color: "#D9A441", fontSize: 24, marginRight: 18 },
  cardTitle: { color: "#FFFFFF", fontSize: 18 },
  cardSubtitle: { color: "#A8A8A8", marginTop: 4 },
});
