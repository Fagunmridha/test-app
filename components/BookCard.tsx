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
  const image =
    book.formats["image/jpeg"] || "https://via.placeholder.com/120x160";
  const author = book.authors?.[0]?.name || "Unknown";

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <Box
        backgroundColor="cardBackground"
        borderRadius="xl"
        padding="m"
        shadowColor="shadow"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.1}
        shadowRadius={8}
        elevation={4}
        width={160}
        height={280} // ✅ Fixed height for consistency
        style={{ overflow: "hidden" }}
      >
        {/* Book Cover */}
        <Box
          alignItems="center"
          justifyContent="center"
          shadowColor="shadow"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.2}
          shadowRadius={6}
          elevation={3}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: 132,
              height: 176,
              borderRadius: 12,
              backgroundColor: "#e0e0e0",
              resizeMode: "cover",
            }}
          />

          {/* Rating Badge */}
          <Box
            position="absolute"
            bottom={-8}
            right={4}
            backgroundColor="cardBackground"
            borderRadius="m"
            px="s"
            py="xs"
            flexDirection="row"
            alignItems="center"
            shadowColor="shadow"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.2}
            shadowRadius={4}
            elevation={3}
            borderWidth={1}
            borderColor="border"
          >
            <MaterialIcons name="star" size={12} color="#FFD700" />
            <Text variant="caption" ml="xs" fontSize={10} fontWeight="600">
              {rating}
            </Text>
          </Box>
        </Box>

        {/* Fixed Book Info Area */}
        <Box mt="m" justifyContent="space-between" style={{ height: 60 }}>
          <Text
            numberOfLines={2}
            fontSize={13}
            fontWeight="600"
            lineHeight={18}
            color="text"
            mb="xs"
          >
            {book.title}
          </Text>

          <Text
            numberOfLines={2}
            fontSize={11}
            lineHeight={14}
            color="textLight"
          >
            {author}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
