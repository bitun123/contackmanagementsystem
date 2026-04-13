import { ApiResponse, Contact } from "@/types/contact";

//Define the API base URL
const API_BASE_URL = process.env.CONTACT_API_URL;

if(!API_BASE_URL) {
  throw new Error("CONTACT_API_URL is not defined in the environment variables");
}

//Function to fetch contacts from the API
export async function fetchContacts(params: {
  page?: number;
  limit?: number;
  search?: string;
  emailStatus?: string;
}): Promise<ApiResponse<Contact>> {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.search) queryParams.append("search", params.search);
  if (params.emailStatus) queryParams.append("emailStatus", params.emailStatus);

  const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`);

  if (!response.ok) throw new Error("Failed to fetch Contacts");

  return response.json();
}
