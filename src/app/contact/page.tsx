"use client";
import ContactCard from "@/components/ui/ContactCard";
import { useContact } from "@/hooks/useContact";
import { useEffect } from "react";
import SearchBar from "@/components/ui/SearchBar";
import { NativeSelectDemo } from "@/components/ui/EmailStatusFilter";
import { PaginationDemo } from "@/components/ui/Paginate";

function ContactPage() {
  const { getcontacts, loading, contacts } = useContact();

  useEffect(() => {
    getcontacts({ page: 1, limit: 10 });
  }, []);

  return (
    <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 w-full min-h-screen bg-gray-50">
      <SearchBar />

      <div>
        <NativeSelectDemo />
      </div>
      {loading ? (
        //  <SkeletonCard key={contact._id} />
        <div className="flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="w-full min-h-screen  flex  flex-wrap gap-6 justify-start">
          {contacts?.length > 0 ? (
            contacts.map((contact) => (
              <ContactCard key={contact._id} contact={contact} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No contacts found.
            </p>
          )}
        </div>
      )}

      <PaginationDemo />
    </div>
  );
}

export default ContactPage;
