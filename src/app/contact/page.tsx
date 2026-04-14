"use client";

import ContactCard from "@/components/ui/ContactCard";

import { useContact } from "@/hooks/useContact";
import { useEffect } from "react";

import SearchBar from "@/components/ui/SearchBar";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
function ContactPage() {
  const { getcontacts, loading, contacts, error } = useContact();

  useEffect(() => {
    getcontacts({ page: 1, limit: 10 });
  }, []);

  return (
    <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 w-full min-h-screen bg-gray-50">
      <SearchBar />
      {contacts.length === 0 ? (
        <p className="text-gray-500 mt-6 text-sm sm:text-base">No data found</p>
      ) : (
        <div className="w-full min-h-screen  flex  flex-wrap gap-6 justify-start">
          {contacts.map((contact) => (
           loading ? <SkeletonCard key={contact._id} /> : <ContactCard key={contact._id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ContactPage;
