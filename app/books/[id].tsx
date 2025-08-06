import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import { useFavoriteStore } from "@/hooks/useFavoriteStore";
import { Theme } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BookDetails {
  id: number;
  title: string;
  authors?: { name: string }[];
  formats: { [key: string]: string };
  subjects?: string[];
  download_count?: number;
}

const fetchBookDetails = async (id: string): Promise<BookDetails> => {
  const res = await axios.get(`https://gutendex.com/books/${id}`);
  return res.data;
};

export default function BookDetailScreen() {
  const theme = useTheme<Theme>();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookDetails(String(id)),
    enabled: !!id,
  });

  const isFavorite = useFavoriteStore((state) => state.isFavorite(Number(id)));
  const toggleFavorite = () =>
    useFavoriteStore.getState().toggleFavorite(Number(id));

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (!data || error) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Failed to load book details.</Text>
      </Box>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: theme.spacing.m,
      }}
    >
      <ScrollView>
        <Box p="m">
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb="m"
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? theme.colors.primary : theme.colors.text}
              />
            </TouchableOpacity>
          </Box>

          <Image
            source={{
              uri:
                data.formats["image/jpeg"] ||
                "https://via.placeholder.com/200x300",
            }}
            style={{
              width: "100%",
              height: 300,
              borderRadius: theme.borderRadii.l,
              marginBottom: 16,
            }}
          />

          <Text variant="header" mb="s">
            {data.title}
          </Text>
          <Text color="textLight" mb="m">
            by {data.authors?.map((a) => a.name).join(", ") || "Unknown"}
          </Text>

          <Text variant="subheader" mb="s">
            Subjects:
          </Text>
          <Text color="textLight" mb="m">
            {data.subjects?.join(", ") || "N/A"}
          </Text>

          <Text variant="subheader">Downloads:</Text>
          <Text color="textLight">{data.download_count || 0}</Text>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
