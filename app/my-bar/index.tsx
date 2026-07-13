import { Colors } from "@/constants/colors";
import { useBarInventory } from "@/context/BarInventoryContext";
import { BAR_INGREDIENT_CATEGORIES } from "@/data/barIngredients";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function MyBarScreen() {
  const {
    inventory,
    hasIngredient,
    toggleIngredient,
    addIngredient,
    clearInventory,
  } = useBarInventory();

  const [searchQuery, setSearchQuery] = useState("");
  const [customIngredient, setCustomIngredient] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!normalizedSearch) {
      return BAR_INGREDIENT_CATEGORIES;
    }

    return BAR_INGREDIENT_CATEGORIES.map((category) => ({
      ...category,
      ingredients: category.ingredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(normalizedSearch),
      ),
    })).filter((category) => category.ingredients.length > 0);
  }, [normalizedSearch]);

  async function handleToggleIngredient(ingredient: string) {
    if (isUpdating) {
      return;
    }

    try {
      setIsUpdating(true);
      await toggleIngredient(ingredient);
    } catch (error) {
      console.error("Unable to update bar inventory:", error);

      Alert.alert(
        "Unable to Update My Bar",
        "Something went wrong while saving that ingredient.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleAddCustomIngredient() {
    const trimmedIngredient = customIngredient.trim();

    if (!trimmedIngredient || isUpdating) {
      return;
    }

    if (hasIngredient(trimmedIngredient)) {
      Alert.alert(
        "Already Added",
        `${trimmedIngredient} is already in your bar.`,
      );
      return;
    }

    try {
      setIsUpdating(true);
      await addIngredient(trimmedIngredient);
      setCustomIngredient("");
    } catch (error) {
      console.error("Unable to add custom ingredient:", error);

      Alert.alert(
        "Unable to Add Ingredient",
        "Something went wrong while saving that ingredient.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  function handleClearInventory() {
    if (inventory.length === 0) {
      return;
    }

    Alert.alert(
      "Clear My Bar?",
      "This will remove every saved ingredient from your bar.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await clearInventory();
            } catch (error) {
              console.error("Unable to clear bar inventory:", error);
            }
          },
        },
      ],
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={() => router.back()}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
      >
        <Ionicons name="chevron-back" size={38} color={Colors.gold} />
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.kicker}>YOUR HOME BAR</Text>

        <Text style={styles.title}>What’s in My Bar?</Text>

        <Text style={styles.subtitle}>
          Select the bottles, mixers, and ingredients you already have. We’ll
          use them to show what you can make and what you’re missing.
        </Text>
      </View>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryNumber}>{inventory.length}</Text>
          <Text style={styles.summaryLabel}>
            {inventory.length === 1 ? "ingredient saved" : "ingredients saved"}
          </Text>
        </View>

        {inventory.length > 0 ? (
          <Pressable
            onPress={handleClearInventory}
            style={({ pressed }) => [
              styles.clearButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </Pressable>
        ) : null}
      </View>

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
          <Pressable onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={Colors.textSecondary}
            />
          </Pressable>
        ) : null}
      </View>

      {filteredCategories.length > 0 ? (
        filteredCategories.map((category) => (
          <View key={category.id} style={styles.category}>
            <Text style={styles.categoryTitle}>{category.title}</Text>

            <Text style={styles.categoryDescription}>
              {category.description}
            </Text>

            <View style={styles.ingredientGrid}>
              {category.ingredients.map((ingredient) => {
                const selected = hasIngredient(ingredient);

                return (
                  <Pressable
                    key={ingredient}
                    disabled={isUpdating}
                    onPress={() => handleToggleIngredient(ingredient)}
                    style={({ pressed }) => [
                      styles.ingredientChip,
                      selected && styles.ingredientChipSelected,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.ingredientText,
                        selected && styles.ingredientTextSelected,
                      ]}
                    >
                      {ingredient}
                    </Text>

                    {selected ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color={Colors.gold}
                      />
                    ) : (
                      <Ionicons
                        name="add-circle-outline"
                        size={18}
                        color={Colors.textSecondary}
                      />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptySearchCard}>
          <Ionicons name="search-outline" size={34} color={Colors.gold} />

          <Text style={styles.emptySearchTitle}>No matches found</Text>

          <Text style={styles.emptySearchText}>
            Try a different search or add the ingredient manually below.
          </Text>
        </View>
      )}

      <View style={styles.customSection}>
        <Text style={styles.categoryTitle}>Something Else?</Text>

        <Text style={styles.categoryDescription}>
          Add a bottle, mixer, syrup, garnish, or ingredient that is not listed
          above.
        </Text>

        <View style={styles.customInputRow}>
          <TextInput
            value={customIngredient}
            onChangeText={setCustomIngredient}
            placeholder="Add custom ingredient"
            placeholderTextColor={Colors.textSecondary}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleAddCustomIngredient}
            style={styles.customInput}
          />

          <Pressable
            disabled={!customIngredient.trim() || isUpdating}
            onPress={handleAddCustomIngredient}
            style={({ pressed }) => [
              styles.addButton,
              (!customIngredient.trim() || isUpdating) && styles.buttonDisabled,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="add" size={24} color={Colors.background} />
          </Pressable>
        </View>
      </View>

      {inventory.length > 0 ? (
        <View style={styles.savedSection}>
          <Text style={styles.categoryTitle}>Saved in My Bar</Text>

          <View style={styles.savedList}>
            {inventory.map((ingredient) => (
              <View key={ingredient} style={styles.savedItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={19}
                  color={Colors.gold}
                />

                <Text style={styles.savedItemText}>{ingredient}</Text>
              </View>
            ))}
          </View>
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
    paddingHorizontal: 22,
    paddingTop: 86,
    paddingBottom: 120,
  },

  backButton: {
    position: "absolute",
    top: 18,
    left: 10,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  header: {
    marginBottom: 26,
  },

  kicker: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 10,
  },

  title: {
    color: Colors.text,
    fontSize: 36,
    lineHeight: 43,
    fontWeight: "900",
    marginBottom: 14,
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },

  summaryCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  summaryNumber: {
    color: Colors.gold,
    fontSize: 34,
    fontWeight: "900",
  },

  summaryLabel: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },

  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  clearButtonText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "800",
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
    marginBottom: 28,
  },

  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    paddingVertical: 15,
  },

  category: {
    marginBottom: 30,
  },

  categoryTitle: {
    color: Colors.text,
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 8,
  },

  categoryDescription: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 15,
  },

  ingredientGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  ingredientChip: {
    minHeight: 46,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 999,
    paddingHorizontal: 15,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  ingredientChipSelected: {
    backgroundColor: "rgba(217, 164, 65, 0.16)",
    borderColor: Colors.gold,
  },

  ingredientText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "700",
  },

  ingredientTextSelected: {
    color: Colors.gold,
    fontWeight: "900",
  },

  emptySearchCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 22,
    alignItems: "center",
    padding: 28,
    marginBottom: 30,
  },

  emptySearchTitle: {
    color: Colors.text,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 12,
  },

  emptySearchText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
  },

  customSection: {
    marginTop: 4,
    marginBottom: 30,
  },

  customInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  customInput: {
    flex: 1,
    minHeight: 56,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 18,
    color: Colors.text,
    fontSize: 16,
    paddingHorizontal: 16,
  },

  addButton: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: Colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonDisabled: {
    opacity: 0.4,
  },

  savedSection: {
    marginTop: 4,
  },

  savedList: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 22,
    padding: 18,
  },

  savedItem: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  savedItemText: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.78,
  },
});
