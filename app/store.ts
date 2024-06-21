// src/store.ts (o store.js si no usas TypeScript)
import { create } from "zustand";
import { Category } from "./utils/types/category";

interface State {
  categories: Category[];
  selectedCategory: Category | null;
  mealQuery: string;
  setCategories: (categories: Category[]) => void;
  selectCategory: (category: Category) => void;
  setMealQuery: (query: string) => void;
}

const useStore = create<State>((set) => ({
  categories: [],
  selectedCategory: null,
  mealQuery: "",
  setCategories: (categories) => set({ categories }),
  selectCategory: (category) => set({ selectedCategory: category }),
  setMealQuery: (query: string) => set({ mealQuery: query }),
}));

export default useStore;
