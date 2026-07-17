import { Colors } from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";
import {
  EXPERIENCE_LEVELS,
  ExperienceLevel,
  FLAVOR_PREFERENCES,
  FlavorPreference,
  usePreferences,
} from "@/context/PreferencesContext";
import { ONBOARDING_SPIRITS } from "@/data/spiritCategories";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Href, router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { preferences, savePreferences } = usePreferences();

  const { user, isSignedIn, signOut, deleteAccount } = useAuth();

  const [displayName, setDisplayName] = useState(preferences.displayName);

  const [profileImageUri, setProfileImageUri] = useState<string | null>(
    preferences.profileImageUri,
  );

  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel | null>(preferences.experienceLevel);

  const [favoriteSpirits, setFavoriteSpirits] = useState<string[]>(
    preferences.favoriteSpirits,
  );

  const [favoriteFlavors, setFavoriteFlavors] = useState<FlavorPreference[]>(
    preferences.favoriteFlavors,
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    setDisplayName(preferences.displayName);
    setProfileImageUri(preferences.profileImageUri);
    setExperienceLevel(preferences.experienceLevel);
    setFavoriteSpirits(preferences.favoriteSpirits);
    setFavoriteFlavors(preferences.favoriteFlavors);
  }, [preferences]);

  const hasChanges = useMemo(() => {
    const sameSpirits =
      [...favoriteSpirits].sort().join("|") ===
      [...preferences.favoriteSpirits].sort().join("|");

    const sameFlavors =
      [...favoriteFlavors].sort().join("|") ===
      [...preferences.favoriteFlavors].sort().join("|");

    return (
      displayName.trim() !== preferences.displayName ||
      profileImageUri !== preferences.profileImageUri ||
      experienceLevel !== preferences.experienceLevel ||
      !sameSpirits ||
      !sameFlavors
    );
  }, [
    displayName,
    profileImageUri,
    experienceLevel,
    favoriteSpirits,
    favoriteFlavors,
    preferences,
  ]);

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
        setShowSaved(false);
      }
    } catch (error) {
      console.error("Unable to choose profile photo:", error);

      Alert.alert(
        "Unable to Choose Photo",
        "Something went wrong while opening your photo library.",
      );
    }
  }

  function handleRemovePhoto() {
    setProfileImageUri(null);
    setShowSaved(false);
  }

  function toggleSpirit(spirit: string) {
    setShowSaved(false);

    setFavoriteSpirits((current) =>
      current.includes(spirit)
        ? current.filter((item) => item !== spirit)
        : [...current, spirit],
    );
  }

  function toggleFlavor(flavor: FlavorPreference) {
    setShowSaved(false);

    setFavoriteFlavors((current) =>
      current.includes(flavor)
        ? current.filter((item) => item !== flavor)
        : [...current, flavor],
    );
  }

  async function handleSave() {
    if (!hasChanges || isSaving || !experienceLevel || !displayName.trim()) {
      return;
    }

    setIsSaving(true);
    setShowSaved(false);

    try {
      await savePreferences({
        displayName: displayName.trim(),
        profileImageUri,
        experienceLevel,
        favoriteSpirits,
        favoriteFlavors,
      });

      setShowSaved(true);
    } catch (error) {
      console.error("Unable to save profile:", error);

      Alert.alert(
        "Unable to Save",
        "Something went wrong while saving your preferences.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancel() {
    setDisplayName(preferences.displayName);
    setProfileImageUri(preferences.profileImageUri);
    setExperienceLevel(preferences.experienceLevel);
    setFavoriteSpirits(preferences.favoriteSpirits);
    setFavoriteFlavors(preferences.favoriteFlavors);
    setShowSaved(false);
  }

  async function handleSignOut() {
    if (isSigningOut) {
      return;
    }

    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              setIsSigningOut(true);

              await signOut();

              router.replace("/auth");
            } catch (error) {
              console.error("Unable to sign out:", error);

              Alert.alert(
                "Unable to Sign Out",
                "Something went wrong while signing you out. Please try again.",
              );

              setIsSigningOut(false);
            }
          },
        },
      ],
    );
  }

  function handleDeleteAccount() {
    if (isDeletingAccount) {
      return;
    }

    Alert.alert(
      "Delete Account",
      "This permanently deletes your profile, preferences, favorites, bar inventory, profile photo, and sign-in account. This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Delete Account Permanently?",
              "This is your final confirmation. All account data will be permanently removed.",
              [
                {
                  text: "Keep My Account",
                  style: "cancel",
                },
                {
                  text: "Delete Permanently",
                  style: "destructive",
                  onPress: async () => {
                    try {
                      setIsDeletingAccount(true);

                      await deleteAccount();

                      router.replace("/auth");

                      Alert.alert(
                        "Account Deleted",
                        "Your account and associated cloud data have been permanently deleted.",
                      );
                    } catch (error) {
                      console.error("Unable to delete account:", error);

                      Alert.alert(
                        "Unable to Delete Account",
                        error instanceof Error
                          ? error.message
                          : "Something went wrong while deleting your account. Please try again.",
                      );

                      setIsDeletingAccount(false);
                    }
                  },
                },
              ],
            );
          },
        },
      ],
    );
  }

  const canSave = hasChanges && !!displayName.trim() && !!experienceLevel;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>YOUR TASTE</Text>

      <Text style={styles.title}>Profile & Preferences</Text>

      <Text style={styles.subtitle}>
        Make changes below, then press Save Changes when everything looks right.
      </Text>

      <View style={styles.photoSection}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            profileImageUri ? "Change profile picture" : "Add a profile picture"
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
              <Ionicons name="person" size={46} color={Colors.gold} />
            </View>
          )}

          <View style={styles.cameraBadge}>
            <Ionicons name="camera" size={18} color="#111111" />
          </View>
        </Pressable>

        <Text style={styles.photoText}>
          {profileImageUri ? "Tap photo to change" : "Add profile photo"}
        </Text>

        {profileImageUri ? (
          <Pressable
            onPress={handleRemovePhoto}
            style={({ pressed }) => [
              styles.removePhotoButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.removePhotoText}>Remove Photo</Text>
          </Pressable>
        ) : null}
      </View>

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
              style={({ pressed }) => [
                styles.option,
                selected && styles.optionSelected,
                pressed && styles.pressed,
              ]}
              onPress={() => {
                setExperienceLevel(level);
                setShowSaved(false);
              }}
            >
              <Text
                style={[styles.optionText, selected && styles.selectedText]}
              >
                {level}
              </Text>

              {selected ? (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color={Colors.gold}
                />
              ) : null}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite Spirits</Text>

        <Text style={styles.helperText}>
          Leave everything unselected to keep recommendations open to all
          spirits.
        </Text>

        <View style={styles.chipGrid}>
          {ONBOARDING_SPIRITS.filter(
            (spirit) => spirit !== "I'm Open to Everything",
          ).map((spirit) => {
            const selected = favoriteSpirits.includes(spirit);

            return (
              <Pressable
                key={spirit}
                style={({ pressed }) => [
                  styles.chip,
                  selected && styles.chipSelected,
                  pressed && styles.pressed,
                ]}
                onPress={() => toggleSpirit(spirit)}
              >
                <Text
                  style={[styles.chipText, selected && styles.selectedText]}
                >
                  {spirit}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite Flavors</Text>

        <Text style={styles.helperText}>
          Choose the flavor styles you usually enjoy. These help improve your
          recommendations.
        </Text>

        <View style={styles.chipGrid}>
          {FLAVOR_PREFERENCES.map((flavor) => {
            const selected = favoriteFlavors.includes(flavor);

            return (
              <Pressable
                key={flavor}
                style={({ pressed }) => [
                  styles.chip,
                  selected && styles.chipSelected,
                  pressed && styles.pressed,
                ]}
                onPress={() => toggleFlavor(flavor)}
              >
                <Text
                  style={[styles.chipText, selected && styles.selectedText]}
                >
                  {flavor}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {showSaved ? (
        <Text style={styles.savedMessage}>✓ Preferences saved</Text>
      ) : null}

      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          !canSave && styles.buttonDisabled,
          pressed && canSave && styles.pressed,
        ]}
        onPress={handleSave}
        disabled={!canSave || isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Text>
      </Pressable>

      {hasChanges ? (
        <Pressable
          style={({ pressed }) => [
            styles.cancelButton,
            pressed && styles.pressed,
          ]}
          onPress={handleCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel Changes</Text>
        </Pressable>
      ) : null}

      <View style={styles.accountSection}>
        <Text style={styles.accountHeading}>ACCOUNT</Text>

        {isSignedIn && user ? (
          <>
            <View style={styles.accountCard}>
              <View style={styles.accountIcon}>
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  color={Colors.gold}
                />
              </View>

              <View style={styles.accountContent}>
                <Text style={styles.accountStatus}>SIGNED IN</Text>

                <Text style={styles.accountName}>
                  {typeof user.user_metadata?.name === "string" &&
                  user.user_metadata.name.trim()
                    ? user.user_metadata.name
                    : displayName.trim() || "Unique Spirits Member"}
                </Text>

                <Text style={styles.accountEmail}>
                  {user.email ?? "Email unavailable"}
                </Text>
              </View>

              <Ionicons name="checkmark-circle" size={24} color={Colors.gold} />
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Sign out"
              accessibilityState={{ disabled: isSigningOut }}
              disabled={isSigningOut}
              onPress={handleSignOut}
              style={({ pressed }) => [
                styles.signOutButton,
                isSigningOut && styles.signOutButtonDisabled,
                pressed && !isSigningOut && styles.pressed,
              ]}
            >
              <Ionicons name="log-out-outline" size={20} color="#E57373" />

              <Text style={styles.signOutButtonText}>
                {isSigningOut ? "Signing Out..." : "Sign Out"}
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Delete account"
              accessibilityHint="Permanently deletes your account and all associated data"
              accessibilityState={{ disabled: isDeletingAccount }}
              disabled={isDeletingAccount || isSigningOut}
              onPress={handleDeleteAccount}
              style={({ pressed }) => [
                styles.deleteAccountButton,
                (isDeletingAccount || isSigningOut) &&
                  styles.deleteAccountButtonDisabled,
                pressed &&
                  !isDeletingAccount &&
                  !isSigningOut &&
                  styles.pressed,
              ]}
            >
              <Ionicons name="trash-outline" size={20} color="#FF8A80" />

              <Text style={styles.deleteAccountButtonText}>
                {isDeletingAccount ? "Deleting Account..." : "Delete Account"}
              </Text>
            </Pressable>

            <Text style={styles.deleteAccountWarning}>
              Permanently removes your account and all synced data.
            </Text>
          </>
        ) : (
          <>
            <View style={styles.guestAccountCard}>
              <View style={styles.accountIcon}>
                <Ionicons name="person-outline" size={28} color={Colors.gold} />
              </View>

              <View style={styles.accountContent}>
                <Text style={styles.accountStatus}>GUEST MODE</Text>

                <Text style={styles.accountName}>
                  You are browsing as a guest
                </Text>

                <Text style={styles.accountEmail}>
                  Sign in to preserve your account across devices.
                </Text>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Sign in or create an account"
              onPress={() => router.push("/auth")}
              style={({ pressed }) => [
                styles.accountActionButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.accountActionButtonText}>
                Sign In or Create Account
              </Text>

              <Ionicons name="arrow-forward" size={19} color="#111111" />
            </Pressable>
          </>
        )}
      </View>

      <View style={styles.appInformationSection}>
        <Text style={styles.appInformationHeading}>APP & SUPPORT</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open ingredient glossary"
          onPress={() => router.push("/glossary" as Href)}
          style={({ pressed }) => [
            styles.informationCard,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.informationIcon}>
            <Ionicons name="book-outline" size={26} color={Colors.gold} />
          </View>

          <View style={styles.informationContent}>
            <Text style={styles.informationTitle}>Ingredient Glossary</Text>

            <Text style={styles.informationDescription}>
              Learn what unfamiliar spirits, liqueurs, bitters, syrups, and
              cocktail ingredients are, how they taste, and how they are used.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color={Colors.gold} />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open app information"
          onPress={() => router.push("/about" as Href)}
          style={({ pressed }) => [
            styles.informationCard,
            styles.secondaryInformationCard,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.informationIcon}>
            <Ionicons
              name="information-circle-outline"
              size={26}
              color={Colors.gold}
            />
          </View>

          <View style={styles.informationContent}>
            <Text style={styles.informationTitle}>App Information</Text>

            <Text style={styles.informationDescription}>
              Learn about Unique Spirits & Pairings, responsible enjoyment,
              safety, privacy, and other important details.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color={Colors.gold} />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 22,
    paddingTop: 54,
    paddingBottom: 120,
  },

  kicker: {
    color: Colors.gold,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 10,
    textAlign: "center",
  },

  title: {
    color: Colors.text,
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 14,
    textAlign: "center",
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },

  photoSection: {
    alignItems: "center",
    marginTop: 30,
  },

  photoButton: {
    width: 118,
    height: 118,
  },

  photoButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },

  profilePlaceholder: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: Colors.card,
    borderWidth: 2,
    borderColor: Colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },

  profileImage: {
    width: 118,
    height: 118,
    borderRadius: 59,
    borderWidth: 2,
    borderColor: Colors.gold,
  },

  cameraBadge: {
    position: "absolute",
    right: 0,
    bottom: 2,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gold,
    borderWidth: 3,
    borderColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  photoText: {
    color: Colors.gold,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 12,
  },

  removePhotoButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginTop: 2,
  },

  removePhotoText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "700",
  },

  section: {
    marginTop: 34,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 14,
    textAlign: "center",
  },

  helperText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: -6,
    marginBottom: 16,
    textAlign: "center",
  },

  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 18,
    color: Colors.text,
    fontSize: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  option: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionSelected: {
    backgroundColor: "rgba(217, 164, 65, 0.16)",
    borderColor: Colors.gold,
  },

  optionText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "700",
  },

  selectedText: {
    color: Colors.gold,
    fontWeight: "900",
  },

  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  chip: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },

  chipSelected: {
    backgroundColor: "rgba(217, 164, 65, 0.16)",
    borderColor: Colors.gold,
  },

  chipText: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "700",
  },

  savedMessage: {
    color: Colors.gold,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 34,
  },

  saveButton: {
    backgroundColor: Colors.gold,
    borderRadius: 999,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 20,
  },

  buttonDisabled: {
    opacity: 0.4,
  },

  saveButtonText: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "900",
  },

  cancelButton: {
    paddingVertical: 16,
    alignItems: "center",
  },

  cancelButtonText: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontWeight: "700",
  },

  accountSection: {
    marginTop: 38,
    paddingTop: 28,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  accountHeading: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.2,
    marginBottom: 14,
    textAlign: "center",
  },

  accountCard: {
    minHeight: 96,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: "rgba(217, 164, 65, 0.5)",
    borderRadius: 22,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  guestAccountCard: {
    minHeight: 96,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 22,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  accountIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: "rgba(217, 164, 65, 0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  accountContent: {
    flex: 1,
  },

  accountStatus: {
    color: Colors.gold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 5,
  },

  accountName: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 4,
  },

  accountEmail: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  signOutButton: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: "rgba(229, 115, 115, 0.5)",
    borderRadius: 999,
    marginTop: 14,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  signOutButtonDisabled: {
    opacity: 0.55,
  },

  signOutButtonText: {
    color: "#E57373",
    fontSize: 15,
    fontWeight: "900",
  },

  deleteAccountButton: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: "rgba(255, 138, 128, 0.45)",
    borderRadius: 999,
    marginTop: 12,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(255, 138, 128, 0.06)",
  },

  deleteAccountButtonDisabled: {
    opacity: 0.55,
  },

  deleteAccountButtonText: {
    color: "#FF8A80",
    fontSize: 15,
    fontWeight: "900",
  },

  deleteAccountWarning: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 9,
    paddingHorizontal: 18,
  },

  accountActionButton: {
    minHeight: 56,
    backgroundColor: Colors.gold,
    borderRadius: 999,
    marginTop: 14,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  accountActionButtonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "900",
  },

  appInformationSection: {
    marginTop: 38,
    paddingTop: 28,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  appInformationHeading: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.2,
    marginBottom: 14,
    textAlign: "center",
  },

  informationCard: {
    minHeight: 96,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 22,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  secondaryInformationCard: {
    marginTop: 12,
  },

  informationIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(217, 164, 65, 0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  informationContent: {
    flex: 1,
  },

  informationTitle: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 5,
    textAlign: "center",
  },

  informationDescription: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  pressed: {
    opacity: 0.82,
  },
});
