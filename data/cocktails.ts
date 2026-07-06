import { Cocktail } from "@/types/cocktail";

const oldFashionedImage = require("../assets/images/cocktails/old-fashioned.jpg");
const manhattanImage = require("../assets/images/cocktails/manhattan.jpg");

export const cocktails: Cocktail[] = [
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    spirit: "Bourbon",
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
    ice: "Large Cube",
    flavorProfile: ["Bold", "Smooth", "Slightly Sweet", "Aromatic"],
    story:
      "The Old Fashioned is one of the original cocktail templates: spirit, sugar, bitters, and water. It became a symbol of classic American drinking because it lets the whiskey stay front and center.",

    tips: [
      "Use a large ice cube so the drink chills slowly without watering down too fast.",
      "Express the orange peel over the glass before dropping it in.",
      "Choose a bourbon or rye you would actually enjoy sipping neat.",
    ],
  },
  {
    id: "manhattan",
    name: "Manhattan",
    spirit: "Rye",
    image: manhattanImage,
    description:
      "A refined whiskey cocktail made with rye, sweet vermouth, and bitters.",
    ingredients: [
      "2 oz rye whiskey",
      "1 oz sweet vermouth",
      "2 dashes Angostura bitters",
      "Brandied cherry",
    ],
    instructions: [
      "Add rye, sweet vermouth, and bitters to a mixing glass with ice.",
      "Stir until well chilled.",
      "Strain into a chilled coupe glass.",
      "Garnish with a brandied cherry.",
    ],
    pairings: [
      "Prime rib",
      "Blue cheese",
      "Roasted mushrooms",
      "Dark chocolate",
    ],
    difficulty: "Easy",
    glass: "Coupe Glass",
    garnish: "Brandied Cherry",
    ice: "Served Up",
    flavorProfile: ["Rich", "Smooth", "Lightly Sweet", "Herbal", "Warming"],
    story:
      "The Manhattan became one of the defining whiskey cocktails of the late 1800s and remains a classic because of its simple but elegant balance of whiskey, vermouth, and bitters.",
    tips: [
      "Use fresh sweet vermouth and refrigerate it after opening.",
      "Stir instead of shaking to keep the drink silky and clear.",
      "Use rye for a spicier drink or bourbon for a softer, sweeter version.",
    ],
  },
];
