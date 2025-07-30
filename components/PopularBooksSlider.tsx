import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { PopularBookCard } from "./PopularBookCard";
import { Box } from "./ui/Box";

let cachedBook: any = null; // simple in-memory cache

export const PopularBooksSlider = () => {
  const [book, setBook] = useState<any>(cachedBook);
  const [loading, setLoading] = useState(!cachedBook);

  useEffect(() => {
    if (cachedBook) return; // skip fetch if cached

    const fetchPopularBooks = async () => {
      try {
        const res = await axios.get("https://gutendex.com/books");
        const shuffled = res.data.results.sort(() => 0.5 - Math.random());
        cachedBook = shuffled[0]; // cache it
        setBook(shuffled[0]);
      } catch (error) {
        console.error("Failed to fetch book", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularBooks();
  }, []);

  if (loading || !book) {
    return (
      <Box mt="m" alignItems="center" justifyContent="center" height={180}>
        <ActivityIndicator size="large" />
      </Box>
    );
  }

  return (
    <Box mt="m" px="m">
      <PopularBookCard book={book} />
    </Box>
  );
};
