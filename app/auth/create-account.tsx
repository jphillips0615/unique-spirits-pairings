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

export default function CreateAccountScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [formMessage, setFormMessage] = useState("");

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function handleCreateAccount() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setAgeError("");
    setFormMessage("");

    let hasError = false;

    if (!trimmedName) {
      setNameError("Enter your name.");
      hasError = true;
    } else if (trimmedName.length < 2) {
      setNameError("Name must contain at least 2 characters.");
      hasError = true;
    }

    if (!trimmedEmail) {
      setEmailError("Enter your email address.");
      hasError = true;
    } else if (!validateEmail(trimmedEmail)) {
      setEmailError("Enter a valid email address.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Create a password.");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("Password must contain at least 8 characters.");
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm your password.");
      hasError = true;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;
    }

    if (!ageConfirmed) {
      setAgeError("You must confirm that you are of legal drinking age.");
      hasError = true;
    }

    if (hasError) return;

    setFormMessage(
      "The form is working. Secure account creation will be connected next.",
    );
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
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="chevron-back" size={25} color={Colors.gold} />
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>

        <View style={styles.iconContainer}>
          <Ionicons name="person-add-outline" size={31} color={Colors.gold} />
        </View>

        <Text style={styles.kicker}>JOIN THE EXPERIENCE</Text>
        <Text style={styles.title}>Create your account.</Text>

        <Text style={styles.subtitle}>
          Save your favorites, preferences, and personalized recommendations
          across devices.
        </Text>

        <Text style={styles.label}>Name</Text>

        <View
          style={[
            styles.inputContainer,
            nameError ? styles.inputContainerError : undefined,
          ]}
        >
          <Ionicons
            name="person-outline"
            size={20}
            color={nameError ? "#E57373" : "#8C8C8C"}
          />

          <TextInput
            value={name}
            onChangeText={(value) => {
              setName(value);
              setNameError("");
              setFormMessage("");
            }}
            placeholder="Your name"
            placeholderTextColor="#777777"
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
            style={styles.input}
          />
        </View>

        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

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

        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

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
            placeholder="At least 8 characters"
            placeholderTextColor="#777777"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            style={styles.input}
          />

          <Pressable
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

        <Text style={styles.label}>Confirm password</Text>

        <View
          style={[
            styles.inputContainer,
            confirmPasswordError ? styles.inputContainerError : undefined,
          ]}
        >
          <Ionicons
            name="shield-checkmark-outline"
            size={20}
            color={confirmPasswordError ? "#E57373" : "#8C8C8C"}
          />

          <TextInput
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value);
              setConfirmPasswordError("");
              setFormMessage("");
            }}
            placeholder="Enter your password again"
            placeholderTextColor="#777777"
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleCreateAccount}
            style={styles.input}
          />

          <Pressable
            onPress={() => setShowConfirmPassword((current) => !current)}
            hitSlop={10}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#A7A7A7"
            />
          </Pressable>
        </View>

        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}

        <Pressable
          onPress={() => {
            setAgeConfirmed((current) => !current);
            setAgeError("");
            setFormMessage("");
          }}
          style={({ pressed }) => [styles.ageRow, pressed && styles.pressed]}
        >
          <View
            style={[
              styles.checkbox,
              ageConfirmed && styles.checkboxSelected,
              ageError ? styles.checkboxError : undefined,
            ]}
          >
            {ageConfirmed ? (
              <Ionicons name="checkmark" size={18} color="#0B0B0B" />
            ) : null}
          </View>

          <Text style={styles.ageText}>
            I confirm that I am of legal drinking age in my location.
          </Text>
        </Pressable>

        {ageError ? <Text style={styles.ageErrorText}>{ageError}</Text> : null}

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
          onPress={handleCreateAccount}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>Create Account</Text>
          <Ionicons name="arrow-forward" size={20} color="#0B0B0B" />
        </Pressable>

        <View style={styles.signInRow}>
          <Text style={styles.signInText}>Already have an account?</Text>

          <Pressable
            onPress={() => router.replace("/auth/sign-in")}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Text style={styles.signInLink}>Sign in</Text>
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

        <Text style={styles.privacyNote}>
          By creating an account, you agree to use the app responsibly and
          acknowledge that cocktail content is intended for adults of legal
          drinking age.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 76,
    paddingBottom: 42,
  },

  backButton: {
    position: "absolute",
    top: 24,
    left: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },

  backButtonText: {
    color: Colors.gold,
    fontSize: 16,
    fontWeight: "700",
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

  ageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginTop: 2,
    marginBottom: 12,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: "#666666",
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },

  checkboxSelected: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },

  checkboxError: {
    borderColor: "#E57373",
  },

  ageText: {
    flex: 1,
    color: "#D2D2D2",
    fontSize: 14,
    lineHeight: 21,
  },

  ageErrorText: {
    color: "#E57373",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 18,
    marginLeft: 36,
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
    minHeight: 58,
    borderRadius: 999,
    backgroundColor: Colors.gold,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 12,
    marginBottom: 24,
  },

  primaryButtonText: {
    color: "#0B0B0B",
    fontSize: 16,
    fontWeight: "900",
  },

  signInRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 22,
  },

  signInText: {
    color: "#AFAFAF",
    fontSize: 14,
  },

  signInLink: {
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

  privacyNote: {
    color: "#777777",
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 16,
  },

  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
});
