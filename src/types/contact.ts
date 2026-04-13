//define the contact type
export interface Contact {
  _id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName?: string;
  name: string;
  city: string;
  state: string;
  location: string;
  emailStatus: "risky" | "safe" | "invalid" | "unverified" | "bounced";
  remarks: string;
  dateOfLastContact: string;
  isActive: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  lists: any[];
  source: "Source";
  status: "Status";
}

// Define the api response type
export interface ApiResponse<T> {
  data: T[];
  message: string;
  success: boolean;
  code: string;
  page: number;
  limit: number;
  total: number;
  pages: number;
  stats: {
    safe: number;
    risky: number;
    invalid: number;
    unverified: number;
    bounced: number;
  };
}
