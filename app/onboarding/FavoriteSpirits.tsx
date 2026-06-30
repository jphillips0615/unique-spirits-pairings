import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

const GOLD = "#C9A227";

const spirits = [
  "Bourbon",
  "Rye",
  "Scotch",
  "Irish Whiskey",
  "Japanese Whisky",
  "Vodka",
  "Gin",
  "Rum",
  "Tequila",
  "Mezcal",
  "Brandy",
  "Cognac",
  "Liqueurs",
  "I'm Open to Everything",
];

export default function FavoriteSpirits() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>PERSONALIZE</Text>

      <Text style={styles.title}>Which spirits interest you?</Text>

      <Text style={styles.subtitle}>
        Select any that you'd like to explore. You can always change these
        later.
      </Text>

      {spirits.map((spirit) => (
        <Pressable key={spirit} style={styles.option}>
          <Text style={styles.optionText}>{spirit}</Text>
        </Pressable>
      ))}

      <Pressable
        style={styles.button}
        onPress={() => router.replace("/(tabs)")}
      >
        <Text style={styles.buttonText}>Finish</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090909",
  },

  content: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 50,
  },

  kicker: {
    color: GOLD,
    letterSpacing: 3,
    fontWeight: "700",
    marginBottom: 10,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 14,
  },

  subtitle: {
    color: "#CFCFCF",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 30,
  },

  option: {
    backgroundColor: "#151515",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    padding: 18,
    marginBottom: 14,
  },

  optionText: {
    color: "#F5F5F5",
    fontSize: 17,
    fontWeight: "600",
  },

  button: {
    backgroundColor: GOLD,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  buttonText: {
    color: "#111",
    fontSize: 17,
    fontWeight: "800",
  },
});
