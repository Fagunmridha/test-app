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
      <Box mr="m" width={120}>
        <Image
          source={{
            uri:
              book.formats["image/jpeg"] || "https://via.placeholder.com/120",
          }}
          style={{ width: 120, height: 180, borderRadius: 8 }}
        />
        <Text numberOfLines={2} mt="s">
          {book.title}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};
