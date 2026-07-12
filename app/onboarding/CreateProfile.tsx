import {
  EXPERIENCE_LEVELS,
  ExperienceLevel,
  usePreferences,
} from "@/context/PreferencesContext";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
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
  const [profileImageUri, setProfileImageUri] = useState<string | null>(
    preferences.profileImageUri,
  );
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel | null>(preferences.experienceLevel);
  const [isSaving, setIsSaving] = useState(false);

  const canContinue = displayName.trim().length > 0 && experienceLevel !== null;

  async function handleChoosePhoto() {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Photo Access Needed",
          "Please allow photo access so you can choose a profile picture.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        setProfileImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Unable to choose profile photo:", error);

      Alert.alert(
        "Unable to Choose Photo",
        "Something went wrong while opening your photo library.",
      );
    }
  }

  async function handleContinue() {
    if (!canContinue || isSaving || !experienceLevel) {
      return;
    }

    setIsSaving(true);

    try {
      await savePreferences({
        ...preferences,
        displayName: displayName.trim(),
        profileImageUri,
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
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Ionicons name="chevron-back" size={38} color={GOLD} />
        </Pressable>

        <View style={styles.formContainer}>
          <Text style={styles.kicker}>CREATE YOUR PROFILE</Text>

          <Text style={styles.title}>Make the app yours.</Text>

          <Text style={styles.subtitle}>
            Your name and experience level help us personalize recommendations
            and explain recipes at the right level.
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              profileImageUri
                ? "Change profile picture"
                : "Add a profile picture"
            }
            onPress={handleChoosePhoto}
            style={({ pressed }) => [
              styles.photoButton,
              pressed && styles.photoButtonPressed,
            ]}
          >
            {profileImageUri ? (
              <Image
                source={{ uri: profileImageUri }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Ionicons name="person" size={44} color={GOLD} />
              </View>
            )}

            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={18} color="#111111" />
            </View>
          </Pressable>

          <Text style={styles.photoText}>
            {profileImageUri ? "Tap to change photo" : "Add profile photo"}
          </Text>

          <Text style={styles.label}>What should we call you?</Text>

          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Your name"
            placeholderTextColor="#777777"
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={30}
            returnKeyType="done"
            style={styles.input}
          />

          <Text style={styles.label}>Experience level</Text>

          <View style={styles.options}>
            {EXPERIENCE_LEVELS.map((level) => {
              const selected = experienceLevel === level;

              return (
                <Pressable
                  key={level}
                  onPress={() => setExperienceLevel(level)}
                  style={({ pressed }) => [
                    styles.option,
                    selected && styles.optionSelected,
                    pressed && styles.optionPressed,
                  ]}
                >
                  <Text
                    style={[styles.optionText, selected && styles.selectedText]}
                  >
                    {level}
                  </Text>

                  {selected ? (
                    <Ionicons name="checkmark-circle" size={23} color={GOLD} />
                  ) : null}
                </Pressable>
              );
            })}
          </View>

          <Pressable
            onPress={handleContinue}
            disabled={!canContinue || isSaving}
            style={({ pressed }) => [
              styles.primaryButton,
              (!canContinue || isSaving) && styles.buttonDisabled,
              pressed && canContinue && !isSaving && styles.buttonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {isSaving ? "Creating Profile..." : "Create Profile"}
            </Text>

            {!isSaving ? (
              <Ionicons name="arrow-forward" size={20} color="#111111" />
            ) : null}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#090909",
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 88,
    paddingBottom: 54,
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

  formContainer: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
  },

  kicker: {
    color: GOLD,
    fontSize: 12,
    letterSpacing: 3,
    fontWeight: "800",
    marginBottom: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "900",
    marginBottom: 16,
  },

  subtitle: {
    color: "#CFCFCF",
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 28,
  },

  photoButton: {
    width: 112,
    height: 112,
    alignSelf: "center",
    marginBottom: 10,
  },

  photoButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },

  profilePlaceholder: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "#151515",
    borderWidth: 2,
    borderColor: GOLD,
    alignItems: "center",
    justifyContent: "center",
  },

  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
    borderColor: GOLD,
  },

  cameraBadge: {
    position: "absolute",
    right: 0,
    bottom: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: GOLD,
    borderWidth: 3,
    borderColor: "#090909",
    alignItems: "center",
    justifyContent: "center",
  },

  photoText: {
    color: GOLD,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 28,
  },

  label: {
    color: "#F5F5F5",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 18,
    color: "#FFFFFF",
    fontSize: 17,
    paddingHorizontal: 18,
    paddingVertical: 17,
    marginBottom: 30,
  },

  options: {
    marginBottom: 20,
  },

  option: {
    minHeight: 60,
    backgroundColor: "#151515",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionSelected: {
    backgroundColor: "rgba(201, 162, 39, 0.18)",
    borderColor: GOLD,
  },

  optionPressed: {
    opacity: 0.82,
  },

  optionText: {
    color: "#F5F5F5",
    fontSize: 16,
    fontWeight: "700",
  },

  selectedText: {
    color: GOLD,
    fontWeight: "900",
  },

  primaryButton: {
    minHeight: 58,
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
    backgroundColor: GOLD,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 10,
  },

  buttonDisabled: {
    opacity: 0.45,
  },

  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },

  primaryButtonText: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "900",
  },
});
