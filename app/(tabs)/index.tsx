import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/colors";
import { useFavorites } from "@/context/FavoritesContext";
import { usePreferences } from "@/context/PreferencesContext";
import { cocktails } from "@/data/cocktails";
import { HOME_SPIRIT_CATEGORIES } from "@/data/spiritCategories";
import CocktailCard from "../../components/cards/CocktailCard";

const logo = require("../../assets/images/branding/logo.png");

export default function HomeScreen() {
  const { preferences } = usePreferences();

  const preferredCocktails = preferences.favoriteSpirits.length
    ? cocktails.filter((cocktail) =>
        preferences.favoriteSpirits.includes(cocktail.spirit),
      )
    : cocktails;

  const recommendationPool = preferredCocktails.length
    ? preferredCocktails
    : cocktails;

  const featuredCocktail =
    recommendationPool[Math.floor(Math.random() * recommendationPool.length)];

  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>What are we pouring tonight?</Text>

        <Text style={styles.subtitle}>
          Discover legendary cocktails, learn the spirits behind them, and pair
          each pour with food that actually makes sense.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.82}
          onPress={() => router.push("/explore")}
        >
          <Text style={styles.primaryButtonText}>Explore Cocktails</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.myBarCard}
          activeOpacity={0.82}
          onPress={() => router.push("/my-bar" as Href)}
        >
          <View style={styles.myBarIcon}>
            <Ionicons name="wine-outline" size={28} color={Colors.gold} />
          </View>

          <View style={styles.myBarContent}>
            <Text style={styles.myBarKicker}>PERSONALIZED RECOMMENDATIONS</Text>

            <Text style={styles.myBarTitle}>What’s in My Bar?</Text>

            <Text style={styles.myBarText}>
              Save the bottles and ingredients you already have, then discover
              what you can make.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={24} color={Colors.gold} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by Spirit</Text>

        <View style={styles.spiritGrid}>
          {HOME_SPIRIT_CATEGORIES.map((spirit) => (
            <TouchableOpacity
              key={spirit.name}
              style={styles.spiritCard}
              activeOpacity={0.82}
              onPress={() =>
                router.push({
                  pathname: "/search",
                  params: { spirit: spirit.name },
                })
              }
            >
              <Text style={styles.spiritEmoji}>{spirit.emoji}</Text>
              <Text style={styles.spiritName}>{spirit.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {preferences.favoriteSpirits.length
            ? "Recommended for You"
            : "Featured Cocktail"}
        </Text>

        {preferences.favoriteSpirits.length > 0 ? (
          <Text style={styles.recommendationNote}>
            Based on your interest in {preferences.favoriteSpirits.join(", ")}.
          </Text>
        ) : null}

        <CocktailCard
          name={featuredCocktail.name}
          spirit={featuredCocktail.spirit}
          description={featuredCocktail.description}
          image={featuredCocktail.image}
          isFavorite={isFavorite(featuredCocktail.id)}
          onFavoritePress={() => toggleFavorite(featuredCocktail.id)}
          onPress={() => router.push(`/cocktail/${featuredCocktail.id}`)}
        />
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
    backgroundColor: Colors.background,
  },

  content: {
    padding: 22,
    paddingBottom: 120,
  },

  hero: {
    paddingTop: 24,
    paddingBottom: 34,
  },

  logo: {
    width: 240,
    height: 120,
    alignSelf: "center",
    marginBottom: 24,
  },

  title: {
    color: Colors.text,
    fontSize: 38,
    fontWeight: "900",
    lineHeight: 44,
    marginBottom: 14,
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 26,
  },

  primaryButton: {
    backgroundColor: Colors.gold,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignSelf: "flex-start",
  },

  primaryButtonText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  myBarCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 22,
    padding: 18,
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  myBarIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "rgba(217, 164, 65, 0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  myBarContent: {
    flex: 1,
  },

  myBarKicker: {
    color: Colors.gold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginBottom: 5,
  },

  myBarTitle: {
    color: Colors.text,
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 5,
  },

  myBarText: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  section: {
    marginTop: 22,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 14,
  },

  recommendationNote: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: -6,
    marginBottom: 14,
  },

  pairingRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  smallCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    minHeight: 110,
  },

  smallCardTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 8,
  },

  smallCardText: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  spiritGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  spiritCard: {
    width: "30.8%",
    backgroundColor: Colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 20,
    alignItems: "center",
  },

  spiritEmoji: {
    fontSize: 34,
    marginBottom: 10,
  },

  spiritName: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
});
