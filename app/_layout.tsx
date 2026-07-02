import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Onboarding Stack */}
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />

        {/* Main App */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Cocktail Details */}
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
          }}
        />

        {/* Modal */}
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Modal",
          }}
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
