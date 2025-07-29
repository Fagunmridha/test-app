import { useDebounce } from "@/lib/debounce";
import { useSearchStore } from "@/store/search";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { TextInput } from "react-native";
import { Box } from "./ui/Box";

export function SearchBar() {
  const { query, setQuery } = useSearchStore();
  const router = useRouter();
  const debounced = useDebounce(query, 500);

  useEffect(() => {
    const encoded = encodeURIComponent(debounced.trim());
    if (encoded) {
      router.replace({ pathname: "/", query: { search: encoded } });
    }
  }, [debounced, router]);

  return (
    <Box padding="m" borderBottomWidth={1} borderColor="border">
      <TextInput
        placeholder="Search books..."
        placeholderTextColor="#999"
        value={query}
        onChangeText={setQuery}
        style={{
          fontSize: 16,
          padding: 10,
          borderRadius: 8,
          backgroundColor: "#f0f0f0",
        }}
      />
    </Box>
  );
}
