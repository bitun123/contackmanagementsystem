import { z } from "zod";

export const childDataSchema = z.object({
  _id: z.string(),
  name: z.string(),
  value: z.string(),
  type: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type childData = z.infer<typeof childDataSchema>;

//define the contact type schema
export const ContactSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  phone: z.string(),
  firstName: z.string(),
  lastName: z.string().optional(),
  name: z.string(),
  city: z.string(),
  state: z.string(),
  location: z.string(),
  emailStatus: z.enum(["risky", "safe", "invalid", "unverified", "bounced"]),
  remarks: z.string(),
  dateOfLastContact: z.string(),
  isActive: z.boolean(),
  isArchived: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lists: z.array(z.any()),
  source: childDataSchema,
  status: childDataSchema,
});

export type Contact = z.infer<typeof ContactSchema>;

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
