import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { EXPLORE_SPIRIT_CATEGORIES } from "@/data/spiritCategories";

export default function ExploreScreen() {
  function handleCategoryPress(spirit: string) {
    router.push({
      pathname: "/(tabs)/search",
      params: { spirit },
    });
  }

  function handleAboutPress() {
    router.push("/about");
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Spirit Categories</Text>

      <Text style={styles.subtitle}>
        Browse cocktails by the main spirit used in the drink.
      </Text>

      {EXPLORE_SPIRIT_CATEGORIES.map((category) => (
        <Pressable
          key={category.label}
          onPress={() => handleCategoryPress(category.spirit)}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <View>
            <Text style={styles.cardText}>{category.label}</Text>

            <Text style={styles.cardSubtext}>
              Tap to view matching cocktails
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>
      ))}

      <View style={styles.divider} />

      <Text style={styles.infoHeader}>App Information</Text>

      <Pressable
        onPress={handleAboutPress}
        style={({ pressed }) => [
          styles.aboutCard,
          pressed && styles.cardPressed,
        ]}
      >
        <View style={styles.aboutTextContainer}>
          <Text style={styles.aboutTitle}>About & Safety</Text>

          <Text style={styles.aboutSubtitle}>
            Responsible drinking, allergy information, and app details
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  header: {
    color: Colors.gold,
    fontSize: 32,
    marginBottom: 8,
    fontWeight: "800",
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },

  card: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  cardText: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },

  cardSubtext: {
    color: Colors.textSecondary,
    fontSize: 14,
  },

  arrow: {
    color: Colors.gold,
    fontSize: 34,
    fontWeight: "300",
  },

  divider: {
    height: 1,
    backgroundColor: Colors.gold,
    opacity: 0.65,
    marginTop: 14,
    marginBottom: 24,
  },

  infoHeader: {
    color: Colors.gold,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 14,
  },

  aboutCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  aboutTextContainer: {
    flex: 1,
    paddingRight: 16,
  },

  aboutTitle: {
    color: Colors.text,
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 5,
  },

  aboutSubtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});
