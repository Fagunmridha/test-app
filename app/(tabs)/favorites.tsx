import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import { useFavoriteStore } from "@/hooks/useFavoriteStore";
import { Theme } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const fetchBook = async (id: number) => {
  const res = await axios.get(`https://gutendex.com/books/${id}`);
  return res.data;
};

export default function FavoritesScreen() {
  const router = useRouter();
  const favorites = useFavoriteStore((state) => state.favorites);

  const renderEmptyState = () => (
    <Box flex={1} justifyContent="center" alignItems="center" py="xxl">
      <Box
        width={140}
        height={140}
        borderRadius="xl"
        backgroundColor="cardBackground"
        justifyContent="center"
        alignItems="center"
        mb="l"
        shadowColor="shadow"
        shadowOffset={{ width: 0, height: 12 }}
        shadowOpacity={0.2}
        shadowRadius={16}
        elevation={12}
      >
        <Ionicons name="heart-outline" size={64} color="#E0E0E0" />
      </Box>
      <Text variant="subheader" color="text" mb="s" textAlign="center">
        No Favorites Yet
      </Text>
      <Text color="textLight" textAlign="center" px="xl" lineHeight={22} mb="l">
        Books you mark as favorites will appear here for quick access
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/search")}
        style={{
          backgroundColor: "#007AFF",
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 12,
        }}
      >
        <Text color="background" fontWeight="600">
          Discover Books
        </Text>
      </TouchableOpacity>
    </Box>
  );

  const renderHeader = () => (
    <Box mb="l">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb="xs"
      >
        <Text variant="header" color="text">
          Favorite Books
        </Text>
        <Box
          backgroundColor="primary"
          borderRadius="s"
          width={32}
          height={32}
          justifyContent="center"
          alignItems="center"
        >
          <Ionicons name="heart" size={18} color="white" />
        </Box>
      </Box>
      <Text color="textLight" variant="body" mb="s">
        Your personal collection of beloved reads
      </Text>
      {favorites.length > 0 && (
        <Box
          backgroundColor="cardBackground"
          px="m"
          py="s"
          borderRadius="m"
          flexDirection="row"
          alignItems="center"
        >
          <Ionicons name="library" size={16} color="#666" />
          <Text color="textLight" variant="caption" ml="s">
            {favorites.length} book{favorites.length !== 1 ? "s" : ""} saved
          </Text>
        </Box>
      )}
    </Box>
  );

  return (
    <Box flex={1} backgroundColor="background">
      <Box px="l" pt="xxl">
        {renderHeader()}
      </Box>

      <Box flex={1} px="l">
        {favorites.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(id) => id.toString()}
            renderItem={({ item, index }) => (
              <FavoriteBookItem
                id={item}
                index={index}
                onPress={() => router.push(`/books/${item}`)}
              />
            )}
            ItemSeparatorComponent={() => <Box height={16} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
              paddingTop: 8,
            }}
          />
        )}
      </Box>
    </Box>
  );
}

function FavoriteBookItem({
  id,
  index,
  onPress,
}: {
  id: number;
  index: number;
  onPress: () => void;
}) {
  const theme = useTheme<Theme>();
  const { data, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id),
  });

  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

  const renderRightActions = () => (
    <Box
      justifyContent="center"
      alignItems="center"
      width={90}
      height="100%"
      ml="s"
    >
      <TouchableOpacity
        onPress={() => removeFavorite(id)}
        style={{
          backgroundColor: "#FF3B30",
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#FF3B30",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <Ionicons name="trash" size={20} color="white" />
        <Text color="background" fontWeight="600" variant="caption" mt="xs">
          Remove
        </Text>
      </TouchableOpacity>
    </Box>
  );

  if (isLoading) {
    return (
      <Box
        backgroundColor="cardBackground"
        p="m"
        borderRadius="l"
        flexDirection="row"
        alignItems="center"
        shadowColor="shadow"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.08}
        shadowRadius={8}
        elevation={3}
        height={120}
      >
        <Box
          width={70}
          height={105}
          backgroundColor="background"
          borderRadius="m"
          mr="m"
          justifyContent="center"
          alignItems="center"
        >
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </Box>
        <Box flex={1}>
          <Box
            height={16}
            backgroundColor="background"
            borderRadius="s"
            mb="s"
            width="80%"
          />
          <Box
            height={12}
            backgroundColor="background"
            borderRadius="s"
            width="60%"
          />
        </Box>
      </Box>
    );
  }

  if (!data) return null;

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Box
          backgroundColor="cardBackground"
          p="m"
          borderRadius="l"
          flexDirection="row"
          alignItems="center"
          shadowColor="shadow"
          shadowOffset={{ width: 0, height: 6 }}
          shadowOpacity={0.12}
          shadowRadius={12}
          elevation={6}
          borderWidth={1}
          borderColor="border"
        >
          {/* Book Cover with Enhanced Styling */}
          <Box
            shadowColor="shadow"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.2}
            shadowRadius={8}
            elevation={4}
            mr="m"
          >
            <Image
              source={{ uri: data.formats["image/jpeg"] }}
              style={{
                width: 70,
                height: 105,
                borderRadius: 12,
                backgroundColor: "#f0f0f0",
              }}
            />
            {/* Favorite Badge */}
            <Box
              position="absolute"
              top={-4}
              right={-4}
              backgroundColor="primary"
              borderRadius="s"
              width={24}
              height={24}
              justifyContent="center"
              alignItems="center"
              shadowColor="primary"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.3}
              shadowRadius={4}
              elevation={3}
            >
              <Ionicons name="heart" size={12} color="white" />
            </Box>
          </Box>

          {/* Book Info */}
          <Box flex={1} pr="s">
            <Box flexDirection="row" alignItems="flex-start" mb="xs">
              <Text
                fontWeight="700"
                numberOfLines={2}
                color="text"
                fontSize={16}
                lineHeight={22}
                flex={1}
              >
                {data.title}
              </Text>
            </Box>

            <Box flexDirection="row" alignItems="center" mb="s">
              <Ionicons
                name="person"
                size={14}
                color={theme.colors.textLight}
              />
              <Text
                variant="body"
                color="textLight"
                numberOfLines={1}
                ml="xs"
                flex={1}
                fontSize={14}
              >
                {data.authors?.map((a) => a.name).join(", ") ||
                  "Unknown Author"}
              </Text>
            </Box>

            {/* Additional Book Details */}
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box flexDirection="row" alignItems="center">
                {data.subjects && data.subjects.length > 0 && (
                  <Box
                    backgroundColor="primary"
                    px="s"
                    py="xs"
                    borderRadius="s"
                    mr="s"
                  >
                    <Text color="background" variant="caption" fontWeight="600">
                      {data.subjects[0].split(" ")[0]}
                    </Text>
                  </Box>
                )}
                {data.download_count && (
                  <Box flexDirection="row" alignItems="center">
                    <Ionicons
                      name="download"
                      size={12}
                      color={theme.colors.textLight}
                    />
                    <Text color="textLight" variant="caption" ml="xs">
                      {data.download_count.toLocaleString()}
                    </Text>
                  </Box>
                )}
              </Box>

              <Box
                backgroundColor="background"
                borderRadius="s"
                width={32}
                height={32}
                justifyContent="center"
                alignItems="center"
              >
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={theme.colors.textLight}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    </Swipeable>
  );
}
