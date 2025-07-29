const API = "https://gutendex.com/books";

export const fetchBooks = async ({ pageParam = 1, search = "" }: { pageParam?: number; search?: string }) => {
  const res = await fetch(`${API}?search=${search}&page=${pageParam}`);
  if (!res.ok) throw new Error("Failed to fetch books");
  const data = await res.json();
  
  return {
    results: data.results,
    nextPage: pageParam + 1,
    totalPages: Math.ceil(data.count / 32),
    hasMore: pageParam < Math.ceil(data.count / 32),
  };
};

export const fetchBookDetails = async (id: string) => {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
};
