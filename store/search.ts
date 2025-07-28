// store/search.ts

import { create } from "zustand";

interface SearchState {
  search: string;
  page: number;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  search: "",
  page: 1,
  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),
}));
