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
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        backgroundColor="cardBackground"
        borderRadius="m"
        padding="s"
        shadowColor="shadow"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
        elevation={2}
        width={160}
        height={260}
      >
        <Image
          source={{
            uri:
              book.formats["image/jpeg"] || "https://via.placeholder.com/120",
          }}
          style={{
            width: 150,
            height: 200,
            borderRadius: 8,
            marginBottom: 8,
            resizeMode: "cover",
          }}
        />
        <Text numberOfLines={2} variant="bookTitle" textAlign="center">
          {book.title}
        </Text>
        <Text numberOfLines={1} variant="bookAuthor" mt="xs" textAlign="center">
          {book.authors && book.authors.length > 0
            ? book.authors[0].name
            : "Unknown"}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};
