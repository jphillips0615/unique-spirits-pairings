import { StyleSheet, Text, View } from "react-native";

export default function IntroScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding coming next.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#F5F5F5",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
});
