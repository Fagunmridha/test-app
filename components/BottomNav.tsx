// components/BottomNav.tsx
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Box } from "./ui/Box";
import { Text } from "./ui/Text";

export const BottomNav = () => {
  const router = useRouter();

  return (
    <Box
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
      bg="background"
      borderTopWidth={1}
      borderColor="border"
      p="m"
      position="absolute"
      bottom={0}
      width="100%"
    >
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text textAlign="center">🏠 Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/favorites")}>
        <Text textAlign="center">❤️ Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/menu")}>
        <Text textAlign="center">📋 Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/items")}>
        <Text textAlign="center">📚 Item</Text>
      </TouchableOpacity>
    </Box>
  );
};
