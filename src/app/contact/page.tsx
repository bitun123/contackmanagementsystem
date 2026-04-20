"use client";
import ContactCard from "@/components/ui/ContactCard";

import { useEffect } from "react";
import SearchBar from "@/components/ui/SearchBar";
import { NativeSelectDemo } from "@/components/ui/EmailStatusFilter";
import { PaginationDemo } from "@/components/ui/Paginate";
import { useContact } from "@/hooks/useContact";

function ContactPage() {
  const { getContacts, loading, contacts } = useContact();

  useEffect(() => {
    getContacts({ page: 1, limit: 10 });
  }, []);


  
  return (
    <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors ">
      <SearchBar />

      <div className="w-full flex items-center justify-between mb-6">
        <NativeSelectDemo />
        <PaginationDemo />
      </div>
      {loading ? (
        <div className="flex items-center justify-center">
          <p className="text-gray-900 dark:text-gray-100">Loading...</p>
        </div>
      ) : (
        <div className="w-full min-h-screen  flex  flex-wrap gap-6 justify-center">
          {contacts?.length > 0 ? (
            contacts.map((contact) => (
              <ContactCard key={contact._id} contact={contact} />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
              No contacts found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ContactPage;
