import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";

export default function AboutScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(tabs)/explore");
            }
          }}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Ionicons name="chevron-back" size={26} color={Colors.gold} />
        </Pressable>

        <Text style={styles.header}>About</Text>
      </View>

      <Text style={styles.intro}>
        Unique Spirits & Pairings is a premium cocktail discovery guide built to
        help you explore classic drinks, understand their ingredients, and
        discover food pairings that complement each pour.
      </Text>

      <View style={styles.divider} />

      <InfoSection
        icon="wine-outline"
        title="Drink Responsibly"
        text="Cocktail recipes in this app contain alcohol and are intended only for adults of legal drinking age. Please enjoy responsibly and never drink and drive."
      />

      <InfoSection
        icon="restaurant-outline"
        title="Allergy Notice"
        text="Recipes and pairing suggestions may include common allergens such as dairy, eggs, nuts, citrus, gluten, or other ingredients. Always review ingredients carefully before preparing or consuming a drink or food pairing."
      />

      <InfoSection
        icon="information-circle-outline"
        title="Educational Information"
        text="Recipes, measurements, techniques, histories, and pairing suggestions are provided for general educational and entertainment purposes. Results may vary depending on ingredients, equipment, and preparation."
      />

      <InfoSection
        icon="shield-checkmark-outline"
        title="Your Safety"
        text="Never consume an ingredient you are allergic to or unsure about. Consult a qualified professional when you have questions about alcohol, medication interactions, dietary restrictions, or personal health concerns."
      />

      <View style={styles.divider} />

      <View style={styles.linkCard}>
        <Pressable
          style={({ pressed }) => [
            styles.linkRow,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.linkText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.gold} />
        </Pressable>

        <View style={styles.linkDivider} />

        <Pressable
          style={({ pressed }) => [
            styles.linkRow,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.linkText}>Terms of Use</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.gold} />
        </Pressable>

        <View style={styles.linkDivider} />

        <Pressable
          style={({ pressed }) => [
            styles.linkRow,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.linkText}>Contact Us</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.gold} />
        </Pressable>
      </View>

      <View style={styles.versionContainer}>
        <Text style={styles.appName}>Unique Spirits & Pairings</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.copyright}>
          Please enjoy every pour responsibly.
        </Text>
      </View>
    </ScrollView>
  );
}

type InfoSectionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text: string;
};

function InfoSection({ icon, title, text }: InfoSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleRow}>
        <Ionicons name={icon} size={24} color={Colors.gold} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <Text style={styles.sectionText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingTop: 54,
    paddingHorizontal: 22,
    paddingBottom: 80,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  header: {
    color: Colors.gold,
    fontSize: 32,
    fontWeight: "900",
  },

  intro: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 28,
  },

  section: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginLeft: 10,
  },

  sectionText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },

  linkCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    overflow: "hidden",
  },

  linkRow: {
    minHeight: 58,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  linkText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "800",
  },

  linkDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 18,
  },

  buttonPressed: {
    opacity: 0.65,
  },

  versionContainer: {
    alignItems: "center",
    marginTop: 34,
  },

  appName: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 5,
  },

  version: {
    color: Colors.gold,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
  },

  copyright: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
});
