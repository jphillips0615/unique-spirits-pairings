import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";

export default function TermsOfUseScreen() {
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

        <Text style={styles.header}>Terms of Use</Text>
      </View>

      <Text style={styles.updated}>Last updated: July 13, 2026</Text>

      <Text style={styles.intro}>
        These Terms of Use explain the rules for using Unique Spirits &
        Pairings. By using the app, you agree to use it responsibly and only for
        lawful personal purposes.
      </Text>

      <TermsSection title="Legal Drinking Age">
        This app is intended only for adults of legal drinking age in their
        location. You are responsible for following all applicable alcohol laws
        and regulations.
      </TermsSection>

      <TermsSection title="Responsible Use">
        You agree to use the app responsibly. Never drink and drive, serve
        alcohol to minors, encourage unsafe consumption, or use the app in a way
        that places yourself or another person at risk.
      </TermsSection>

      <TermsSection title="Educational Content">
        Recipes, spirit information, preparation techniques, histories, and
        food-pairing suggestions are provided for general educational and
        entertainment purposes.
      </TermsSection>

      <TermsSection title="Recipe Results">
        Cocktail results may vary based on ingredients, brands, measurements,
        equipment, temperature, technique, and personal taste. You are
        responsible for deciding whether a recipe is appropriate for you.
      </TermsSection>

      <TermsSection title="Allergies and Dietary Restrictions">
        You are responsible for checking every ingredient for allergies,
        intolerances, dietary restrictions, and medication interactions before
        preparing or consuming a drink or pairing.
      </TermsSection>

      <TermsSection title="Health and Medical Information">
        The app does not provide medical advice. Speak with a qualified
        healthcare professional about alcohol use, medication interactions,
        pregnancy, health conditions, or other personal concerns.
      </TermsSection>

      <TermsSection title="User-Provided Information">
        You are responsible for the accuracy of information you enter into the
        app, including profile details, custom ingredients, and items saved in
        My Unique Bar.
      </TermsSection>

      <TermsSection title="Future AI Features">
        Future versions may include artificial-intelligence-assisted
        recommendations or generated content. AI results may be incomplete,
        inaccurate, or unsuitable, and should always be reviewed before use.
      </TermsSection>

      <TermsSection title="Affiliate Links and Recommendations">
        Future versions may include optional product links or affiliate
        recommendations. If added, the app may receive a commission from
        qualifying purchases at no additional cost to the user.
      </TermsSection>

      <TermsSection title="Third-Party Products and Services">
        References to third-party brands, products, retailers, websites, or
        services do not guarantee availability, quality, safety, or suitability.
        Purchases and interactions with third parties are governed by their own
        terms and policies.
      </TermsSection>

      <TermsSection title="Intellectual Property">
        The app’s original design, branding, written content, code, and custom
        materials are protected by applicable intellectual-property laws and may
        not be copied, redistributed, or commercially reused without permission.
      </TermsSection>

      <TermsSection title="Availability and Changes">
        Features may be changed, added, suspended, or removed as the app
        develops. Continuous availability, compatibility, or error-free
        operation is not guaranteed.
      </TermsSection>

      <TermsSection title="Limitation of Liability">
        To the fullest extent permitted by law, Unique Spirits & Pairings and
        its creators are not responsible for injury, loss, damage, allergic
        reaction, misuse, or other consequences resulting from use of the app or
        reliance on its content.
      </TermsSection>

      <TermsSection title="Termination of Access">
        Access to future account-based services may be restricted or terminated
        when the app is misused, these terms are violated, or continued access
        creates legal, security, or safety concerns.
      </TermsSection>

      <TermsSection title="Changes to These Terms">
        These terms may be updated as the app grows. The latest version and its
        effective date will be displayed on this page.
      </TermsSection>

      <TermsSection title="Contact">
        Questions about these Terms of Use can be submitted through the Contact
        Us page in the app.
      </TermsSection>

      <View style={styles.noticeCard}>
        <Ionicons name="document-text-outline" size={24} color={Colors.gold} />

        <Text style={styles.noticeText}>
          These development-stage terms should be reviewed by a qualified legal
          professional before public release.
        </Text>
      </View>
    </ScrollView>
  );
}

type TermsSectionProps = {
  title: string;
  children: string;
};

function TermsSection({ title, children }: TermsSectionProps) {
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
