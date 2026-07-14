import { Colors } from "@/constants/colors";
import {
    INGREDIENT_GLOSSARY,
    searchIngredientGlossary,
} from "@/data/ingredientGlossary";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { useMemo, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function IngredientGlossaryScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries = useMemo(
    () => searchIngredientGlossary(searchQuery),
    [searchQuery],
  );

  function openIngredient(id: string) {
    router.push(`/glossary/${id}` as Href);
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="chevron-back" size={28} color={Colors.gold} />
        </Pressable>

        <View style={styles.headerText}>
          <Text style={styles.kicker}>LEARN THE INGREDIENTS</Text>
          <Text style={styles.title}>Ingredient Glossary</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>
        Explore unfamiliar spirits, liqueurs, bitters, syrups, and other
        cocktail ingredients in plain English.
      </Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />

        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search ingredients"
          placeholderTextColor={Colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.searchInput}
        />

        {searchQuery ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            onPress={() => setSearchQuery("")}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color={Colors.textSecondary}
            />
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.countText}>
        {filteredEntries.length}{" "}
        {filteredEntries.length === 1 ? "ingredient" : "ingredients"}
      </Text>

      {filteredEntries.length > 0 ? (
        filteredEntries.map((entry) => (
          <Pressable
            key={entry.id}
            accessibilityRole="button"
            accessibilityLabel={`Learn about ${entry.name}`}
            onPress={() => openIngredient(entry.id)}
            style={({ pressed }) => [
              styles.entryCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.entryIcon}>
              <Ionicons name="flask-outline" size={24} color={Colors.gold} />
            </View>

            <View style={styles.entryContent}>
              <Text style={styles.entryName}>{entry.name}</Text>

              <Text style={styles.entryCategory}>{entry.category}</Text>

              <Text style={styles.entryDescription} numberOfLines={3}>
                {entry.description}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color={Colors.gold} />
          </Pressable>
        ))
      ) : (
        <View style={styles.emptyCard}>
          <Ionicons name="search-outline" size={34} color={Colors.gold} />

          <Text style={styles.emptyTitle}>No ingredients found</Text>

          <Text style={styles.emptyText}>
            Try searching for another name, category, flavor, or cocktail use.
          </Text>
        </View>
      )}

      {INGREDIENT_GLOSSARY.length < 25 ? (
        <View style={styles.noticeCard}>
          <Ionicons name="construct-outline" size={24} color={Colors.gold} />

          <Text style={styles.noticeText}>
            The glossary is still growing. More spirits, liqueurs, syrups,
            mixers, and garnishes will be added as the cocktail library expands.
          </Text>
        </View>
      ) : null}
    </ScrollView>
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
    paddingBottom: 100,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  headerText: {
    flex: 1,
  },

  kicker: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.2,
    marginBottom: 4,
  },

  title: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: "900",
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 22,
  },

  searchContainer: {
    minHeight: 56,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },

  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    paddingVertical: 15,
  },

  countText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 14,
  },

  entryCard: {
    minHeight: 118,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 12,
  },

  entryIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(217, 164, 65, 0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  entryContent: {
    flex: 1,
  },

  entryName: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "900",
  },

  entryCategory: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 3,
    marginBottom: 7,
  },

  entryDescription: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  emptyCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 22,
    padding: 28,
    alignItems: "center",
  },

  emptyTitle: {
    color: Colors.text,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 12,
    marginBottom: 8,
  },

  emptyText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },

  noticeCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginTop: 20,
  },

  noticeText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },

  pressed: {
    opacity: 0.78,
  },
});
