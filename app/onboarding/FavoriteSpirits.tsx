import { Colors } from "@/constants/colors";
import { usePreferences } from "@/context/PreferencesContext";
import { ONBOARDING_SPIRITS } from "@/data/spiritCategories";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Ionicons name="chevron-back" size={38} color={Colors.gold} />
        </Pressable>

        <View style={styles.innerContent}>
          <Text style={styles.kicker}>PERSONALIZE</Text>

          <Text style={styles.title}>Which spirits interest you?</Text>

          <Text style={styles.subtitle}>
            Select the spirits you would like to explore first. You can always
            branch out later.
          </Text>

          <View style={styles.optionsContainer}>
            {ONBOARDING_SPIRITS.map((spirit) => {
              const isSelected = selectedSpirits.includes(spirit);

              return (
                <Pressable
                  key={spirit}
                  accessibilityRole="checkbox"
                  accessibilityLabel={spirit}
                  accessibilityState={{ checked: isSelected }}
                  onPress={() => toggleSpirit(spirit)}
                  style={({ pressed }) => [
                    styles.option,
                    isSelected && styles.optionSelected,
                    pressed && styles.optionPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {spirit}
                  </Text>

                  {isSelected ? (
                    <Ionicons name="checkmark-circle" size={22} color={GOLD} />
                  ) : (
                    <Ionicons
                      name="ellipse-outline"
                      size={22}
                      color="#666666"
                    />
                  )}
                </Pressable>
              );
            })}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Finish onboarding"
            accessibilityState={{ disabled: isFinishing }}
            disabled={isFinishing}
            onPress={handleFinish}
            style={({ pressed }) => [
              styles.button,
              isFinishing && styles.buttonDisabled,
              pressed && !isFinishing && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>
              {isFinishing ? "Finishing..." : "Finish"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#090909",
  },

  container: {
    flex: 1,
    backgroundColor: "#090909",
  },

  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 92,
    paddingBottom: 50,
  },

  innerContent: {
    width: "100%",
    maxWidth: 560,
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 14,
    zIndex: 10,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  kicker: {
    color: GOLD,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 3,
    textAlign: "center",
    marginBottom: 12,
  },

  title: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 36,
    lineHeight: 43,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 14,
  },

  subtitle: {
    width: "100%",
    maxWidth: 480,
    color: "#CFCFCF",
    fontSize: 17,
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 30,
  },

  optionsContainer: {
    width: "100%",
    maxWidth: 500,
  },

  option: {
    width: "100%",
    minHeight: 60,
    backgroundColor: "#151515",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  optionSelected: {
    backgroundColor: "rgba(201, 162, 39, 0.18)",
    borderColor: GOLD,
  },

  optionPressed: {
    opacity: 0.82,
  },

  optionText: {
    flex: 1,
    color: "#F5F5F5",
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "600",
    textAlign: "center",
    paddingLeft: 22,
  },

  optionTextSelected: {
    color: GOLD,
    fontWeight: "800",
  },

  button: {
    width: "100%",
    maxWidth: 460,
    minHeight: 58,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GOLD,
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 999,
    marginTop: 20,
    marginBottom: 20,
  },

  buttonDisabled: {
    opacity: 0.65,
  },

  buttonText: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
  },

  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
});
