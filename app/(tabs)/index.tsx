import { BookCard } from "@/components/BookCard";
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
import {
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

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
  }, [q, pg, setSearch, setPage]);

  // 🔁 Sync Zustand to URL after first render
  useEffect(() => {
    if (didMountRef.current) {
      router.setParams({ search, page: String(page) });
    } else {
      didMountRef.current = true;
    }
  }, [search, page, router]);

  // 📦 Query books
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["books", debouncedSearch, page],
    queryFn: () => fetchBooks(debouncedSearch, page),
  });

  const books = data?.results || [];
  const totalPages = data?.count ? Math.ceil(data.count / 32) : 1;

  return (
    <Box flex={1} backgroundColor="background">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* 🔍 Search Input */}
        <Box px="m" pt="l">
          <Box
            backgroundColor="cardBackground"
            flexDirection="row"
            alignItems="center"
            borderRadius="m"
            paddingHorizontal="m"
            py="s"
            shadowColor="shadow"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.1}
            shadowRadius={4}
            elevation={2}
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
                fontSize: 16,
              }}
            />
            {isFetching && (
              <ActivityIndicator size="small" color={theme.colors.primary} />
            )}
          </Box>
        </Box>

        {/* 🏷️ Categories */}
        <Box mt="m" px="m">
          <CategoryPills />
        </Box>

        {/* ⭐ Popular */}
        <HeaderSection
          title="Popular"
          containerStyle={{ paddingHorizontal: 16, marginTop: 24 }}
        />
        {isLoading ? (
          <Box height={200} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </Box>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {books.slice(0, 5).map((book: any) => (
              <BookCard
                key={book.id}
                book={book}
                onPress={() => router.push(`/books/${book.id}`)}
              />
            ))}
          </ScrollView>
        )}

        {/* 🔥 Trending */}
        <HeaderSection
          title="Trending"
          containerStyle={{ paddingHorizontal: 16, marginTop: 24 }}
        />
        {isLoading ? (
          <Box height={200} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </Box>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {books.slice(5, 10).map((book: any) => (
              <BookCard
                key={book.id}
                book={book}
                onPress={() => router.push(`/books/${book.id}`)}
              />
            ))}
          </ScrollView>
        )}

        {/* 🔁 Pagination */}
        <Box
          mt="l"
          mb="l"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="m"
        >
          <TouchableOpacity
            disabled={page <= 1}
            onPress={() => setPage(Math.max(1, page - 1))}
            style={{
              backgroundColor:
                page <= 1 ? theme.colors.borderLight : theme.colors.primary,
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
              opacity: page <= 1 ? 0.5 : 1,
            }}
          >
            <Text color={page <= 1 ? "textLight" : "text"} fontWeight="600">
              Previous
            </Text>
          </TouchableOpacity>

          <Box flexDirection="row" alignItems="center">
            <Text fontWeight="600" mx="s">
              Page {page} of {totalPages}
            </Text>
          </Box>

          <TouchableOpacity
            disabled={page >= totalPages}
            onPress={() => setPage(page + 1)}
            style={{
              backgroundColor:
                page >= totalPages
                  ? theme.colors.borderLight
                  : theme.colors.primary,
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
              opacity: page >= totalPages ? 0.5 : 1,
            }}
          >
            <Text
              color={page >= totalPages ? "textLight" : "text"}
              fontWeight="600"
            >
              Next
            </Text>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </Box>
  );
}
