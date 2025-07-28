// store/useFavoriteStore.ts
import { create } from "zustand";

interface FavoriteStore {
  favorites: number[]; // store book ids
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  toggleFavorite: (id) => {
    const { favorites } = get();
    if (favorites.includes(id)) {
      set({ favorites: favorites.filter((favId) => favId !== id) });
    } else {
      set({ favorites: [...favorites, id] });
    }
  },
  isFavorite: (id) => get().favorites.includes(id),
}));
