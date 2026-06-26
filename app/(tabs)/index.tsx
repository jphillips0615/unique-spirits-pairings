import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>UNIQUE SPIRITS & PAIRINGS</Text>
        <Text style={styles.title}>What are we pouring tonight?</Text>
        <Text style={styles.subtitle}>
          Discover legendary cocktails, learn the spirits behind them, and pair
          each pour with food that actually makes sense.
        </Text>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Explore Cocktails</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Cocktail</Text>

        <View style={styles.card}>
          <Text style={styles.cardKicker}>CLASSIC</Text>
          <Text style={styles.cardTitle}>Old Fashioned</Text>
          <Text style={styles.cardText}>
            Bourbon, bitters, sugar, and orange. Simple, powerful, and timeless.
          </Text>
          <Text style={styles.cardLink}>View recipe →</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tonight’s Pairing Ideas</Text>

        <View style={styles.pairingRow}>
          <View style={styles.smallCard}>
            <Text style={styles.smallCardTitle}>🥩 Steak</Text>
            <Text style={styles.smallCardText}>Bold whiskey cocktails</Text>
          </View>

          <View style={styles.smallCard}>
            <Text style={styles.smallCardTitle}>🧀 Charcuterie</Text>
            <Text style={styles.smallCardText}>Bitter, herbal, and dry</Text>
          </View>
        </View>

        <View style={styles.pairingRow}>
          <View style={styles.smallCard}>
            <Text style={styles.smallCardTitle}>🍫 Dessert</Text>
            <Text style={styles.smallCardText}>Dark rum and coffee notes</Text>
          </View>

          <View style={styles.smallCard}>
            <Text style={styles.smallCardTitle}>🦐 Seafood</Text>
            <Text style={styles.smallCardText}>Gin, citrus, and bubbles</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#050505",
  },
  content: {
    padding: 22,
    paddingBottom: 120,
  },
  hero: {
    paddingTop: 52,
    paddingBottom: 34,
  },
  kicker: {
    color: "#D9A441",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 16,
  },
  title: {
    color: "#F5E9D6",
    fontSize: 38,
    fontWeight: "900",
    lineHeight: 44,
    marginBottom: 14,
  },
  subtitle: {
    color: "#B8A98F",
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 26,
  },
  primaryButton: {
    backgroundColor: "#D9A441",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignSelf: "flex-start",
  },
  primaryButtonText: {
    color: "#050505",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    color: "#F5E9D6",
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#12100D",
    borderColor: "#6F4E1F",
    borderWidth: 1,
    borderRadius: 28,
    padding: 22,
  },
  cardKicker: {
    color: "#D9A441",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 10,
  },
  cardTitle: {
    color: "#F5E9D6",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 10,
  },
  cardText: {
    color: "#B8A98F",
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 18,
  },
  cardLink: {
    color: "#D9A441",
    fontSize: 15,
    fontWeight: "800",
  },
  pairingRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  smallCard: {
    flex: 1,
    backgroundColor: "#0F0D0B",
    borderColor: "#2A2118",
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    minHeight: 110,
  },
  smallCardTitle: {
    color: "#F5E9D6",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 8,
  },
  smallCardText: {
    color: "#B8A98F",
    fontSize: 13,
    lineHeight: 19,
  },
});
