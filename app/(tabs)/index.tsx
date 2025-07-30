import { BookCard } from "@/components/BookCard";
import { CategoryPills } from "@/components/CategoryPills";
import { PopularBooksSlider } from "@/components/PopularBooksSlider";
import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchStore } from "@/store/search";
import { Theme } from "@/theme/theme";
import { useTheme } from "@shopify/restyle";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, FlatList } from "react-native";

type Book = {
  id: number;
  title: string;
  authors?: { name: string }[];
};

const fetchBooks = async ({
  pageParam = 1,
  search = "",
}: {
  pageParam?: number;
  search?: string;
}): Promise<{
  results: Book[];
  nextPage: number;
  totalPages: number;
  hasMore: boolean;
}> => {
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

const fetchEditorsPicks = async (): Promise<Book[]> => {
  const res = await axios.get("https://gutendex.com/books", {
    params: { page: 1 },
  });
  return res.data.results.slice(0, 10);
};

const fetchTrendingBooks = async (): Promise<Book[]> => {
  const res = await axios.get("https://gutendex.com/books", {
    params: { page: 1 },
  });
  return res.data.results.slice(10, 20);
};

export default function HomeScreen() {
  const theme = useTheme<Theme>();
  const { search: q } = useLocalSearchParams();
  const router = useRouter();

  const { search, setSearch } = useSearchStore();
  const debouncedSearch = useDebounce(search, 400);
  const didMountRef = useRef(false);

  const { data: editorsPicks = [], isLoading: isLoadingEditors } = useQuery<
    Book[]
  >({
    queryKey: ["editorsPicks"],
    queryFn: fetchEditorsPicks,
    staleTime: 1000 * 60 * 5,
  });

  const { data: trendingBooks = [], isLoading: isLoadingTrending } = useQuery<
    Book[]
  >({
    queryKey: ["trendingBooks"],
    queryFn: fetchTrendingBooks,
    staleTime: 1000 * 60 * 5,
  });

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["books", debouncedSearch],
      queryFn: ({ pageParam = 1 }) =>
        fetchBooks({ pageParam, search: debouncedSearch }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
    });

  const books = data?.pages.flatMap((page) => page.results) || [];

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

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <Box py="m" alignItems="center">
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </Box>
    );
  };

  const renderHeader = () => (
    <>
      <PopularBooksSlider />

      <Box mt="m" px="m">
        <CategoryPills />
      </Box>

      <Box mt="l">
        <Text variant="header" mb="s" px="m">
          Editor's Picks
        </Text>
        {isLoadingEditors ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : (
          <FlatList
            data={editorsPicks}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Box ml="m">
                <BookCard
                  book={item}
                  onPress={() => router.push(`/books/${item.id}`)}
                />
              </Box>
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </Box>

      <Box mt="l">
        <Text variant="header" mb="s" px="m">
          Trending Books
        </Text>
        {isLoadingTrending ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : (
          <FlatList
            data={trendingBooks}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Box ml="m">
                <BookCard
                  book={item}
                  onPress={() => router.push(`/books/${item.id}`)}
                />
              </Box>
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </Box>

      <Box mt="l" px="m">
        <Text variant="header" mb="s">
          More Books
        </Text>
      </Box>
    </>
  );

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      data={books}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
        paddingHorizontal: theme.spacing.m,
      }}
      renderItem={({ item }) => (
        <Box width={"48%"} mb="m">
          <BookCard
            book={item}
            onPress={() => router.push(`/books/${item.id}`)}
          />
        </Box>
      )}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
    />
  );
}
