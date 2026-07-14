import { IngredientGlossaryEntry } from "@/types/ingredientGlossary";

export const INGREDIENT_GLOSSARY: IngredientGlossaryEntry[] = [
  {
    id: "absinthe",
    name: "Absinthe",
    category: "Spirit",
    pronunciation: "AB-sinth",
    description:
      "A high-proof herbal spirit traditionally flavored with wormwood, anise, fennel, and other botanicals. In cocktails, it is usually used in very small amounts because its flavor is extremely strong.",
    flavorProfile: [
      "Licorice-like",
      "Herbal",
      "Anise",
      "Dry",
      "Intensely aromatic",
    ],
    commonUses: [
      "Sazerac",
      "Absinthe rinses",
      "Herbal classic cocktails",
      "Adding aroma without much volume",
    ],
    substitutes: ["Pastis", "Pernod", "Herbsaint", "Anise-flavored liqueur"],
    containsAlcohol: true,
    whereToFind:
      "Usually found in the specialty spirits or liqueur section of a well-stocked liquor store.",
    notes:
      "A rinse means the glass is coated with a small amount and the excess is discarded.",
  },

  {
    id: "agave-syrup",
    name: "Agave Syrup",
    category: "Syrup",
    description:
      "A sweetener made from the agave plant. It dissolves easily and is commonly paired with tequila and mezcal cocktails.",
    flavorProfile: [
      "Sweet",
      "Mild",
      "Slightly earthy",
      "Smoother than granulated sugar",
    ],
    commonUses: [
      "Margaritas",
      "Tequila cocktails",
      "Mezcal cocktails",
      "Replacing simple syrup",
    ],
    substitutes: [
      "Simple syrup",
      "Honey syrup",
      "Maple syrup in small amounts",
    ],
    containsAlcohol: false,
    whereToFind:
      "Usually found near honey, syrups, baking ingredients, or natural sweeteners in grocery stores.",
  },

  {
    id: "angostura-bitters",
    name: "Angostura Bitters",
    category: "Bitters",
    pronunciation: "ang-guh-STUR-uh",
    description:
      "A concentrated aromatic bitters blend used a few dashes at a time. It adds spice, depth, and balance without making a drink noticeably bitter on its own.",
    flavorProfile: ["Warm spice", "Clove", "Cinnamon", "Herbal", "Bitter"],
    commonUses: [
      "Old Fashioned",
      "Manhattan",
      "Champagne Cocktail",
      "Many whiskey and rum cocktails",
    ],
    substitutes: [
      "Aromatic bitters",
      "Orange bitters for a different flavor",
      "Peychaud's Bitters for a lighter, more floral result",
    ],
    containsAlcohol: true,
    whereToFind:
      "Usually found in the cocktail mixer section of liquor stores, grocery stores, or specialty food shops.",
    notes:
      "Bitters contain alcohol, but recipes normally use only a few dashes.",
  },

  {
    id: "campari",
    name: "Campari",
    category: "Aperitif",
    pronunciation: "kam-PAH-ree",
    description:
      "A bright red Italian bitter aperitif made from a secret blend of herbs, spices, fruit peels, and botanicals.",
    flavorProfile: [
      "Bitter",
      "Orange peel",
      "Herbal",
      "Slightly sweet",
      "Complex",
    ],
    commonUses: [
      "Negroni",
      "Americano",
      "Boulevardier",
      "Spritz-style cocktails",
    ],
    substitutes: [
      "Aperol for a sweeter and less bitter result",
      "Cappelletti",
      "Select Aperitivo",
      "Another red bitter aperitif",
    ],
    containsAlcohol: true,
    whereToFind:
      "Usually found in the aperitif, amaro, or Italian liqueur section of a liquor store.",
  },

  {
    id: "coffee-liqueur",
    name: "Coffee Liqueur",
    category: "Liqueur",
    description:
      "A sweet alcoholic liqueur flavored with coffee. Some versions are rich and syrupy, while others taste drier and more strongly of roasted coffee.",
    flavorProfile: ["Coffee", "Roasted", "Sweet", "Chocolate-like", "Vanilla"],
    commonUses: [
      "Espresso Martini",
      "White Russian",
      "Black Russian",
      "Dessert cocktails",
    ],
    substitutes: [
      "Cold brew concentrate with simple syrup",
      "Espresso with sugar syrup",
      "Another brand of coffee liqueur",
    ],
    containsAlcohol: true,
    whereToFind: "Usually found in the liqueur section of liquor stores.",
  },

  {
    id: "creme-de-violette",
    name: "Crème de Violette",
    category: "Liqueur",
    pronunciation: "krem duh vee-oh-LET",
    description:
      "A floral purple liqueur flavored mainly with violets. It is used in small amounts and is best known for giving the Aviation cocktail its color and delicate floral aroma.",
    flavorProfile: [
      "Floral",
      "Violet",
      "Lightly sweet",
      "Perfume-like",
      "Delicate",
    ],
    commonUses: [
      "Aviation",
      "Floral gin cocktails",
      "Adding purple color",
      "Small accent amounts",
    ],
    substitutes: [
      "Parfait Amour",
      "A small amount of elderflower liqueur",
      "Omit it for a less floral Aviation",
    ],
    containsAlcohol: true,
    whereToFind:
      "Usually found in the specialty liqueur section of larger liquor stores.",
    notes:
      "Too much can make a cocktail taste overly perfumed, so it is usually measured carefully.",
  },

  {
    id: "dry-vermouth",
    name: "Dry Vermouth",
    category: "Fortified Wine",
    description:
      "A fortified and aromatized wine flavored with herbs and botanicals. It is lighter, drier, and less sweet than sweet vermouth.",
    flavorProfile: ["Dry", "Herbal", "Floral", "Lightly bitter", "Wine-like"],
    commonUses: [
      "Dry Martini",
      "Gibson",
      "Bamboo",
      "Low-alcohol aperitif cocktails",
    ],
    substitutes: [
      "Blanc vermouth for a sweeter result",
      "Dry sherry",
      "Lillet Blanc in some cocktails",
    ],
    containsAlcohol: true,
    whereToFind:
      "Usually found near fortified wines, aperitifs, or cocktail ingredients in liquor stores.",
    notes:
      "Refrigerate after opening because vermouth is wine-based and will oxidize over time.",
  },

  {
    id: "honey-ginger-syrup",
    name: "Honey-Ginger Syrup",
    category: "Syrup",
    description:
      "A cocktail syrup made by combining honey, water, and fresh ginger. It adds sweetness, spice, and a warm aromatic quality.",
    flavorProfile: ["Sweet", "Warm", "Spicy", "Honeyed", "Fresh ginger"],
    commonUses: [
      "Penicillin",
      "Whiskey sours",
      "Tea-based cocktails",
      "Cold-weather drinks",
    ],
    substitutes: [
      "Honey syrup plus fresh ginger",
      "Ginger syrup plus honey",
      "Simple syrup with muddled ginger",
    ],
    containsAlcohol: false,
    whereToFind:
      "Often homemade, but some specialty grocery stores and cocktail shops sell bottled versions.",
  },

  {
    id: "honey-syrup",
    name: "Honey Syrup",
    category: "Syrup",
    description:
      "Honey diluted with warm water so it mixes easily into cold drinks. Straight honey is usually too thick to dissolve evenly in a cocktail.",
    flavorProfile: ["Sweet", "Floral", "Rich", "Soft", "Varies by honey type"],
    commonUses: [
      "Bee's Knees",
      "Gold Rush",
      "Whiskey cocktails",
      "Gin cocktails",
    ],
    substitutes: [
      "Simple syrup",
      "Agave syrup",
      "Maple syrup in small amounts",
    ],
    containsAlcohol: false,
    whereToFind:
      "Usually homemade by mixing honey with warm water, though bottled cocktail syrups are also available.",
  },

  {
    id: "maraschino-liqueur",
    name: "Maraschino Liqueur",
    category: "Liqueur",
    pronunciation: "mair-uh-SKEE-no",
    description:
      "A clear cherry liqueur made from Marasca cherries, including some of the cherry pits. It does not taste like bright red maraschino cherry syrup.",
    flavorProfile: [
      "Dry cherry",
      "Almond-like",
      "Nutty",
      "Slightly bitter",
      "Floral",
    ],
    commonUses: [
      "Aviation",
      "Last Word",
      "Hemingway Daiquiri",
      "Classic gin cocktails",
    ],
    substitutes: [
      "Cherry Heering for a sweeter result",
      "A small amount of cherry brandy",
      "Amaretto plus dry cherry liqueur",
    ],
    containsAlcohol: true,
    whereToFind:
      "Usually found in the specialty liqueur section of a liquor store.",
    notes:
      "The almond-like flavor comes partly from the cherry pits used during production.",
  },

  {
    id: "orange-liqueur",
    name: "Orange Liqueur",
    category: "Liqueur",
    description:
      "A broad category of sweetened spirits flavored with orange peel. Common examples include triple sec, Cointreau, and Grand Marnier.",
    flavorProfile: [
      "Orange peel",
      "Citrus",
      "Sweet",
      "Bright",
      "Sometimes brandy-rich",
    ],
    commonUses: ["Margarita", "Sidecar", "Cosmopolitan", "Mai Tai"],
    substitutes: ["Triple sec", "Cointreau", "Grand Marnier", "Dry curaçao"],
    containsAlcohol: true,
    whereToFind: "Usually found in the liqueur section of liquor stores.",
    notes:
      "Different orange liqueurs vary in sweetness, proof, and richness, so the final cocktail may change slightly.",
  },

  {
    id: "peychauds-bitters",
    name: "Peychaud's Bitters",
    category: "Bitters",
    pronunciation: "PAY-shohz",
    description:
      "A bright red aromatic bitters style created in New Orleans. It is lighter and more floral than Angostura and is essential in a traditional Sazerac.",
    flavorProfile: [
      "Anise",
      "Cherry",
      "Floral",
      "Gentle spice",
      "Light bitterness",
    ],
    commonUses: [
      "Sazerac",
      "Vieux Carré variations",
      "New Orleans-style cocktails",
      "Whiskey and Cognac drinks",
    ],
    substitutes: [
      "Angostura Bitters for a spicier result",
      "Creole bitters",
      "Another aromatic bitters blend",
    ],
    containsAlcohol: true,
    whereToFind:
      "Usually found near cocktail bitters and mixers in liquor stores or larger grocery stores.",
  },

  {
    id: "simple-syrup",
    name: "Simple Syrup",
    category: "Syrup",
    description:
      "A basic liquid sweetener made by dissolving sugar in water. It blends into cold drinks much more easily than granulated sugar.",
    flavorProfile: ["Clean sweetness", "Neutral", "No strong aroma"],
    commonUses: [
      "Daiquiri",
      "Whiskey Sour",
      "Tom Collins",
      "Many classic cocktails",
    ],
    substitutes: [
      "Agave syrup",
      "Honey syrup",
      "Maple syrup",
      "Sugar dissolved directly into the drink",
    ],
    containsAlcohol: false,
    whereToFind:
      "Available in the cocktail mixer section, or easily made at home with sugar and water.",
  },

  {
    id: "sweet-vermouth",
    name: "Sweet Vermouth",
    category: "Fortified Wine",
    description:
      "A fortified and aromatized wine flavored with herbs, spices, and botanicals. It is darker, richer, and sweeter than dry vermouth.",
    flavorProfile: ["Herbal", "Sweet", "Spiced", "Wine-like", "Lightly bitter"],
    commonUses: ["Manhattan", "Negroni", "Boulevardier", "Americano"],
    substitutes: [
      "Another brand of sweet vermouth",
      "Amaro plus a little red wine",
      "Port in some recipes",
    ],
    containsAlcohol: true,
    whereToFind:
      "Usually found near fortified wines, aperitifs, or cocktail ingredients in liquor stores.",
    notes:
      "Refrigerate after opening because vermouth is wine-based and will lose freshness over time.",
  },
];

export function getGlossaryEntryById(id: string) {
  return INGREDIENT_GLOSSARY.find((entry) => entry.id === id);
}

export function getGlossaryEntryByName(name: string) {
  const normalizedName = name.trim().toLowerCase();

  return INGREDIENT_GLOSSARY.find(
    (entry) => entry.name.toLowerCase() === normalizedName,
  );
}

export function searchIngredientGlossary(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return INGREDIENT_GLOSSARY;
  }

  return INGREDIENT_GLOSSARY.filter((entry) => {
    const searchableText = [
      entry.name,
      entry.category,
      entry.description,
      entry.flavorProfile.join(" "),
      entry.commonUses.join(" "),
      entry.substitutes.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}
