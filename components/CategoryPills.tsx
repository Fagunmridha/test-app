import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Box } from "./ui/Box";
import { Text } from "./ui/Text";

const categories = [
  "Romance",
  "History",
  "Mystery",
  "Spiritual",
  "Fantasy",
  "Adventure",
  "Horror",
];

export const CategoryPills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Romance");

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 8 }}
    >
      {categories.map((cat, index) => {
        const isActive = selectedCategory === cat;
        return (
          <TouchableOpacity key={cat} onPress={() => setSelectedCategory(cat)}>
            <Box
              px="m"
              py="s"
              mr="s"
              borderRadius="l"
              shadowColor="shadow"
              shadowOffset={{ width: 0, height: 1 }}
              shadowOpacity={0.05}
              shadowRadius={2}
              elevation={1}
              marginLeft={index === 0 ? 0 : "s"}
            >
              <Text
                variant="categoryLabel"
                color={isActive ? "textId" : "textLight"}
              >
                {cat}
              </Text>
            </Box>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
