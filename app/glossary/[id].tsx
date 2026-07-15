import { Colors } from "@/constants/colors";
import { getGlossaryEntryById } from "@/data/ingredientGlossary";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function IngredientGlossaryDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const ingredient = id ? getGlossaryEntryById(id) : undefined;

  if (!ingredient) {
    return (
      <View style={styles.missingScreen}>
        <Ionicons name="alert-circle-outline" size={42} color={Colors.gold} />

        <Text style={styles.missingTitle}>Ingredient not found</Text>

        <Text style={styles.missingText}>
          This glossary entry may have been moved or is not available yet.
        </Text>

        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.returnButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.returnButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
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
          <Text style={styles.kicker}>INGREDIENT GLOSSARY</Text>
          <Text style={styles.title}>{ingredient.name}</Text>
        </View>
      </View>

      <View style={styles.categoryRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{ingredient.category}</Text>
        </View>

        <View
          style={[
            styles.alcoholBadge,
            !ingredient.containsAlcohol && styles.nonAlcoholBadge,
          ]}
        >
          <Ionicons
            name={ingredient.containsAlcohol ? "wine-outline" : "water-outline"}
            size={16}
            color={
              ingredient.containsAlcohol ? Colors.gold : Colors.textSecondary
            }
          />

          <Text
            style={[
              styles.alcoholText,
              !ingredient.containsAlcohol && styles.nonAlcoholText,
            ]}
          >
            {ingredient.containsAlcohol ? "Contains alcohol" : "Non-alcoholic"}
          </Text>
        </View>
      </View>

      {ingredient.pronunciation ? (
        <View style={styles.pronunciationCard}>
          <Ionicons name="volume-high-outline" size={22} color={Colors.gold} />

          <View style={styles.pronunciationContent}>
            <Text style={styles.pronunciationLabel}>Pronunciation</Text>
            <Text style={styles.pronunciationText}>
              {ingredient.pronunciation}
            </Text>
          </View>
        </View>
      ) : null}

      <DetailSection icon="information-circle-outline" title="What It Is">
        {ingredient.description}
      </DetailSection>

      <TagSection
        icon="sparkles-outline"
        title="Flavor Profile"
        items={ingredient.flavorProfile}
      />

      <ListSection
        icon="restaurant-outline"
        title="Common Uses"
        items={ingredient.commonUses}
      />

      <ListSection
        icon="swap-horizontal-outline"
        title="Possible Substitutes"
        items={ingredient.substitutes}
      />

      <DetailSection icon="storefront-outline" title="Where to Find It">
        {ingredient.whereToFind}
      </DetailSection>

      {ingredient.notes ? (
        <View style={styles.noteCard}>
          <Ionicons name="bulb-outline" size={23} color={Colors.gold} />

          <View style={styles.noteContent}>
            <Text style={styles.noteTitle}>Helpful Note</Text>
            <Text style={styles.noteText}>{ingredient.notes}</Text>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}

type DetailSectionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  children: string;
};

function DetailSection({ icon, title, children }: DetailSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeadingRow}>
        <Ionicons name={icon} size={23} color={Colors.gold} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <Text style={styles.sectionText}>{children}</Text>
    </View>
  );
}

type ListSectionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  items: string[];
};

function ListSection({ icon, title, items }: ListSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeadingRow}>
        <Ionicons name={icon} size={23} color={Colors.gold} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <View style={styles.list}>
        {items.map((item) => (
          <View key={item} style={styles.listItem}>
            <View style={styles.listBullet} />
            <Text style={styles.listItemText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

type TagSectionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  items: string[];
};

function TagSection({ icon, title, items }: TagSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeadingRow}>
        <Ionicons name={icon} size={23} color={Colors.gold} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <View style={styles.tagGrid}>
        {items.map((item) => (
          <View key={item} style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
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
    position: "relative",
    minHeight: 64,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  backButton: {
    position: "absolute",
    left: 0,
    top: 4,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    width: "100%",
    paddingHorizontal: 56,
    alignItems: "center",
  },

  kicker: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.2,
    marginBottom: 4,
    textAlign: "center",
  },

  title: {
    color: Colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    textAlign: "center",
  },

  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 22,
  },

  categoryBadge: {
    backgroundColor: "rgba(217, 164, 65, 0.16)",
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },

  categoryText: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: "900",
  },

  alcoholBadge: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  nonAlcoholBadge: {
    borderColor: Colors.border,
  },

  alcoholText: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: "800",
  },

  nonAlcoholText: {
    color: Colors.textSecondary,
  },

  pronunciationCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom: 18,
  },

  pronunciationContent: {
    flex: 1,
    alignItems: "center",
  },

  pronunciationLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
    textAlign: "center",
  },

  pronunciationText: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
  },

  section: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },

  sectionHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 12,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },

  sectionText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },

  tagGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 9,
  },

  tag: {
    backgroundColor: "rgba(217, 164, 65, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(217, 164, 65, 0.45)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  tagText: {
    color: Colors.gold,
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },

  list: {
    gap: 11,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  listBullet: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.gold,
    marginTop: 7,
    marginRight: 11,
  },

  listItemText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },

  noteCard: {
    backgroundColor: "rgba(217, 164, 65, 0.1)",
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginTop: 4,
  },

  noteContent: {
    flex: 1,
  },

  noteTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
    textAlign: "center",
  },

  noteText: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },

  missingScreen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  missingTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 14,
    marginBottom: 8,
    textAlign: "center",
  },

  missingText: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    marginBottom: 22,
  },

  returnButton: {
    backgroundColor: Colors.gold,
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },

  returnButtonText: {
    color: Colors.background,
    fontSize: 15,
    fontWeight: "900",
  },

  pressed: {
    opacity: 0.78,
  },
});
