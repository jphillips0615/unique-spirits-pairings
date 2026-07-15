import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import type React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "@/constants/colors";
import { useFavorites } from "@/context/FavoritesContext";
import { cocktails } from "@/data/cocktails";

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoPill}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function CocktailDetails() {
  const { id } = useLocalSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();

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
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={cocktail.image}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.headerCard}>
          <View style={styles.titleRow}>
            <View style={styles.titleTextWrap}>
              <Text style={styles.spirit}>{cocktail.spirit}</Text>
              <Text style={styles.title}>{cocktail.name}</Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                isFavorite(cocktail.id)
                  ? `Remove ${cocktail.name} from favorites`
                  : `Add ${cocktail.name} to favorites`
              }
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(cocktail.id)}
            >
              <Ionicons
                name={isFavorite(cocktail.id) ? "heart" : "heart-outline"}
                size={28}
                color={Colors.gold}
              />
            </Pressable>
          </View>

          <Text style={styles.description}>{cocktail.description}</Text>

          <View style={styles.infoRow}>
            <InfoPill label="Difficulty" value={cocktail.difficulty} />
            <InfoPill label="Glass" value={cocktail.glass} />
          </View>

          <View style={styles.infoRow}>
            <InfoPill label="Garnish" value={cocktail.garnish} />
            <InfoPill
              label="Flavor"
              value={cocktail.flavorProfile.join(", ")}
            />
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
          <Text style={styles.bodyText}>{cocktail.story}</Text>
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
    height: 340,
  },

  headerCard: {
    margin: 20,
    marginTop: -36,
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 28,
    padding: 22,
  },

  titleRow: {
    position: "relative",
    minHeight: 92,
    alignItems: "center",
    justifyContent: "center",
  },

  titleTextWrap: {
    width: "100%",
    paddingHorizontal: 52,
    alignItems: "center",
  },

  favoriteButton: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },

  spirit: {
    color: Colors.gold,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.6,
    marginBottom: 8,
    textTransform: "uppercase",
    textAlign: "center",
  },

  title: {
    color: Colors.text,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "900",
    marginBottom: 12,
    textAlign: "center",
  },

  description: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 18,
    textAlign: "center",
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
    padding: 13,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  infoLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 5,
    textTransform: "uppercase",
    textAlign: "center",
  },

  infoValue: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
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
    textAlign: "center",
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
    justifyContent: "center",
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

  pairingText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },

  bodyText: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 26,
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
    textAlign: "center",
  },
});
