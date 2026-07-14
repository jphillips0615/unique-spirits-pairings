import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const RECOMMENDATION_HISTORY_STORAGE_KEY =
  "unique-spirits-recommendation-history";

const DEFAULT_HISTORY_LIMIT = 5;

export function useRecommendationHistory(historyLimit = DEFAULT_HISTORY_LIMIT) {
  const [recentCocktailIds, setRecentCocktailIds] = useState<string[]>([]);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);

  useEffect(() => {
    async function loadRecommendationHistory() {
      try {
        const savedHistory = await AsyncStorage.getItem(
          RECOMMENDATION_HISTORY_STORAGE_KEY,
        );

        if (!savedHistory) {
          return;
        }

        const parsedHistory: unknown = JSON.parse(savedHistory);

        if (
          Array.isArray(parsedHistory) &&
          parsedHistory.every((id) => typeof id === "string")
        ) {
          setRecentCocktailIds(parsedHistory.slice(0, historyLimit));
        }
      } catch (error) {
        console.log("Failed to load recommendation history", error);
      } finally {
        setIsHistoryLoaded(true);
      }
    }

    loadRecommendationHistory();
  }, [historyLimit]);

  const rememberRecommendation = useCallback(
    async (cocktailId: string) => {
      setRecentCocktailIds((currentIds) => {
        const updatedIds = [
          cocktailId,
          ...currentIds.filter((id) => id !== cocktailId),
        ].slice(0, historyLimit);

        AsyncStorage.setItem(
          RECOMMENDATION_HISTORY_STORAGE_KEY,
          JSON.stringify(updatedIds),
        ).catch((error) => {
          console.log("Failed to save recommendation history", error);
        });

        return updatedIds;
      });
    },
    [historyLimit],
  );

  const clearRecommendationHistory = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(RECOMMENDATION_HISTORY_STORAGE_KEY);
      setRecentCocktailIds([]);
    } catch (error) {
      console.log("Failed to clear recommendation history", error);
    }
  }, []);

  return {
    recentCocktailIds,
    isHistoryLoaded,
    rememberRecommendation,
    clearRecommendationHistory,
  };
}
