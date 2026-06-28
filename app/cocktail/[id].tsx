import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { cocktails } from "@/data/cocktails";

export default function CocktailDetails() {
  const { id } = useLocalSearchParams();

  const cocktail = cocktails.find((c) => c.id === id);

  if (!cocktail) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Cocktail not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: cocktail.name }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Image source={cocktail.image} style={styles.image} />

        <View style={styles.headerCard}>
          <Text style={styles.spirit}>{cocktail.spirit}</Text>
          <Text style={styles.title}>{cocktail.name}</Text>
          <Text style={styles.description}>{cocktail.description}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoPill}>
              <Text style={styles.infoLabel}>Difficulty</Text>
              <Text style={styles.infoValue}>{cocktail.difficulty}</Text>
            </View>

            <View style={styles.infoPill}>
              <Text style={styles.infoLabel}>Glass</Text>
              <Text style={styles.infoValue}>{cocktail.glass}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoPill}>
              <Text style={styles.infoLabel}>Garnish</Text>
              <Text style={styles.infoValue}>{cocktail.garnish}</Text>
            </View>

            <View style={styles.infoPill}>
              <Text style={styles.infoLabel}>Flavor</Text>
              <Text style={styles.infoValue}>{cocktail.flavorProfile}</Text>
            </View>
          </View>
        </View>

        <Section title="🥃 Ingredients">
          {cocktail.ingredients.map((item) => (
            <Text key={item} style={styles.listItem}>
              • {item}
            </Text>
          ))}
        </Section>

        <Section title="👨‍🍳 Instructions">
          {cocktail.instructions.map((step, index) => (
            <Text key={step} style={styles.listItem}>
              {index + 1}. {step}
            </Text>
          ))}
        </Section>

        <Section title="🍽 Perfect Pairings">
          <View style={styles.pairingGrid}>
            {cocktail.pairings.map((pairing) => (
              <View key={pairing} style={styles.pairingChip}>
                <Text style={styles.pairingText}>{pairing}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="📖 Cocktail Story">
          <Text style={styles.bodyText}>{cocktail.history}</Text>
        </Section>

        <Section title="💡 Bartender Tips">
          {cocktail.tips.map((tip) => (
            <Text key={tip} style={styles.listItem}>
              • {tip}
            </Text>
          ))}
        </Section>
      </ScrollView>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingBottom: 120,
  },

  image: {
    width: "100%",
    height: 320,
  },

  headerCard: {
    margin: 20,
    marginTop: -32,
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 26,
    padding: 22,
  },

  spirit: {
    color: Colors.gold,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: "uppercase",
  },

  title: {
    color: Colors.text,
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 12,
  },

  description: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 18,
  },

  infoRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  infoPill: {
    flex: 1,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    backgroundColor: Colors.background,
  },

  infoLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 4,
    textTransform: "uppercase",
  },

  infoValue: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: "800",
  },

  section: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14,
  },

  listItem: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 8,
  },

  pairingGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  pairingChip: {
    backgroundColor: Colors.background,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  bodyText: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 26,
  },

  pairingText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "800",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  error: {
    color: Colors.text,
    fontSize: 18,
  },
});
