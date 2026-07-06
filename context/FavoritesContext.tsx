import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

type FavoritesContextType = {
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

const FAVORITES_STORAGE_KEY = "unique-spirits-favorites";

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const savedFavorites = await AsyncStorage.getItem(
          FAVORITES_STORAGE_KEY,
        );

        if (savedFavorites) {
          setFavoriteIds(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.log("Failed to load favorites", error);
      }
    }

    loadFavorites();
  }, []);

  useEffect(() => {
    async function saveFavorites() {
      try {
        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(favoriteIds),
        );
      } catch (error) {
        console.log("Failed to save favorites", error);
      }
    }

    saveFavorites();
  }, [favoriteIds]);

  function isFavorite(id: string) {
    return favoriteIds.includes(id);
  }

  function toggleFavorite(id: string) {
    setFavoriteIds((currentFavorites) => {
      if (currentFavorites.includes(id)) {
        return currentFavorites.filter((favoriteId) => favoriteId !== id);
      }

      return [...currentFavorites, id];
    });
  }

  const value = useMemo(
    () => ({
      favoriteIds,
      isFavorite,
      toggleFavorite,
    }),
    [favoriteIds],
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
