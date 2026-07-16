import { useAuth } from "@/context/AuthContext";
import { removeProfileImage, uploadProfileImage } from "@/lib/profileImage";
import { supabase } from "@/lib/supabase";
import type { ProfileRow, ProfileUpdate } from "@/types/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const EXPERIENCE_LEVELS = [
  "New to Cocktails",
  "I Enjoy Cocktails",
  "Cocktail Enthusiast",
  "Bartender / Professional",
] as const;

export const FLAVOR_PREFERENCES = [
  "Sweet",
  "Citrusy",
  "Tart",
  "Bitter",
  "Herbal",
  "Smoky",
  "Spicy",
  "Refreshing",
  "Rich",
  "Dry",
] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];
export type FlavorPreference = (typeof FLAVOR_PREFERENCES)[number];

export type UserPreferences = {
  displayName: string;
  profileImageUri: string | null;
  experienceLevel: ExperienceLevel | null;
  favoriteSpirits: string[];
  favoriteFlavors: FlavorPreference[];
};

type PreferencesContextValue = {
  preferences: UserPreferences;
  isLoading: boolean;
  savePreferences: (next: UserPreferences) => Promise<void>;
  setFavoriteSpirits: (spirits: string[]) => Promise<void>;
  setFavoriteFlavors: (flavors: FlavorPreference[]) => Promise<void>;
  resetPreferences: () => Promise<void>;
};

const LEGACY_STORAGE_KEY = "userPreferences";
const GUEST_STORAGE_KEY = "userPreferences:guest";

const DEFAULT_PREFERENCES: UserPreferences = {
  displayName: "",
  profileImageUri: null,
  experienceLevel: null,
  favoriteSpirits: [],
  favoriteFlavors: [],
};

const PreferencesContext = createContext<PreferencesContextValue | undefined>(
  undefined,
);

function getUserStorageKey(userId: string) {
  return `userPreferences:${userId}`;
}

function isCloudImage(uri: string | null) {
  return Boolean(
    uri && (uri.startsWith("https://") || uri.startsWith("http://")),
  );
}

function isExperienceLevel(value: unknown): value is ExperienceLevel {
  return (
    typeof value === "string" &&
    EXPERIENCE_LEVELS.includes(value as ExperienceLevel)
  );
}

function isFlavorPreference(value: unknown): value is FlavorPreference {
  return (
    typeof value === "string" &&
    FLAVOR_PREFERENCES.includes(value as FlavorPreference)
  );
}

function sanitizePreferences(value: unknown): UserPreferences {
  if (!value || typeof value !== "object") {
    return DEFAULT_PREFERENCES;
  }

  const saved = value as Partial<UserPreferences>;

  return {
    displayName: typeof saved.displayName === "string" ? saved.displayName : "",

    profileImageUri:
      typeof saved.profileImageUri === "string" ? saved.profileImageUri : null,

    experienceLevel: isExperienceLevel(saved.experienceLevel)
      ? saved.experienceLevel
      : null,

    favoriteSpirits: Array.isArray(saved.favoriteSpirits)
      ? saved.favoriteSpirits.filter(
          (spirit): spirit is string => typeof spirit === "string",
        )
      : [],

    favoriteFlavors: Array.isArray(saved.favoriteFlavors)
      ? saved.favoriteFlavors.filter(isFlavorPreference)
      : [],
  };
}

function profileToPreferences(profile: ProfileRow): UserPreferences {
  return {
    displayName: profile.display_name,
    profileImageUri: profile.profile_image_url,
    experienceLevel: isExperienceLevel(profile.experience_level)
      ? profile.experience_level
      : null,
    favoriteSpirits: profile.favorite_spirits,
    favoriteFlavors: profile.favorite_flavors.filter(isFlavorPreference),
  };
}

function mergePreferences(
  local: UserPreferences,
  cloud: UserPreferences,
): UserPreferences {
  return {
    displayName: cloud.displayName.trim()
      ? cloud.displayName
      : local.displayName,

    profileImageUri: cloud.profileImageUri ?? local.profileImageUri,

    experienceLevel: cloud.experienceLevel ?? local.experienceLevel,

    favoriteSpirits: Array.from(
      new Set([...cloud.favoriteSpirits, ...local.favoriteSpirits]),
    ),

    favoriteFlavors: Array.from(
      new Set([...cloud.favoriteFlavors, ...local.favoriteFlavors]),
    ).filter(isFlavorPreference),
  };
}

function preferencesToProfileUpdate(
  preferences: UserPreferences,
): ProfileUpdate {
  return {
    display_name: preferences.displayName.trim(),
    profile_image_url: preferences.profileImageUri,
    experience_level: preferences.experienceLevel,
    favorite_spirits: preferences.favoriteSpirits,
    favorite_flavors: preferences.favoriteFlavors,
  };
}

async function readStoredPreferences(
  storageKey: string,
): Promise<UserPreferences | null> {
  const storedValue = await AsyncStorage.getItem(storageKey);

  if (!storedValue) {
    return null;
  }

  try {
    return sanitizePreferences(JSON.parse(storedValue));
  } catch (error) {
    console.error(
      `Unable to parse preferences stored at ${storageKey}:`,
      error,
    );

    return null;
  }
}

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthLoading } = useAuth();

  const [preferences, setPreferences] =
    useState<UserPreferences>(DEFAULT_PREFERENCES);

  const [isLoading, setIsLoading] = useState(true);

  const loadRequestId = useRef(0);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    const currentRequestId = loadRequestId.current + 1;
    loadRequestId.current = currentRequestId;

    async function loadPreferences() {
      setIsLoading(true);

      try {
        if (!user) {
          const guestPreferences =
            (await readStoredPreferences(GUEST_STORAGE_KEY)) ??
            (await readStoredPreferences(LEGACY_STORAGE_KEY)) ??
            DEFAULT_PREFERENCES;

          if (loadRequestId.current === currentRequestId) {
            setPreferences(guestPreferences);
          }

          return;
        }

        const userStorageKey = getUserStorageKey(user.id);

        const userPreferences = await readStoredPreferences(userStorageKey);

        const legacyPreferences =
          await readStoredPreferences(LEGACY_STORAGE_KEY);

        const localPreferences =
          userPreferences ?? legacyPreferences ?? DEFAULT_PREFERENCES;

        const { data: cloudProfile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Unable to load cloud preferences:", error.message);

          if (loadRequestId.current === currentRequestId) {
            setPreferences(localPreferences);
          }

          return;
        }

        const cloudPreferences = cloudProfile
          ? profileToPreferences(cloudProfile)
          : DEFAULT_PREFERENCES;

        let mergedPreferences = mergePreferences(
          localPreferences,
          cloudPreferences,
        );

        if (
          mergedPreferences.profileImageUri &&
          !isCloudImage(mergedPreferences.profileImageUri)
        ) {
          try {
            const uploadedImageUrl = await uploadProfileImage({
              userId: user.id,
              imageUri: mergedPreferences.profileImageUri,
              previousImageUrl: null,
            });

            mergedPreferences = {
              ...mergedPreferences,
              profileImageUri: uploadedImageUrl,
            };
          } catch (error) {
            console.error("Unable to migrate local profile image:", error);

            mergedPreferences = {
              ...mergedPreferences,
              profileImageUri:
                cloudPreferences.profileImageUri ??
                localPreferences.profileImageUri,
            };
          }
        }

        const { error: saveError } = await supabase.from("profiles").upsert(
          {
            user_id: user.id,
            ...preferencesToProfileUpdate(mergedPreferences),
          },
          {
            onConflict: "user_id",
          },
        );

        if (saveError) {
          console.error(
            "Unable to merge preferences with Supabase:",
            saveError.message,
          );
        }

        await AsyncStorage.setItem(
          userStorageKey,
          JSON.stringify(mergedPreferences),
        );

        if (legacyPreferences) {
          await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
        }

        if (loadRequestId.current === currentRequestId) {
          setPreferences(mergedPreferences);
        }
      } catch (error) {
        console.error("Unable to load user preferences:", error);

        if (loadRequestId.current === currentRequestId) {
          setPreferences(DEFAULT_PREFERENCES);
        }
      } finally {
        if (loadRequestId.current === currentRequestId) {
          setIsLoading(false);
        }
      }
    }

    loadPreferences();
  }, [user, isAuthLoading]);

  const savePreferences = useCallback(
    async (next: UserPreferences) => {
      const sanitizedPreferences = sanitizePreferences(next);

      if (!user) {
        setPreferences(sanitizedPreferences);

        await AsyncStorage.setItem(
          GUEST_STORAGE_KEY,
          JSON.stringify(sanitizedPreferences),
        );

        return;
      }

      const previousImageUrl = preferences.profileImageUri;
      let finalImageUrl = sanitizedPreferences.profileImageUri;
      let newlyUploadedImageUrl: string | null = null;

      if (finalImageUrl && !isCloudImage(finalImageUrl)) {
        newlyUploadedImageUrl = await uploadProfileImage({
          userId: user.id,
          imageUri: finalImageUrl,
          previousImageUrl: null,
        });

        finalImageUrl = newlyUploadedImageUrl;
      }

      const savedPreferences: UserPreferences = {
        ...sanitizedPreferences,
        profileImageUri: finalImageUrl,
      };

      const { error } = await supabase.from("profiles").upsert(
        {
          user_id: user.id,
          ...preferencesToProfileUpdate(savedPreferences),
        },
        {
          onConflict: "user_id",
        },
      );

      if (error) {
        if (newlyUploadedImageUrl) {
          try {
            await removeProfileImage(newlyUploadedImageUrl);
          } catch (cleanupError) {
            console.warn(
              "Unable to remove an unused uploaded image:",
              cleanupError,
            );
          }
        }

        throw new Error(error.message);
      }

      if (
        previousImageUrl &&
        isCloudImage(previousImageUrl) &&
        previousImageUrl !== finalImageUrl
      ) {
        try {
          await removeProfileImage(previousImageUrl);
        } catch (removeError) {
          console.warn(
            "Profile saved, but the previous image could not be removed:",
            removeError,
          );
        }
      }

      setPreferences(savedPreferences);

      await AsyncStorage.setItem(
        getUserStorageKey(user.id),
        JSON.stringify(savedPreferences),
      );
    },
    [preferences.profileImageUri, user],
  );

  const setFavoriteSpirits = useCallback(
    async (favoriteSpirits: string[]) => {
      await savePreferences({
        ...preferences,
        favoriteSpirits,
      });
    },
    [preferences, savePreferences],
  );

  const setFavoriteFlavors = useCallback(
    async (favoriteFlavors: FlavorPreference[]) => {
      await savePreferences({
        ...preferences,
        favoriteFlavors,
      });
    },
    [preferences, savePreferences],
  );

  const resetPreferences = useCallback(async () => {
    const previousImageUrl = preferences.profileImageUri;

    setPreferences(DEFAULT_PREFERENCES);

    if (!user) {
      await AsyncStorage.removeItem(GUEST_STORAGE_KEY);
      await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
      return;
    }

    await AsyncStorage.removeItem(getUserStorageKey(user.id));

    const { error } = await supabase
      .from("profiles")
      .update(preferencesToProfileUpdate(DEFAULT_PREFERENCES))
      .eq("user_id", user.id);

    if (error) {
      throw new Error(error.message);
    }

    if (previousImageUrl && isCloudImage(previousImageUrl)) {
      try {
        await removeProfileImage(previousImageUrl);
      } catch (removeError) {
        console.warn(
          "Preferences reset, but the old profile image could not be removed:",
          removeError,
        );
      }
    }
  }, [preferences.profileImageUri, user]);

  const value = useMemo(
    () => ({
      preferences,
      isLoading,
      savePreferences,
      setFavoriteSpirits,
      setFavoriteFlavors,
      resetPreferences,
    }),
    [
      preferences,
      isLoading,
      savePreferences,
      setFavoriteSpirits,
      setFavoriteFlavors,
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
