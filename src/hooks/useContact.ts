import { fetchContacts } from "@/lib/api";
import { useContactStore } from "@/store/useContactStore";
import { ApiResponse, Contact } from "@/types/contact";

// Custom hook to manage contact data
export function useContact() {
  const {
    contacts,
    setContacts,
    loading,
    setLoading,
    error,
    setError,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    limit,
    setLimit,
    total,
    setTotal,
  } = useContactStore();

  // Function to get contacts with optional parameters
  const getcontacts = async (params: {
    page?: number;
    limit?: number;
    search?: string;
    emailStatus?: string;
  }) => {
    try {
      setLoading(true);
      const response: ApiResponse<Contact> = await fetchContacts(params);
      setContacts(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.pages);
      setLimit(response.limit);
      setTotal(response.total);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Return the contacts, pagination info, loading state, error state, and the function to fetch contacts
  return {
    getcontacts,
    loading,
    contacts,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
    limit,
    total,
  };
}
