import { Colors } from "@/constants/colors";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { PreferencesProvider } from "@/context/PreferencesContext";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <PreferencesProvider>
      <FavoritesProvider>
        <Stack>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="auth/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="cocktail/[id]"
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.background,
              },
              headerTintColor: Colors.gold,
              headerTitleStyle: {
                fontWeight: "900",
              },
              headerShadowVisible: false,
              gestureEnabled: true,
              headerLeft: () => (
                <Pressable
                  onPress={() => {
                    if (router.canGoBack()) {
                      router.back();
                    } else {
                      router.replace("/(tabs)");
                    }
                  }}
                  style={{
                    paddingRight: 18,
                    paddingVertical: 8,
                  }}
                >
                  <Ionicons name="chevron-back" size={28} color={Colors.gold} />
                </Pressable>
              ),
            }}
          />
        </Stack>

        <StatusBar style="light" />
      </FavoritesProvider>
    </PreferencesProvider>
  );
}
