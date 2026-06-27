export interface Cocktail {
  id: string;
  name: string;
  spirit: string;
  origin: string;
  year: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  history: string;
  ingredients: string[];
  instructions: string[];
  glass: string;
  ice: string;
  garnish: string;
  pairings: string[];
  flavorProfile: string[];
  similarCocktails: string[];
  image: any;
}

export const cocktails: Cocktail[] = [
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    spirit: "Bourbon",
    origin: "United States",
    year: "Late 1800s",
    difficulty: "Easy",
    description:
      "A timeless whiskey cocktail highlighting the spirit with bitters and sugar.",
    history:
      "The Old Fashioned is one of the oldest and most respected whiskey cocktails. Built around spirit, sugar, bitters, and citrus oil, it became a symbol of simple, balanced cocktail making.",
    ingredients: [
      "2 oz bourbon or rye whiskey",
      "1 sugar cube or 1/4 oz simple syrup",
      "2-3 dashes Angostura bitters",
      "Orange peel",
    ],
    instructions: [
      "Add sugar and bitters to a rocks glass.",
      "Muddle or stir until combined.",
      "Add whiskey and a large ice cube.",
      "Stir gently until chilled.",
      "Express orange peel over the drink and garnish.",
    ],
    glass: "Rocks glass",
    ice: "Large cube",
    garnish: "Orange peel",
    pairings: ["Steak", "Charcuterie", "Dark chocolate", "Smoked almonds"],
    flavorProfile: ["Spirit-forward", "Bittersweet", "Citrus", "Warm"],
    similarCocktails: ["Manhattan", "Sazerac", "Boulevardier"],
    image: require("@/assets/images/cocktails/old-fashioned.jpg"),
  },
];
