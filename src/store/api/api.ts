import { createAsyncThunk } from "@reduxjs/toolkit";
import { Contact, ApiResponse } from "../../types/contact";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined in environment variables.");
}

//fetch contacts with pagination, search, and email status filtering

export const fetchContactsThunk = createAsyncThunk<
  ApiResponse<Contact>,
  { search?: string; page?: number; limit?: number; emailStatus?: string },
  { rejectValue: string; state: void }
>("contact/fetchContactsThunk", async (params, { rejectWithValue, signal }) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.emailStatus)
      queryParams.append("emailStatus", params.emailStatus);

    const url = `${API_BASE_URL}?${queryParams.toString()}`;

    const response = await fetch(url, { signal });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Failed to fetch contacts.");
    }
    const data: ApiResponse<Contact> = await response.json();

    return data;
  } catch (error) {
    console.error("Thunk Error:", error);
    return rejectWithValue("Failed to fetch contacts.");
  }
});
