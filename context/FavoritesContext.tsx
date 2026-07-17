import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
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

type FavoritesContextType = {
  favoriteIds: string[];
  isLoading: boolean;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

const LEGACY_STORAGE_KEY = "unique-spirits-favorites";
const GUEST_STORAGE_KEY = "unique-spirits-favorites:guest";

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

function getUserStorageKey(userId: string) {
  return `unique-spirits-favorites:${userId}`;
}

function sanitizeFavoriteIds(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(
      value.filter(
        (favoriteId): favoriteId is string =>
          typeof favoriteId === "string" && favoriteId.trim().length > 0,
      ),
    ),
  );
}

async function readStoredFavorites(
  storageKey: string,
): Promise<string[] | null> {
  const storedValue = await AsyncStorage.getItem(storageKey);

  if (!storedValue) {
    return null;
  }

  try {
    return sanitizeFavoriteIds(JSON.parse(storedValue));
  } catch (error) {
    console.error(`Unable to parse favorites stored at ${storageKey}:`, error);

    return null;
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthLoading } = useAuth();

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const favoriteIdsRef = useRef<string[]>([]);
  const loadRequestId = useRef(0);

  const updateFavoriteState = useCallback((nextFavorites: string[]) => {
    const sanitizedFavorites = sanitizeFavoriteIds(nextFavorites);

    favoriteIdsRef.current = sanitizedFavorites;
    setFavoriteIds(sanitizedFavorites);
  }, []);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    const currentRequestId = loadRequestId.current + 1;
    loadRequestId.current = currentRequestId;

    async function loadFavorites() {
      setIsLoading(true);

      try {
        if (!user) {
          const guestFavorites =
            (await readStoredFavorites(GUEST_STORAGE_KEY)) ??
            (await readStoredFavorites(LEGACY_STORAGE_KEY)) ??
            [];

          if (loadRequestId.current === currentRequestId) {
            updateFavoriteState(guestFavorites);
          }

          return;
        }

        const userStorageKey = getUserStorageKey(user.id);

        const storedUserFavorites = await readStoredFavorites(userStorageKey);

        const legacyFavorites = await readStoredFavorites(LEGACY_STORAGE_KEY);

        const localFavorites = storedUserFavorites ?? legacyFavorites ?? [];

        const { data: cloudFavorites, error } = await supabase
          .from("favorite_cocktails")
          .select("cocktail_id")
          .eq("user_id", user.id);

        if (error) {
          console.error("Unable to load cloud favorites:", error.message);

          if (loadRequestId.current === currentRequestId) {
            updateFavoriteState(localFavorites);
          }

          return;
        }

        const cloudFavoriteIds = sanitizeFavoriteIds(
          cloudFavorites?.map((favorite) => favorite.cocktail_id),
        );

        const mergedFavorites = sanitizeFavoriteIds([
          ...cloudFavoriteIds,
          ...localFavorites,
        ]);

        if (mergedFavorites.length > 0) {
          const { error: mergeError } = await supabase
            .from("favorite_cocktails")
            .upsert(
              mergedFavorites.map((cocktailId) => ({
                user_id: user.id,
                cocktail_id: cocktailId,
              })),
              {
                onConflict: "user_id,cocktail_id",
                ignoreDuplicates: true,
              },
            );

          if (mergeError) {
            console.error(
              "Unable to merge favorites with Supabase:",
              mergeError.message,
            );
          }
        }

        await AsyncStorage.setItem(
          userStorageKey,
          JSON.stringify(mergedFavorites),
        );

        if (legacyFavorites) {
          await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
        }

        if (loadRequestId.current === currentRequestId) {
          updateFavoriteState(mergedFavorites);
        }
      } catch (error) {
        console.error("Unable to load favorites:", error);

        if (loadRequestId.current === currentRequestId) {
          updateFavoriteState([]);
        }
      } finally {
        if (loadRequestId.current === currentRequestId) {
          setIsLoading(false);
        }
      }
    }

    void loadFavorites();
  }, [user, isAuthLoading, updateFavoriteState]);

  const isFavorite = useCallback((id: string) => {
    return favoriteIdsRef.current.includes(id);
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      const cocktailId = id.trim();

      if (!cocktailId) {
        return;
      }

      const previousFavorites = favoriteIdsRef.current;
      const wasFavorite = previousFavorites.includes(cocktailId);

      const nextFavorites = wasFavorite
        ? previousFavorites.filter((favoriteId) => favoriteId !== cocktailId)
        : [...previousFavorites, cocktailId];

      // Update immediately so the heart fills without waiting
      // for AsyncStorage or Supabase.
      updateFavoriteState(nextFavorites);

      const storageKey = user ? getUserStorageKey(user.id) : GUEST_STORAGE_KEY;

      void (async () => {
        try {
          await AsyncStorage.setItem(storageKey, JSON.stringify(nextFavorites));

          if (!user) {
            return;
          }

          if (wasFavorite) {
            const { error } = await supabase
              .from("favorite_cocktails")
              .delete()
              .eq("user_id", user.id)
              .eq("cocktail_id", cocktailId);

            if (error) {
              throw error;
            }

            return;
          }

          const { error } = await supabase.from("favorite_cocktails").upsert(
            {
              user_id: user.id,
              cocktail_id: cocktailId,
            },
            {
              onConflict: "user_id,cocktail_id",
              ignoreDuplicates: true,
            },
          );

          if (error) {
            throw error;
          }
        } catch (error) {
          // Keep the local favorite selected even when cloud
          // synchronization temporarily fails.
          console.error(
            "Favorite saved locally, but cloud sync failed:",
            error,
          );
        }
      })();
    },
    [user, updateFavoriteState],
  );

  const value = useMemo(
    () => ({
      favoriteIds,
      isLoading,
      isFavorite,
      toggleFavorite,
    }),
    [favoriteIds, isLoading, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}
