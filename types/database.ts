export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          user_id: string;
          display_name: string;
          profile_image_url: string | null;
          experience_level: string | null;
          favorite_spirits: string[];
          favorite_flavors: string[];
          legal_drinking_age_confirmed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          display_name?: string;
          profile_image_url?: string | null;
          experience_level?: string | null;
          favorite_spirits?: string[];
          favorite_flavors?: string[];
          legal_drinking_age_confirmed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          display_name?: string;
          profile_image_url?: string | null;
          experience_level?: string | null;
          favorite_spirits?: string[];
          favorite_flavors?: string[];
          legal_drinking_age_confirmed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      favorite_cocktails: {
        Row: {
          user_id: string;
          cocktail_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          cocktail_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          cocktail_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };

      bar_inventory: {
        Row: {
          id: number;
          user_id: string;
          ingredient_name: string;
          normalized_name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          ingredient_name: string;
          normalized_name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          ingredient_name?: string;
          normalized_name?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      [_ in never]: never;
    };

    Enums: {
      [_ in never]: never;
    };

    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];

export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type FavoriteCocktailRow =
  Database["public"]["Tables"]["favorite_cocktails"]["Row"];

export type BarInventoryRow =
  Database["public"]["Tables"]["bar_inventory"]["Row"];
