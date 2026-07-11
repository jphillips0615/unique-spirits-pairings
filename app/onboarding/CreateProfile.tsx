import {
  EXPERIENCE_LEVELS,
  ExperienceLevel,
  usePreferences,
} from "@/context/PreferencesContext";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const GOLD = "#C9A227";

export default function CreateProfileScreen() {
  const { preferences, savePreferences } = usePreferences();
  const [displayName, setDisplayName] = useState(preferences.displayName);
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel | null>(preferences.experienceLevel);
  const [isSaving, setIsSaving] = useState(false);

  const canContinue = displayName.trim().length > 0 && experienceLevel !== null;

  async function handleContinue() {
    if (!canContinue || isSaving || !experienceLevel) return;

    setIsSaving(true);
    try {
      await savePreferences({
        ...preferences,
        displayName: displayName.trim(),
        experienceLevel,
      });
      router.push("/onboarding/FavoriteSpirits");
    } catch (error) {
      console.error("Unable to create profile:", error);
      setIsSaving(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </Pressable>

        <Text style={styles.kicker}>CREATE YOUR PROFILE</Text>
        <Text style={styles.title}>Make the app yours.</Text>
        <Text style={styles.subtitle}>
          Your name and experience level help us personalize recommendations and
          explain recipes at the right level.
        </Text>

        <Text style={styles.label}>What should we call you?</Text>
        <TextInput
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Your name"
          placeholderTextColor="#777"
          autoCapitalize="words"
          maxLength={30}
          style={styles.input}
        />

        <Text style={styles.label}>Experience level</Text>
        <View style={styles.options}>
          {EXPERIENCE_LEVELS.map((level) => {
            const selected = experienceLevel === level;
            return (
              <Pressable
                key={level}
                style={[styles.option, selected && styles.optionSelected]}
                onPress={() => setExperienceLevel(level)}
              >
                <Text style={[styles.optionText, selected && styles.selectedText]}>
                  {level}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={[
            styles.primaryButton,
            (!canContinue || isSaving) && styles.buttonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!canContinue || isSaving}
        >
          <Text style={styles.primaryButtonText}>
            {isSaving ? "Creating Profile..." : "Create Profile"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#090909" },
  content: { padding: 24, paddingTop: 78, paddingBottom: 54 },
  backButton: { position: "absolute", top: 28, left: 24 },
  backButtonText: { color: GOLD, fontSize: 17, fontWeight: "700" },
  kicker: { color: GOLD, letterSpacing: 3, fontWeight: "800", marginBottom: 10 },
  title: { color: "#fff", fontSize: 38, fontWeight: "900", marginBottom: 14 },
  subtitle: { color: "#CFCFCF", fontSize: 17, lineHeight: 26, marginBottom: 32 },
  label: { color: "#F5F5F5", fontSize: 17, fontWeight: "800", marginBottom: 12 },
  input: {
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 18,
    color: "#fff",
    fontSize: 17,
    paddingHorizontal: 18,
    paddingVertical: 17,
    marginBottom: 28,
  },
  options: { marginBottom: 18 },
  option: {
    backgroundColor: "#151515",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    padding: 18,
    marginBottom: 12,
  },
  optionSelected: { backgroundColor: "rgba(201, 162, 39, 0.18)", borderColor: GOLD },
  optionText: { color: "#F5F5F5", fontSize: 16, fontWeight: "700" },
  selectedText: { color: GOLD, fontWeight: "900" },
  primaryButton: {
    backgroundColor: GOLD,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.45 },
  primaryButtonText: { color: "#111", fontSize: 17, fontWeight: "900" },
});
