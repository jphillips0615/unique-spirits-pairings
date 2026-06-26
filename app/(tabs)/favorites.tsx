import { StyleSheet, Text, View } from "react-native";

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>
        Your saved drinks and pairings will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#D9A441",
    fontSize: 32,
    fontWeight: "600",
  },
  subtitle: {
    color: "#AAAAAA",
    marginTop: 12,
    textAlign: "center",
  },
});
