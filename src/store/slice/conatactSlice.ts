"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../../types/contact";
import { fetchContactsThunk } from "../../lib/api";

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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
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

export const {
  setContacts,
  setSelectedContact,
  setLoading,
  setError,
  setDarkMode,
  setCurrentPage,
  setTotalPages,
  setLimit,
  setTotal,
  setEmailStatus,
  setSearchQuery,
} = contactSlice.actions;

export default contactSlice.reducer;
