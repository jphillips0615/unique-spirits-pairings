import { Cocktail } from "@/types/cocktail";

export type CocktailBarMatch = {
  cocktail: Cocktail;
  requiredIngredients: string[];
  matchedIngredients: string[];
  missingIngredients: string[];
  matchPercentage: number;
  canMake: boolean;
  missingCount: number;
};

const INGREDIENT_ALIASES: Array<{
  name: string;
  matches: string[];
}> = [
  {
    name: "Bourbon",
    matches: ["bourbon whiskey", "bourbon"],
  },
  {
    name: "Rye Whiskey",
    matches: ["rye whiskey", "rye"],
  },
  {
    name: "Irish Whiskey",
    matches: ["irish whiskey"],
  },
  {
    name: "Blended Scotch Whisky",
    matches: ["blended scotch whisky", "blended scotch", "scotch whisky"],
  },
  {
    name: "Islay Scotch",
    matches: ["islay scotch", "peated scotch"],
  },
  {
    name: "Gin",
    matches: ["gin"],
  },
  {
    name: "Vodka",
    matches: ["vodka"],
  },
  {
    name: "White Rum",
    matches: ["white rum", "light rum"],
  },
  {
    name: "Blanco Tequila",
    matches: ["blanco tequila", "silver tequila", "tequila"],
  },
  {
    name: "Cognac",
    matches: ["cognac", "brandy"],
  },
  {
    name: "Campari",
    matches: ["campari"],
  },
  {
    name: "Coffee Liqueur",
    matches: ["coffee liqueur"],
  },
  {
    name: "Orange Liqueur",
    matches: ["orange liqueur", "triple sec", "cointreau", "grand marnier"],
  },
  {
    name: "Maraschino Liqueur",
    matches: ["maraschino liqueur"],
  },
  {
    name: "Crème de Violette",
    matches: ["crème de violette", "creme de violette"],
  },
  {
    name: "Absinthe",
    matches: ["absinthe rinse", "absinthe"],
  },
  {
    name: "Sweet Vermouth",
    matches: ["sweet vermouth"],
  },
  {
    name: "Dry Vermouth",
    matches: ["dry vermouth"],
  },
  {
    name: "Angostura Bitters",
    matches: ["angostura bitters", "aromatic bitters"],
  },
  {
    name: "Peychaud's Bitters",
    matches: ["peychaud's bitters", "peychauds bitters"],
  },
  {
    name: "Lemon Juice",
    matches: ["fresh lemon juice", "lemon juice"],
  },
  {
    name: "Lime Juice",
    matches: ["fresh lime juice", "lime juice"],
  },
  {
    name: "Simple Syrup",
    matches: ["simple syrup"],
  },
  {
    name: "Honey-Ginger Syrup",
    matches: ["honey-ginger syrup", "honey ginger syrup"],
  },
  {
    name: "Honey Syrup",
    matches: ["honey syrup"],
  },
  {
    name: "Agave Syrup",
    matches: ["agave syrup", "agave nectar"],
  },
  {
    name: "Sugar Cubes",
    matches: ["sugar cube", "sugar cubes"],
  },
  {
    name: "Brown Sugar",
    matches: ["brown sugar"],
  },
  {
    name: "Club Soda",
    matches: ["club soda", "soda water"],
  },
  {
    name: "Champagne or Sparkling Wine",
    matches: ["champagne", "sparkling wine", "prosecco"],
  },
  {
    name: "Hot Coffee",
    matches: ["hot coffee", "coffee"],
  },
  {
    name: "Heavy Cream",
    matches: ["heavy cream", "cream"],
  },
  {
    name: "Whipped Cream",
    matches: ["whipped cream"],
  },
  {
    name: "Egg White",
    matches: ["egg white"],
  },
  {
    name: "Fresh Mint",
    matches: ["fresh mint leaves", "fresh mint", "mint leaves"],
  },
  {
    name: "Orange",
    matches: ["orange peel", "orange twist", "orange slice", "orange wheel"],
  },
  {
    name: "Lemon",
    matches: ["lemon peel", "lemon twist", "lemon slice", "lemon wheel"],
  },
  {
    name: "Lime",
    matches: ["lime peel", "lime twist", "lime slice", "lime wheel"],
  },
  {
    name: "Olives",
    matches: ["olive", "olives"],
  },
  {
    name: "Cocktail Cherries",
    matches: [
      "brandied cherry",
      "cocktail cherry",
      "maraschino cherry",
      "cherry",
    ],
  },
  {
    name: "Candied Ginger",
    matches: ["candied ginger"],
  },
  {
    name: "Salt",
    matches: ["salt rim", "salt"],
  },
];

const OPTIONAL_PHRASES = ["optional", "if desired"];

const NON_INVENTORY_PHRASES = [
  "ice cube",
  "large ice",
  "cubed ice",
  "crushed ice",
  "fresh ice",
  "ice",
];

function normalizeText(value: string) {
  return value.trim().toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, " ");
}

function isOptionalIngredient(ingredientLine: string) {
  const normalizedLine = normalizeText(ingredientLine);

  return OPTIONAL_PHRASES.some((phrase) => normalizedLine.includes(phrase));
}

function isNonInventoryIngredient(ingredientLine: string) {
  const normalizedLine = normalizeText(ingredientLine);

  return NON_INVENTORY_PHRASES.some(
    (phrase) =>
      normalizedLine === phrase || normalizedLine.endsWith(` ${phrase}`),
  );
}

function removeMeasurement(ingredientLine: string) {
  return ingredientLine
    .replace(
      /^\s*\d+(?:\s+\d+\/\d+|\/\d+|\.\d+)?\s*(?:oz|ounce|ounces|dash|dashes|barspoon|barspoons|tsp|teaspoon|teaspoons|tbsp|tablespoon|tablespoons|cup|cups|ml)?\s*/i,
      "",
    )
    .replace(/^\s*(?:a|an|one|two|three)\s+/i, "")
    .trim();
}

export function getCanonicalIngredientName(ingredientLine: string) {
  const normalizedLine = normalizeText(ingredientLine);

  for (const alias of INGREDIENT_ALIASES) {
    const matched = alias.matches.some((match) =>
      normalizedLine.includes(normalizeText(match)),
    );

    if (matched) {
      return alias.name;
    }
  }

  return removeMeasurement(ingredientLine);
}

export function getRequiredCocktailIngredients(cocktail: Cocktail) {
  const uniqueIngredients = new Map<string, string>();

  cocktail.ingredients.forEach((ingredientLine) => {
    if (
      isOptionalIngredient(ingredientLine) ||
      isNonInventoryIngredient(ingredientLine)
    ) {
      return;
    }

    const canonicalName = getCanonicalIngredientName(ingredientLine);
    const normalizedName = normalizeText(canonicalName);

    if (canonicalName && !uniqueIngredients.has(normalizedName)) {
      uniqueIngredients.set(normalizedName, canonicalName);
    }
  });

  return Array.from(uniqueIngredients.values());
}

function inventoryContainsIngredient(
  inventory: string[],
  requiredIngredient: string,
) {
  const normalizedRequired = normalizeText(requiredIngredient);

  return inventory.some((inventoryIngredient) => {
    const normalizedInventory = normalizeText(inventoryIngredient);

    return (
      normalizedInventory === normalizedRequired ||
      normalizedInventory.includes(normalizedRequired) ||
      normalizedRequired.includes(normalizedInventory)
    );
  });
}

export function getCocktailBarMatch(
  cocktail: Cocktail,
  inventory: string[],
): CocktailBarMatch {
  const requiredIngredients = getRequiredCocktailIngredients(cocktail);

  const matchedIngredients = requiredIngredients.filter((ingredient) =>
    inventoryContainsIngredient(inventory, ingredient),
  );

  const missingIngredients = requiredIngredients.filter(
    (ingredient) => !inventoryContainsIngredient(inventory, ingredient),
  );

  const matchPercentage =
    requiredIngredients.length === 0
      ? 0
      : Math.round(
          (matchedIngredients.length / requiredIngredients.length) * 100,
        );

  return {
    cocktail,
    requiredIngredients,
    matchedIngredients,
    missingIngredients,
    matchPercentage,
    canMake: requiredIngredients.length > 0 && missingIngredients.length === 0,
    missingCount: missingIngredients.length,
  };
}

export function getCocktailBarMatches(
  cocktails: Cocktail[],
  inventory: string[],
) {
  return cocktails
    .map((cocktail) => getCocktailBarMatch(cocktail, inventory))
    .sort((a, b) => {
      if (a.canMake !== b.canMake) {
        return a.canMake ? -1 : 1;
      }

      if (a.missingCount !== b.missingCount) {
        return a.missingCount - b.missingCount;
      }

      if (a.matchPercentage !== b.matchPercentage) {
        return b.matchPercentage - a.matchPercentage;
      }

      return a.cocktail.name.localeCompare(b.cocktail.name);
    });
}

export function getMakeableCocktails(
  cocktails: Cocktail[],
  inventory: string[],
) {
  return getCocktailBarMatches(cocktails, inventory).filter(
    (match) => match.canMake,
  );
}

export function getAlmostMakeableCocktails(
  cocktails: Cocktail[],
  inventory: string[],
  maximumMissingIngredients = 2,
) {
  return getCocktailBarMatches(cocktails, inventory).filter(
    (match) =>
      !match.canMake &&
      match.missingCount > 0 &&
      match.missingCount <= maximumMissingIngredients,
  );
}
