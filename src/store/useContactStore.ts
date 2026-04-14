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
}

// Create the contact store using Zustand
export const useContactStore = create<contactStore>((set) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  error: null,
  setError: (error) => set({ error }),
}));
