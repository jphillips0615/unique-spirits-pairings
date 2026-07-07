export const SUPPORTED_SPIRITS = ["Bourbon", "Rye", "Gin", "Rum", "Tequila"];

export const SEARCH_SPIRIT_FILTERS = ["All", ...SUPPORTED_SPIRITS];

export const EXPLORE_SPIRIT_CATEGORIES = [
  { label: "All Cocktails", spirit: "All" },
  ...SUPPORTED_SPIRITS.map((spirit) => ({
    label: spirit,
    spirit,
  })),
];

export const ONBOARDING_SPIRITS = [
  ...SUPPORTED_SPIRITS,
  "I'm Open to Everything",
];

export const HOME_SPIRIT_CATEGORIES = [
  { name: "Bourbon", emoji: "🥃" },
  { name: "Rye", emoji: "🥃" },
  { name: "Gin", emoji: "🍸" },
  { name: "Rum", emoji: "🍹" },
  { name: "Tequila", emoji: "🌵" },
];
