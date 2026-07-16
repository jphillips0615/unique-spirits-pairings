import type { Database } from "@/types/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import "react-native-url-polyfill/auto";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing EXPO_PUBLIC_SUPABASE_URL. Check your .env.local file.",
  );
}

if (!supabasePublishableKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Check your .env.local file.",
  );
}

const webStorage = {
  getItem(key: string) {
    if (typeof window === "undefined") {
      return null;
    }

    return window.localStorage.getItem(key);
  },

  setItem(key: string, value: string) {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(key, value);
  },

  removeItem(key: string) {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.removeItem(key);
  },
};

export const supabase = createClient<Database>(
  supabaseUrl,
  supabasePublishableKey,
  {
    auth: {
      storage: Platform.OS === "web" ? webStorage : AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: Platform.OS === "web",
    },
  },
);
