export type BarIngredientCategory = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
};

export const BAR_INGREDIENT_CATEGORIES: BarIngredientCategory[] = [
  {
    id: "spirits",
    title: "Spirits",
    description: "The main bottles that form the base of a cocktail.",
    ingredients: [
      "Bourbon",
      "Rye Whiskey",
      "Irish Whiskey",
      "Blended Scotch Whisky",
      "Islay Scotch",
      "Gin",
      "Vodka",
      "White Rum",
      "Blanco Tequila",
      "Cognac",
    ],
  },
  {
    id: "liqueurs",
    title: "Liqueurs & Aperitifs",
    description:
      "Flavorful bottles used to add sweetness, bitterness, or depth.",
    ingredients: [
      "Campari",
      "Coffee Liqueur",
      "Orange Liqueur",
      "Maraschino Liqueur",
      "Crème de Violette",
      "Absinthe",
    ],
  },
  {
    id: "vermouth",
    title: "Vermouth",
    description: "Fortified wines used in many classic cocktails.",
    ingredients: ["Sweet Vermouth", "Dry Vermouth"],
  },
  {
    id: "bitters",
    title: "Bitters",
    description: "Highly concentrated flavoring used a few dashes at a time.",
    ingredients: ["Angostura Bitters", "Peychaud's Bitters"],
  },
  {
    id: "citrus",
    title: "Citrus & Juice",
    description: "Fresh citrus makes a major difference in cocktail balance.",
    ingredients: ["Lemon Juice", "Lime Juice"],
  },
  {
    id: "sweeteners",
    title: "Sweeteners",
    description: "Syrups and sugars used to balance stronger and sour flavors.",
    ingredients: [
      "Simple Syrup",
      "Honey Syrup",
      "Honey-Ginger Syrup",
      "Agave Syrup",
      "Sugar Cubes",
      "Brown Sugar",
    ],
  },
  {
    id: "mixers",
    title: "Mixers",
    description:
      "Carbonated and nonalcoholic ingredients used to finish drinks.",
    ingredients: ["Club Soda", "Champagne or Sparkling Wine", "Hot Coffee"],
  },
  {
    id: "dairy",
    title: "Dairy & Foam",
    description: "Ingredients that add creaminess, richness, or texture.",
    ingredients: ["Heavy Cream", "Whipped Cream", "Egg White"],
  },
  {
    id: "garnishes",
    title: "Garnishes & Fresh Ingredients",
    description:
      "Finishing ingredients that add aroma, flavor, or presentation.",
    ingredients: [
      "Fresh Mint",
      "Orange",
      "Lemon",
      "Lime",
      "Olives",
      "Cocktail Cherries",
      "Candied Ginger",
      "Salt",
    ],
  },
];

export const ALL_BAR_INGREDIENTS = BAR_INGREDIENT_CATEGORIES.flatMap(
  (category) => category.ingredients,
);
