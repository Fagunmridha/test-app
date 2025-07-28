import { BookCard } from "@/components/BookCard";
import { BottomNav } from "@/components/BottomNav";
import { CategoryPills } from "@/components/CategoryPills";
import { HeaderSection } from "@/components/HeaderSection";
import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchStore } from "@/store/search";
import { Theme } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";

// 📚 Fetch books
const fetchBooks = async (search: string, page: number) => {
  const res = await axios.get("https://gutendex.com/books", {
    params: { search, page },
  });
  return res.data;
};

export default function HomeScreen() {
  const theme = useTheme<Theme>();
  const { search: q, page: pg } = useLocalSearchParams();
  const router = useRouter();

  const { search, setSearch, page, setPage } = useSearchStore();
  const debouncedSearch = useDebounce(search, 400);
  const didMountRef = useRef(false); // Prevent initial router.setParams()

  // 🔁 Sync URL to Zustand on mount
  useEffect(() => {
    if (typeof q === "string") setSearch(q);
    if (typeof pg === "string") setPage(parseInt(pg));
  }, []);

  // 🔁 Sync Zustand to URL after first render
  useEffect(() => {
    if (didMountRef.current) {
      router.setParams({ search, page: String(page) });
    } else {
      didMountRef.current = true;
    }
  }, [search, page]);

  // 📦 Query books
  const { data, isLoading } = useQuery({
    queryKey: ["books", debouncedSearch, page],
    queryFn: () => fetchBooks(debouncedSearch, page),
  });

  const books = data?.results || [];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      {/* 🔍 Search Input */}
      <Box px="m" pt="l">
        <Box
          backgroundColor="background"
          flexDirection="row"
          alignItems="center"
          borderRadius="m"
          paddingHorizontal="m"
        >
          <Ionicons name="search" size={20} color={theme.colors.iconGray} />
          <TextInput
            placeholder="Search books..."
            placeholderTextColor={theme.colors.textLight}
            value={search}
            onChangeText={setSearch}
            style={{
              flex: 1,
              paddingVertical: 10,
              marginLeft: 8,
              color: theme.colors.text,
            }}
          />
        </Box>
      </Box>

      {/* 🏷️ Categories */}
      <Box mt="m" px="m">
        <CategoryPills />
      </Box>

      {/* ⭐ Popular */}
      <HeaderSection title="Popular" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 16 }}
      >
        {books.slice(0, 5).map((book: any) => (
          <BookCard
            key={book.id}
            book={book}
            onPress={() => router.push(`/books/${book.id}`)}
          />
        ))}
      </ScrollView>

      {/* 🔥 Trending */}
      <HeaderSection title="Trending" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 16 }}
      >
        {books.slice(5, 10).map((book: any) => (
          <BookCard
            key={book.id}
            book={book}
            onPress={() => router.push(`/books/${book.id}`)}
          />
        ))}
      </ScrollView>

      {/* 🔁 Pagination */}
      <Box
        mt="l"
        mb="l"
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <TouchableOpacity
          onPress={() => setPage(Math.max(1, page - 1))}
          style={{
            backgroundColor: theme.colors.border,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
          }}
        >
          <Text>Previous</Text>
        </TouchableOpacity>

        <Text>Page {page}</Text>

        <TouchableOpacity
          onPress={() => setPage(page + 1)}
          style={{
            backgroundColor: theme.colors.border,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
          }}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </Box>

      <BottomNav />
    </ScrollView>
  );
}
