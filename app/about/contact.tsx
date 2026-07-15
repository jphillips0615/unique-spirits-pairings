import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "@/constants/colors";

const SUPPORT_EMAIL = "the.kinetix.2026@gmail.com";

export default function ContactUsScreen() {
  async function handleEmailPress() {
    const subject = encodeURIComponent(
      "Unique Spirits & Pairings Support Request",
    );

    const body = encodeURIComponent(
      [
        "Hello Unique Spirits & Pairings team,",
        "",
        "I am contacting you about:",
        "",
        "Please describe your question, issue, correction, or feedback here.",
        "",
        "App version: 1.0.0",
      ].join("\n"),
    );

    const emailUrl = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;

    try {
      const canOpen = await Linking.canOpenURL(emailUrl);

      if (!canOpen) {
        Alert.alert(
          "Email App Not Available",
          `Please email us directly at ${SUPPORT_EMAIL}.`,
        );
        return;
      }

      await Linking.openURL(emailUrl);
    } catch (error) {
      console.error("Unable to open email app:", error);

      Alert.alert(
        "Unable to Open Email",
        `Please email us directly at ${SUPPORT_EMAIL}.`,
      );
    }
  }

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

        <Text style={styles.header}>Contact Us</Text>
      </View>

      <Text style={styles.intro}>
        Questions, feedback, corrections, and ideas are welcome. Choose the
        category that best fits your message, then send us an email.
      </Text>

      <View style={styles.contactCard}>
        <View style={styles.contactIcon}>
          <Ionicons name="mail-outline" size={30} color={Colors.gold} />
        </View>

        <Text style={styles.contactTitle}>Email Support</Text>

        <Text style={styles.contactText}>
          Send us a message and include as much detail as possible so we can
          understand the issue or suggestion.
        </Text>

        <Text style={styles.emailAddress}>{SUPPORT_EMAIL}</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open email app"
          onPress={handleEmailPress}
          style={({ pressed }) => [
            styles.emailButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Ionicons name="mail" size={20} color={Colors.background} />

          <Text style={styles.emailButtonText}>Send Email</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionHeading}>WHAT CAN WE HELP WITH?</Text>

      <SupportSection
        icon="help-circle-outline"
        title="App Support"
        text="Report a screen that is not working, a navigation issue, missing data, or another problem using the app."
      />

      <SupportSection
        icon="create-outline"
        title="Recipe Corrections"
        text="Let us know about a measurement, ingredient, instruction, history, or food pairing that may need to be reviewed."
      />

      <SupportSection
        icon="bulb-outline"
        title="Suggestions & Feedback"
        text="Share ideas for new features, cocktails, spirits, pairings, or improvements to the overall experience."
      />

      <SupportSection
        icon="briefcase-outline"
        title="Business Inquiries"
        text="Contact us about partnerships, affiliate opportunities, brand collaborations, licensing, or other business matters."
      />

      <SupportSection
        icon="shield-checkmark-outline"
        title="Privacy Questions"
        text="Ask about local storage, profile information, future accounts, AI services, analytics, or other privacy-related topics."
      />

      <View style={styles.responseNotice}>
        <Ionicons name="time-outline" size={23} color={Colors.gold} />

        <Text style={styles.responseNoticeText}>
          Response times may vary while the app is still in development.
        </Text>
      </View>
    </ScrollView>
  );
}

type SupportSectionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text: string;
};

function SupportSection({ icon, title, text }: SupportSectionProps) {
  return (
    <View style={styles.supportSection}>
      <View style={styles.supportTitleRow}>
        <Ionicons name={icon} size={23} color={Colors.gold} />

        <Text style={styles.supportTitle}>{title}</Text>
      </View>

      <Text style={styles.supportText}>{text}</Text>
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

  intro: {
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 26,
    textAlign: "center",
  },

  contactCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
    marginBottom: 32,
  },

  contactIcon: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: "rgba(217, 164, 65, 0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  contactTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 9,
    textAlign: "center",
  },

  contactText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },

  emailAddress: {
    color: Colors.gold,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 16,
  },

  emailButton: {
    minHeight: 54,
    backgroundColor: Colors.gold,
    borderRadius: 999,
    paddingHorizontal: 24,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  emailButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "900",
  },

  sectionHeading: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.2,
    marginBottom: 14,
    textAlign: "center",
  },

  supportSection: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },

  supportTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
    gap: 10,
  },

  supportTitle: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
  },

  supportText: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },

  responseNotice: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginTop: 10,
  },

  responseNoticeText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },

  buttonPressed: {
    opacity: 0.65,
  },
});
