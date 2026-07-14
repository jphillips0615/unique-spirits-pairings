import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CocktailCard from "@/components/cards/CocktailCard";
import { Colors } from "@/constants/colors";
import { useFavorites } from "@/context/FavoritesContext";
import { usePreferences } from "@/context/PreferencesContext";
import { cocktails } from "@/data/cocktails";
import { HOME_SPIRIT_CATEGORIES } from "@/data/spiritCategories";
import { useRecommendationHistory } from "@/hooks/useRecommendationHistory";
import { getCocktailRecommendations } from "@/utils/cocktailRecommendations";

const logo = require("../../assets/images/branding/logo.png");

export default function HomeScreen() {
  const { preferences } = usePreferences();
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const [selectedRecommendationId, setSelectedRecommendationId] = useState<
    string | null
  >(null);

  const { recentCocktailIds, isHistoryLoaded, rememberRecommendation } =
    useRecommendationHistory();

  const recommendations = useMemo(
    () =>
      getCocktailRecommendations({
        cocktails,
        preferences,
        favoriteIds,
      }),
    [preferences, favoriteIds],
  );

  const freshRecommendations = useMemo(() => {
    const unseenRecommendations = recommendations.filter(
      (recommendation) =>
        !recentCocktailIds.includes(recommendation.cocktail.id),
    );

    return unseenRecommendations.length
      ? unseenRecommendations
      : recommendations;
  }, [recommendations, recentCocktailIds]);

  useEffect(() => {
    setSelectedRecommendationId(null);
  }, [preferences, favoriteIds]);

  useEffect(() => {
    if (
      !isHistoryLoaded ||
      selectedRecommendationId ||
      !freshRecommendations.length
    ) {
      return;
    }

    const firstRecommendation = freshRecommendations[0];

    setSelectedRecommendationId(firstRecommendation.cocktail.id);
    rememberRecommendation(firstRecommendation.cocktail.id);
  }, [
    freshRecommendations,
    isHistoryLoaded,
    rememberRecommendation,
    selectedRecommendationId,
  ]);

  const currentRecommendation =
    recommendations.find(
      (recommendation) =>
        recommendation.cocktail.id === selectedRecommendationId,
    ) ??
    freshRecommendations[0] ??
    null;

  function showAnotherRecommendation() {
    if (!currentRecommendation || recommendations.length <= 1) {
      return;
    }

    const unseenOptions = recommendations.filter(
      (recommendation) =>
        recommendation.cocktail.id !== currentRecommendation.cocktail.id &&
        !recentCocktailIds.includes(recommendation.cocktail.id),
    );

    const fallbackOptions = recommendations.filter(
      (recommendation) =>
        recommendation.cocktail.id !== currentRecommendation.cocktail.id,
    );

    const nextRecommendation = unseenOptions[0] ?? fallbackOptions[0];

    if (!nextRecommendation) {
      return;
    }

    setSelectedRecommendationId(nextRecommendation.cocktail.id);
    rememberRecommendation(nextRecommendation.cocktail.id);
  }

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
          onPress={() => router.push("/(tabs)/my-bar" as Href)}
        >
          <View style={styles.myBarIcon}>
            <Ionicons name="wine-outline" size={28} color={Colors.gold} />
          </View>

          <View style={styles.myBarContent}>
            <Text style={styles.myBarKicker}>PERSONALIZED RECOMMENDATIONS</Text>

            <Text style={styles.myBarTitle}>My Unique Bar</Text>

            <Text style={styles.myBarText}>
              Build your personal collection, then discover what you can make
              with what you already have.
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
        <View style={styles.recommendationHeader}>
          <View style={styles.recommendationHeading}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>

            <Text style={styles.recommendationCounter}>
              {currentRecommendation
                ? `Personalized pick • ${recommendations.length} available`
                : "No recommendations"}
            </Text>
          </View>

          {recommendations.length > 1 ? (
            <TouchableOpacity
              style={styles.anotherButton}
              activeOpacity={0.82}
              onPress={showAnotherRecommendation}
            >
              <Ionicons name="refresh" size={17} color={Colors.gold} />

              <Text style={styles.anotherButtonText}>Show Me Another</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {currentRecommendation ? (
          <>
            <View style={styles.reasonCard}>
              <View style={styles.reasonIcon}>
                <Ionicons
                  name="sparkles-outline"
                  size={22}
                  color={Colors.gold}
                />
              </View>

              <View style={styles.reasonContent}>
                <Text style={styles.reasonTitle}>Why we recommended this</Text>

                <Text style={styles.reasonText}>
                  {currentRecommendation.explanation}
                </Text>
              </View>
            </View>

            <CocktailCard
              name={currentRecommendation.cocktail.name}
              spirit={currentRecommendation.cocktail.spirit}
              description={currentRecommendation.cocktail.description}
              image={currentRecommendation.cocktail.image}
              isFavorite={isFavorite(currentRecommendation.cocktail.id)}
              onFavoritePress={() =>
                toggleFavorite(currentRecommendation.cocktail.id)
              }
              onPress={() =>
                router.push(`/cocktail/${currentRecommendation.cocktail.id}`)
              }
            />
          </>
        ) : (
          <View style={styles.emptyRecommendationCard}>
            <Ionicons
              name="wine-outline"
              size={34}
              color={Colors.textSecondary}
            />

            <Text style={styles.emptyRecommendationTitle}>
              No recommendation available
            </Text>

            <Text style={styles.emptyRecommendationText}>
              Add cocktails to the library to begin receiving personalized
              recommendations.
            </Text>
          </View>
        )}
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

  recommendationHeader: {
    marginBottom: 14,
  },

  recommendationHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  recommendationCounter: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 14,
  },

  anotherButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 14,
    paddingVertical: 9,
    paddingHorizontal: 13,
  },

  anotherButtonText: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: "900",
  },

  reasonCard: {
    backgroundColor: "rgba(217, 164, 65, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(217, 164, 65, 0.45)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  reasonIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "rgba(217, 164, 65, 0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  reasonContent: {
    flex: 1,
  },

  reasonTitle: {
    color: Colors.gold,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 5,
  },

  reasonText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },

  emptyRecommendationCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
  },

  emptyRecommendationTitle: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 12,
    marginBottom: 6,
  },

  emptyRecommendationText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
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
