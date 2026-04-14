"use client";

import ContactCard from "@/components/ui/ContactCard";

import { useContact } from "@/hooks/useContact";
import { useEffect } from "react";

import SearchBar from "@/components/ui/SearchBar";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { useRouter } from "next/navigation";
import { NativeSelectDemo } from "@/components/ui/EmailStatusFilter";
import { PaginationDemo } from "@/components/ui/Paginate";

function ContactPage() {
  const router = useRouter();

  const { getcontacts, loading, contacts, error } = useContact();

  useEffect(() => {
    getcontacts({ page: 1, limit: 10 });
  }, []);

  const handleClick = (id: string): void => {
    router.push(`/contact/${id}`);
  };
  return (
    <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 w-full min-h-screen bg-gray-50">
      <SearchBar />

      <div>
        <NativeSelectDemo />
      </div>
      {contacts.length === 0 ? (
        <p className="text-gray-500 mt-6 text-sm sm:text-base">No data found</p>
      ) : (
        <div className="w-full min-h-screen  flex  flex-wrap gap-6 justify-start">
          {contacts.map((contact) =>
            loading ? (
              <SkeletonCard key={contact._id} />
            ) : (
              <ContactCard key={contact._id} contact={contact} />
            ),
          )}
        </div>
      )}

      <PaginationDemo />
    </div>
  );
}

export default ContactPage;
