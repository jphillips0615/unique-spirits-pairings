import { usePreferences } from "@/context/PreferencesContext";
import { ONBOARDING_SPIRITS } from "@/data/spiritCategories";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

const GOLD = "#C9A227";
const ONBOARDING_COMPLETE_KEY = "onboardingComplete";

export default function FavoriteSpirits() {
  const { setFavoriteSpirits } = usePreferences();
  const [selectedSpirits, setSelectedSpirits] = useState<string[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);

  function toggleSpirit(spirit: string) {
    if (spirit === "I'm Open to Everything") {
      setSelectedSpirits((current) =>
        current.includes(spirit) ? [] : ["I'm Open to Everything"],
      );
      return;
    }

    setSelectedSpirits((current) => {
      const withoutOpenOption = current.filter(
        (item) => item !== "I'm Open to Everything",
      );

      return withoutOpenOption.includes(spirit)
        ? withoutOpenOption.filter((item) => item !== spirit)
        : [...withoutOpenOption, spirit];
    });
  }

  async function handleFinish() {
    if (isFinishing) {
      return;
    }

    setIsFinishing(true);

    try {
      const savedSpirits = selectedSpirits.includes("I'm Open to Everything")
        ? []
        : selectedSpirits;

      await setFavoriteSpirits(savedSpirits);
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Unable to save onboarding status:", error);
      setIsFinishing(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>‹ Back</Text>
      </Pressable>

      <Text style={styles.kicker}>PERSONALIZE</Text>

      <Text style={styles.title}>Which spirits interest you?</Text>

      <Text style={styles.subtitle}>
        Select the spirits you would like to explore first. You can always
        branch out later.
      </Text>

      {ONBOARDING_SPIRITS.map((spirit) => {
        const isSelected = selectedSpirits.includes(spirit);

        return (
          <Pressable
            key={spirit}
            style={[styles.option, isSelected && styles.optionSelected]}
            onPress={() => toggleSpirit(spirit)}
          >
            <Text
              style={[
                styles.optionText,
                isSelected && styles.optionTextSelected,
              ]}
            >
              {spirit}
            </Text>
          </Pressable>
        );
      })}

      <Pressable
        style={[styles.button, isFinishing && styles.buttonDisabled]}
        onPress={handleFinish}
        disabled={isFinishing}
      >
        <Text style={styles.buttonText}>
          {isFinishing ? "Finishing..." : "Finish"}
        </Text>
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

  backButton: {
    position: "absolute",
    top: 25,
    left: 24,
    zIndex: 10,
  },

  backButtonText: {
    color: GOLD,
    fontSize: 17,
    fontWeight: "700",
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

  optionSelected: {
    backgroundColor: "rgba(201, 162, 39, 0.18)",
    borderColor: GOLD,
  },

  optionText: {
    color: "#F5F5F5",
    fontSize: 17,
    fontWeight: "600",
  },

  optionTextSelected: {
    color: GOLD,
    fontWeight: "800",
  },

  button: {
    backgroundColor: GOLD,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  buttonDisabled: {
    opacity: 0.65,
  },

  buttonText: {
    color: "#111",
    fontSize: 17,
    fontWeight: "800",
  },
});
