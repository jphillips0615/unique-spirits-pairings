import { Colors } from "@/constants/colors";
import { useBarInventory } from "@/context/BarInventoryContext";
import { cocktails } from "@/data/cocktails";
import { CocktailBarMatch, getCocktailBarMatches } from "@/utils/barMatching";
import { Ionicons } from "@expo/vector-icons";
import { Href, router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type ResultFilter = "ready" | "almost" | "all";

export default function MyBarResultsScreen() {
  const { inventory } = useBarInventory();
  const params = useLocalSearchParams<{ filter?: string }>();

  const initialFilter: ResultFilter =
    params.filter === "ready" || params.filter === "almost"
      ? params.filter
      : "all";

  const [activeFilter, setActiveFilter] = useState<ResultFilter>(initialFilter);

  const matches = useMemo(
    () => getCocktailBarMatches(cocktails, inventory),
    [inventory],
  );

  const readyMatches = useMemo(
    () => matches.filter((match) => match.canMake),
    [matches],
  );

  const almostMatches = useMemo(
    () =>
      matches.filter(
        (match) =>
          !match.canMake && match.missingCount > 0 && match.missingCount <= 2,
      ),
    [matches],
  );

  const displayedMatches = useMemo(() => {
    if (activeFilter === "ready") {
      return readyMatches;
    }

    if (activeFilter === "almost") {
      return almostMatches;
    }

    return matches;
  }, [activeFilter, matches, readyMatches, almostMatches]);

  function openCocktail(cocktailId: string) {
    router.push(`/cocktail/${cocktailId}` as Href);
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
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
          <Text style={styles.kicker}>MY UNIQUE BAR</Text>

          <Text style={styles.title}>Cocktail Matches</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>
        Results are ranked by what you can make now, followed by cocktails
        requiring the fewest additional ingredients.
      </Text>

      <View style={styles.summaryRow}>
        <SummaryCard value={readyMatches.length} label="Ready Now" />

        <SummaryCard value={almostMatches.length} label="Almost There" />

        <SummaryCard value={inventory.length} label="Saved Items" />
      </View>

      <View style={styles.filterRow}>
        <FilterButton
          label="All"
          selected={activeFilter === "all"}
          onPress={() => setActiveFilter("all")}
        />

        <FilterButton
          label="Ready"
          selected={activeFilter === "ready"}
          onPress={() => setActiveFilter("ready")}
        />

        <FilterButton
          label="Almost"
          selected={activeFilter === "almost"}
          onPress={() => setActiveFilter("almost")}
        />
      </View>

      <Text style={styles.resultsCount}>
        {displayedMatches.length}{" "}
        {displayedMatches.length === 1 ? "result" : "results"}
      </Text>

      {displayedMatches.length > 0 ? (
        displayedMatches.map((match) => (
          <CocktailResultCard
            key={match.cocktail.id}
            match={match}
            onPress={() => openCocktail(match.cocktail.id)}
          />
        ))
      ) : (
        <View style={styles.emptyCard}>
          <Ionicons name="flask-outline" size={34} color={Colors.gold} />

          <Text style={styles.emptyTitle}>No matches in this category</Text>

          <Text style={styles.emptyText}>
            Add more ingredients to My Unique Bar and your results will update
            automatically.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

type SummaryCardProps = {
  value: number;
  label: string;
};

function SummaryCard({ value, label }: SummaryCardProps) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

type FilterButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function FilterButton({ label, selected, onPress }: FilterButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.filterButton,
        selected && styles.filterButtonSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.filterButtonText,
          selected && styles.filterButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

type CocktailResultCardProps = {
  match: CocktailBarMatch;
  onPress: () => void;
};

function CocktailResultCard({ match, onPress }: CocktailResultCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${match.cocktail.name}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.resultCard,
        match.canMake && styles.readyResultCard,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.resultHeader}>
        <View style={styles.resultTitleArea}>
          <Text style={styles.resultTitle}>{match.cocktail.name}</Text>

          <Text style={styles.resultSpirit}>{match.cocktail.spirit}</Text>
        </View>

        <View
          style={[styles.statusBadge, match.canMake && styles.readyStatusBadge]}
        >
          <Text
            style={[
              styles.statusBadgeText,
              match.canMake && styles.readyStatusBadgeText,
            ]}
          >
            {match.canMake ? "Ready Now" : `Missing ${match.missingCount}`}
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
        <View style={styles.detailRow}>
          <Ionicons
            name="checkmark-circle-outline"
            size={18}
            color={Colors.gold}
          />

          <Text style={styles.detailText}>
            All required ingredients are in your bar.
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

      <View style={styles.openRow}>
        <Text style={styles.openText}>View Cocktail</Text>

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
    marginBottom: 24,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },

  summaryCard: {
    flex: 1,
    minHeight: 92,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  summaryValue: {
    color: Colors.gold,
    fontSize: 27,
    fontWeight: "900",
  },

  summaryLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 4,
  },

  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  filterButton: {
    flex: 1,
    minHeight: 46,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  filterButtonSelected: {
    backgroundColor: "rgba(217, 164, 65, 0.16)",
    borderColor: Colors.gold,
  },

  filterButtonText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "800",
  },

  filterButtonTextSelected: {
    color: Colors.gold,
  },

  resultsCount: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 12,
  },

  resultCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },

  readyResultCard: {
    borderColor: Colors.gold,
  },

  resultHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  resultTitleArea: {
    flex: 1,
  },

  resultTitle: {
    color: Colors.text,
    fontSize: 19,
    fontWeight: "900",
  },

  resultSpirit: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },

  statusBadge: {
    backgroundColor: "#242424",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  readyStatusBadge: {
    backgroundColor: "rgba(217, 164, 65, 0.16)",
  },

  statusBadgeText: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: "900",
  },

  readyStatusBadgeText: {
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
    backgroundColor: "#292929",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: Colors.gold,
    borderRadius: 999,
  },

  percentageText: {
    minWidth: 38,
    color: Colors.gold,
    fontSize: 12,
    fontWeight: "900",
    textAlign: "right",
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
  },

  detailText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: "700",
  },

  missingArea: {
    marginTop: 14,
  },

  missingLabel: {
    color: Colors.text,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },

  missingText: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  openRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 16,
  },

  openText: {
    color: Colors.gold,
    fontSize: 13,
    fontWeight: "900",
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

  pressed: {
    opacity: 0.78,
  },
});
