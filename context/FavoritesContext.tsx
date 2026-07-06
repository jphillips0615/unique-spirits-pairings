import React, { createContext, useContext, useMemo, useState } from "react";

type FavoritesContextType = {
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

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
