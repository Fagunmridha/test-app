import { BookCard } from "@/components/BookCard";
import { HeaderSection } from "@/components/HeaderSection";
import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import { useFavoriteStore } from "@/hooks/useFavoriteStore";
import { Theme } from "@/theme/theme";
import { useTheme } from "@shopify/restyle";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView } from "react-native";

export default function FavoritesScreen() {
  const theme = useTheme<Theme>();
  const router = useRouter();
  const { favorites, loading } = useFavoriteStore();

  return (
    <Box flex={1} backgroundColor="background">
      <ScrollView 
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      >
        <HeaderSection 
          title="My Favorites" 
          containerStyle={{ marginBottom: 24 }}
        />
        
        {loading ? (
          <Box flex={1} justifyContent="center" alignItems="center" height={300}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </Box>
        ) : favorites.length === 0 ? (
          <Box 
            flex={1} 
            justifyContent="center" 
            alignItems="center" 
            height={300}
            backgroundColor="cardBackground"
            borderRadius="m"
            padding="l"
          >
            <Text variant="header" textAlign="center" marginBottom="m">
              No favorites yet
            </Text>
            <Text variant="body" textAlign="center" color="textLight">
              Start adding books to your favorites by tapping the heart icon
            </Text>
          </Box>
        ) : (
          <Box 
            flexDirection="row" 
            flexWrap="wrap" 
            justifyContent="space-between"
          >
            {favorites.map((book: any) => (
              <Box 
                key={book.id} 
                width="48%" 
                marginBottom="m"
              >
                <BookCard
                  book={book}
                  onPress={() => router.push(`/books/${book.id}`)}
                />
              </Box>
            ))}
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}