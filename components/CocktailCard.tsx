import { Colors } from "@/constants/colors";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CocktailCardProps = {
  name: string;
  spirit: string;
  description: string;
  image: any;
  onPress?: () => void;
};

export default function CocktailCard({
  name,
  spirit,
  description,
  image,
  onPress,
}: CocktailCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.spirit}>{spirit}</Text>

        <Text style={styles.title}>{name}</Text>

        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>

        <Text style={styles.link}>View Recipe →</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 240,
  },

  content: {
    padding: 18,
  },

  spirit: {
    color: Colors.gold,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 8,
    fontSize: 12,
  },

  title: {
    color: Colors.text,
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 10,
  },

  description: {
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },

  link: {
    color: Colors.gold,
    fontWeight: "700",
  },
});
