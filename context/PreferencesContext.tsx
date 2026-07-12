import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const EXPERIENCE_LEVELS = [
  "New to Cocktails",
  "I Enjoy Cocktails",
  "Cocktail Enthusiast",
  "Bartender / Professional",
] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export type UserPreferences = {
  displayName: string;
  profileImageUri: string | null;
  experienceLevel: ExperienceLevel | null;
  favoriteSpirits: string[];
};

type PreferencesContextValue = {
  preferences: UserPreferences;
  isLoading: boolean;
  savePreferences: (next: UserPreferences) => Promise<void>;
  setFavoriteSpirits: (spirits: string[]) => Promise<void>;
  resetPreferences: () => Promise<void>;
};

const STORAGE_KEY = "userPreferences";

const DEFAULT_PREFERENCES: UserPreferences = {
  displayName: "",
  profileImageUri: null,
  experienceLevel: null,
  favoriteSpirits: [],
};

const PreferencesContext = createContext<PreferencesContextValue | undefined>(
  undefined,
);

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preferences, setPreferences] =
    useState<UserPreferences>(DEFAULT_PREFERENCES);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPreferences() {
      try {
        const savedPreferences = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedPreferences) {
          const parsedPreferences = JSON.parse(savedPreferences);

          setPreferences({
            ...DEFAULT_PREFERENCES,
            ...parsedPreferences,
          });
        }
      } catch (error) {
        console.error("Unable to load user preferences:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPreferences();
  }, []);

  const savePreferences = useCallback(async (next: UserPreferences) => {
    setPreferences(next);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const setFavoriteSpirits = useCallback(
    async (favoriteSpirits: string[]) => {
      await savePreferences({
        ...preferences,
        favoriteSpirits,
      });
    },
    [preferences, savePreferences],
  );

  const resetPreferences = useCallback(async () => {
    setPreferences(DEFAULT_PREFERENCES);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      isLoading,
      savePreferences,
      setFavoriteSpirits,
      resetPreferences,
    }),
    [
      preferences,
      isLoading,
      savePreferences,
      setFavoriteSpirits,
      resetPreferences,
    ],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }

  return context;
}
