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
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((cat) => (
        <TouchableOpacity key={cat}>
          <Box
            px="m"
            py="s"
            mr="s"
            backgroundColor="background"
            borderRadius="l"
          >
            <Text>{cat}</Text>
          </Box>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
