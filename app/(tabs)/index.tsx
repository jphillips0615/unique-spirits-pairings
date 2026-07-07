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
import { cocktails } from "@/data/cocktails";
import { HOME_SPIRIT_CATEGORIES } from "@/data/spiritCategories";
import { router } from "expo-router";
import CocktailCard from "../../components/cards/CocktailCard";

const logo = require("../../assets/images/branding/logo.png");

export default function HomeScreen() {
  const featuredCocktail =
    cocktails[Math.floor(Math.random() * cocktails.length)];

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
          onPress={() => router.push("/explore")}
        >
          <Text style={styles.primaryButtonText}>Explore Cocktails</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by Spirit</Text>

        <View style={styles.spiritGrid}>
          {HOME_SPIRIT_CATEGORIES.map((spirit) => (
            <TouchableOpacity
              key={spirit.name}
              style={styles.spiritCard}
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
        <Text style={styles.sectionTitle}>Featured Cocktail</Text>

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
    paddingTop: 52,
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
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 21,
    fontWeight: "900",
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
