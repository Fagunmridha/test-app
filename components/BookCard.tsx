import { MaterialIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity } from "react-native";
import { Box } from "./ui/Box";
import { Text } from "./ui/Text";

export const BookCard = ({
  book,
  onPress,
}: {
  book: any;
  onPress: () => void;
}) => {
  const rating = ((book.id % 3) + 3).toFixed(1);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Box
        backgroundColor="cardBackground"
        borderRadius="l"
        padding="m"
        shadowColor="shadow"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.15}
        shadowRadius={8}
        elevation={4}
        width={160}
        height={260}
      >
        {/* Book Cover Container */}
        <Box
          position="relative"
          alignItems="center"
          justifyContent="center"
          mb="m"
          shadowColor="shadow"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.2}
          shadowRadius={6}
          elevation={3}
        >
          <Image
            source={{
              uri:
                book.formats["image/jpeg"] ||
                "https://via.placeholder.com/120x160",
            }}
            style={{
              width: 132,
              height: 176,
              borderRadius: 10,
              backgroundColor: "#f0f0f0",
              resizeMode: "cover",
            }}
          />

          {/* Rating Badge - Positioned over the book cover */}
          <Box
            position="absolute"
            bottom={-8}
            right={4}
            backgroundColor="cardBackground"
            borderRadius="m"
            paddingHorizontal="s"
            paddingVertical="xs"
            flexDirection="row"
            alignItems="center"
            shadowColor="shadow"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.2}
            shadowRadius={4}
            elevation={3}
            borderWidth={1}
            borderColor="background"
          >
            <MaterialIcons name="star" size={12} color="#FFD700" />
            <Text variant="caption" ml="xs" fontSize={10} fontWeight="600">
              {rating}
            </Text>
          </Box>
        </Box>

        {/* Book Info Container */}
        <Box flex={1} justifyContent="space-between">
          <Box>
            <Text
              numberOfLines={2}
              variant="bookTitle"
              textAlign="left"
              fontSize={13}
              fontWeight="600"
              lineHeight={16}
              mb="xs"
            >
              {book.title}
            </Text>
            <Text
              numberOfLines={1}
              variant="bookAuthor"
              textAlign="left"
              fontSize={11}
              color="textLight"
            >
              {book.authors && book.authors.length > 0
                ? book.authors[0].name
                : "Unknown"}
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
