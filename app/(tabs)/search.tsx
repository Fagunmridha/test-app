import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BookCard } from "@/components/BookCard";
import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchStore } from "@/store/search";
import { Theme } from "@/theme/theme";

// API fetch function
const fetchBooks = async ({ pageParam = 1, search = "" }) => {
  const res = await axios.get("https://gutendex.com/books", {
    params: { search, page: pageParam },
  });
  return {
    results: res.data.results,
    nextPage: pageParam + 1,
    totalPages: Math.ceil(res.data.count / 32),
    hasMore: pageParam < Math.ceil(res.data.count / 32),
  };
};

export default function SearchScreen() {
  const theme = useTheme<Theme>();
  const router = useRouter();
  const { search, setSearch } = useSearchStore();
  const debouncedSearch = useDebounce(search, 400);
  const { search: q } = useLocalSearchParams();
  const didMountRef = useRef(false);

  // Set search from URL param
  useEffect(() => {
    if (typeof q === "string") setSearch(q);
  }, [q, setSearch]);

  // Sync search to router param
  useEffect(() => {
    if (didMountRef.current) {
      router.setParams({ search });
    } else {
      didMountRef.current = true;
    }
  }, [search, router]);

  // Infinite query for books
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["search-books", debouncedSearch],
      queryFn: ({ pageParam = 1 }) =>
        fetchBooks({ pageParam, search: debouncedSearch }),
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
      enabled: debouncedSearch.length > 0,
    });

  const books = data?.pages.flatMap((page) => page.results) ?? [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading && debouncedSearch.length > 0) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        <Box px="l" pt="l">
          <Text variant="header" color="text" mb="xs">
            Search Books
          </Text>
          <Text color="textLight" variant="body" mb="l">
            Explore thousands of classic literature books
          </Text>
        </Box>

        {/* Search Bar */}
        <Box
          backgroundColor="cardBackground"
          flexDirection="row"
          alignItems="center"
          borderRadius="xl"
          paddingHorizontal="l"
          py="m"
          mx="l"
          mb="l"
          borderWidth={1}
          borderColor={search.length > 0 ? "primary" : "text"}
        >
          <Box
            width={40}
            height={40}
            borderRadius="m"
            backgroundColor={search.length > 0 ? "primary" : "background"}
            justifyContent="center"
            alignItems="center"
            mr="m"
          >
            <Ionicons
              name="search"
              size={20}
              color={
                search.length > 0
                  ? theme.colors.background
                  : theme.colors.iconGray
              }
            />
          </Box>

          <TextInput
            placeholder="Book, Writer, Search category..."
            placeholderTextColor={theme.colors.textLight}
            value={search}
            onChangeText={setSearch}
            style={{
              flex: 1,
              paddingVertical: 12,
              color: theme.colors.text,
              fontSize: 16,
              fontWeight: "500",
            }}
          />

          <Box ml="m">
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </Box>
        </Box>

        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Box flex={1} pt="l">
        {/* Header */}
        <Box px="l">
          <Text variant="header" color="text" mb="xs">
            Search Books
          </Text>
          <Text color="textLight" variant="body" mb="l">
            Explore thousands of classic literature books
          </Text>
        </Box>

        {/* Search Bar */}
        <Box
          backgroundColor="cardBackground"
          flexDirection="row"
          alignItems="center"
          borderRadius="l"
          paddingHorizontal="l"
          py="m"
          mx="l"
          mb="l"
          borderWidth={1}
          borderColor={search.length > 0 ? "primary" : "text"}
        >
          <Box
            width={40}
            height={40}
            borderRadius="m"
            backgroundColor={search.length > 0 ? "primary" : "background"}
            justifyContent="center"
            alignItems="center"
            mr="m"
          >
            <Ionicons
              name="search"
              size={20}
              color={
                search.length > 0
                  ? theme.colors.background
                  : theme.colors.iconGray
              }
            />
          </Box>

          <TextInput
            placeholder="Book, Writer, Search category..."
            placeholderTextColor={theme.colors.textLight}
            value={search}
            onChangeText={setSearch}
            style={{
              flex: 1,
              paddingVertical: 12,
              color: theme.colors.text,
              fontSize: 16,
              fontWeight: "500",
            }}
          />

          {search.length > 0 && !isLoading && (
            <Box
              ml="m"
              width={32}
              height={32}
              borderRadius="s"
              backgroundColor="background"
              justifyContent="center"
              alignItems="center"
              onTouchEnd={() => setSearch("")}
            >
              <Ionicons name="close" size={16} color={theme.colors.iconGray} />
            </Box>
          )}
        </Box>

        {/* Book Results */}
        <FlatList
          data={books}
          renderItem={({ item }) => (
            <Box width="48%" mb="m">
              <BookCard
                book={item}
                onPress={() => router.push(`/books/${item.id}`)}
              />
            </Box>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: theme.spacing.m,
          }}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingTop: 8,
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </SafeAreaView>
  );
}
