import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import React from "react";
import { ScrollView } from "react-native";

export default function AccountScreen() {
  return (
    <Box flex={1} backgroundColor="background" p="m">
      <Text variant="header" mb="m">
        👤 Account
      </Text>
      <ScrollView>
        <Box 
          backgroundColor="cardBackground" 
          p="m" 
          borderRadius="m"
          mb="s"
        >
          <Text>Account settings and profile information will be displayed here.</Text>
        </Box>
        <Box 
          backgroundColor="cardBackground" 
          p="m" 
          borderRadius="m"
          mb="s"
        >
          <Text>Users can manage their preferences, sync data, and view reading statistics.</Text>
        </Box>
      </ScrollView>
    </Box>
  );
}