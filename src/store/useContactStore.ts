import { create } from "zustand";
import { Contact } from "@/types/contact";

// Define the contact store interface
interface contactStore {
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact | null) => void;
}



// Create the contact store using Zustand
export const useContactStore = create<contactStore>((set) => ({
  selectedContact: null,
  setSelectedContact: (contact) => set({ selectedContact: contact }),
}));
