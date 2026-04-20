/**
 *this component is client side component because it uses react hooks and interacts with the DOM.
 *It is responsible for managing the state of contacts, including fetching contacts from the API,
 * handling loading and error states, managing pagination, search functionality, and dark mode toggle.
 **/

"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../../types/contact";
import { fetchContactsThunk } from "../api/api";

// Define the shape of the contact state
interface ContactState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  selectedContact: Contact | null;
  darkMode: boolean;
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
  emailStatus: string;
  searchQuery: string;
}

// Initial state for the contact slice
const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
  selectedContact: null,
  darkMode: false,
  currentPage: 1,
  totalPages: 1,
  limit: 10,
  total: 0,
  emailStatus: "",
  searchQuery: "",
};

// Create the contact slice
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    setSelectedContact: (state, action: PayloadAction<Contact | null>) => {
      state.selectedContact = action.payload;
    },

    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setEmailStatus: (state, action: PayloadAction<string>) => {
      state.emailStatus = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts = [action.payload, ...state.contacts];
    },
  },
  extraReducers: (builder) => {
    //pending state
    builder.addCase(fetchContactsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    //fulfilled state
    builder.addCase(fetchContactsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.contacts = action.payload.data.flat();
      state.total = action.payload.total;
      state.currentPage = action.payload.page;
      state.totalPages = Math.ceil(action.payload.total / state.limit);
    });

    //rejected state
    builder.addCase(fetchContactsThunk.rejected, (state, action) => {
      console.error("fetchContactsThunk.rejected action:", action);
      state.loading = false;
      state.error = (action.payload as string) || "Error fetching contacts";
    });
  },
});

// Export actions and reducer
export const {
  setContacts,
  setSelectedContact,
  setDarkMode,
  setCurrentPage,
  setTotalPages,
  setLimit,
  setTotal,
  setEmailStatus,
  setSearchQuery,
  addContact,
} = contactSlice.actions;

export default contactSlice.reducer;
