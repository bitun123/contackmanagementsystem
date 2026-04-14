import { create } from "zustand";
import { Contact } from "@/types/contact";

// Define the contact store interface
interface contactStore {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;

  // Pagination state
  currentPage: number;
  setCurrentPage: (page: number) => void;

  totalPages: number;
  setTotalPages: (pages: number) => void;

  limit: number;
  setLimit: (limit: number) => void;

  total: number;
  setTotal: (total: number) => void;

  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

// Create the contact store using Zustand
export const useContactStore = create<contactStore>((set) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  error: null,
  setError: (error) => set({ error }),

  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),

  totalPages: 1,
  setTotalPages: (pages) => set({ totalPages: pages }),

  limit: 10,
  setLimit: (limit) => set({ limit }),

  total: 0,
  setTotal: (total) => set({ total }),

  darkMode: false,
  setDarkMode: (darkMode) => set({ darkMode }),
}));
