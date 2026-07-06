import { Colors } from "@/constants/colors";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

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
      </Stack>

      <StatusBar style="light" />
    </FavoritesProvider>
  );
}
