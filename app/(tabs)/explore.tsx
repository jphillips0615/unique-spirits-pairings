import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ExploreScreen() {
  const categories = [
    "Whiskey",
    "Bourbon",
    "Scotch",
    "Rum",
    "Gin",
    "Vodka",
    "Tequila",
    "Brandy",
    "Cocktails",
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Spirit Categories</Text>

      {categories.map((category) => (
        <View key={category} style={styles.card}>
          <Text style={styles.cardText}>{category}</Text>
        </View>
      ))}

      <Text style={styles.comingSoon}>
        More categories and drink filters coming soon.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    padding: 20,
  },
  header: {
    color: "#D9A441",
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#101010",
    borderColor: "#6F4E1F",
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
  },
  cardText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  comingSoon: {
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
