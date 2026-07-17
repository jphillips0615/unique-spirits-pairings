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

const LEGACY_STORAGE_KEY = "barInventory";
const GUEST_STORAGE_KEY = "barInventory:guest";

const BarInventoryContext = createContext<BarInventoryContextValue | undefined>(
  undefined,
);

function getUserStorageKey(userId: string) {
  return `barInventory:${userId}`;
}

function normalizeIngredient(ingredient: string) {
  return ingredient.trim().toLowerCase();
}

function cleanIngredientList(ingredients: string[]) {
  const uniqueIngredients = new Map<string, string>();

  ingredients.forEach((ingredient) => {
    if (typeof ingredient !== "string") {
      return;
    }

    const trimmedIngredient = ingredient.trim();

    if (!trimmedIngredient) {
      return;
    }

    const normalizedIngredient = normalizeIngredient(trimmedIngredient);

    if (!uniqueIngredients.has(normalizedIngredient)) {
      uniqueIngredients.set(normalizedIngredient, trimmedIngredient);
    }
  });

  return Array.from(uniqueIngredients.values()).sort(
    (firstIngredient, secondIngredient) =>
      firstIngredient.localeCompare(secondIngredient),
  );
}

async function readStoredInventory(
  storageKey: string,
): Promise<string[] | null> {
  const storedValue = await AsyncStorage.getItem(storageKey);

  if (!storedValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return null;
    }

    return cleanIngredientList(parsedValue);
  } catch (error) {
    console.error(`Unable to parse inventory stored at ${storageKey}:`, error);

    return null;
  }
}

export function BarInventoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthLoading } = useAuth();

  const [inventory, setInventory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const inventoryRef = useRef<string[]>([]);
  const loadRequestId = useRef(0);

  const updateInventoryState = useCallback((nextInventory: string[]) => {
    const cleanedInventory = cleanIngredientList(nextInventory);

    inventoryRef.current = cleanedInventory;
    setInventory(cleanedInventory);
  }, []);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    const currentRequestId = loadRequestId.current + 1;

    loadRequestId.current = currentRequestId;

    async function loadInventory() {
      setIsLoading(true);

      try {
        if (!user) {
          const guestInventory =
            (await readStoredInventory(GUEST_STORAGE_KEY)) ??
            (await readStoredInventory(LEGACY_STORAGE_KEY)) ??
            [];

          if (loadRequestId.current === currentRequestId) {
            updateInventoryState(guestInventory);
          }

          return;
        }

        const userStorageKey = getUserStorageKey(user.id);

        const storedUserInventory = await readStoredInventory(userStorageKey);

        const legacyInventory = await readStoredInventory(LEGACY_STORAGE_KEY);

        const localInventory = storedUserInventory ?? legacyInventory ?? [];

        const { data: cloudRows, error } = await supabase
          .from("bar_inventory")
          .select("ingredient_name, normalized_name")
          .eq("user_id", user.id);

        if (error) {
          console.error("Unable to load cloud bar inventory:", error.message);

          if (loadRequestId.current === currentRequestId) {
            updateInventoryState(localInventory);
          }

          return;
        }

        const cloudInventory = cleanIngredientList(
          cloudRows?.map((row) => row.ingredient_name) ?? [],
        );

        const mergedInventory = cleanIngredientList([
          ...cloudInventory,
          ...localInventory,
        ]);

        if (mergedInventory.length > 0) {
          const { error: mergeError } = await supabase
            .from("bar_inventory")
            .upsert(
              mergedInventory.map((ingredientName) => ({
                user_id: user.id,
                ingredient_name: ingredientName,
                normalized_name: normalizeIngredient(ingredientName),
              })),
              {
                onConflict: "user_id,normalized_name",
              },
            );

          if (mergeError) {
            console.error(
              "Unable to merge bar inventory with Supabase:",
              mergeError.message,
            );
          }
        }

        await AsyncStorage.setItem(
          userStorageKey,
          JSON.stringify(mergedInventory),
        );

        if (legacyInventory) {
          await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
        }

        if (loadRequestId.current === currentRequestId) {
          updateInventoryState(mergedInventory);
        }
      } catch (error) {
        console.error("Unable to load bar inventory:", error);

        if (loadRequestId.current === currentRequestId) {
          updateInventoryState([]);
        }
      } finally {
        if (loadRequestId.current === currentRequestId) {
          setIsLoading(false);
        }
      }
    }

    void loadInventory();
  }, [user, isAuthLoading, updateInventoryState]);

  const saveLocalInventory = useCallback(
    async (nextInventory: string[]) => {
      const cleanedInventory = cleanIngredientList(nextInventory);

      updateInventoryState(cleanedInventory);

      const storageKey = user ? getUserStorageKey(user.id) : GUEST_STORAGE_KEY;

      await AsyncStorage.setItem(storageKey, JSON.stringify(cleanedInventory));

      return cleanedInventory;
    },
    [user, updateInventoryState],
  );

  const hasIngredient = useCallback((ingredient: string) => {
    const normalizedIngredient = normalizeIngredient(ingredient);

    return inventoryRef.current.some(
      (savedIngredient) =>
        normalizeIngredient(savedIngredient) === normalizedIngredient,
    );
  }, []);

  const addIngredient = useCallback(
    async (ingredient: string) => {
      const trimmedIngredient = ingredient.trim();

      if (!trimmedIngredient || hasIngredient(trimmedIngredient)) {
        return;
      }

      const nextInventory = [...inventoryRef.current, trimmedIngredient];

      await saveLocalInventory(nextInventory);

      if (!user) {
        return;
      }

      const { error } = await supabase.from("bar_inventory").upsert(
        {
          user_id: user.id,
          ingredient_name: trimmedIngredient,
          normalized_name: normalizeIngredient(trimmedIngredient),
        },
        {
          onConflict: "user_id,normalized_name",
        },
      );

      if (error) {
        console.error(
          "Ingredient saved locally, but cloud sync failed:",
          error.message,
        );
      }
    },
    [user, hasIngredient, saveLocalInventory],
  );

  const removeIngredient = useCallback(
    async (ingredient: string) => {
      const normalizedIngredient = normalizeIngredient(ingredient);

      if (!normalizedIngredient) {
        return;
      }

      const nextInventory = inventoryRef.current.filter(
        (savedIngredient) =>
          normalizeIngredient(savedIngredient) !== normalizedIngredient,
      );

      await saveLocalInventory(nextInventory);

      if (!user) {
        return;
      }

      const { error } = await supabase
        .from("bar_inventory")
        .delete()
        .eq("user_id", user.id)
        .eq("normalized_name", normalizedIngredient);

      if (error) {
        console.error(
          "Ingredient removed locally, but cloud sync failed:",
          error.message,
        );
      }
    },
    [user, saveLocalInventory],
  );

  const toggleIngredient = useCallback(
    async (ingredient: string) => {
      const trimmedIngredient = ingredient.trim();

      if (!trimmedIngredient) {
        return;
      }

      if (hasIngredient(trimmedIngredient)) {
        await removeIngredient(trimmedIngredient);
        return;
      }

      await addIngredient(trimmedIngredient);
    },
    [hasIngredient, addIngredient, removeIngredient],
  );

  const replaceInventory = useCallback(
    async (ingredients: string[]) => {
      const cleanedInventory = await saveLocalInventory(ingredients);

      if (!user) {
        return;
      }

      const { error: deleteError } = await supabase
        .from("bar_inventory")
        .delete()
        .eq("user_id", user.id);

      if (deleteError) {
        console.error(
          "Inventory replaced locally, but old cloud inventory could not be cleared:",
          deleteError.message,
        );
        return;
      }

      if (cleanedInventory.length === 0) {
        return;
      }

      const { error: insertError } = await supabase
        .from("bar_inventory")
        .upsert(
          cleanedInventory.map((ingredientName) => ({
            user_id: user.id,
            ingredient_name: ingredientName,
            normalized_name: normalizeIngredient(ingredientName),
          })),
          {
            onConflict: "user_id,normalized_name",
          },
        );

      if (insertError) {
        console.error(
          "Inventory replaced locally, but cloud sync failed:",
          insertError.message,
        );
      }
    },
    [user, saveLocalInventory],
  );

  const clearInventory = useCallback(async () => {
    updateInventoryState([]);

    const storageKey = user ? getUserStorageKey(user.id) : GUEST_STORAGE_KEY;

    await AsyncStorage.removeItem(storageKey);

    if (!user) {
      await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
      return;
    }

    const { error } = await supabase
      .from("bar_inventory")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error(
        "Inventory cleared locally, but cloud sync failed:",
        error.message,
      );
    }
  }, [user, updateInventoryState]);

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
