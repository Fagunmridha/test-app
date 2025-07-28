import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { Image } from "react-native";

const fetchBookDetails = async (id: string) => {
  const res = await axios.get(`https://gutendex.com/books/${id}`);
  return res.data;
};

export default function BookDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookDetails(id),
    enabled: !!id,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error || !data) return <Text>Error loading book.</Text>;

  return (
    <Box padding="m">
      <Text variant="header" marginBottom="m">
        {data.title}
      </Text>

      <Image
        source={{
          uri:
            data.formats?.["image/jpeg"] || "https://via.placeholder.com/150",
        }}
        style={{ width: 150, height: 200, borderRadius: 8, marginBottom: 16 }}
      />

      <Text variant="body">
        Author: {data.authors.map((a: any) => a.name).join(", ")}
      </Text>

      <Text variant="body" marginTop="m">
        Subjects: {data.subjects?.join(", ") || "No subjects available"}
      </Text>
    </Box>
  );
}
