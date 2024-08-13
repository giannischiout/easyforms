import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";

interface Item {
  id: string;
  uuid: string;
}

interface StoreState {
  sortableItems: Item[];
  reorderItems: (oldIndex: number, newIndex: number) => void;
  addItem: (item: Item) => void;
  activeId: null | string;
  setActiveId: (id: string | null) => void;
}

const useStore = create<StoreState>((set) => ({
  sortableItems: [],
  activeId: null,
  reorderItems: (oldIndex, newIndex) =>
    set((state) => ({
      sortableItems: arrayMove(state.sortableItems, oldIndex, newIndex),
    })),
  setActiveId: (id) => set({ activeId: id }),
  addItem: (item) =>
    set((state) => ({
      sortableItems: [
        ...state.sortableItems,
        {
          id: item.id,
          uuid: Math.random().toString(36).substring(7),
        },
      ],
    })),
}));

export default useStore;
