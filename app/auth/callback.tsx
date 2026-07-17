import { Colors } from "@/constants/colors";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type ConfirmationStatus = "loading" | "success" | "error";

function getUrlParameters(url: string) {
  const queryStart = url.indexOf("?");
  const hashStart = url.indexOf("#");

  const queryString =
    queryStart >= 0
      ? url.slice(queryStart + 1, hashStart >= 0 ? hashStart : undefined)
      : "";

  const hashString = hashStart >= 0 ? url.slice(hashStart + 1) : "";

  const queryParameters = new URLSearchParams(queryString);
  const hashParameters = new URLSearchParams(hashString);

  return {
    code: queryParameters.get("code") ?? hashParameters.get("code"),

    accessToken:
      queryParameters.get("access_token") ?? hashParameters.get("access_token"),

    refreshToken:
      queryParameters.get("refresh_token") ??
      hashParameters.get("refresh_token"),

    error: queryParameters.get("error") ?? hashParameters.get("error"),

    errorCode:
      queryParameters.get("error_code") ?? hashParameters.get("error_code"),

    errorDescription:
      queryParameters.get("error_description") ??
      hashParameters.get("error_description"),
  };
}

function formatConfirmationError(
  description: string | null,
  code: string | null,
) {
  const normalizedDescription = description?.replace(/\+/g, " ").trim() ?? "";

  const normalizedCode = code?.toLowerCase() ?? "";

  if (
    normalizedCode.includes("expired") ||
    normalizedDescription.toLowerCase().includes("expired")
  ) {
    return "This confirmation link has expired. Return to sign in and request a new verification email.";
  }

  if (normalizedDescription.toLowerCase().includes("already confirmed")) {
    return "This email address has already been confirmed. You can continue to sign in.";
  }

  if (normalizedDescription) {
    return normalizedDescription;
  }

  return "We could not verify this confirmation link. It may be invalid or may have already been used.";
}

export default function AuthCallbackScreen() {
  const incomingUrl = Linking.useURL();

  const [status, setStatus] = useState<ConfirmationStatus>("loading");

  const [message, setMessage] = useState("Confirming your email address…");

  const hasProcessedUrl = useRef(false);

  useEffect(() => {
    if (!incomingUrl || hasProcessedUrl.current) {
      return;
    }

    const callbackUrl = incomingUrl;

    hasProcessedUrl.current = true;

    async function confirmEmail() {
      try {
        setStatus("loading");
        setMessage("Confirming your email address…");

        const {
          code,
          accessToken,
          refreshToken,
          error,
          errorCode,
          errorDescription,
        } = getUrlParameters(callbackUrl);

        if (error || errorCode) {
          setStatus("error");
          setMessage(formatConfirmationError(errorDescription, errorCode));
          return;
        }

        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            throw exchangeError;
          }
        } else if (accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            throw sessionError;
          }
        } else {
          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession();

          if (sessionError) {
            throw sessionError;
          }

          if (!session) {
            setStatus("error");
            setMessage(
              "The verification link opened, but no confirmation information was found. Please try the link again.",
            );
            return;
          }
        }

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          setStatus("error");
          setMessage(
            "Your email may be confirmed, but we could not finish signing you in.",
          );
          return;
        }

        setStatus("success");
        setMessage("Your email has been verified and your account is ready.");
      } catch (error) {
        console.error("Email confirmation failed:", error);

        const errorMessage =
          error instanceof Error
            ? error.message
            : "We could not confirm your email address.";

        setStatus("error");
        setMessage(formatConfirmationError(errorMessage, null));
      }
    }

    void confirmEmail();
  }, [incomingUrl]);

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.backgroundGlow} />

      <View style={styles.content}>
        <View
          style={[
            styles.iconCircle,
            status === "error" && styles.errorIconCircle,
          ]}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.gold} />
          ) : (
            <Ionicons
              name={
                isSuccess ? "checkmark-circle-outline" : "alert-circle-outline"
              }
              size={58}
              color={isSuccess ? Colors.gold : "#E57373"}
            />
          )}
        </View>

        <Text style={styles.kicker}>UNIQUE SPIRITS & PAIRINGS</Text>

        <Text style={styles.title}>
          {isLoading
            ? "Verifying your email"
            : isSuccess
              ? "Email verified"
              : "Verification problem"}
        </Text>

        <Text style={styles.message}>{message}</Text>

        {!isLoading ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              if (isSuccess) {
                router.replace("/onboarding/CreateProfile");
                return;
              }

              router.replace("/auth/sign-in");
            }}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {isSuccess ? "Continue to Your Profile" : "Return to Sign In"}
            </Text>

            <Ionicons name="arrow-forward" size={20} color="#090909" />
          </Pressable>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  backgroundGlow: {
    position: "absolute",
    width: 330,
    height: 330,
    borderRadius: 165,
    backgroundColor: "rgba(217, 164, 65, 0.07)",
  },

  content: {
    width: "100%",
    maxWidth: 480,
    alignItems: "center",
    paddingHorizontal: 26,
    paddingVertical: 44,
    borderRadius: 28,
    backgroundColor: "rgba(17, 17, 17, 0.96)",
    borderWidth: 1,
    borderColor: "rgba(217, 164, 65, 0.28)",
  },

  iconCircle: {
    width: 94,
    height: 94,
    borderRadius: 47,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    backgroundColor: "rgba(217, 164, 65, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(217, 164, 65, 0.45)",
  },

  errorIconCircle: {
    backgroundColor: "rgba(229, 115, 115, 0.08)",
    borderColor: "rgba(229, 115, 115, 0.4)",
  },

  kicker: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.4,
    textAlign: "center",
    marginBottom: 13,
  },

  title: {
    color: Colors.text,
    fontSize: 30,
    lineHeight: 37,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 16,
  },

  message: {
    color: "#C8C8C8",
    fontSize: 16,
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 32,
  },

  primaryButton: {
    width: "100%",
    minHeight: 56,
    borderRadius: 999,
    backgroundColor: Colors.gold,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingHorizontal: 22,
  },

  primaryButtonText: {
    color: "#090909",
    fontSize: 15,
    fontWeight: "900",
  },

  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.98 }],
  },
});
