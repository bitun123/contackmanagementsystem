"use client";
import React from "react";
import ContactCard from "@/components/ui/ContactCard";
import { Contact } from "@/types/contact";
import { useContact } from "@/hooks/useContact";
import { useEffect, useState } from "react";
function ContactPage() {
  const { getcontacts, loading, contacts, error } = useContact();

  useEffect(() => {
    getcontacts({ page: 1, limit: 10 });
  }, []);

  return (
    <div>
      {contacts.map((contact) => (
        <ContactCard key={contact._id} contact={contact} />
      ))}
    </div>
  );
}

export default ContactPage;
