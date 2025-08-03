import { Theme } from "@/theme/theme";
import { useTheme } from "@shopify/restyle";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import { Box } from "./ui/Box";
import { Text } from "./ui/Text";

export const PopularBookCard = ({ book }: { book: any }) => {
  const theme = useTheme<Theme>();
  const router = useRouter();

  return (
    <Box
      backgroundColor="popularBackground"
      borderRadius="xl"
      padding="m"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      height={180}
      shadowColor="shadow"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={2}
    >
      <Box flex={1} mr="m">
        <Box
          backgroundColor="textTitle"
          borderRadius="l"
          paddingHorizontal="s"
          paddingVertical="xs"
          alignSelf="flex-start"
          mb="s"
        >
          <Text variant="bookTitle" color="textId">
            🌟 Popular
          </Text>
        </Box>
        <Text variant="bookTitle" fontWeight="bold" mb="xs" color="textDark">
          {book.title}
        </Text>
        <Text variant="body" color="textLight" mb="s">
          {book.authors?.[0]?.name} ({book.download_count})
        </Text>

        <Text color="orange">Read More</Text>
      </Box>

      {book.formats["image/jpeg"] && (
        <Image
          source={{ uri: book.formats["image/jpeg"] }}
          style={{ width: 90, height: 130, borderRadius: 10 }}
          resizeMode="cover"
        />
      )}
    </Box>
  );
};
