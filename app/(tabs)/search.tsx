import { useFavorites } from "@/context/FavoritesContext";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import CocktailCard from "@/components/cards/CocktailCard";
import { Colors } from "@/constants/colors";
import { cocktails } from "@/data/cocktails";
const spirits = [
  "All",
  "Whiskey",
  "Bourbon",
  "Gin",
  "Vodka",
  "Rum",
  "Tequila",
  "Brandy",
  "Scotch",
];

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedSpirit, setSelectedSpirit] = useState("All");
  const { isFavorite, toggleFavorite } = useFavorites();
  const filteredCocktails = useMemo(() => {
    const query = searchText.toLowerCase().trim();

    return cocktails.filter((cocktail) => {
      const matchesSpirit =
        selectedSpirit === "All" ||
        cocktail.spirit.toLowerCase().includes(selectedSpirit.toLowerCase());

      const matchesSearch =
        cocktail.name.toLowerCase().includes(query) ||
        cocktail.spirit.toLowerCase().includes(query) ||
        cocktail.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(query),
        );

      return matchesSpirit && matchesSearch;
    });
  }, [searchText, selectedSpirit]);

  return (
    <FlatList
      data={filteredCocktails}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <>
          <Text style={styles.title}>Search Cocktails</Text>

          <Text style={styles.subtitle}>
            Find drinks by name, spirit, or ingredient.
          </Text>

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search cocktails..."
            placeholderTextColor={Colors.textSecondary}
            style={styles.searchInput}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
          >
            {spirits.map((item) => {
              const isSelected = selectedSpirit === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => setSelectedSpirit(item)}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isSelected && styles.chipTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </>
      }
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🍸</Text>
          <Text style={styles.emptyTitle}>No cocktails found</Text>
          <Text style={styles.emptyText}>
            Try another cocktail, spirit, or ingredient.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <CocktailCard
          name={item.name}
          spirit={item.spirit}
          description={item.description}
          image={item.image}
          isFavorite={isFavorite(item.id)}
          onFavoritePress={() => toggleFavorite(item.id)}
          onPress={() => router.push(`/cocktail/${item.id}`)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 120,
    backgroundColor: Colors.background,
    flexGrow: 1,
  },

  title: {
    color: Colors.text,
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 8,
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    marginBottom: 20,
  },

  searchInput: {
    backgroundColor: Colors.card,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 18,
  },

  filterList: {
    paddingBottom: 22,
    gap: 10,
  },

  chip: {
    backgroundColor: Colors.card,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 10,
  },

  chipSelected: {
    backgroundColor: Colors.gold,
  },

  chipText: {
    color: Colors.textSecondary,
    fontWeight: "700",
  },

  chipTextSelected: {
    color: Colors.background,
  },

  emptyState: {
    alignItems: "center",
    marginTop: 80,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },

  emptyTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
  },

  emptyText: {
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
});
