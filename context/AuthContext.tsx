import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  isAuthLoading: boolean;
  isSignedIn: boolean;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

function getUserStorageKeys(userId: string) {
  return [
    `userPreferences:${userId}`,
    `unique-spirits-favorites:${userId}`,
    `barInventory:${userId}`,
  ];
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialSession() {
      try {
        const {
          data: { session: savedSession },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Unable to load Supabase session:", error.message);
        }

        if (isMounted) {
          setSession(savedSession);
        }
      } catch (error) {
        console.error("Unable to check authentication session:", error);
      } finally {
        if (isMounted) {
          setIsAuthLoading(false);
        }
      }
    }

    void loadInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, updatedSession) => {
      if (!isMounted) {
        return;
      }

      setSession(updatedSession);
      setIsAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }, []);

  const deleteAccount = useCallback(async () => {
    const {
      data: { session: currentSession },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      throw sessionError;
    }

    const currentUserId = currentSession?.user.id;

    if (!currentSession || !currentUserId) {
      throw new Error("You must be signed in to delete your account.");
    }

    const { data, error } = await supabase.functions.invoke("delete-account", {
      method: "POST",
    });

    if (error) {
      console.error("Delete-account function failed:", error);

      throw new Error("The account deletion request failed. Please try again.");
    }

    if (
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof data.error === "string"
    ) {
      throw new Error(data.error);
    }

    await AsyncStorage.multiRemove(getUserStorageKeys(currentUserId));

    /*
     * The server has already deleted the auth user.
     * This removes the now-invalid session from this device.
     */
    const { error: signOutError } = await supabase.auth.signOut({
      scope: "local",
    });

    if (signOutError) {
      console.warn(
        "Account was deleted, but the local session could not be cleared normally:",
        signOutError.message,
      );
    }

    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isAuthLoading,
      isSignedIn: session !== null,
      signOut,
      deleteAccount,
    }),
    [session, isAuthLoading, signOut, deleteAccount],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}
