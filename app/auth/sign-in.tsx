import { Ionicons } from "@expo/vector-icons";
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

import { Colors } from "@/constants/colors";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formMessage, setFormMessage] = useState("");

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function handleSignIn() {
    const trimmedEmail = email.trim();

    setEmailError("");
    setPasswordError("");
    setFormMessage("");

    let hasError = false;

    if (!trimmedEmail) {
      setEmailError("Enter your email address.");
      hasError = true;
    } else if (!validateEmail(trimmedEmail)) {
      setEmailError("Enter a valid email address.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Enter your password.");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must contain at least 6 characters.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setFormMessage(
      "The form is working. Secure online sign-in will be connected next.",
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="chevron-back" size={38} color={Colors.gold} />
        </Pressable>

        <View style={styles.formContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="log-in-outline" size={32} color={Colors.gold} />
          </View>

          <Text style={styles.kicker}>WELCOME BACK</Text>

          <Text style={styles.title}>Sign in to your account.</Text>

          <Text style={styles.subtitle}>
            Access your saved cocktails, preferences, and personalized
            recommendations.
          </Text>

          <Text style={styles.label}>Email address</Text>

          <View
            style={[
              styles.inputContainer,
              emailError ? styles.inputContainerError : undefined,
            ]}
          >
            <Ionicons
              name="mail-outline"
              size={20}
              color={emailError ? "#E57373" : "#8C8C8C"}
            />

            <TextInput
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setEmailError("");
                setFormMessage("");
              }}
              placeholder="you@example.com"
              placeholderTextColor="#777777"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              style={styles.input}
            />
          </View>

          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <Text style={styles.label}>Password</Text>

          <View
            style={[
              styles.inputContainer,
              passwordError ? styles.inputContainerError : undefined,
            ]}
          >
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={passwordError ? "#E57373" : "#8C8C8C"}
            />

            <TextInput
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setPasswordError("");
                setFormMessage("");
              }}
              placeholder="Enter your password"
              placeholderTextColor="#777777"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleSignIn}
              style={styles.input}
            />

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                showPassword ? "Hide password" : "Show password"
              }
              onPress={() => setShowPassword((current) => !current)}
              hitSlop={10}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#A7A7A7"
              />
            </Pressable>
          </View>

          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <Pressable
            onPress={() =>
              setFormMessage(
                "Password recovery will be connected with account authentication.",
              )
            }
            style={({ pressed }) => [
              styles.forgotButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.forgotButtonText}>Forgot password?</Text>
          </Pressable>

          {formMessage ? (
            <View style={styles.messageBox}>
              <Ionicons
                name="information-circle-outline"
                size={21}
                color={Colors.gold}
              />

              <Text style={styles.messageText}>{formMessage}</Text>
            </View>
          ) : null}

          <Pressable
            onPress={handleSignIn}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>Sign In</Text>

            <Ionicons name="arrow-forward" size={20} color="#0B0B0B" />
          </Pressable>

          <View style={styles.createAccountRow}>
            <Text style={styles.createAccountText}>
              Don&apos;t have an account?
            </Text>

            <Pressable
              onPress={() => router.replace("/auth/create-account")}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={styles.createAccountLink}>Create one</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => router.replace("/onboarding/CreateProfile")}
            style={({ pressed }) => [
              styles.guestButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 26,
    paddingTop: 92,
    paddingBottom: 44,
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

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(217, 164, 65, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(217, 164, 65, 0.5)",
    marginBottom: 24,
  },

  kicker: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 12,
  },

  title: {
    color: Colors.text,
    fontSize: 36,
    lineHeight: 43,
    fontWeight: "900",
    marginBottom: 14,
  },

  subtitle: {
    color: "#C9C9C9",
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 34,
  },

  label: {
    color: "#F2F2F2",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 10,
  },

  inputContainer: {
    minHeight: 58,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2D2D2D",
    backgroundColor: "#151515",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 22,
  },

  inputContainerError: {
    borderColor: "#E57373",
  },

  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },

  errorText: {
    color: "#E57373",
    fontSize: 13,
    lineHeight: 18,
    marginTop: -14,
    marginBottom: 20,
    marginLeft: 4,
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -8,
    marginBottom: 26,
    paddingVertical: 6,
  },

  forgotButtonText: {
    color: Colors.gold,
    fontSize: 14,
    fontWeight: "800",
  },

  messageBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(217, 164, 65, 0.4)",
    backgroundColor: "rgba(217, 164, 65, 0.08)",
    padding: 14,
    marginBottom: 20,
  },

  messageText: {
    flex: 1,
    color: "#D7D7D7",
    fontSize: 13,
    lineHeight: 20,
  },

  primaryButton: {
    width: "100%",
    maxWidth: 460,
    minHeight: 58,
    alignSelf: "center",
    borderRadius: 999,
    backgroundColor: Colors.gold,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginBottom: 24,
  },

  primaryButtonText: {
    color: "#0B0B0B",
    fontSize: 16,
    fontWeight: "900",
  },

  createAccountRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 22,
  },

  createAccountText: {
    color: "#AFAFAF",
    fontSize: 14,
  },

  createAccountLink: {
    color: Colors.gold,
    fontSize: 14,
    fontWeight: "900",
  },

  guestButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },

  guestButtonText: {
    color: "#CFCFCF",
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
  },

  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
});
