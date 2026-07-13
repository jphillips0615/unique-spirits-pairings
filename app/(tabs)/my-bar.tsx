import { Colors } from "@/constants/colors";
import { useBarInventory } from "@/context/BarInventoryContext";
import { BAR_INGREDIENT_CATEGORIES } from "@/data/barIngredients";
import { cocktails } from "@/data/cocktails";
import { CocktailBarMatch, getCocktailBarMatches } from "@/utils/barMatching";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
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

const READY_TO_MAKE_LIMIT = 5;
const ALMOST_THERE_LIMIT = 6;

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

  const cocktailMatches = useMemo(
    () => getCocktailBarMatches(cocktails, inventory),
    [inventory],
  );

  const readyToMake = useMemo(
    () =>
      cocktailMatches
        .filter((match) => match.canMake)
        .slice(0, READY_TO_MAKE_LIMIT),
    [cocktailMatches],
  );

  const almostThere = useMemo(
    () =>
      cocktailMatches
        .filter(
          (match) =>
            !match.canMake && match.missingCount > 0 && match.missingCount <= 2,
        )
        .slice(0, ALMOST_THERE_LIMIT),
    [cocktailMatches],
  );

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

              Alert.alert(
                "Unable to Clear My Bar",
                "Something went wrong while clearing your saved ingredients.",
              );
            }
          },
        },
      ],
    );
  }

  function openCocktail(cocktailId: string) {
    router.push(`/cocktail/${cocktailId}` as Href);
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.kicker}>YOUR PERSONAL COLLECTION</Text>

        <Text style={styles.title}>My Unique Bar</Text>

        <Text style={styles.subtitle}>
          Build your personal bar by selecting the bottles, mixers, and
          ingredients you already have. We’ll use your collection to show what
          you can make and what you’re missing.
        </Text>
      </View>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryNumber}>{inventory.length}</Text>

          <Text style={styles.summaryLabel}>
            {inventory.length === 1 ? "ingredient saved" : "ingredients saved"}
          </Text>
        </View>

        <View style={styles.summaryResults}>
          <Text style={styles.summaryResultNumber}>{readyToMake.length}</Text>
          <Text style={styles.summaryResultLabel}>ready now</Text>
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

      {inventory.length === 0 ? (
        <View style={styles.emptyBarCard}>
          <View style={styles.emptyBarIcon}>
            <Ionicons name="wine-outline" size={32} color={Colors.gold} />
          </View>

          <Text style={styles.emptyBarTitle}>Start building your bar</Text>

          <Text style={styles.emptyBarText}>
            Select ingredients below. Your cocktail matches will appear here
            automatically as your collection grows.
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.matchSection}>
            <View style={styles.matchSectionHeader}>
              <View style={styles.matchSectionHeading}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={Colors.gold}
                />

                <Text style={styles.matchSectionTitle}>Ready to Make</Text>
              </View>

              <Text style={styles.matchCount}>{readyToMake.length}</Text>
            </View>

            <Text style={styles.matchSectionDescription}>
              These cocktails can be made with the ingredients currently saved
              in your bar.
            </Text>

            {readyToMake.length > 0 ? (
              readyToMake.map((match) => (
                <CocktailMatchCard
                  key={match.cocktail.id}
                  match={match}
                  onPress={() => openCocktail(match.cocktail.id)}
                />
              ))
            ) : (
              <View style={styles.noMatchesCard}>
                <Ionicons name="flask-outline" size={28} color={Colors.gold} />

                <View style={styles.noMatchesContent}>
                  <Text style={styles.noMatchesTitle}>
                    No complete matches yet
                  </Text>

                  <Text style={styles.noMatchesText}>
                    Add more bottles and ingredients to unlock cocktails you can
                    make immediately.
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.matchSection}>
            <View style={styles.matchSectionHeader}>
              <View style={styles.matchSectionHeading}>
                <Ionicons
                  name="sparkles-outline"
                  size={24}
                  color={Colors.gold}
                />

                <Text style={styles.matchSectionTitle}>Almost There</Text>
              </View>

              <Text style={styles.matchCount}>{almostThere.length}</Text>
            </View>

            <Text style={styles.matchSectionDescription}>
              You are missing only one or two ingredients for these cocktails.
            </Text>

            {almostThere.length > 0 ? (
              almostThere.map((match) => (
                <CocktailMatchCard
                  key={match.cocktail.id}
                  match={match}
                  onPress={() => openCocktail(match.cocktail.id)}
                />
              ))
            ) : (
              <View style={styles.noMatchesCard}>
                <Ionicons
                  name="add-circle-outline"
                  size={28}
                  color={Colors.gold}
                />

                <View style={styles.noMatchesContent}>
                  <Text style={styles.noMatchesTitle}>
                    No close matches yet
                  </Text>

                  <Text style={styles.noMatchesText}>
                    Keep adding ingredients and we’ll show cocktails that are
                    only one or two additions away.
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.sectionDivider} />
        </>
      )}

      <Text style={styles.inventoryHeading}>BUILD YOUR COLLECTION</Text>

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
            accessibilityLabel="Clear ingredient search"
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
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={
                      selected
                        ? `Remove ${ingredient} from My Unique Bar`
                        : `Add ${ingredient} to My Unique Bar`
                    }
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
            accessibilityRole="button"
            accessibilityLabel="Add custom ingredient"
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

type CocktailMatchCardProps = {
  match: CocktailBarMatch;
  onPress: () => void;
};

function CocktailMatchCard({ match, onPress }: CocktailMatchCardProps) {
  const statusText = match.canMake
    ? "Ready now"
    : `Missing ${match.missingCount}`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${match.cocktail.name}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.matchCard,
        match.canMake && styles.readyMatchCard,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.matchCardHeader}>
        <View style={styles.matchCardTitleArea}>
          <Text style={styles.matchCardTitle}>{match.cocktail.name}</Text>
          <Text style={styles.matchCardSpirit}>{match.cocktail.spirit}</Text>
        </View>

        <View
          style={[styles.matchBadge, match.canMake && styles.readyMatchBadge]}
        >
          <Text
            style={[
              styles.matchBadgeText,
              match.canMake && styles.readyMatchBadgeText,
            ]}
          >
            {statusText}
          </Text>
        </View>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${match.matchPercentage}%` },
            ]}
          />
        </View>

        <Text style={styles.percentageText}>{match.matchPercentage}%</Text>
      </View>

      {match.canMake ? (
        <View style={styles.readyMessage}>
          <Ionicons
            name="checkmark-circle-outline"
            size={18}
            color={Colors.gold}
          />

          <Text style={styles.readyMessageText}>
            You have all required ingredients.
          </Text>
        </View>
      ) : (
        <View style={styles.missingArea}>
          <Text style={styles.missingLabel}>Still needed</Text>

          <Text style={styles.missingText}>
            {match.missingIngredients.join(" • ")}
          </Text>
        </View>
      )}

      <View style={styles.viewRecipeRow}>
        <Text style={styles.viewRecipeText}>View cocktail</Text>

        <Ionicons name="chevron-forward" size={19} color={Colors.gold} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 54,
    paddingBottom: 120,
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
    gap: 16,
    marginBottom: 22,
  },

  summaryNumber: {
    color: Colors.gold,
    fontSize: 34,
    fontWeight: "900",
  },

  summaryLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },

  summaryResults: {
    flex: 1,
    paddingLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
  },

  summaryResultNumber: {
    color: Colors.text,
    fontSize: 25,
    fontWeight: "900",
  },

  summaryResultLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },

  clearButton: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  clearButtonText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: "800",
  },

  emptyBarCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
    marginBottom: 30,
  },

  emptyBarIcon: {
    width: 62,
    height: 62,
    borderRadius: 21,
    backgroundColor: "rgba(217, 164, 65, 0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  emptyBarTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
  },

  emptyBarText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },

  matchSection: {
    marginBottom: 30,
  },

  matchSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  matchSectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  matchSectionTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "900",
  },

  matchCount: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(217, 164, 65, 0.14)",
    color: Colors.gold,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 30,
  },

  matchSectionDescription: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 15,
  },

  matchCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    padding: 17,
    marginBottom: 12,
  },

  readyMatchCard: {
    borderColor: Colors.gold,
  },

  matchCardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },

  matchCardTitleArea: {
    flex: 1,
  },

  matchCardTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "900",
  },

  matchCardSpirit: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },

  matchBadge: {
    backgroundColor: "#242424",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  readyMatchBadge: {
    backgroundColor: "rgba(217, 164, 65, 0.16)",
  },

  matchBadgeText: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: "900",
  },

  readyMatchBadgeText: {
    color: Colors.gold,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 16,
  },

  progressTrack: {
    flex: 1,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#292929",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: Colors.gold,
  },

  percentageText: {
    minWidth: 36,
    color: Colors.gold,
    fontSize: 12,
    fontWeight: "900",
    textAlign: "right",
  },

  readyMessage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
  },

  readyMessageText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: "700",
  },

  missingArea: {
    marginTop: 14,
  },

  missingLabel: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },

  missingText: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  viewRecipeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 15,
  },

  viewRecipeText: {
    color: Colors.gold,
    fontSize: 13,
    fontWeight: "900",
  },

  noMatchesCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  noMatchesContent: {
    flex: 1,
  },

  noMatchesTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 5,
  },

  noMatchesText: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  sectionDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 30,
  },

  inventoryHeading: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.2,
    marginBottom: 14,
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
