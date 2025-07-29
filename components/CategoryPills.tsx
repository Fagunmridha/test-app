import React from "react";
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
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 8 }}
    >
      {categories.map((cat, index) => (
        <TouchableOpacity key={cat}>
          <Box
            px="m"
            py="s"
            mr="s"
            backgroundColor="cardBackground"
            borderRadius="l"
            shadowColor="shadow"
            shadowOffset={{ width: 0, height: 1 }}
            shadowOpacity={0.05}
            shadowRadius={2}
            elevation={1}
            marginLeft={index === 0 ? 0 : "s"}
          >
            <Text variant="categoryLabel">{cat}</Text>
          </Box>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
