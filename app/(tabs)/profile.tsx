import { Colors } from "@/constants/colors";
import {
  EXPERIENCE_LEVELS,
  ExperienceLevel,
  usePreferences,
} from "@/context/PreferencesContext";
import { ONBOARDING_SPIRITS } from "@/data/spiritCategories";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { preferences, savePreferences } = usePreferences();
  const [displayName, setDisplayName] = useState(preferences.displayName);
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel | null>(preferences.experienceLevel);
  const [favoriteSpirits, setFavoriteSpirits] = useState(
    preferences.favoriteSpirits,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    setDisplayName(preferences.displayName);
    setExperienceLevel(preferences.experienceLevel);
    setFavoriteSpirits(preferences.favoriteSpirits);
  }, [preferences]);

  const hasChanges = useMemo(() => {
    const sameSpirits =
      [...favoriteSpirits].sort().join("|") ===
      [...preferences.favoriteSpirits].sort().join("|");

    return (
      displayName.trim() !== preferences.displayName ||
      experienceLevel !== preferences.experienceLevel ||
      !sameSpirits
    );
  }, [displayName, experienceLevel, favoriteSpirits, preferences]);

  function toggleSpirit(spirit: string) {
    setShowSaved(false);
    setFavoriteSpirits((current) =>
      current.includes(spirit)
        ? current.filter((item) => item !== spirit)
        : [...current, spirit],
    );
  }

  async function handleSave() {
    if (!hasChanges || isSaving || !experienceLevel || !displayName.trim()) return;

    setIsSaving(true);
    setShowSaved(false);
    try {
      await savePreferences({
        displayName: displayName.trim(),
        experienceLevel,
        favoriteSpirits,
      });
      setShowSaved(true);
    } catch (error) {
      console.error("Unable to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancel() {
    setDisplayName(preferences.displayName);
    setExperienceLevel(preferences.experienceLevel);
    setFavoriteSpirits(preferences.favoriteSpirits);
    setShowSaved(false);
  }

  const canSave = hasChanges && !!displayName.trim() && !!experienceLevel;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>YOUR TASTE</Text>
      <Text style={styles.title}>Profile & Preferences</Text>
      <Text style={styles.subtitle}>
        Make changes below, then press Save Changes when everything looks right.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display Name</Text>
        <TextInput
          value={displayName}
          onChangeText={(value) => {
            setDisplayName(value);
            setShowSaved(false);
          }}
          placeholder="Your name"
          placeholderTextColor={Colors.textSecondary}
          autoCapitalize="words"
          maxLength={30}
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience Level</Text>
        {EXPERIENCE_LEVELS.map((level) => {
          const selected = experienceLevel === level;
          return (
            <Pressable
              key={level}
              style={[styles.option, selected && styles.optionSelected]}
              onPress={() => {
                setExperienceLevel(level);
                setShowSaved(false);
              }}
            >
              <Text style={[styles.optionText, selected && styles.selectedText]}>
                {level}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite Spirits</Text>
        <Text style={styles.helperText}>
          Leave everything unselected to keep recommendations open to all spirits.
        </Text>
        <View style={styles.chipGrid}>
          {ONBOARDING_SPIRITS.filter(
            (spirit) => spirit !== "I'm Open to Everything",
          ).map((spirit) => {
            const selected = favoriteSpirits.includes(spirit);
            return (
              <Pressable
                key={spirit}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => toggleSpirit(spirit)}
              >
                <Text style={[styles.chipText, selected && styles.selectedText]}>
                  {spirit}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {showSaved && <Text style={styles.savedMessage}>✓ Preferences saved</Text>}

      <Pressable
        style={[styles.saveButton, !canSave && styles.buttonDisabled]}
        onPress={handleSave}
        disabled={!canSave || isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Text>
      </Pressable>

      {hasChanges && (
        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel Changes</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 22, paddingTop: 54, paddingBottom: 120 },
  kicker: { color: Colors.gold, fontWeight: "800", letterSpacing: 3, marginBottom: 10 },
  title: { color: Colors.text, fontSize: 36, fontWeight: "900", marginBottom: 14 },
  subtitle: { color: Colors.textSecondary, fontSize: 16, lineHeight: 24 },
  section: { marginTop: 34 },
  sectionTitle: { color: Colors.text, fontSize: 21, fontWeight: "900", marginBottom: 14 },
  helperText: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21, marginTop: -6, marginBottom: 16 },
  input: { backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border, borderRadius: 18, color: Colors.text, fontSize: 16, paddingHorizontal: 18, paddingVertical: 16 },
  option: { backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border, borderRadius: 18, padding: 18, marginBottom: 12 },
  optionSelected: { backgroundColor: "rgba(217, 164, 65, 0.16)", borderColor: Colors.gold },
  optionText: { color: Colors.text, fontSize: 16, fontWeight: "700" },
  selectedText: { color: Colors.gold, fontWeight: "900" },
  chipGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  chip: { backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border, borderRadius: 999, paddingVertical: 12, paddingHorizontal: 18 },
  chipSelected: { backgroundColor: "rgba(217, 164, 65, 0.16)", borderColor: Colors.gold },
  chipText: { color: Colors.text, fontSize: 15, fontWeight: "700" },
  savedMessage: { color: Colors.gold, fontSize: 15, fontWeight: "800", textAlign: "center", marginTop: 34 },
  saveButton: { backgroundColor: Colors.gold, borderRadius: 999, paddingVertical: 17, alignItems: "center", marginTop: 20 },
  buttonDisabled: { opacity: 0.4 },
  saveButtonText: { color: "#111", fontSize: 17, fontWeight: "900" },
  cancelButton: { paddingVertical: 16, alignItems: "center" },
  cancelButtonText: { color: Colors.textSecondary, fontSize: 15, fontWeight: "700" },
});
