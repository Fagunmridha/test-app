import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import { useFavoriteStore } from "@/hooks/useFavoriteStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const fetchBook = async (id: number) => {
  const res = await axios.get(`https://gutendex.com/books/${id}`);
  return res.data;
};

export default function FavoritesScreen() {
  const router = useRouter();
  const favorites = useFavoriteStore((state) => state.favorites);

  return (
    <Box flex={1} bg="background" p="m">
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text variant="subheader" mb="s">
          ← Back
        </Text>
      </TouchableOpacity>

      {/* Header */}
      <Text variant="header" mb="m">
        📚 Favorite Books
      </Text>

      {/* Book List */}
      {favorites.length === 0 ? (
        <Text color="textLight">No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(id) => id.toString()}
          renderItem={({ item }) => (
            <FavoriteBookItem
              id={item}
              onPress={() => router.push(`/books/${item}`)}
            />
          )}
          ItemSeparatorComponent={() => <Box height={12} />}
        />
      )}
    </Box>
  );
}

function FavoriteBookItem({
  id,
  onPress,
}: {
  id: number;
  onPress: () => void;
}) {
  const { data } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id),
  });

  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

  if (!data) return null;

  const renderRightActions = () => (
    <Box
      justifyContent="center"
      alignItems="center"
      width={80}
      height="100%"
      borderRadius="m"
    >
      <TouchableOpacity onPress={() => removeFavorite(id)}>
        <Text color="text" fontWeight="bold">
          Remove
        </Text>
      </TouchableOpacity>
    </Box>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={onPress}>
        <Box
          p="s"
          borderRadius="m"
          flexDirection="row"
          alignItems="center"
          shadowOpacity={0.1}
          shadowOffset={{ width: 0, height: 2 }}
          shadowRadius={4}
          elevation={3}
        >
          <Image
            source={{ uri: data.formats["image/jpeg"] }}
            style={{
              width: 60,
              height: 90,
              borderRadius: 8,
              marginRight: 12,
              backgroundColor: "#ccc",
            }}
          />
          <Box flex={1}>
            <Text fontWeight="bold" numberOfLines={2}>
              {data.title}
            </Text>
            <Text variant="subheader" color="textLight" numberOfLines={1}>
              by {data.authors?.map((a) => a.name).join(", ") || "Unknown"}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    </Swipeable>
  );
}
