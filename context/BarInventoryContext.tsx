import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

type BarInventoryContextValue = {
  inventory: string[];
  isLoading: boolean;
  hasIngredient: (ingredient: string) => boolean;
  toggleIngredient: (ingredient: string) => Promise<void>;
  addIngredient: (ingredient: string) => Promise<void>;
  removeIngredient: (ingredient: string) => Promise<void>;
  replaceInventory: (ingredients: string[]) => Promise<void>;
  clearInventory: () => Promise<void>;
};

const STORAGE_KEY = "barInventory";

const BarInventoryContext = createContext<BarInventoryContextValue | undefined>(
  undefined,
);

function normalizeIngredient(ingredient: string) {
  return ingredient.trim().toLowerCase();
}

function cleanIngredientList(ingredients: string[]) {
  const uniqueIngredients = new Map<string, string>();

  ingredients.forEach((ingredient) => {
    const trimmedIngredient = ingredient.trim();

    if (!trimmedIngredient) {
      return;
    }

    const normalizedIngredient = normalizeIngredient(trimmedIngredient);

    if (!uniqueIngredients.has(normalizedIngredient)) {
      uniqueIngredients.set(normalizedIngredient, trimmedIngredient);
    }
  });

  return Array.from(uniqueIngredients.values()).sort((a, b) =>
    a.localeCompare(b),
  );
}

export function BarInventoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inventory, setInventory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInventory() {
      try {
        const savedInventory = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedInventory) {
          const parsedInventory = JSON.parse(savedInventory);

          if (Array.isArray(parsedInventory)) {
            setInventory(cleanIngredientList(parsedInventory));
          }
        }
      } catch (error) {
        console.error("Unable to load bar inventory:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadInventory();
  }, []);

  const saveInventory = useCallback(async (ingredients: string[]) => {
    const cleanedInventory = cleanIngredientList(ingredients);

    setInventory(cleanedInventory);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedInventory));
  }, []);

  const hasIngredient = useCallback(
    (ingredient: string) => {
      const normalizedIngredient = normalizeIngredient(ingredient);

      return inventory.some(
        (item) => normalizeIngredient(item) === normalizedIngredient,
      );
    },
    [inventory],
  );

  const toggleIngredient = useCallback(
    async (ingredient: string) => {
      const trimmedIngredient = ingredient.trim();

      if (!trimmedIngredient) {
        return;
      }

      const alreadySaved = hasIngredient(trimmedIngredient);

      if (alreadySaved) {
        await saveInventory(
          inventory.filter(
            (item) =>
              normalizeIngredient(item) !==
              normalizeIngredient(trimmedIngredient),
          ),
        );

        return;
      }

      await saveInventory([...inventory, trimmedIngredient]);
    },
    [hasIngredient, inventory, saveInventory],
  );

  const addIngredient = useCallback(
    async (ingredient: string) => {
      const trimmedIngredient = ingredient.trim();

      if (!trimmedIngredient || hasIngredient(trimmedIngredient)) {
        return;
      }

      await saveInventory([...inventory, trimmedIngredient]);
    },
    [hasIngredient, inventory, saveInventory],
  );

  const removeIngredient = useCallback(
    async (ingredient: string) => {
      await saveInventory(
        inventory.filter(
          (item) =>
            normalizeIngredient(item) !== normalizeIngredient(ingredient),
        ),
      );
    },
    [inventory, saveInventory],
  );

  const replaceInventory = useCallback(
    async (ingredients: string[]) => {
      await saveInventory(ingredients);
    },
    [saveInventory],
  );

  const clearInventory = useCallback(async () => {
    setInventory([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      inventory,
      isLoading,
      hasIngredient,
      toggleIngredient,
      addIngredient,
      removeIngredient,
      replaceInventory,
      clearInventory,
    }),
    [
      inventory,
      isLoading,
      hasIngredient,
      toggleIngredient,
      addIngredient,
      removeIngredient,
      replaceInventory,
      clearInventory,
    ],
  );

  return (
    <BarInventoryContext.Provider value={value}>
      {children}
    </BarInventoryContext.Provider>
  );
}

export function useBarInventory() {
  const context = useContext(BarInventoryContext);

  if (!context) {
    throw new Error("useBarInventory must be used inside BarInventoryProvider");
  }

  return context;
}
