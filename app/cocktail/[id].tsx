import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { cocktails } from "@/data/cocktails";

export default function CocktailDetails() {
  const { id } = useLocalSearchParams();

  const cocktail = cocktails.find((c) => c.id === id);

  if (!cocktail) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Cocktail not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: cocktail.name }} />

      <ScrollView style={styles.container}>
        <Image source={cocktail.image} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.spirit}>{cocktail.spirit}</Text>

          <Text style={styles.title}>{cocktail.name}</Text>

          <Text style={styles.description}>{cocktail.description}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  image: {
    width: "100%",
    height: 320,
  },

  content: {
    padding: 24,
  },

  spirit: {
    color: Colors.gold,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  title: {
    color: Colors.text,
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 12,
  },

  description: {
    color: Colors.textSecondary,
    fontSize: 17,
    lineHeight: 28,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  error: {
    color: Colors.text,
    fontSize: 18,
  },
});
