export interface Cocktail {
  id: string;
  name: string;
  spirit: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  image: any;
}

export const cocktails: Cocktail[] = [
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    spirit: "Bourbon",
    difficulty: "Easy",
    description:
      "A timeless whiskey cocktail highlighting the spirit with bitters and sugar.",
    image: require("@/assets/images/cocktails/old-fashioned.jpg"),
  },
];
