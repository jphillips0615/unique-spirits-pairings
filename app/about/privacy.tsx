import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Ionicons name="chevron-back" size={26} color={Colors.gold} />
        </Pressable>

        <Text style={styles.header}>Privacy Policy</Text>
      </View>

      <Text style={styles.updated}>Last updated: July 13, 2026</Text>

      <Text style={styles.intro}>
        Unique Spirits & Pairings respects your privacy. This policy explains
        what information the app currently uses, where it is stored, and how
        future changes will be communicated.
      </Text>

      <PolicySection title="Information Stored on Your Device">
        The app may store information you choose to provide, including your
        display name, profile photo, experience level, favorite spirits, saved
        cocktails, onboarding status, and the ingredients saved in My Unique
        Bar.
      </PolicySection>

      <PolicySection title="Local Storage">
        This information is currently stored locally on your device so the app
        can remember your preferences and personalize your experience. It is not
        currently uploaded to a Unique Spirits & Pairings server.
      </PolicySection>

      <PolicySection title="Profile Photos">
        When you choose a profile photo, the app requests access to your
        device’s photo library. The selected image is used only as your profile
        image within the app.
      </PolicySection>

      <PolicySection title="How Information Is Used">
        Saved information is used to personalize cocktail recommendations,
        remember favorites, maintain your bar inventory, and improve the way
        recipes and educational content are presented to you.
      </PolicySection>

      <PolicySection title="Information We Do Not Currently Sell">
        Unique Spirits & Pairings does not currently sell your personal
        information or use your saved preferences for third-party advertising.
      </PolicySection>

      <PolicySection title="Third-Party Services">
        The app is built with third-party technologies such as React Native,
        Expo, and device operating-system services. Future versions may add
        services such as account authentication, cloud storage, analytics,
        artificial intelligence, affiliate links, or error reporting.
      </PolicySection>

      <PolicySection title="Future Features">
        If a future update begins collecting, transmitting, or sharing new
        categories of information, this policy will be updated before or when
        those features are released.
      </PolicySection>

      <PolicySection title="Data Removal">
        You may remove saved profile information, favorites, and My Unique Bar
        ingredients through available app controls. Uninstalling the app may
        also remove locally stored app data from your device.
      </PolicySection>

      <PolicySection title="Children’s Privacy">
        This app contains alcohol-related content and is intended only for
        adults of legal drinking age in their location. It is not designed for
        children.
      </PolicySection>

      <PolicySection title="Security">
        Reasonable care is taken when designing features that store or process
        information. However, no device, storage system, or electronic method
        can be guaranteed to be completely secure.
      </PolicySection>

      <PolicySection title="Changes to This Policy">
        This Privacy Policy may be updated as the app grows. The latest version
        and its effective date will be displayed on this page.
      </PolicySection>

      <PolicySection title="Contact">
        Questions about this Privacy Policy can be submitted through the Contact
        Us page in the app.
      </PolicySection>

      <View style={styles.noticeCard}>
        <Ionicons
          name="information-circle-outline"
          size={24}
          color={Colors.gold}
        />

        <Text style={styles.noticeText}>
          This policy should be reviewed again before the app is publicly
          released, especially after adding accounts, cloud storage, analytics,
          AI services, or affiliate features.
        </Text>
      </View>
    </ScrollView>
  );
}

type PolicySectionProps = {
  title: string;
  children: string;
};

function PolicySection({ title, children }: PolicySectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingTop: 54,
    paddingHorizontal: 22,
    paddingBottom: 90,
  },

  headerRow: {
    position: "relative",
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  backButton: {
    position: "absolute",
    left: 0,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    color: Colors.gold,
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    paddingHorizontal: 52,
  },

  updated: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 14,
    textAlign: "center",
  },

  intro: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 26,
    textAlign: "center",
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
    textAlign: "center",
  },

  sectionText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },

  noticeCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginTop: 8,
  },

  noticeText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },

  buttonPressed: {
    opacity: 0.65,
  },
});
