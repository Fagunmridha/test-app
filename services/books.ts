const API = "https://gutendex.com/books";

export const fetchBooks = async (search: string, page: number = 1) => {
  const res = await fetch(`${API}?search=${search}&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
};

export const fetchBookDetails = async (id: string) => {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
};
