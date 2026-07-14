export type IngredientGlossaryCategory =
  | "Spirit"
  | "Liqueur"
  | "Aperitif"
  | "Fortified Wine"
  | "Bitters"
  | "Syrup"
  | "Juice"
  | "Mixer"
  | "Garnish"
  | "Other";

export type IngredientGlossaryEntry = {
  id: string;
  name: string;
  category: IngredientGlossaryCategory;
  pronunciation?: string;
  description: string;
  flavorProfile: string[];
  commonUses: string[];
  substitutes: string[];
  containsAlcohol: boolean;
  whereToFind: string;
  notes?: string;
};
