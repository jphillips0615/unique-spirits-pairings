import { Cocktail } from "@/types/cocktail";

const oldFashionedImage = require("../assets/images/cocktails/old-fashioned.jpg");

export const cocktails: Cocktail[] = [
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    spirit: "Bourbon Whiskey",
    image: oldFashionedImage,
    description:
      "A timeless whiskey cocktail built around balance, depth, and slow-sipping warmth.",
    ingredients: [
      "2 oz bourbon whiskey",
      "1 sugar cube or 1/2 oz simple syrup",
      "2 dashes Angostura bitters",
      "Orange peel",
      "Large ice cube",
    ],
    instructions: [
      "Add sugar and bitters to a rocks glass.",
      "Muddle until the sugar begins to dissolve.",
      "Add bourbon and a large ice cube.",
      "Stir gently until chilled.",
      "Express an orange peel over the drink and garnish.",
    ],
    pairings: [
      "Ribeye steak",
      "Aged cheddar",
      "Smoked almonds",
      "Dark chocolate",
    ],
    difficulty: "Easy",
    glass: "Rocks Glass",
    garnish: "Orange Peel",
    flavorProfile: "Bold, smooth, slightly sweet, and aromatic",
    history:
      "The Old Fashioned is one of the original cocktail templates: spirit, sugar, bitters, and water. It became a symbol of classic American drinking because it lets the whiskey stay front and center.",
    tips: [
      "Use a large ice cube so the drink chills slowly without watering down too fast.",
      "Express the orange peel over the glass before dropping it in.",
      "Choose a bourbon or rye you would actually enjoy sipping neat.",
    ],
  },
];
