import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, FlatList, TextInput } from "react-native";

import { BookCard } from "@/components/BookCard";
import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchStore } from "@/store/search";
import { Theme } from "@/theme/theme";

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

  useEffect(() => {
    if (typeof q === "string") setSearch(q);
  }, [q, setSearch]);

  useEffect(() => {
    if (didMountRef.current) {
      router.setParams({ search });
    } else {
      didMountRef.current = true;
    }
  }, [search, router]);

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

  const renderFooter = () =>
    isFetchingNextPage ? (
      <Box py="xl" alignItems="center">
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text mt="s" color="textLight" variant="caption">
          Loading more...
        </Text>
      </Box>
    ) : null;

  const renderBook = ({ item }: any) => (
    <Box width="48%" mb="l">
      <BookCard book={item} onPress={() => router.push(`/books/${item.id}`)} />
    </Box>
  );

  const renderEmptyState = () => (
    <Box flex={1} justifyContent="center" alignItems="center" py="xxl">
      <Box
        width={120}
        height={120}
        borderRadius="xl"
        backgroundColor="cardBackground"
        justifyContent="center"
        alignItems="center"
        mb="l"
        shadowColor="shadow"
        shadowOffset={{ width: 0, height: 8 }}
        shadowOpacity={0.15}
        shadowRadius={12}
        elevation={8}
      >
        <Ionicons name="library" size={48} color={theme.colors.primary} />
      </Box>
      <Text variant="subheader" color="text" mb="s" textAlign="center">
        Explore Books
      </Text>
      <Text color="textLight" textAlign="center" px="xl" lineHeight={22}>
        Find your favorite book from thousands of classic literary works.📚
      </Text>
    </Box>
  );

  const renderInitialLoading = () => (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text mt="s" color="textLight">
        searching for a book...
      </Text>
    </Box>
  );

  const renderHeader = () => (
    <Box mb="l">
      <Text variant="header" color="text" mb="xs">
        Search Books
      </Text>
      <Text color="textLight" variant="body" mb="l">
        Explore thousands of classic literature books
      </Text>
    </Box>
  );

  return (
    <Box flex={1} backgroundColor="background">
      {/* Header Section */}
      <Box px="l" pt="l">
        {renderHeader()}

        {/* Search Bar */}
        <Box
          backgroundColor="cardBackground"
          flexDirection="row"
          alignItems="center"
          borderRadius="xl"
          paddingHorizontal="l"
          py="m"
          shadowColor="shadow"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.12}
          shadowRadius={8}
          elevation={4}
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
              borderWidth: 0,
              borderColor: "transparent",
              outlineStyle: "none",
            }}
          />

          {isLoading && (
            <Box ml="m">
              <ActivityIndicator size="small" color={theme.colors.primary} />
            </Box>
          )}

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
      </Box>

      {/* Content Section */}
      <Box flex={1} px="l">
        {debouncedSearch.length === 0 ? (
          renderEmptyState()
        ) : isLoading ? (
          renderInitialLoading()
        ) : books.length === 0 ? (
          <Box flex={1} justifyContent="center" alignItems="center" py="xxl">
            <Box
              width={100}
              height={100}
              borderRadius="xl"
              backgroundColor="cardBackground"
              justifyContent="center"
              alignItems="center"
              mb="l"
            >
              <Ionicons
                name="search"
                size={40}
                color={theme.colors.textLight}
              />
            </Box>
            <Text variant="subheader" color="text" mb="s">
              Found no books
            </Text>
            <Text color="textLight" textAlign="center" px="xl">
              Try again different way
            </Text>
          </Box>
        ) : (
          <>
            {/* Results Header */}
            <Box
              mb="m"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text color="textLight" variant="caption">
                Find book
                {data?.pages[0]?.totalPages
                  ? `${books.length}+ result`
                  : `${books.length} result`}
              </Text>
              <Box backgroundColor="primary" px="m" py="xs" borderRadius="s">
                <Text color="background" variant="caption" fontWeight="600">
                  {debouncedSearch}
                </Text>
              </Box>
            </Box>

            {/* Books Grid */}
            <FlatList
              data={books}
              renderItem={renderBook}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.7}
              ListFooterComponent={renderFooter}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
                paddingBottom: 8,
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 100,
              }}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
