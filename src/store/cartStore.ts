import create from "zustand";
import type { Book } from "../types";

type CartItem = { book: Book; quantity: number; price: number };

type State = {
  items: CartItem[];
  add: (book: Book) => void;
  remove: (bookId: number) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<State>((set, get) => ({
  items: [],
  add: (book) => {
    const items = [...get().items];
    const idx = items.findIndex((i) => i.book.id === book.id);
    if (idx >= 0) items[idx].quantity += 1;
    else items.push({ book, quantity: 1, price: book.price || 0 });
    set({ items });
  },
  remove: (bookId) =>
    set({ items: get().items.filter((i) => i.book.id !== bookId) }),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
}));
