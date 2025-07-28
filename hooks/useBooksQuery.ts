import { fetchBooks } from "@/services/books";
import { useSearchStore } from "@/store/search";
import { useQuery } from "@tanstack/react-query";

export const useBooksQuery = () => {
  const { query, page } = useSearchStore();

  return useQuery({
    queryKey: ["books", query, page],
    queryFn: () => fetchBooks(query, page),
  });
};
