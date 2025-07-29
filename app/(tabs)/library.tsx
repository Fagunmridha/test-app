import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import React from "react";
import { ScrollView } from "react-native";

export default function LibraryScreen() {
  return (
    <Box flex={1} backgroundColor="background" p="m">
      <Text variant="header" mb="m">
        📚 My Library
      </Text>
      <ScrollView>
        <Box 
          backgroundColor="cardBackground" 
          p="m" 
          borderRadius="m"
          mb="s"
        >
          <Text>This is the Library tab where users can manage their book collections.</Text>
        </Box>
        <Box 
          backgroundColor="cardBackground" 
          p="m" 
          borderRadius="m"
          mb="s"
        >
          <Text>Here you can organize books into custom lists, track reading progress, and more.</Text>
        </Box>
      </ScrollView>
    </Box>
  );
}