// search.tsx
import { BookCard } from "@/components/BookCard";
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

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
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
      <ActivityIndicator size="small" color={theme.colors.primary} />
    ) : null;

  const renderBook = ({ item }: any) => (
    <Box width="48%" mb="m">
      <BookCard book={item} onPress={() => router.push(`/books/${item.id}`)} />
    </Box>
  );

  return (
    <Box flex={1} backgroundColor="background" p="m">
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
        mb="m"
      >
        <Ionicons name="search" size={20} color={theme.colors.iconGray} />
        <TextInput
          placeholder="Search here..."
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

      {debouncedSearch.length === 0 ? (
        <Text textAlign="center" color="textLight">
          Search the book name 📚
        </Text>
      ) : (
        <FlatList
          data={books}
          renderItem={renderBook}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      )}
    </Box>
  );
}

// import { Box } from "@/components/ui/Box";
// import { Text } from "@/components/ui/Text";
// import React from "react";
// import { ScrollView } from "react-native";

// export default function LibraryScreen() {
//   return (
//     <Box flex={1} backgroundColor="background" p="m">
//       <Text variant="header" mb="m">
//         📚 My Library
//       </Text>
//       <ScrollView>
//         <Box
//           backgroundColor="cardBackground"
//           p="m"
//           borderRadius="m"
//           mb="s"
//         >
//           <Text>This is the Library tab where users can manage their book collections.</Text>
//         </Box>
//         <Box
//           backgroundColor="cardBackground"
//           p="m"
//           borderRadius="m"
//           mb="s"
//         >
//           <Text>Here you can organize books into custom lists, track reading progress, and more.</Text>
//         </Box>
//       </ScrollView>
//     </Box>
//   );
// }
