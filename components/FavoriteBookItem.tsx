import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import { useFavoriteStore } from "@/hooks/useFavoriteStore";
import { Theme } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Image, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export function FavoriteBookItem({
  book,
  index,
  onPress,
}: {
  book: any;
  index: number;
  onPress: () => void;
}) {
  const theme = useTheme<Theme>();
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
        onPress={() => removeFavorite(book.id)}
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
          {/* Book Cover */}
          <Box
            shadowColor="shadow"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.2}
            shadowRadius={8}
            elevation={4}
            mr="m"
          >
            <Image
              source={{ uri: book.formats["image/jpeg"] }}
              style={{
                width: 70,
                height: 105,
                borderRadius: 12,
                backgroundColor: "#f0f0f0",
              }}
            />
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
            >
              <Ionicons name="heart" size={12} color="white" />
            </Box>
          </Box>

          {/* Book Info */}
          <Box flex={1} pr="s">
            <Text
              fontWeight="700"
              numberOfLines={2}
              color="text"
              fontSize={16}
              lineHeight={22}
              mb="xs"
            >
              {book.title}
            </Text>

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
                {book.authors?.map((a) => a.name).join(", ") ||
                  "Unknown Author"}
              </Text>
            </Box>

            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box flexDirection="row" alignItems="center">
                {book.subjects && book.subjects.length > 0 && (
                  <Box
                    backgroundColor="primary"
                    px="s"
                    py="xs"
                    borderRadius="s"
                    mr="s"
                  >
                    <Text color="background" variant="caption" fontWeight="600">
                      {book.subjects[0].split(" ")[0]}
                    </Text>
                  </Box>
                )}
                {book.download_count && (
                  <Box flexDirection="row" alignItems="center">
                    <Ionicons
                      name="download"
                      size={12}
                      color={theme.colors.textLight}
                    />
                    <Text color="textLight" variant="caption" ml="xs">
                      {book.download_count.toLocaleString()}
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
