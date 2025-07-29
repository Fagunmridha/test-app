import { BookCard } from "@/components/BookCard";
import { CategoryPills } from "@/components/CategoryPills";
import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchStore } from "@/store/search";
import { Theme } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, FlatList, TextInput } from "react-native";

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

export default function HomeScreen() {
  const theme = useTheme<Theme>();
  const { search: q } = useLocalSearchParams();
  const router = useRouter();

  const { search, setSearch } = useSearchStore();
  const debouncedSearch = useDebounce(search, 400);
  const didMountRef = useRef(false); // Prevent initial router.setParams()

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

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["books", debouncedSearch],
      queryFn: ({ pageParam }) =>
        fetchBooks({ pageParam, search: debouncedSearch }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
    });

  const books = data?.pages.flatMap((page) => page.results) || [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderBook = ({ item }: { item: any }) => (
    <Box width="48%">
      <BookCard book={item} onPress={() => router.push(`/books/${item.id}`)} />
    </Box>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <Box py="m" alignItems="center">
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </Box>
    );
  };

  return (
    <Box flex={1} backgroundColor="background">
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
              borderWidth: 0,
              borderColor: "transparent",
              outlineStyle: "none",
            }}
          />
          {isLoading && (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          )}
        </Box>
      </Box>

      {/* 🏷️ Categories */}
      <Box mt="m" px="m">
        <CategoryPills />
      </Box>

      {/* 📚 Book Grid */}
      <Box flex={1} mt="m">
        {isLoading ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </Box>
        ) : (
          <FlatList
            data={books}
            renderItem={renderBook}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              paddingHorizontal: 16,
              marginBottom: 16,
            }}
            contentContainerStyle={{
              paddingBottom: 80,
              paddingTop: 8,
            }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={
              <Box flex={1} justifyContent="center" alignItems="center" p="xl">
                <Text variant="subheader" color="textLight">
                  No books found
                </Text>
              </Box>
            }
          />
        )}
      </Box>
    </Box>
  );
}
