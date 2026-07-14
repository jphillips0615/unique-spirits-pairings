import {
  ExperienceLevel,
  FlavorPreference,
  UserPreferences,
} from "@/context/PreferencesContext";
import { Cocktail } from "@/types/cocktail";

export type CocktailRecommendation = {
  cocktail: Cocktail;
  score: number;
  reasons: string[];
  explanation: string;
};

type RecommendationOptions = {
  cocktails: Cocktail[];
  preferences: UserPreferences;
  favoriteIds?: string[];
  excludedIds?: string[];
};

const EXPERIENCE_DIFFICULTIES: Record<ExperienceLevel, string[]> = {
  "New to Cocktails": ["Easy"],
  "I Enjoy Cocktails": ["Easy", "Medium"],
  "Cocktail Enthusiast": ["Easy", "Medium", "Hard"],
  "Bartender / Professional": ["Medium", "Hard"],
};

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}

function includesNormalized(values: string[], value: string) {
  const normalizedValue = normalizeValue(value);

  return values.some(
    (currentValue) => normalizeValue(currentValue) === normalizedValue,
  );
}

function getMatchingFlavors(
  cocktail: Cocktail,
  favoriteFlavors: FlavorPreference[],
) {
  if (!favoriteFlavors.length) {
    return [];
  }

  return favoriteFlavors.filter((favoriteFlavor) =>
    cocktail.flavorProfile.some(
      (cocktailFlavor) =>
        normalizeValue(cocktailFlavor) === normalizeValue(favoriteFlavor),
    ),
  );
}

function formatFlavorList(flavors: FlavorPreference[]) {
  const normalizedFlavors = flavors.map((flavor) => flavor.toLowerCase());

  if (normalizedFlavors.length === 1) {
    return normalizedFlavors[0];
  }

  if (normalizedFlavors.length === 2) {
    return `${normalizedFlavors[0]} and ${normalizedFlavors[1]}`;
  }

  return `${normalizedFlavors.slice(0, -1).join(", ")}, and ${
    normalizedFlavors[normalizedFlavors.length - 1]
  }`;
}

function getSpiritReason(cocktail: Cocktail, preferences: UserPreferences) {
  if (!preferences.favoriteSpirits.length) {
    return null;
  }

  if (includesNormalized(preferences.favoriteSpirits, cocktail.spirit)) {
    return `It features ${cocktail.spirit}, one of your favorite spirits.`;
  }

  return null;
}

function getFlavorReason(
  cocktail: Cocktail,
  favoriteFlavors: FlavorPreference[],
) {
  const matchingFlavors = getMatchingFlavors(cocktail, favoriteFlavors);

  if (!matchingFlavors.length) {
    return null;
  }

  return `It matches your preference for ${formatFlavorList(
    matchingFlavors.slice(0, 3),
  )} flavors.`;
}

function getExperienceReason(
  cocktail: Cocktail,
  experienceLevel: ExperienceLevel | null,
) {
  if (!experienceLevel) {
    return null;
  }

  const preferredDifficulties = EXPERIENCE_DIFFICULTIES[experienceLevel] ?? [];

  if (!includesNormalized(preferredDifficulties, cocktail.difficulty)) {
    return null;
  }

  switch (experienceLevel) {
    case "New to Cocktails":
      return "Its approachable difficulty makes it a good place to start.";

    case "I Enjoy Cocktails":
      return "Its difficulty fits your current cocktail experience.";

    case "Cocktail Enthusiast":
      return "It offers the kind of balance and technique an enthusiast can appreciate.";

    case "Bartender / Professional":
      return "It offers enough structure and technique to keep an experienced maker interested.";

    default:
      return null;
  }
}

function getFavoriteReason(cocktail: Cocktail, favoriteIds: string[]) {
  if (!favoriteIds.includes(cocktail.id)) {
    return null;
  }

  return "You previously saved this cocktail as a favorite.";
}

function scoreSpiritPreference(
  cocktail: Cocktail,
  preferences: UserPreferences,
) {
  if (!preferences.favoriteSpirits.length) {
    return 0;
  }

  if (includesNormalized(preferences.favoriteSpirits, cocktail.spirit)) {
    return 45;
  }

  return 0;
}

function scoreFlavorPreference(
  cocktail: Cocktail,
  favoriteFlavors: FlavorPreference[],
) {
  const matchingFlavors = getMatchingFlavors(cocktail, favoriteFlavors);

  if (!matchingFlavors.length) {
    return 0;
  }

  return Math.min(matchingFlavors.length * 18, 45);
}

function scoreExperienceLevel(
  cocktail: Cocktail,
  experienceLevel: ExperienceLevel | null,
) {
  if (!experienceLevel) {
    return 0;
  }

  const difficulty = normalizeValue(cocktail.difficulty);

  switch (experienceLevel) {
    case "New to Cocktails":
      if (difficulty === "easy") return 30;
      if (difficulty === "medium") return 8;
      if (difficulty === "hard") return -20;
      return 0;

    case "I Enjoy Cocktails":
      if (difficulty === "easy") return 22;
      if (difficulty === "medium") return 28;
      if (difficulty === "hard") return 4;
      return 0;

    case "Cocktail Enthusiast":
      if (difficulty === "easy") return 12;
      if (difficulty === "medium") return 27;
      if (difficulty === "hard") return 30;
      return 0;

    case "Bartender / Professional":
      if (difficulty === "easy") return 4;
      if (difficulty === "medium") return 24;
      if (difficulty === "hard") return 35;
      return 0;

    default:
      return 0;
  }
}

function scoreFavorite(cocktail: Cocktail, favoriteIds: string[]) {
  return favoriteIds.includes(cocktail.id) ? 12 : 0;
}

function scoreCompleteness(cocktail: Cocktail) {
  let score = 0;

  if (cocktail.flavorProfile.length >= 3) {
    score += 4;
  }

  if (cocktail.pairings.length >= 3) {
    score += 4;
  }

  if (cocktail.tips.length >= 2) {
    score += 2;
  }

  return score;
}

function buildExplanation(reasons: string[], cocktail: Cocktail) {
  if (reasons.length === 0) {
    const fallbackFlavors = cocktail.flavorProfile.slice(0, 2);

    if (fallbackFlavors.length) {
      return `${cocktail.name} is a well-rounded cocktail with a ${fallbackFlavors
        .join(" and ")
        .toLowerCase()} profile.`;
    }

    return `${cocktail.name} is a well-rounded cocktail worth exploring.`;
  }

  return reasons.slice(0, 3).join(" ");
}

function createRecommendation(
  cocktail: Cocktail,
  preferences: UserPreferences,
  favoriteIds: string[],
): CocktailRecommendation {
  const reasons = [
    getSpiritReason(cocktail, preferences),
    getFlavorReason(cocktail, preferences.favoriteFlavors),
    getExperienceReason(cocktail, preferences.experienceLevel),
    getFavoriteReason(cocktail, favoriteIds),
  ].filter((reason): reason is string => Boolean(reason));

  const score =
    scoreSpiritPreference(cocktail, preferences) +
    scoreFlavorPreference(cocktail, preferences.favoriteFlavors) +
    scoreExperienceLevel(cocktail, preferences.experienceLevel) +
    scoreFavorite(cocktail, favoriteIds) +
    scoreCompleteness(cocktail);

  return {
    cocktail,
    score,
    reasons,
    explanation: buildExplanation(reasons, cocktail),
  };
}

function shuffleEqualScores(recommendations: CocktailRecommendation[]) {
  return recommendations
    .map((recommendation) => ({
      recommendation,
      randomValue: Math.random(),
    }))
    .sort((first, second) => {
      if (second.recommendation.score !== first.recommendation.score) {
        return second.recommendation.score - first.recommendation.score;
      }

      return first.randomValue - second.randomValue;
    })
    .map(({ recommendation }) => recommendation);
}

export function getCocktailRecommendations({
  cocktails,
  preferences,
  favoriteIds = [],
  excludedIds = [],
}: RecommendationOptions): CocktailRecommendation[] {
  if (!cocktails.length) {
    return [];
  }

  const availableCocktails = cocktails.filter(
    (cocktail) => !excludedIds.includes(cocktail.id),
  );

  const recommendationPool = availableCocktails.length
    ? availableCocktails
    : cocktails;

  const recommendations = recommendationPool.map((cocktail) =>
    createRecommendation(cocktail, preferences, favoriteIds),
  );

  return shuffleEqualScores(recommendations);
}

export function getTopCocktailRecommendation(
  options: RecommendationOptions,
): CocktailRecommendation | null {
  const recommendations = getCocktailRecommendations(options);

  return recommendations[0] ?? null;
}
