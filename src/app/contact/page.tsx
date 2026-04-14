"use client";
import React from "react";
import ContactCard from "@/components/ui/ContactCard";
import { Contact } from "@/types/contact";
import { useContact } from "@/hooks/useContact";
import { useEffect, useState } from "react";
import page from "../page";
function ContactPage() {
  const { getcontacts, loading, contacts, error } = useContact();

  useEffect(() => {
    getcontacts({ page: 1, limit: 20 });
  }, []);

  return (
    <div className="p-4 w-full bg-gray-100 flex flex-wrap  gap-4">
      {contacts.map((contact) => (
        <div key={contact._id}>
            <ContactCard key={contact._id} contact={contact} />
        </div>
      ))}
    </div>
  );
}

export default ContactPage;
