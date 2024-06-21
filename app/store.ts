// src/store.ts (o store.js si no usas TypeScript)
import { create } from 'zustand';
import { Category } from './utils/types/category';



interface State {
    categories: Category[];
    selectedCategory: Category | null;
    setCategories: (categories: Category[]) => void;
    selectCategory: (category: Category) => void;
}

const useStore = create<State>((set) => ({
    categories: [],
    selectedCategory: null,
    setCategories: (categories) => set({ categories }),
    selectCategory: (category) => set({ selectedCategory: category }),
}));

export default useStore;
