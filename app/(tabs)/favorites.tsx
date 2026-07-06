import CocktailCard from "@/components/cards/CocktailCard";
import { Colors } from "@/constants/colors";
import { useFavorites } from "@/context/FavoritesContext";
import { cocktails } from "@/data/cocktails";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function FavoritesScreen() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const favoriteCocktails = cocktails.filter((cocktail) =>
    favoriteIds.includes(cocktail.id),
  );

  return (
    <FlatList
      data={favoriteCocktails}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Favorites</Text>
          <Text style={styles.subtitle}>
            Your saved cocktails and pairings live here.
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyText}>
            Tap the heart on a cocktail card to save it here.
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
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    color: Colors.text,
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 8,
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 24,
  },

  emptyIcon: {
    color: Colors.gold,
    fontSize: 54,
    marginBottom: 14,
  },

  emptyTitle: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8,
  },

  emptyText: {
    color: Colors.textSecondary,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
  },
});
