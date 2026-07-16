import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { supabase } from "@/lib/supabase";

type MessageType = "info" | "error" | "success";

export default function SignInScreen() {
  const params = useLocalSearchParams<{
    accountCreated?: string;
    email?: string;
  }>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("info");

  useEffect(() => {
    if (typeof params.email === "string") {
      setEmail(params.email);
    }

    if (params.accountCreated === "true") {
      setMessageType("success");
      setFormMessage(
        "Your account was created. Confirm your email if required, then sign in.",
      );
    }
  }, [params.accountCreated, params.email]);

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function clearMessage() {
    setFormMessage("");
    setMessageType("info");
  }

  async function handleSignIn() {
    if (isSigningIn) {
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();

    setEmailError("");
    setPasswordError("");
    clearMessage();

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
    } else if (password.length < 8) {
      setPasswordError("Password must contain at least 8 characters.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      setIsSigningIn(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) {
        const normalizedMessage = error.message.toLowerCase();

        if (
          normalizedMessage.includes("invalid login credentials") ||
          normalizedMessage.includes("invalid credentials")
        ) {
          setMessageType("error");
          setFormMessage(
            "The email address or password is incorrect. Please try again.",
          );
        } else if (
          normalizedMessage.includes("email not confirmed") ||
          normalizedMessage.includes("email_not_confirmed")
        ) {
          setMessageType("error");
          setFormMessage(
            "Confirm your email address before signing in. Check your inbox and spam folder.",
          );
        } else if (normalizedMessage.includes("email")) {
          setEmailError(error.message);
        } else if (normalizedMessage.includes("password")) {
          setPasswordError(error.message);
        } else {
          setMessageType("error");
          setFormMessage(error.message);
        }

        return;
      }

      if (!data.session || !data.user) {
        setMessageType("error");
        setFormMessage(
          "Supabase did not return an active session. Please try again.",
        );
        return;
      }

      router.replace("/(tabs)");
    } catch (error) {
      console.error("Sign-in failed:", error);

      setMessageType("error");
      setFormMessage(
        "We could not reach the account service. Check your internet connection and try again.",
      );
    } finally {
      setIsSigningIn(false);
    }
  }

  async function handleForgotPassword() {
    const trimmedEmail = email.trim().toLowerCase();

    setEmailError("");
    clearMessage();

    if (!trimmedEmail) {
      setEmailError(
        "Enter your email address first, then press Forgot password.",
      );
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail);

      if (error) {
        setMessageType("error");
        setFormMessage(error.message);
        return;
      }

      setMessageType("success");
      setFormMessage(
        "Password recovery instructions were sent. Check your inbox and spam folder.",
      );
    } catch (error) {
      console.error("Password recovery failed:", error);

      setMessageType("error");
      setFormMessage(
        "We could not send the recovery email. Check your connection and try again.",
      );
    }
  }

  const messageIcon =
    messageType === "success"
      ? "checkmark-circle-outline"
      : messageType === "error"
        ? "alert-circle-outline"
        : "information-circle-outline";

  const messageColor =
    messageType === "success"
      ? "#68C78D"
      : messageType === "error"
        ? "#E57373"
        : Colors.gold;

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
                clearMessage();
              }}
              placeholder="you@example.com"
              placeholderTextColor="#777777"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
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
                clearMessage();
              }}
              placeholder="Enter your password"
              placeholderTextColor="#777777"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="current-password"
              textContentType="password"
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
            accessibilityRole="button"
            accessibilityLabel="Reset password"
            disabled={isSigningIn}
            onPress={handleForgotPassword}
            style={({ pressed }) => [
              styles.forgotButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.forgotButtonText}>Forgot password?</Text>
          </Pressable>

          {formMessage ? (
            <View
              style={[
                styles.messageBox,
                messageType === "error" && styles.messageBoxError,
                messageType === "success" && styles.messageBoxSuccess,
              ]}
            >
              <Ionicons name={messageIcon} size={21} color={messageColor} />

              <Text style={styles.messageText}>{formMessage}</Text>
            </View>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sign in"
            accessibilityState={{ disabled: isSigningIn }}
            disabled={isSigningIn}
            onPress={handleSignIn}
            style={({ pressed }) => [
              styles.primaryButton,
              isSigningIn && styles.primaryButtonDisabled,
              pressed && !isSigningIn && styles.pressed,
            ]}
          >
            {isSigningIn ? (
              <>
                <ActivityIndicator size="small" color="#0B0B0B" />
                <Text style={styles.primaryButtonText}>Signing In...</Text>
              </>
            ) : (
              <>
                <Text style={styles.primaryButtonText}>Sign In</Text>
                <Ionicons name="arrow-forward" size={20} color="#0B0B0B" />
              </>
            )}
          </Pressable>

          <View style={styles.createAccountRow}>
            <Text style={styles.createAccountText}>
              Don&apos;t have an account?
            </Text>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.replace("/auth/create-account")}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={styles.createAccountLink}>Create one</Text>
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
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

  messageBoxError: {
    borderColor: "rgba(229, 115, 115, 0.5)",
    backgroundColor: "rgba(229, 115, 115, 0.08)",
  },

  messageBoxSuccess: {
    borderColor: "rgba(104, 199, 141, 0.5)",
    backgroundColor: "rgba(104, 199, 141, 0.08)",
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

  primaryButtonDisabled: {
    opacity: 0.65,
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
